import * as RNFS from "react-native-fs";

export * from "@betomorrow/logging-core";

export const DEFAULT_LOG_DIR = RNFS.DocumentDirectoryPath + "/logs";

export * from "./appenders";
export { LogFileReader } from "./services/logFileReader";
export { DefaultLogger } from "./defaultLogger";
export { DefaultLoggerManagerBuilder } from "./defaultLoggerManagerBuilder";
