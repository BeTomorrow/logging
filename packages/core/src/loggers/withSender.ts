import { Logger } from "../types";

export class WithSender implements Logger {
	private logger: Logger;
	private sender: any;

	constructor(logger: Logger, sender: any) {
		this.logger = logger;
		this.sender = sender;
	}

	trace(...args: any[]): void {
		this.logger.trace(this.sender, ...args);
	}

	debug(...args: any[]): void {
		this.logger.debug(this.sender, ...args);
	}

	info(...args: any[]): void {
		this.logger.info(this.sender, ...args);
	}

	warn(...args: any[]): void {
		this.logger.warn(this.sender, ...args);
	}

	error(...args: any[]): void {
		this.logger.error(this.sender, ...args);
	}

	isDebugEnabled(): boolean {
		return this.logger.isDebugEnabled();
	}

	isTraceEnabled(): boolean {
		return this.logger.isTraceEnabled();
	}
}
