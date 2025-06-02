export const MAX_TRUST_ACCOUNT_AGE = 60 * 60 * 24 * 7;
export const PASSWORD_MIN_LENGTH = 8;
export const DISPLAY_NAME_MIN_LENGTH = 2;
export const WEEK_DAYS = 7;
export const WEEKS = 52;

export const NOTE_CONTENT_MAX_LENGTH = 5000;
export const TITLE_MAX_LENGTH = 100;
export const SUBTITLE_MAX_LENGTH = 200;

export const DISABLED_ROUTES_AFTER_SIGN_OUT = [
	"/dashboard",
	"/dashboard/profile",
	"/dashboard/settings",
	"/dashboard/boards",
	"/dashboard/notes",
	"/dashboard/teams",
];
export const DISABLED_ROUTES_AFTER_SIGN_IN = ["/login", "/register"];

export const DISABLED_ROUTE_AFTER_VERIFICATION = "/verify-result";

export const HERO_SECTION_TITLE = "Capture Your Ideas Effortlessly" as const;
export const HERO_SECTION_DESCRIPTION =
	"Syntra is a fast, minimalist note-taking app designed for clarity and productivity. Capture thoughts, organize ideas, and stay focused with a sleek, user-friendly interface — all in one place." as const;

export const FEATURE_SECTION_TITLE =
	"Everything You Need for Better Notes" as const;
export const FEATURE_SECTION_DESCRIPTION =
	"Our platform combines powerful features with intuitive design to make note-taking a breeze." as const;
