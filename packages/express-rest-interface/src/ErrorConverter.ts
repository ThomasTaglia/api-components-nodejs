import HttpError from "./HttpError";

type ErrorConverter = (error: any) => HttpError | null;
export default ErrorConverter;
