import { LogEvent, LogFormatter, LogAppender } from "../types";

export abstract class AbstractAppender implements LogAppender {
	protected formatter: LogFormatter;
	protected isInitialized = false;

	constructor(formatter: LogFormatter) {
		this.formatter = formatter;
	}

	abstract append(event: LogEvent): void;

	init(): Promise<void> {
		this.isInitialized = true;
		return Promise.resolve();
	}
}
