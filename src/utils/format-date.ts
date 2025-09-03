import { format, formatDistanceToNow } from "date-fns";

type DateFormatStyle = "relative" | "long" | "short";

export function formatDate(
	date: Date | string | number,
	style: DateFormatStyle = "short",
) {
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
