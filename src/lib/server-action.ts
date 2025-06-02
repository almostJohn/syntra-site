import { log, LogType } from "./log";

export type ActionResponse = {
	successMessage?: string;
	errorMessage?: string;
	errors?: Record<string, string>;
	values?: Record<string, string>;
};

export async function serverActionCallback(
	action: () => Promise<ActionResponse>,
): Promise<ActionResponse> {
	try {
		return await action();
	} catch (error_) {
		const error = error_ as Error;

		log({
			logType: LogType.Error,
			category: "SERVER_ACTION_ERROR",
			details: { message: error.message, error },
		});

		return {
			errorMessage: "Something went wrong. Please try again.",
		};
	}
}
