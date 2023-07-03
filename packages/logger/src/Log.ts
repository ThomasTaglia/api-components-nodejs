import LogLevel from "./LogLevel";

/**
 * The Log interface describes a generic log object
 */
export default interface Log {
    /**
     * Info on the service that produced the log
     */

    /** Name of the service */
    app_name: string;
    /** Version of the service */
    app_version: string;
    /** Hostname of the pod / container / VM running the service */
    hostname?: string;

    /**
     * General log info
     */

    /** Timestamp, in ISO8601 format */
    iso_timestamp: string;
    /** Level */
    level: LogLevel;
    /** Main message */
    message: string;
    /** Context in which the log was produced */
    context: {
        /** Id correlating the log to other logs (by other services) */
        correlation_id?: string | undefined;
        /** Id of the request being processed when the log was produced */
        request_id?: string | undefined;
        /** Name of the application initiating the request */
        downstream_app_name?: string | undefined;
        /** Version of the application initiating the request */
        downstream_app_version?: string | undefined;
    };

    /**
     * Detailed log info
     */

    /** Log type, allowing to interpret the log details */
    type?: string;
    /**
     * Object containing additional info about the log. The object MUST be a
     * `(string, string)` map, so that Elasticsearch can index its fields,
     * without them needing to be statically specified, and without incurring in
     * the risk of the indexes getting corrupted due to mis-typing
     */
    indexed_details_s?: {
        [key: string]: string | undefined;
    };
    /**
     * Object containing additional info about the log. The object MUST be a
     * `(string, number)` map, so that Elasticsearch can index its fields,
     * without them needing to be statically specified, and without incurring in
     * the risk of the indexes getting corrupted due to mis-typing
     */
    indexed_details_n?: {
        [key: string]: number | undefined;
    };
    /**
     * Unstructured json object containing any detailed info about the log. The
     * field and its subfields are NOT indexed by Elasticsearch (hence they're
     * not easily searchable)
     */
    details?: any;
}
