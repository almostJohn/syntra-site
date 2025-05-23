import { cookies } from "next/headers";

export async function getAuthCookie() {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get(process.env.NEXT_REQUEST_COOKIES_NAME!);
	return sessionToken?.value;
}
