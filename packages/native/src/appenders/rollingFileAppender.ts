import { Mutex } from "async-mutex";
import * as RNFS from "react-native-fs";
import { FileAppender } from "./fileAppender";
import { AbstractAppender, LogAppender, LogFormatter, LogEvent } from "@betomorrow/logging-core";

export class RollingFileAppender extends AbstractAppender implements LogAppender {
	private maxFileCount: number;
	private logDir: string;
	private fileAppender: FileAppender;
	private mutex = new Mutex();

	constructor(formatter: LogFormatter, maxFileCount: number, logDir?: string) {
		super(formatter);
		this.maxFileCount = maxFileCount;
		this.logDir = logDir ?? FileAppender.DefaultLogDir;
		this.fileAppender = new FileAppender(this.formatter, this.logDir);
	}

	async init(): Promise<void> {
		await this.fileAppender.init();
		await this.rollFiles();
		await super.init();
	}

	async append(event: LogEvent): Promise<void> {
		if (!this.isInitialized) {
			await this.init();
		}
		await this.fileAppender.append(event);
	}

	private async rollFiles(): Promise<void> {
		await this.mutex.runExclusive(async () => {
			const files = (await RNFS.readDir(this.logDir)).filter((f) => f.isFile);
			if (files.length > this.maxFileCount) {
				const sorted = files.sort((a, b) => a.name.localeCompare(b.name));
				const toBeRemoved = sorted.slice(0, files.length - this.maxFileCount);
				toBeRemoved.forEach(async (f) => {
					console.log("RollingFileAppender", `removing: ${f.name}`);
					await RNFS.unlink(f.path);
				});
			}
		});
	}
}
