import { NextRequest, NextResponse } from "next/server";
import { checkAuthForMiddleware } from "./lib/check-auth-for-middleware";

const PROTECTED_ROUTES = [
	"/dashboard",
	"/dashboard/profile",
	"/dashboard/settings",
];
const AUTH_ROUTES = ["/login", "/register"];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const isAuthenticated = checkAuthForMiddleware(request);

	if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
		if (!isAuthenticated) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	if (AUTH_ROUTES.includes(pathname)) {
		if (isAuthenticated) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/dashboard/profile/:path*",
		"/dashboard/settings/:path*",
		"/login",
		"/register",
	],
};
