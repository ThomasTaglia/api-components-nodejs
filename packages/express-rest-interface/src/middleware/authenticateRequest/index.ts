import { RequestService } from "@cryptoaddicteds/acn-requests";
import { RequestHandler } from "express";
import forwardThrownRequestHandlerErrors from "../../utils/forwardThrownRequestHandlerErrors";
import extractAccessToken from "./extractAccessToken";

export default function authenticateRequest(
    requestService: RequestService
): RequestHandler {
    return forwardThrownRequestHandlerErrors(async (req, _res, next) => {
        const accessToken = extractAccessToken(req);
        requestService.set({
            accessToken: accessToken,
            requestId: (req as any).id,
            correlationId: (req as any).correlationId,
            appName: (req as any).downstreamInfo.appName,
            appVersion: (req as any).downstreamInfo.appVersion,
        });
        next();
    });
}
