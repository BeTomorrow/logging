import dayjs from "dayjs";
import { LogEvent, LogFormatter, LogLevel } from "../types";

export class ConsoleFormatter implements LogFormatter {
	logToString(event: LogEvent): string {
		return `[${dayjs(event.date).format("HH:mm:ss")}][${LogLevel[event.level]}] ${event.sender}`;
	}
}
