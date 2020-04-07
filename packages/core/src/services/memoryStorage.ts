import { LogLevel } from "..";

interface MemoryLog {
	level: LogLevel;
	message: string;
}

export class MemoryStorage {
	private logs: MemoryLog[] = [];

	add(level: LogLevel, message: string): void {
		this.logs.push({ level, message });
	}

	getLogs() {
		return this.logs;
	}
}
