import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";
import { map, mapValues, omit, set } from "lodash";
import Route from "../Route";
import commonParameters from "./commonParameters";
import commonResponses from "./commonResponses";
import convertExpressPath from "./convertExpressPath";

export default function makeOpenAPIPaths(
    routes: Route[],
    includeCommonParameters: boolean
): OpenAPIV3.PathsObject {
    const pathsObject: OpenAPIV3.PathsObject = {};
    routes.forEach((route) => {
        const operationObject: OpenAPIV3.OperationObject = {
            ...route.operationObject,
            parameters: [
                ...(route.operationObject.parameters ?? []),
                ...(includeCommonParameters &&
                route.includeCommonParameters !== false
                    ? map(commonParameters, (_value, key) => ({
                          $ref: `#/components/parameters/${key}`,
                      }))
                    : []),
            ],
            responses: {
                ...mapValues(
                    route.requiresAuthentication
                        ? commonResponses
                        : omit(commonResponses, ["401", "403"]),
                    (_value, key) => ({
                        $ref: `#/components/responses/${key}`,
                    })
                ),
                ...(route.operationObject.responses ?? {}),
            },
            ...(route.requiresAuthentication
                ? { security: [{ BearerAuth: [] }] }
                : {}),
        };
        set(
            pathsObject,
            [convertExpressPath(route.path), route.method],
            operationObject
        );
    });
    return pathsObject;
}
