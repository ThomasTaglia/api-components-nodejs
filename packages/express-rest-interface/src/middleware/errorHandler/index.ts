import { Logger, getUnknownErrorDetails } from "@cryptoaddicteds/acn-logger";
import { ErrorRequestHandler } from "express";
import convertError from "./convertError";

export default function errorHandler(logger: Logger): ErrorRequestHandler {
    // The _next argument is needed since express uses arity to figure out if a
    // handler is a request handler or an error handler
    return (err, req, res, _next) => {
        const httpError = convertError(err);

        if (httpError.code >= 500) {
            const route = req.route?.path
                ? `${req.method} ${req.route.path}`
                : undefined;
            logger.error({
                message: "Unexpected 5xx error in route handler",
                type: "APPLICATION_ERROR",
                details: { error: getUnknownErrorDetails(err), route: route },
                indexed_details_s: { route },
            });
        }

        res.status(httpError.code).send(httpError);
    };
}
