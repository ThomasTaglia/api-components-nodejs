import { Runnable } from "@cryptoaddicteds/acn-application-runner";
import { Logger } from "@cryptoaddicteds/acn-logger";
import { RequestService } from "@cryptoaddicteds/acn-requests";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { middleware as openapiValidator } from "express-openapi-validator";
import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";
import http from "http";
import { cloneDeep } from "lodash";
import swaggerUi from "swagger-ui-express";
import Route from "./Route";
import makeApiSpec from "./makeApiSpec";
import authenticateRequest from "./middleware/authenticateRequest";
import errorHandler from "./middleware/errorHandler";
import routeErrorHandler from "./middleware/routeErrorHandler";
import apiSpecJson from "./utilityRoutes/apiSpecJson";
import health from "./utilityRoutes/health";
import info from "./utilityRoutes/info";
import forwardThrownRequestHandlerErrors from "./utils/forwardThrownRequestHandlerErrors";
import sortByRegistrationPriority from "./utils/sortByRegistrationPriority";

// TODO: i18n
interface Configuration {
    port: number;
    serviceInfo: {
        name: string;
        version: string;
        commit: string;
        publicUrl: string;
    };
    schemas?: OpenAPIV3.ComponentsObject["schemas"];
    maxJsonRequestBodySize?: string;
    corsAllowedOrigins: string[];
    validateResponses: boolean;
}

export default class ExpressRestInterface implements Runnable {
    private server: http.Server | null = null;
    constructor(
        // Dependencies
        private readonly requestService: RequestService,
        private readonly logger: Logger,
        // Customizations
        private readonly configuration: Configuration,
        private readonly routes: Route[]
    ) {}

    async start() {
        this.server = http.createServer(this.makeApp());
        await new Promise<void>((resolve) =>
            this.server!.listen(this.configuration.port, () => resolve())
        );
    }

    async stop() {
        await new Promise<void>((resolve, reject) => {
            this.server!.close((error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    private makeApp(): express.Express {
        const apiSpec = makeApiSpec(
            this.configuration.serviceInfo.name,
            this.configuration.serviceInfo.version,
            this.configuration.serviceInfo.publicUrl,
            this.routes,
            this.configuration.schemas,
            true
        );

        const cleanedApiSpec = makeApiSpec(
            this.configuration.serviceInfo.name,
            this.configuration.serviceInfo.version,
            this.configuration.serviceInfo.publicUrl,
            cloneDeep(this.routes).filter((r) => !r.internal),
            this.configuration.schemas,
            true
        );

        const app = express();
        app.set("trust proxy", true);
        app.disable("x-powered-by");

        // Utility routes
        app.get(
            "/info",
            info({
                name: this.configuration.serviceInfo.name,
                version: this.configuration.serviceInfo.version,
                commit: this.configuration.serviceInfo.commit,
                start: new Date(),
            })
        );
        app.get("/health", health());
        app.get("/api-spec.json", apiSpecJson(cloneDeep(cleanedApiSpec)));
        app.use(
            "/docs",
            swaggerUi.serve,
            swaggerUi.setup(cloneDeep(cleanedApiSpec))
        );

        // Middleware
        app.use(
            bodyParser.json({
                limit: this.configuration.maxJsonRequestBodySize,
            })
        );
        app.use(
            cors({
                origin: this.configuration.corsAllowedOrigins,
                credentials: true,
            })
        );
        app.use(
            openapiValidator({
                apiSpec: cloneDeep(apiSpec),
                // The authenticateRequest middleware is used for security
                validateSecurity: false,
                validateResponses: this.configuration.validateResponses,
            })
        );

        // Custom routes
        const authenticateRequestMiddleware = authenticateRequest(
            this.requestService
        );
        sortByRegistrationPriority(this.routes).forEach((route) => {
            if (route.requiresAuthentication) {
                app[route.method](
                    route.path,
                    authenticateRequestMiddleware,
                    forwardThrownRequestHandlerErrors(route.handler),
                    routeErrorHandler(route.errorConverter)
                );
            } else {
                app[route.method](
                    route.path,
                    forwardThrownRequestHandlerErrors(route.handler),
                    routeErrorHandler(route.errorConverter)
                );
            }
        });

        // Error handlers
        app.use(errorHandler(this.logger));

        return app;
    }
}
