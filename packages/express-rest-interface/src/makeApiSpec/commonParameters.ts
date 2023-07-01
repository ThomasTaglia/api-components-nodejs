import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";

const commonParameters: { [parameter: string]: OpenAPIV3.ParameterObject } = {
    userAgent: {
        name: "user-agent",
        in: "header",
        required: true,
        schema: { type: "string" },
    },
    appName: {
        name: "x-app-name",
        in: "header",
        required: true,
        schema: { type: "string" },
    },
    appVersion: {
        name: "x-app-version",
        in: "header",
        required: true,
        schema: { type: "string" },
    },
    requestId: {
        name: "x-request-id",
        in: "header",
        required: false,
        schema: { type: "string" },
    },
    correlationId: {
        name: "x-correlation-id",
        in: "header",
        required: false,
        schema: { type: "string" },
    },
    itemId: {
        name: "x-item-id",
        in: "header",
        required: false,
        schema: { type: "string" },
    },
    managerId: {
        name: "x-manager-id",
        in: "header",
        required: false,
        schema: { type: "string" },
    },
};
export default commonParameters;
