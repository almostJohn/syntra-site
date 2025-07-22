export function getFormValue<T extends string = string>(
	data: FormData,
	key: string,
): T | null {
	const value = data.get(key);

	return typeof value === "string" ? (value.trim() as T) : null;
}
