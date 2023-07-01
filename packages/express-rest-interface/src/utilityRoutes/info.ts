import { RequestHandler } from "express";

interface ServiceInfo {
    name: string;
    version: string;
    commit: string;
    start: Date;
}

export default function info(serviceInfo: ServiceInfo): RequestHandler {
    return (_req, res) => {
        res.status(200).send({
            name: serviceInfo.name,
            version: serviceInfo.version,
            commit: serviceInfo.commit,
            start: serviceInfo.start.toISOString(),
        });
    };
}
