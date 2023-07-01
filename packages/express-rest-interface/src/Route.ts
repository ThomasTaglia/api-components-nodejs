import { RequestHandler } from "express";
import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";
import ErrorConverter from "./ErrorConverter";
import HttpMethod from "./HttpMethod";

export default interface Route<
    ReqParams = any,
    ReqQuery = any,
    ReqBody = any,
    ResBody = any
> {
    path: string;
    method: HttpMethod;
    registrationPriority?: number;
    requiresAuthentication: boolean;
    operationObject: OpenAPIV3.OperationObject;
    internal?: boolean;
    includeCommonParameters?: boolean;
    errorConverter?: ErrorConverter;
    handler: RequestHandler<ReqParams, ResBody, ReqBody, ReqQuery>;
}
