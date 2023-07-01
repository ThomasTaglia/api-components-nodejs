import Request from "./Request";

export default interface RequestService {
    set(request: Request): void;
    get(): Request;
}
