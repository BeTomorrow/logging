import { LogAppender, LogEvent, LogFormatter } from "..";
import { AbstractAppender } from "./abstractAppender";
import { MemoryStorage } from "../services/memoryStorage";

export class MemoryAppender extends AbstractAppender implements LogAppender {
	private memoryStorage: MemoryStorage;

	constructor(formatter: LogFormatter, memoryStorage: MemoryStorage) {
		super(formatter);
		this.memoryStorage = memoryStorage;
	}

	append(event: LogEvent) {
		this.memoryStorage.add(event.level, this.formatter.logToString(event));
	}
}
