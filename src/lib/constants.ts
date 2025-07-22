export const MAX_TRUST_ACCOUNT_AGE = 60 * 60 * 24 * 7;
export const DISPLAY_NAME_MIN_LENGTH = 2;
export const DISPLAY_NAME_MAX_LENGTH = 46;
export const USERNAME_MIN_LENGTH = 2;
export const USERNAME_MAX_LENGTH = 36;
export const PASSWORD_MIN_LENGTH = 8;

export const NAME_MIN_LENGTH = 3;
export const NAME_MAX_LENGTH = 46;

export const DISABLED_ROUTES_AFTER_SIGN_OUT = [
	"/app",
	"/app/projects",
	"/app/audit-logs",
	"/app/profile",
	"/app/settings",
];
export const DISABLED_ROUTES_AFTER_SIGN_IN = [
	"/",
	"/login",
	"/register",
	"/forgot-password",
];
