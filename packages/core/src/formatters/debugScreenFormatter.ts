import moment from "moment";
import { LogEvent, LogFormatter } from "../types";

export class DebugScreenFormatter implements LogFormatter {
	logToString(event: LogEvent): string {
		if (event.args.length > 0) {
			return `[${moment(event.date).format("HH:mm:ss")}] ${event.sender}: ${this.toMessage(event.args)}`;
		} else {
			return `[${moment(event.date).format("HH:mm:ss")}] ${event.sender}`;
		}
	}

	private toMessage(args: any[]): string {
		return args.reduce((prev, v) => {
			if (!v) {
				return prev;
			}
			return prev ? `${prev}, ${v}` : v;
		});
	}
}
