# Logging

Mono-repo for logging related tools. This includes **@betomorrow/logging-core** package  which provides core features and abstractions and **@betomorrow/logging-native** a react-native override with file logging support.

### Usage

```ts
import {
	MemoryStorage,
	DefaultLoggerManagerBuilder,
	LogLevel,
	ConsoleFormatter,
	DebugScreenFormatter,
} from "@betomorrow/logging-core";

export const loggerManager = new DefaultLoggerManagerBuilder()
	.withLevel(LogLevel.DEBUG)
	.withConsoleAppender(new ConsoleFormatter())
	.withMemoryAppender(new MemoryStorage(), new DebugScreenFormatter())
	.build();

export const logger = loggerManager.getLogger();
```

One logger can have many appenders (outputs). One appender have one formatter describing how logs should be displayed.


> **Note: native package shoud be used in react-native environnement for performance considerations**

### Core appenders

- ConsoleAppender
- MemoryAppender

### Native appenders

- FileAppender
- RollingFileAppender
