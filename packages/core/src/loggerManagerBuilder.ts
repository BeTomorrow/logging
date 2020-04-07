import { LogAppender, LogFormatter, LoggerManager, LogLevel } from ".";

export interface LoggerManagerBuilder {
	level: LogLevel;
	formatter: LogFormatter;

	withLevel(level: LogLevel): LoggerManagerBuilder;
	withFormatter(formatter: LogFormatter): LoggerManagerBuilder;
	withAppender(appender: LogAppender): LoggerManagerBuilder;
	build(): LoggerManager;
}
