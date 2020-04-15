import { InteractionManager } from "react-native";
import { Logger, LoggerManager, LogLevel } from "@betomorrow/logging-core";

export class DefaultLogger implements Logger {
	private manager: LoggerManager;

	constructor(manager: LoggerManager) {
		this.manager = manager;
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
		return this.manager.getLevel() <= LogLevel.DEBUG;
	}

	isTraceEnabled(): boolean {
		return this.manager.getLevel() === LogLevel.TRACE;
	}

	private log(sender: any, level: LogLevel, args: any[]) {
		if (level < this.manager.getLevel()) {
			return;
		}
		InteractionManager.runAfterInteractions(() => {
			this.manager.getAppenders().forEach((appender) => {
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
		});
	}
}
