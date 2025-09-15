import { format, formatDistanceToNow } from "date-fns";

type DateFormatStyle = "short" | "long" | "relative";

export function formatDate(
	date: Date | string | number,
	style: DateFormatStyle,
): string {
	const dateString =
		typeof date === "string" || typeof date === "number"
			? new Date(date)
			: date;

	switch (style) {
		case "relative":
			return formatDistanceToNow(dateString, { addSuffix: true });

		case "long":
			return format(dateString, "MMMM d, yyyy h:mm a");

		case "short":
			return format(dateString, "MMM d, yyyy");

		default:
			return format(dateString, "MM/dd/yyyy");
	}
}

export function truncate(text: string, total: number): string {
	if (text.length <= total) {
		return text;
	}

	const keep = total - 3;

	if (keep < 1) {
		return text.slice(0, total);
	}

	return `${text.slice(0, keep)}...`;
}

export function toKebabCase(text: string) {
	return text
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export function formatNameToInitials(text: string): string {
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
