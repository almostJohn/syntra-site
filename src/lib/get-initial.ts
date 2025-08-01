export function getInitial(text: string) {
	if (typeof text !== "string") return "?";
	const trimmed = text.trim();
	const firstChar = trimmed.charAt(0).toUpperCase();
	return firstChar.match(/[A-Z]/i) ? firstChar : "?";
}
