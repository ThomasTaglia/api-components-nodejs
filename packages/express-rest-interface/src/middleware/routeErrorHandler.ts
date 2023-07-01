import { ErrorRequestHandler } from "express";
import ErrorConverter from "../ErrorConverter";

export default function routeErrorHandler(
    convertError?: ErrorConverter
): ErrorRequestHandler {
    return (err, _req, res, next) => {
        const httpError = convertError ? convertError(err) : null;
        if (httpError !== null) {
            res.status(httpError.code).send(httpError);
        } else {
            next(err);
        }
    };
}
