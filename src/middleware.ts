import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "./auth";

const DISABLED_ROUTES_AFTER_SIGN_IN = [
	"/",
	"/login",
	"/register",
	"/forgot-password",
];
const DISABLED_ROUTES_AFTER_SIGN_OUT = [
	"/app",
	"/app/projects",
	"/app/account-settings",
	"/app/notifications",
];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const isAuthenticated = await checkAuth();

	if (
		DISABLED_ROUTES_AFTER_SIGN_OUT.some((route) => pathname.startsWith(route))
	) {
		if (!isAuthenticated) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	if (DISABLED_ROUTES_AFTER_SIGN_IN.includes(pathname)) {
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
		"/app/account-settings/:path*",
		"/app/notifications/:path*",
		"/login",
		"/register",
		"/forgot-password",
	],
};
