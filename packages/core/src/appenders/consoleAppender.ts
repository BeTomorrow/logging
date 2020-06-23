import { LogEvent, LogFormatter, LogLevel } from "../types";
import { AbstractAppender } from "./abstractAppender";

export class ConsoleAppender extends AbstractAppender {
	constructor(formatter: LogFormatter) {
		super(formatter);
	}

	append(event: LogEvent): void {
		const msg = this.formatter.logToString(event);
		if (event.level >= LogLevel.WARN) {
			console.warn(msg, ...event.args);
		} else {
			console.log(msg, ...event.args);
		}
	}
}
