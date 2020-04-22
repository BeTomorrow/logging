import { LoggerManager, Logger, LogLevel } from "../types";

export class DefaultLogger implements Logger {
	private manager: LoggerManager;

	constructor(manager: LoggerManager) {
		this.manager = manager;
	}

	trace(...args: any[]): void {
		this.log(LogLevel.TRACE, args);
	}

	debug(...args: any[]): void {
		this.log(LogLevel.DEBUG, args);
	}

	info(...args: any[]): void {
		this.log(LogLevel.INFO, args);
	}

	warn(...args: any[]): void {
		this.log(LogLevel.WARN, args);
	}

	error(...args: any[]): void {
		this.log(LogLevel.ERROR, args);
	}

	isDebugEnabled(): boolean {
		return this.manager.getLevel() <= LogLevel.DEBUG;
	}

	isTraceEnabled(): boolean {
		return this.manager.getLevel() === LogLevel.TRACE;
	}

	private log(level: LogLevel, args: any[]) {
		if (level < this.manager.getLevel()) {
			return;
		}
		const sender = args.shift();
		this.manager.getAppenders().forEach((appender) => {
			try {
				appender.append({
					date: new Date(),
					sender: sender,
					level: level,
					args: args,
				});
			} catch (err) {
				console.warn(`DefaultLogger - cannot append log`, err);
			}
		});
	}
}
