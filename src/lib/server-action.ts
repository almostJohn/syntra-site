import { log, LogType, Category } from "./log";

export type ActionResponse = {
	success?: {
		statusCode?: number;
		message?: string;
	};
	error?: {
		statusCode?: number;
		message?: string;
	};
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
			error: {
				statusCode: 500,
				message: "Internal Server Error.",
			},
		};
	}
}
