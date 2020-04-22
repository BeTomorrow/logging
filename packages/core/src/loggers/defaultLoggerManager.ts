import { LogAppender, Logger, LoggerManager, LogLevel } from "../types";
import { WithSender } from "./withSender";

export class DefaultLoggerManager implements LoggerManager {
	private appenders: LogAppender[] = [];
	private currentLevel: LogLevel = LogLevel.INFO;
	private loggerProvider: (manager: LoggerManager) => Logger;

	constructor(initialLevel: LogLevel, appenders: LogAppender[], loggerProvider: (manager: LoggerManager) => Logger) {
		this.currentLevel = initialLevel;
		this.appenders = appenders;
		this.loggerProvider = loggerProvider;
	}

	async init(): Promise<void> {
		for (const appender of this.appenders) {
			await appender.init();
		}
	}

	addAppender(appender: LogAppender) {
		this.appenders.push(appender);
	}

	getAppenders(): ReadonlyArray<LogAppender> {
		return this.appenders;
	}

	getLogger(sender?: any) {
		const logger = this.loggerProvider(this);
		return !!sender ? new WithSender(logger, sender) : logger;
	}

	getLevel(): LogLevel {
		return this.currentLevel;
	}

	setLevel(level: LogLevel) {
		this.currentLevel = level;
	}

	isDebugEnabled(): boolean {
		return this.currentLevel >= LogLevel.DEBUG;
	}

	isTraceEnabled(): boolean {
		return this.currentLevel === LogLevel.TRACE;
	}
}
