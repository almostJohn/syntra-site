import { NextRequest, NextResponse } from "next/server";
import { checkAuthForMiddleware } from "./lib/check-auth";
import {
	DISABLED_ROUTES_AFTER_SIGN_IN,
	DISABLED_ROUTE_AFTER_VERIFICATION,
	DISABLED_ROUTES_AFTER_SIGN_OUT,
} from "./lib/constants";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const isAuthenticated = await checkAuthForMiddleware(request);

	if (
		DISABLED_ROUTES_AFTER_SIGN_OUT.some((route) => pathname.startsWith(route))
	) {
		if (!isAuthenticated) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	if (DISABLED_ROUTES_AFTER_SIGN_IN.includes(pathname)) {
		if (isAuthenticated) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
	}

	if (pathname.startsWith(DISABLED_ROUTE_AFTER_VERIFICATION)) {
		const verifyStatus = request.cookies.get("verify-status")?.value;

		if (!verifyStatus) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/dashboard/profile/:path*",
		"/dashboard/settings/:path*",
		"/dashboard/boards/:path*",
		"/dashboard/notes/:path*",
		"/dashboard/teams/:path",
		"/login",
		"/register",
		"/verify-result",
	],
};
