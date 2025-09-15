import { NextRequest, NextResponse } from "next/server";
import {
	DISABLED_ROUTES_AFTER_SIGNED_IN,
	DISABLED_ROUTES_AFTER_SIGNED_OUT,
} from "./lib/constants";
import { auth } from "./lib/auth";

export async function middleware(request: NextRequest) {
	const isAuthenticated = await auth.check(request);

	const { pathname } = request.nextUrl;

	if (
		DISABLED_ROUTES_AFTER_SIGNED_OUT.some((route) => pathname.startsWith(route))
	) {
		if (!isAuthenticated) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	if (DISABLED_ROUTES_AFTER_SIGNED_IN.includes(pathname)) {
		if (isAuthenticated) {
			return NextResponse.redirect(new URL("/app", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/",
		"/app/:path*",
		"/app/projects/:path*",
		"/app/teams/:path*",
		"/app/account-settings/:path*",
		"/app/notifications/:path*",
		"/login",
		"/register",
		"/forgot-password",
	],
};
