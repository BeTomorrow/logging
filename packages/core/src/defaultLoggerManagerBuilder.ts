import { LogAppender, LogFormatter, LoggerManager, LogLevel } from ".";
import { ConsoleAppender, MemoryAppender } from "./appenders";
import { DefaultLogger } from "./defaultLogger";
import { DefaultFormatter } from "./formatters";
import { LoggerManagerBuilder } from "./loggerManagerBuilder";
import { MemoryStorage } from "./services/memoryStorage";

export class DefaultLoggerManagerBuilder implements LoggerManagerBuilder {
	private appenders: LogAppender[] = [];
	private _level: LogLevel = LogLevel.DEBUG;
	private _formatter: LogFormatter = new DefaultFormatter();

	get formatter() {
		return this._formatter;
	}

	get level() {
		return this._level;
	}

	withLevel(level: LogLevel): DefaultLoggerManagerBuilder {
		this._level = level;
		return this;
	}

	withFormatter(formatter: LogFormatter): DefaultLoggerManagerBuilder {
		this._formatter = formatter;
		return this;
	}

	withConsoleAppender(formatter?: LogFormatter): DefaultLoggerManagerBuilder {
		this.appenders.push(new ConsoleAppender(formatter ?? this.formatter));
		return this;
	}

	withMemoryAppender(memoryStorage: MemoryStorage, formatter?: LogFormatter): DefaultLoggerManagerBuilder {
		this.appenders.push(new MemoryAppender(formatter ?? this.formatter, memoryStorage));
		return this;
	}

	withAppender(appender: LogAppender): DefaultLoggerManagerBuilder {
		this.appenders.push(appender);
		return this;
	}

	build(): LoggerManager {
		return new DefaultLogger(this.level, this.appenders);
	}
}
