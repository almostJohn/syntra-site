export const MAX_TRUST_ACCOUNT_AGE = 60 * 60 * 24 * 7;
export const PASSWORD_MIN_LENGTH = 8;
export const DISPLAY_NAME_MIN_LENGTH = 2;

export const SIGNED_OUT_DISABLED_ROUTES = [
	"/dashboard",
	"/dashboard/profile",
	"/dashboard/settings",
	"/dashboard/boards",
	"/dashboard/notes",
];
export const DISABLED_ROUTES_AFTER_SIGN_IN = ["/login", "/register"];

export const DISABLED_ROUTE_AFTER_VERIFICATION = "/verify-result";
