import {
	DefaultLoggerManagerBuilder as CoreDefaultLoggerManagerBuilder,
	LogAppender,
	LogFormatter,
	LoggerManager,
	LoggerManagerBuilder as CoreLoggerManagerBuilder,
	LogLevel,
	MemoryStorage,
} from "@betomorrow/logging-core";
import { FileAppender } from "./appenders/fileAppender";
import { RollingFileAppender } from "./appenders/rollingFileAppender";

export class DefaultLoggerManagerBuilder implements CoreLoggerManagerBuilder {
	private baseBuilder = new CoreDefaultLoggerManagerBuilder();

	get level() {
		return this.baseBuilder.level;
	}

	get formatter() {
		return this.baseBuilder.formatter;
	}

	withLevel(level: LogLevel) {
		return this.baseBuilder.withLevel(level);
	}

	withFormatter(formatter: LogFormatter) {
		return this.baseBuilder.withFormatter(formatter);
	}

	withConsoleAppender(formatter?: LogFormatter) {
		return this.baseBuilder.withConsoleAppender(formatter);
	}

	withRollingFileAppender(maxFileCount = 5, logDir: string = FileAppender.DefaultLogDir, formatter?: LogFormatter) {
		const appender = new RollingFileAppender(formatter ?? this.formatter, maxFileCount, logDir);
		return this.baseBuilder.withAppender(appender);
	}

	withMemoryAppender(memoryStorage: MemoryStorage, formatter?: LogFormatter) {
		return this.baseBuilder.withMemoryAppender(memoryStorage, formatter);
	}

	withAppender(appender: LogAppender) {
		return this.baseBuilder.withAppender(appender);
	}

	build(): LoggerManager {
		return this.baseBuilder.build();
	}
}
