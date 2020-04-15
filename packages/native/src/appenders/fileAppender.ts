import * as RNFS from "react-native-fs";
import { DEFAULT_LOG_DIR } from "..";
import { AbstractAppender, LogAppender, LogFormatter, LogEvent } from "@betomorrow/logging-core";

export class FileAppender extends AbstractAppender implements LogAppender {
	static get DefaultLogDir() {
		return DEFAULT_LOG_DIR;
	}
	private filePath: string;
	private logDir: string;

	constructor(formatter: LogFormatter, logDir?: string, fileName?: string) {
		super(formatter);
		this.logDir = logDir ?? FileAppender.DefaultLogDir;
		fileName = fileName ?? `log-${new Date().toISOString().replace(/:/g, "_")}.txt`;
		this.filePath = `${this.logDir}/${fileName}`;
	}

	async append(event: LogEvent): Promise<void> {
		if (!this.isInitialized) {
			await this.init();
		}
		const line = this.formatter.logToString(event) + "\n";
		await RNFS.appendFile(this.filePath, line, "utf8");
	}

	getLogDir(): string {
		return this.logDir;
	}

	getFilePath(): string {
		return this.filePath;
	}

	async init(): Promise<void> {
		if (!(await RNFS.exists(this.logDir))) {
			await RNFS.mkdir(this.logDir);
		}
		await super.init();
	}
}
