import { tryCatch } from "./try-catch";

export enum ErrorStatus {
	GenericError = "generic_error",
	ValidationError = "validation_error",
	NotFound = "not_found",
	ServerError = "server_error",
	Unauthorized = "unauthorized",
	Forbidden = "forbidden",
}

export function transformErrorStatus(status: ErrorStatus) {
	switch (status) {
		case ErrorStatus.GenericError:
			return "Something went wrong. Please try again.";
		case ErrorStatus.ValidationError:
			return "Invalid input provided. Please check your entries and try again.";
		case ErrorStatus.NotFound:
			return "Resource not found. Please check the URL.";
		case ErrorStatus.ServerError:
			return "Server error. Please try again later.";
		case ErrorStatus.Unauthorized:
			return "Authentication required. Please sign in to continue.";
		case ErrorStatus.Forbidden:
			return "Access denied. Check your permissions.";
		default:
			return "Unknown error. Please refresh and try again.";
	}
}

export type ActionResponse = {
	successMessage?: string;
	errorMessage?: string;
	errors?: Record<string, string>;
	values?: Record<string, string>;
};

export function createErrorResponse(status: ErrorStatus): ActionResponse {
	return {
		errorMessage: transformErrorStatus(status),
	};
}

export async function serverActionCallback(
	action: () => Promise<ActionResponse>,
): Promise<ActionResponse> {
	const { data, error } = await tryCatch(action());

	if (error) {
		return createErrorResponse(ErrorStatus.ServerError);
	}

	return data;
}
