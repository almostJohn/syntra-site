import { log, LogType, Category } from "./log";

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
			category: Category.ServerActionError,
			details: {
				message: error.message,
				errObj: error,
			},
			additionalData: {
				error,
			},
		});

		return {
			errorMessage: "Internal Server Error.",
		};
	}
}
