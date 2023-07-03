import Log from "./Log";

/**
 * This subset of the Log interface describes the initial information supplied
 * to the logger. This information will not change throughout the lifetime of
 * the logger and will be shared by all logs produced by it
 */
type BaseLogInfo = Pick<Log, "app_name" | "app_version" | "hostname">;
export default BaseLogInfo;
