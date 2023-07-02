import axios from "axios";
import { expect } from "chai";
import express from "express";
import AlsRequestService from "../src/AlsRequestService";
import Request from "../src/Request";

describe("AlsRequestService", () => {
    it('allows setting and getting Request objects with "async-thread" isolation', async () => {
        // Setup SUT
        const alsRequestService = new AlsRequestService();

        // Exercise
        const requestId0 = "0";
        const requestId1 = "1";
        const requests = await new Promise<Request[]>((resolve) => {
            const requestIdHeader = "x-request-id";
            const app = express()
                .use((req, _res, next) => {
                    alsRequestService.set({
                        requestId: req.headers[requestIdHeader],
                    } as any);
                    next();
                })
                .use((_req, res) => {
                    setTimeout(() => {
                        res.status(200).send(alsRequestService.get());
                    }, 10);
                });

            const port = 8765;
            const server = app.listen(port, async () => {
                const responses = await Promise.all([
                    axios.get<any>(`http://localhost:${port}/`, {
                        headers: { [requestIdHeader]: requestId0 },
                    }),
                    axios.get<any>(`http://localhost:${port}/`, {
                        headers: { [requestIdHeader]: requestId1 },
                    }),
                ]);

                server.close(() => {
                    resolve(responses.map((response) => response.data));
                });
            });
        });

        // Verify
        expect(requests[0]).to.deep.equal({ requestId: requestId0 });
        expect(requests[1]).to.deep.equal({ requestId: requestId1 });
    });
});
