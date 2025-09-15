export const MAX_TRUST_ACCOUNT_AGE = 60 * 60 * 24 * 7;

export const USERNAME_MAX_LENGTH = 32;
export const USERNAME_MIN_LENGTH = 2;

export const DISPLAY_NAME_MAX_LENGTH = 42;
export const DISPLAY_NAME_MIN_LENGTH = 2;

export const PASSWORD_MAX_LENGTH = 16;
export const PASSWORD_MIN_LENGTH = 8;

export const NAME_MAX_LENGTH = 50;
export const NAME_MIN_LENGTH = 2;

export const DESCRIPTION_MAX_LENGTH = 300;
export const DESCRIPTION_MIN_LENGTH = 2;

export const TITLE_MAX_LENGTH = 150;
export const TITLE_MIN_LENGTH = 2;

export const DISABLED_ROUTES_AFTER_SIGNED_IN = [
	"/",
	"/login",
	"/register",
	"/forgot-password",
];

export const DISABLED_ROUTES_AFTER_SIGNED_OUT = [
	"/app",
	"/app/projects",
	"/app/teams",
	"/app/account-settings",
	"/app/notifications",
];
