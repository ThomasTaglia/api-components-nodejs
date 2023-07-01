import { RequestHandler } from "express";

export default function health(): RequestHandler {
    return (_req, res) => {
        res.status(200).send({ status: "UP" });
    };
}
