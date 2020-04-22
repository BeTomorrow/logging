import { LogFormatter, LogEvent, LogLevel } from "../types";

export class DefaultFormatter implements LogFormatter {
	logToString(event: LogEvent): string {
		if (event.args.length > 0) {
			return `${event.date.toISOString()} [${LogLevel[event.level]}] ${event.sender}: ${this.toMessage(event.args)}`;
		} else {
			return `${event.date.toISOString()} [${LogLevel[event.level]}] ${event.sender}`;
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
