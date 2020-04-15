import { LogFormatter, LogEvent, LogLevel } from "../types";

export class DefaultFormatter implements LogFormatter {
	logToString(event: LogEvent): string {
		return `${event.date.toISOString()} [${LogLevel[event.level]}] ${this.nameOf(event.sender)}: ${this.toMessage(
			event.args
		)}`;
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
