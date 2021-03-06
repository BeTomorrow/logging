export enum LogLevel {
	TRACE = 0,
	DEBUG,
	INFO,
	WARN,
	ERROR,
}

export interface Logger {
	trace(...args: any[]): void;
	debug(...args: any[]): void;
	info(...args: any): void;
	warn(...args: any[]): void;
	error(...args: any[]): void;
	isDebugEnabled(): boolean;
	isTraceEnabled(): boolean;
}

export interface LoggerManager {
	getLevel(): LogLevel;
	setLevel(level: LogLevel): void;
	addAppender(appender: LogAppender): void;
	getAppenders(): ReadonlyArray<LogAppender>;
	getLogger(sender?: any): Logger;
	init(): Promise<void>;
}

export interface LoggerManagerBuilder {
	level: LogLevel;
	formatter: LogFormatter;

	withLevel(level: LogLevel): LoggerManagerBuilder;
	withFormatter(formatter: LogFormatter): LoggerManagerBuilder;
	withAppender(appender: LogAppender): LoggerManagerBuilder;
	build(): LoggerManager;
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
