import { RequestHandler } from "express";

// Wraps a request handler - sync or async - and converts thrown error to
// express-middleware-chain errors
export default function forwardThrownRequestHandlerErrors(
    requestHandler: RequestHandler
): RequestHandler {
    return async (req, res, next) => {
        try {
            await requestHandler(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}
