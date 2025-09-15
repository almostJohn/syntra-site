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
		console.error(error.message, error);
		return {
			errorMessage: "Internal Server Error",
		};
	}
}
