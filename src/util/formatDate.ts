export function formatDate(dateString: string) {
	const regex = /^(\d{4})-(\d{2})-(\d{2})$/;

	const match = dateString.match(regex);

	if (match) {
		const [, year, month, day] = match;

		return `${month}/${day}/${year}`;
	}

	return null;
}
