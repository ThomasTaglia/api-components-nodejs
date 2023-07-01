import { RequestService } from "@cryptoaddicteds/acn-requests";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import cuid from "cuid";
import qs from "qs";

export default class AxiosClient {
    private readonly axiosInstance: AxiosInstance;
    constructor(
        requestService: RequestService,
        baseUrl: string,
        userAgent: string
    ) {
        const { accessToken, correlationId, appName, appVersion } =
            requestService.get()!;
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
            headers: {
                authorization: `Bearer ${accessToken}`,
                "x-user-id": cuid(), //TODO: recuperare l'id dello user quando sarà disponibile dall'AuthClient
                "x-correlation-id": correlationId,
                "x-request-id": cuid(),
                "user-agent": userAgent,
                "x-app-name": appName,
                "x-app-version": appVersion,
                "x-item-id": "no",
            },
            paramsSerializer: (params) =>
                qs.stringify(params, { indices: false }),
        });
    }

    request<ResBody = any>(
        config: AxiosRequestConfig
    ): Promise<AxiosResponse<ResBody>> {
        return this.axiosInstance.request(config);
    }
}
