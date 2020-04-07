import * as RNFS from "react-native-fs";

export const DEFAULT_LOG_DIR = RNFS.DocumentDirectoryPath + "/logs";

export * from "./appenders";
export { LogFileReader } from "./services/logFileReader";
export { DefaultLogger } from "./defaultLogger";
