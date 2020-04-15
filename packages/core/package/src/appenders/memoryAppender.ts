import { LogEvent, LogFormatter } from "../types";
import { AbstractAppender } from "./abstractAppender";
import { MemoryStorage } from "../services/memoryStorage";

export class MemoryAppender extends AbstractAppender {
	private memoryStorage: MemoryStorage;

	constructor(formatter: LogFormatter, memoryStorage: MemoryStorage) {
		super(formatter);
		this.memoryStorage = memoryStorage;
	}

	append(event: LogEvent) {
		this.memoryStorage.add(event.level, this.formatter.logToString(event));
	}
}
