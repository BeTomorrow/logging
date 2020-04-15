import { ConsoleAppender, MemoryAppender } from "../appenders";
import { DefaultFormatter } from "../formatters";
import { MemoryStorage } from "../services/memoryStorage";
import { LogAppender, LogFormatter, LoggerManager, LoggerManagerBuilder, LogLevel } from "../types";
import { DefaultLoggerManager } from "./defaultLoggerManager";
import { DefaultLogger } from "./defaultLogger";

export class DefaultLoggerManagerBuilder implements LoggerManagerBuilder {
	private _appenders: LogAppender[] = [];
	private _level: LogLevel = LogLevel.DEBUG;
	private _formatter: LogFormatter = new DefaultFormatter();

	get formatter() {
		return this._formatter;
	}

	get level() {
		return this._level;
	}

	get appenders() {
		return this._appenders;
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
		this._appenders.push(new ConsoleAppender(formatter ?? this.formatter));
		return this;
	}

	withMemoryAppender(memoryStorage: MemoryStorage, formatter?: LogFormatter): DefaultLoggerManagerBuilder {
		this._appenders.push(new MemoryAppender(formatter ?? this.formatter, memoryStorage));
		return this;
	}

	withAppender(appender: LogAppender): DefaultLoggerManagerBuilder {
		this._appenders.push(appender);
		return this;
	}

	build(): LoggerManager {
		const provider = (manager: LoggerManager) => new DefaultLogger(manager);
		return new DefaultLoggerManager(this.level, this._appenders, provider);
	}
}
