import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "./lib/auth/sessions";
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
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/",
		"/dashboard/:path*",
		"/dashboard/profile/:path*",
		"/dashboard/projects/:path*",
		"/dashboard/activity-log/:path",
		"/dashboard/settings/:path*",
		"/login",
		"/register",
	],
};
