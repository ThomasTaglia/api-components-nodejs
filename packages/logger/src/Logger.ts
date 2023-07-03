import { RequestService } from "@cryptoaddicteds/acn-requests";
import BaseLogInfo from "./BaseLogInfo";
import Log from "./Log";
import LogLevel from "./LogLevel";
import UserSuppliedLogInfo from "./UserSuppliedLogInfo";
import fastAndSafeJsonStringify from "./utils/fastAndSafeJsonStringify";
import logLevelToInt from "./utils/logLevelToInt";

const IS_TEST_ENV = process.env["NODE_ENV"] === "test";
const ANONYMOUS = "anonymous";

export default class Logger {
    constructor(
        private readonly requestService: RequestService,
        /** The base info shared by all produced logs */
        private readonly baseLogInfo: BaseLogInfo,
        /** The lowest level to log */
        private readonly level: LogLevel,
        /**
         * The output stream where to write logs. Defaults to process.stdout,
         * unless `process.env.NODE_ENV = "test"`, in which case it defaults to
         * `null`, so that logs are not written when running tests
         */
        private readonly outStream: NodeJS.WritableStream | null = IS_TEST_ENV
            ? null
            : process.stdout
    ) {}

    trace<T extends UserSuppliedLogInfo>(logInfo: T): void {
        this.log(LogLevel.Trace, logInfo);
    }
    debug<T extends UserSuppliedLogInfo>(logInfo: T): void {
        this.log(LogLevel.Debug, logInfo);
    }
    info<T extends UserSuppliedLogInfo>(logInfo: T): void {
        this.log(LogLevel.Info, logInfo);
    }
    warn<T extends UserSuppliedLogInfo>(logInfo: T): void {
        this.log(LogLevel.Warn, logInfo);
    }
    error<T extends UserSuppliedLogInfo>(logInfo: T): void {
        this.log(LogLevel.Error, logInfo);
    }
    fatal<T extends UserSuppliedLogInfo>(logInfo: T): void {
        this.log(LogLevel.Fatal, logInfo);
    }

    private log(level: LogLevel, logInfo: UserSuppliedLogInfo): void {
        if (
            this.outStream === null ||
            logLevelToInt(this.level) > logLevelToInt(level)
        ) {
            return;
        }
        const request = this.getRequest();
        const log: Log = {
            ...this.baseLogInfo,
            context: {
                correlation_id: request?.correlationId,
                request_id: request?.requestId,
                downstream_app_name: request?.appName,
                downstream_app_version: request?.appVersion,
            },
            iso_timestamp: new Date().toISOString(),
            level: level,
            ...logInfo,
        };
        this.outStream.write(fastAndSafeJsonStringify(log) + "\n");
    }

    private getRequest() {
        try {
            return this.requestService.get();
        } catch {
            return;
        }
    }
}
