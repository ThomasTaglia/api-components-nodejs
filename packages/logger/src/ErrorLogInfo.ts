import UserSuppliedLogInfo from "./UserSuppliedLogInfo";

/**
 * Interface describing the log information supplied when logging errors
 */
export default interface ErrorLogInfo extends UserSuppliedLogInfo {
    type: string;
    details: {
        /** The message of the error */
        message: string;
        /** The code of the error */
        code?: string | number;
        /** The stack trace of the error */
        stack?: string;
        /** Other details */
        [key: string]: any;
    };
}
