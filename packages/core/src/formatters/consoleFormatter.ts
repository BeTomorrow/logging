import moment from "moment";
import { LogEvent, LogFormatter, LogLevel } from "../types";

export class ConsoleFormatter implements LogFormatter {
	logToString(event: LogEvent): string {
		if (event.args.length > 0) {
			return `[${moment(event.date).format("HH:mm:ss")}][${LogLevel[event.level]}] ${event.sender}: ${this.toMessage(
				event.args
			)}`;
		} else {
			return `[${moment(event.date).format("HH:mm:ss")}][${LogLevel[event.level]}] ${event.sender}`;
		}
	}

	private toMessage(args: any[]): string {
		return args.reduce((prev, v) => {
			if (!v) {
				return prev;
			}
			return prev ? `${prev}, ${v}` : v;
		});
	}
}
