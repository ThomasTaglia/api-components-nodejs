import { RequestHandler } from "express";
import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";

export default function apiSpecJson(
    apiSpec: OpenAPIV3.Document
): RequestHandler {
    return (_req, res) => {
        res.status(200).send(apiSpec);
    };
}
