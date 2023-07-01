import { error as openapiValidatorErrors } from "express-openapi-validator";
import status from "statuses";
import HttpError from "../../HttpError";
import InvalidAuthorizationHeader from "../authenticateRequest/InvalidAuthorizationHeader";
import MissingAccessToken from "../authenticateRequest/MissingAccessToken";

export default function convertError(err: any): HttpError {
    if (
        err instanceof openapiValidatorErrors.InternalServerError ||
        err instanceof openapiValidatorErrors.NotFound ||
        err instanceof openapiValidatorErrors.BadRequest ||
        err instanceof openapiValidatorErrors.RequestEntityTooLarge ||
        err instanceof openapiValidatorErrors.MethodNotAllowed ||
        err instanceof openapiValidatorErrors.NotAcceptable ||
        err instanceof openapiValidatorErrors.UnsupportedMediaType
    ) {
        return {
            code: err.status,
            status: status(err.status) as string,
            message: err.message,
            details: { errors: err.errors },
        };
    }

    if (
        err instanceof InvalidAuthorizationHeader ||
        err instanceof MissingAccessToken
    ) {
        return {
            code: 401,
            status: status(401) as string,
            message: err.constructor.name,
        };
    }

    return {
        code: 500,
        status: status(500) as string,
        message: "Internal server error",
    };
}
