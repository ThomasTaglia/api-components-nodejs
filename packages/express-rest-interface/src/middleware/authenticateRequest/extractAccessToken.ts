import { Request } from "express";
import InvalidAuthorizationHeader from "./InvalidAuthorizationHeader";
import MissingAccessToken from "./MissingAccessToken";

export default function extractAccessToken(req: Request): string {
    const authorizationHeader = req.header("authorization");

    if (!authorizationHeader) {
        throw new MissingAccessToken();
    }

    if (!/^Bearer /.test(authorizationHeader)) {
        throw new InvalidAuthorizationHeader();
    }

    const accessToken = authorizationHeader.slice("Bearer ".length);

    if (!accessToken) {
        throw new MissingAccessToken();
    }

    return accessToken;
}
