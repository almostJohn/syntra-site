import { NextRequest } from "next/server";

export function checkAuthForMiddleware(request: NextRequest) {
	const sessionToken = request.cookies.get(
		process.env.NEXT_REQUEST_COOKIES_NAME!,
	)?.value;

	return !!sessionToken;
}
