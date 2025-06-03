export function getFormValue(data: FormData, key: string): string | null {
	const value = data.get(key);

	return typeof value === "string" ? value.trim() : null;
}
