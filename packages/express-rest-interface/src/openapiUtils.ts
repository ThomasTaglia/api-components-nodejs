import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";

export function jsonRequest(
    description: string | undefined,
    schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject
): OpenAPIV3.RequestBodyObject {
    return {
        description: description ?? "",
        content: { "application/json": { schema } },
        required: true,
    };
}

export function jsonResponse(
    description: string,
    schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject
): OpenAPIV3.ResponseObject {
    return {
        description,
        content: { "application/json": { schema } },
    };
}

export function errorResponse(description: string): OpenAPIV3.ResponseObject {
    return jsonResponse(description, {
        $ref: "#/components/schemas/Error",
    });
}
