import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "./lib/auth";
import {
	DISABLED_ROUTES_AFTER_SIGN_IN,
	DISABLED_ROUTES_AFTER_SIGN_OUT,
} from "./lib/constants";

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
		"/app/audit-logs/:path*",
		"/app/profile/:path*",
		"/app/settings/:path*",
		"/login",
		"/register",
		"/forgot-password",
	],
};
