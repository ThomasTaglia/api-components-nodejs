import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";
import Route from "../Route";
import commonParameters from "./commonParameters";
import commonResponses from "./commonResponses";
import commonSchemas from "./commonSchemas";
import makeOpenAPIPaths from "./makeOpenAPIPaths";

export default function makeApiSpec(
    serverTitle: string,
    serverVersion: string,
    publicUrl: string,
    routes: Route[],
    schemas: OpenAPIV3.ComponentsObject["schemas"],
    includeCommonParameters: boolean
): OpenAPIV3.Document {
    return {
        openapi: "3.0.3",
        info: {
            title: serverTitle,
            version: serverVersion,
        },
        servers: [{ url: publicUrl }],
        paths: makeOpenAPIPaths(routes, includeCommonParameters),
        components: {
            schemas: { ...schemas, ...commonSchemas },
            parameters: includeCommonParameters ? commonParameters : {},
            responses: commonResponses,
            securitySchemes: { BearerAuth: { type: "http", scheme: "bearer" } },
        },
    };
}
