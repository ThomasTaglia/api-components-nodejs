import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";

const commonSchemas: { [schema: string]: OpenAPIV3.SchemaObject } = {
    Error: {
        type: "object",
        properties: {
            code: { type: "integer" },
            status: { type: "string" },
            message: { type: "string" },
            details: { type: "object" },
        },
        required: ["code", "status", "message"],
        additionalProperties: false,
    },
};
export default commonSchemas;
