export const MAX_TRUST_ACCOUNT_AGE = 60 * 60 * 24 * 7;
export const PASSWORD_MIN_LENGTH = 8;
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 32;

export const TOTAL_DAYS = 91;
export const WEEKS = 52;
export const WEEK_DAYS = 7;

export const TITLE_MAX_LENGTH = 50;
export const CONTENT_MAX_LENGTH = 300;

export const DISABLED_ROUTES_AFTER_SIGN_OUT = [
	"/dashboard",
	"/dashboard/tasks",
	"/dashboard/notes",
	"/dashboard/profile",
	"/dashboard/settings",
];
export const DISABLED_ROUTES_AFTER_SIGN_IN = ["/login", "/register"];
export const DISABLED_ROUTE_AFTER_VERIFICATION = "/verification/result";

export const HERO_SECTION_TITLE = "Capture Your Ideas Effortlessly" as const;
export const HERO_SECTION_DESCRIPTION =
	"Keep your thoughts organized, accessible, and secure with our intuitive note-taking platform. From quick reminders to detailed research, we've got you covered." as const;
