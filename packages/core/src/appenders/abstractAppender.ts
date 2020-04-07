import { LogEvent, LogFormatter } from "..";

export abstract class AbstractAppender {
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
