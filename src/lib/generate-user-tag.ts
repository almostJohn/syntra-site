export function generateUserTag(): string {
	const randomNumber = Math.floor(Math.random() * 10_000);
	return randomNumber.toString().padStart(4, "0");
}
