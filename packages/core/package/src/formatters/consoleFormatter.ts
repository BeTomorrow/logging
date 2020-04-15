import moment from "moment";
import { LogEvent, LogFormatter, LogLevel } from "../types";

export class ConsoleFormatter implements LogFormatter {
	logToString(event: LogEvent): string {
		return `[${moment(event.date).format("HH:mm:ss")}][${LogLevel[event.level]}] ${this.nameOf(
			event.sender
		)}: ${this.toMessage(event.args)}`;
	}

	private toMessage(args: any[]): string {
		return args.reduce((prev, v) => {
			if (!v) {
				return prev;
			}
			return prev ? `${prev}, ${v}` : v;
		});
	}

	private nameOf(sender: any): string {
		if (typeof sender === "string") {
			return sender;
		}
		if (typeof sender === "object") {
			return sender.constructor.name;
		}
		if (typeof sender === "function") {
			return `fun ${sender.name}()`;
		}
		if (sender.name !== undefined) {
			return sender.name;
		}
		return "(undefined)";
	}
}
