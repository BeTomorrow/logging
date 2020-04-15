import {
	DefaultLoggerManagerBuilder as CoreDefaultLoggerManagerBuilder,
	LogAppender,
	LogFormatter,
	LoggerManager,
	LoggerManagerBuilder as CoreLoggerManagerBuilder,
	LogLevel,
	MemoryStorage,
} from "@betomorrow/logging-core";
import { FileAppender } from "../appenders/fileAppender";
import { RollingFileAppender } from "../appenders/rollingFileAppender";
import { DefaultLogger } from "./defaultLogger";

interface NativeLoggerManagerBuilder extends CoreLoggerManagerBuilder {
	withRollingFileAppender(maxFileCount: number, logDir: string, formatter?: LogFormatter);
}

export class DefaultLoggerManagerBuilder implements NativeLoggerManagerBuilder {
	private baseBuilder = new CoreDefaultLoggerManagerBuilder();

	get level() {
		return this.baseBuilder.level;
	}

	get formatter() {
		return this.baseBuilder.formatter;
	}

	get appenders() {
		return this.baseBuilder.appenders;
	}

	withLevel(level: LogLevel) {
		this.baseBuilder.withLevel(level);
		return this;
	}

	withFormatter(formatter: LogFormatter) {
		this.baseBuilder.withFormatter(formatter);
		return this;
	}

	withConsoleAppender(formatter?: LogFormatter) {
		this.baseBuilder.withConsoleAppender(formatter);
		return this;
	}

	withRollingFileAppender(maxFileCount = 5, logDir: string = FileAppender.DefaultLogDir, formatter?: LogFormatter) {
		const appender = new RollingFileAppender(formatter ?? this.formatter, maxFileCount, logDir);
		this.baseBuilder.withAppender(appender);
		return this;
	}

	withMemoryAppender(memoryStorage: MemoryStorage, formatter?: LogFormatter) {
		this.baseBuilder.withMemoryAppender(memoryStorage, formatter);
		return this;
	}

	withAppender(appender: LogAppender) {
		this.baseBuilder.withAppender(appender);
		return this;
	}

	build(): LoggerManager {
		return new DefaultLogger(this.baseBuilder.level, this.baseBuilder.appenders);
	}
}
