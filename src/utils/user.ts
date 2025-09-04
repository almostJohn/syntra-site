export function generateUserTag(): string {
	const randomNumber = Math.floor(Math.random() * 10_000);
	return randomNumber.toString().padStart(4, "0");
}

export function getInitial(text: string): string {
	if (typeof text !== "string") {
		return "?";
	}

	const trimmed = text.trim();
	if (!trimmed) {
		return "?";
	}

	const parts = trimmed.split(/\s+/);

	if (parts.length >= 2) {
		const firstChar = parts[0].charAt(0).toUpperCase();
		const secondChar = parts[1].charAt(0).toUpperCase();
		return (firstChar + secondChar).replace(/[^A-Z]/gi, "?");
	} else {
		const firstTwoChar = trimmed.slice(0, 2).toUpperCase();
		return firstTwoChar.replace(/[^A-Z]/gi, "?");
	}
}
