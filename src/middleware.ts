import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

const DISABLED_ROUTES_AFTER_LOGGED_IN = ["/", "/login", "/register"];
const DISABLED_ROUTES_AFTER_LOGGED_OUT = [
	"/dashboard",
	"/dashboard/projects",
	"/dashboard/settings",
];

export async function middleware(request: NextRequest) {
	const isAuthorized = await auth.checkForMiddleware(request);

	const { pathname } = request.nextUrl;

	if (
		DISABLED_ROUTES_AFTER_LOGGED_OUT.some((route) => pathname.startsWith(route))
	) {
		if (!isAuthorized) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	if (DISABLED_ROUTES_AFTER_LOGGED_IN.includes(pathname)) {
		if (isAuthorized) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/",
		"/dashboard/:path*",
		"/dashboard/projects/:path*",
		"/dashboard/settings/:path*",
		"/login",
		"/register",
	],
};
