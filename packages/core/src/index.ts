export enum LogLevel {
	TRACE = 0,
	DEBUG,
	INFO,
	WARN,
	ERROR,
}

export interface Logger {
	trace(sender: any, ...args: any[]): void;
	debug(sender: any, ...args: any[]): void;
	info(sender: any, ...args: any): void;
	warn(sender: any, ...args: any[]): void;
	error(sender: any, ...args: any[]): void;
	isDebugEnabled(): boolean;
	isTraceEnabled(): boolean;
}

export interface LoggerManager {
	setLevel(level: LogLevel): void;
	addAppender(appender: LogAppender): void;
	getAppenders(): ReadonlyArray<LogAppender>;
	getLogger(): Logger;
	init(): Promise<void>;
}

export interface LogAppender {
	init(): Promise<void>;
	append(event: LogEvent): void;
}

export interface LogFormatter {
	logToString(event: LogEvent): string;
}

export class LogEvent {
	readonly date: Date;
	readonly sender: any;
	readonly level: LogLevel;
	readonly args: any[];
	constructor(date: Date, sender: any, level: LogLevel, args: any[]) {
		this.date = date;
		this.sender = sender;
		this.level = level;
		this.args = args;
	}
}

export { DefaultLogger } from "./defaultLogger";
export { LoggerManagerBuilder } from "./loggerManagerBuilder";
export { DefaultLoggerManagerBuilder } from "./defaultLoggerManagerBuilder";
export { MemoryStorage } from "./services/memoryStorage";

export * from "./formatters";
export * from "./appenders";
