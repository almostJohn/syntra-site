import { format } from "date-fns";

export function formatDate(date: Date) {
	return format(date, "EEEE, MMMM d, yyyy 'at' h:mm a");
}
