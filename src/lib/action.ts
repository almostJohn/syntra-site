import { tryCatch } from "./try-catch";

export type Errors = Record<string, string>;
export type Values = Record<
	string,
	string | number | boolean | File | null | undefined
>;

export type ActionResponse<E = Errors, V = Values> = {
	successMessage?: string;
	errorMessage?: string;
	errors?: E;
	values?: V;
};

export async function serverActionCallback<E = Errors, V = Values>(
	action: () => Promise<ActionResponse<E, V>>,
): Promise<ActionResponse<E, V>> {
	const { data, error } = await tryCatch(action());

	if (error) {
		return {
			errorMessage: "Server error. Please try again later.",
		};
	}

	return data;
}
