import * as RNFS from "react-native-fs";
import { DEFAULT_LOG_DIR } from "..";

export interface LogFileContent {
	path: string;
	content: string;
}

export class LogFileReader {
	private logDir: string;

	constructor(logDir?: string) {
		this.logDir = logDir ?? DEFAULT_LOG_DIR;
	}

	async getLogFiles(count?: number): Promise<RNFS.ReadDirItem[]> {
		const files = (await RNFS.readDir(this.logDir))
			.filter((f) => f.isFile)
			.sort((a, b) => a.name.localeCompare(b.name))
			.reverse();
		return count ? files.slice(0, count) : files;
	}

	async getLogContents(count?: number): Promise<LogFileContent[]> {
		const files = await this.getLogFiles(count);
		return Promise.all(
			files.map(async (f) => {
				return {
					path: f.path,
					content: await RNFS.readFile(f.path),
				};
			})
		);
	}

	async getLastLogAsString(): Promise<string> {
		const cnt = await this.getLogContents(1);
		return cnt.length === 0 ? "" : cnt[0].content;
	}
}
