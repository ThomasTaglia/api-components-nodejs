import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";
import { errorResponse } from "../openapiUtils";

const commonResponses: { [code: string]: OpenAPIV3.ResponseObject } = {
    "400": errorResponse("Bad request"),
    "401": errorResponse("Unauthenticated request"),
    "403": errorResponse("Unauthorized request"),
};
export default commonResponses;
