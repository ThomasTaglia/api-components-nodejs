import LogLevel from "../LogLevel";

const logLevelIntMap = {
    [LogLevel.Trace]: 0,
    [LogLevel.Debug]: 1,
    [LogLevel.Info]: 2,
    [LogLevel.Warn]: 3,
    [LogLevel.Error]: 4,
    [LogLevel.Fatal]: 5,
};
export default function logLevelToInt(logLevel: LogLevel): number {
    return logLevelIntMap[logLevel];
}
