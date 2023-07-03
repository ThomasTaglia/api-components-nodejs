import Log from "./Log";

/**
 * This subset of the Log interface describes the information supplied by the
 * developer (the user) when creating a log (i.e. when calling logger.info or
 * similar methods)
 */
type UserSuppliedLogInfo = Pick<
    Log,
    "message" | "type" | "indexed_details_s" | "indexed_details_n" | "details"
>;
export default UserSuppliedLogInfo;
