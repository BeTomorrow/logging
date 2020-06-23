import moment from "moment";
import { LogEvent, LogFormatter, LogLevel } from "../types";

export class ConsoleFormatter implements LogFormatter {
	logToString(event: LogEvent): string {
		return `[${moment(event.date).format("HH:mm:ss")}][${LogLevel[event.level]}] ${event.sender}`;
	}
}
