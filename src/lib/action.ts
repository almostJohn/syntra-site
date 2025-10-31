export type Errors = Record<string, string>;

export type Values = Record<
	string,
	string | number | boolean | File | null | undefined
>;

export type ActionResponse<E = Errors, V = Values> =
	| {
			successMessage?: never;
			errorMessage?: string;
			errors?: E;
			values?: V;
	  }
	| {
			successMessage?: string;
			errorMessage?: never;
			errors?: never;
			values?: never;
	  };

export async function serverActionCallback<E = Errors, V = Values>(
	action: () => Promise<ActionResponse<E, V>>,
): Promise<ActionResponse<E, V>> {
	try {
		const data = await action();
		return data;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return {
			errorMessage: "Server Error. Please try again later.",
		};
	}
}

export function toAction<
	T extends unknown[],
	R extends ActionResponse<Errors, Values>,
>(fn: (...args: T) => Promise<R>) {
	return async (_prevState: R, args: T): Promise<R> => fn(...args);
}
