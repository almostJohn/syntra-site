export const MAX_TRUST_ACCOUNT_AGE = 60 * 60 * 24 * 7;

export const DISPLAY_NAME_MIN_LENGTH = 3;
export const DISPLAY_NAME_MAX_LENGTH = 32;

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 32;

export const PASSWORD_MIN_LENGTH = 8;

export const TOTAL_DAYS = 91;
export const WEEKS = 52;
export const WEEK_DAYS = 7;

export const NAME_MIN_LENGTH = 3;
export const NAME_MAX_LENGTH = 32;
export const CONTENT_MIN_LENGTH = 3;
export const CONTENT_MAX_LENGTH = 60;

export const DISABLED_ROUTES_AFTER_SIGN_OUT = [
	"/dashboard",
	"/dashboard/projects",
	"/dashboard/activity-logs",
	"/dashboard/profile",
	"/dashboard/settings",
];
export const DISABLED_ROUTES_AFTER_SIGN_IN = ["/login", "/register", "/"];

export const HERO_SECTION_TITLE = "Capture Your Ideas Effortlessly" as const;
export const HERO_SECTION_DESCRIPTION =
	"Keep your thoughts organized, accessible, and secure with our intuitive note-taking platform. From quick reminders to detailed research, we've got you covered." as const;
