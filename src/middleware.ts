import { NextRequest, NextResponse } from "next/server";

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
	const token = request.cookies.get(process.env.APP_COOKIE_NAME!)?.value;
	const isAuthenticated = Boolean(token);

	if (
		!isAuthenticated &&
		DISABLED_ROUTES_AFTER_SIGN_OUT.some((route) => pathname.startsWith(route))
	) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (isAuthenticated && DISABLED_ROUTES_AFTER_SIGN_IN.includes(pathname)) {
		return NextResponse.redirect(new URL("/app", request.url));
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
