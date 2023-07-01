import { AsyncLocalStorage } from "async_hooks";
import MissingRequest from "./MissingRequest";
import Request from "./Request";
import RequestService from "./RequestService";

export default class AlsRequestService implements RequestService {
    private readonly asyncLocalStorage = new AsyncLocalStorage<Request>();

    /**
     * Sets the request for the current async-thread. Do NOT use in
     * application-level code, should ONLY be used in framework-level code
     */
    set(request: Request): void {
        this.asyncLocalStorage.enterWith(request);
    }

    /**
     * Gets the Request of the current async-thread. Throws
     * MissingRequest no Request is found in the current async-thread
     * (typically happens when the method is called outside of a request
     * async-thread)
     */
    get(): Request {
        const Request = this.asyncLocalStorage.getStore();
        if (!Request) {
            throw new MissingRequest();
        }
        return Request;
    }
}
