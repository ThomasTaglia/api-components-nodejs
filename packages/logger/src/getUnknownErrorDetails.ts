import ErrorLogInfo from "./ErrorLogInfo";

// Given an unknown error object, tries to extract as much information from it
export default function getUnknownErrorDetails(
    error: any
): ErrorLogInfo["details"] {
    try {
        return {
            message: error.message,
            name: error.name,
            stack: error.stack,
            code: error.code,
            signal: error.signal,
        };
    } catch {
        return { message: "Unable to extract error details" };
    }
}
