import { NextRequest, NextResponse } from "next/server";
import { validateAuthentication } from "./lib/auth/validateAuthentication";
import { getVerifyResultCookie } from "./lib/auth/getVerifyResultCookie";
import {
	DISABLED_ROUTES_AFTER_SIGN_IN,
	DISABLED_ROUTE_AFTER_VERIFICATION,
	DISABLED_ROUTES_AFTER_SIGN_OUT,
} from "./lib/constants";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const isAuthenticated = await validateAuthentication();

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
		const verifyStatus = await getVerifyResultCookie();

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
		"/dashboard/account/:path*",
		"/dashboard/schedule/:path",
		"/dashboard/teams/:path",
		"/dashboard/adherence/:path",
		"/login",
		"/register",
		"/verify-result",
	],
};
