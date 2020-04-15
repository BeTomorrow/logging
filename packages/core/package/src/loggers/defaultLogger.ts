import { LoggerManager, Logger, LogAppender, LogLevel } from "../types";

export class DefaultLogger implements Logger, LoggerManager {
	private appenders: LogAppender[] = [];
	private currentLevel: LogLevel = LogLevel.INFO;

	constructor(initialLevel: LogLevel, appenders: LogAppender[]) {
		this.currentLevel = initialLevel;
		this.appenders = appenders;
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

	getLogger(): Logger {
		return this;
	}

	setLevel(level: LogLevel) {
		this.currentLevel = level;
	}

	trace(sender: any, ...args: any[]): void {
		this.log(sender, LogLevel.TRACE, args);
	}

	debug(sender: any, ...args: any[]): void {
		this.log(sender, LogLevel.DEBUG, args);
	}

	info(sender: any, ...args: any[]): void {
		this.log(sender, LogLevel.INFO, args);
	}

	warn(sender: any, ...args: any[]): void {
		this.log(sender, LogLevel.WARN, args);
	}

	error(sender: any, ...args: any[]): void {
		this.log(sender, LogLevel.ERROR, args);
	}

	isDebugEnabled(): boolean {
		return this.currentLevel <= LogLevel.DEBUG;
	}

	isTraceEnabled(): boolean {
		return this.currentLevel === LogLevel.TRACE;
	}

	private log(sender: any, level: LogLevel, args: any[]) {
		if (level < this.currentLevel) {
			return;
		}
		this.appenders.forEach((appender) => {
			try {
				appender.append({
					date: new Date(),
					sender: sender,
					level: level,
					args,
				});
			} catch (err) {
				console.warn(`DefaultLogger - cannot append log`, err);
			}
		});
	}
}
