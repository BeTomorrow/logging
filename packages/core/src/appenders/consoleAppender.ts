import { LogAppender, LogEvent, LogFormatter, LogLevel } from "..";
import { AbstractAppender } from "./abstractAppender";

export class ConsoleAppender extends AbstractAppender implements LogAppender {
	constructor(formatter: LogFormatter) {
		super(formatter);
	}

	append(event: LogEvent): void {
		const msg = this.formatter.logToString(event);
		if (event.level >= LogLevel.WARN) {
			console.warn(msg);
		} else {
			console.log(msg);
		}
	}
}
