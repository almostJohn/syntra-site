export function formatDate(dateString: string, isClient: boolean) {
	if (!isClient) {
		return "";
	}

	const date = new Date(dateString);
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));

	if (days === 0) return "Today";
	if (days === 1) return "Yesterday";
	if (days < 30) return `${days} days ago`;
	return date.toLocaleDateString();
}
