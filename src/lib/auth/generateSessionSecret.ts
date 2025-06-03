export function generateSessionSecret() {
	return new TextEncoder().encode(process.env.NEXT_SECRET_KEY);
}
