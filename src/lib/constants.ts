export const MAX_TRUST_ACCOUNT_AGE = 60 * 60 * 24 * 7;
export const PASSWORD_MIN_LENGTH = 8;
export const NAME_MIN_LENGTH = 2;

export const TOTAL_DAYS = 91;
export const WEEKS = 52;
export const WEEK_DAYS = 7;

export const TITLE_MAX_LENGTH = 50;
export const SUBTITLE_MAX_LENGTH = 150;
export const CONTENT_MAX_LENGTH = 300;

export const TEAM_NAME_MIN_LENGTH = 3;
export const TEAM_DESCRIPTION_MAX_LENGTH = 100;

export const DISABLED_ROUTES_AFTER_SIGN_OUT = [
	"/dashboard",
	"/dashboard/tasks",
	"/dashboard/profile",
	"/dashboard/settings",
	"/dashboard/teams",
	"/dashboard/teams/schedule-tasks",
	"/dashboard/teams/schedule-tasks/adherence",
	"/dashboard/teams/settings",
];
export const DISABLED_ROUTES_AFTER_SIGN_IN = ["/login", "/register"];
export const DISABLED_ROUTE_AFTER_VERIFICATION = "/verification/result";

export const HERO_SECTION_TITLE = "Workforce Management Made Simple" as const;
export const HERO_SECTION_DESCRIPTION =
	"Syntra delivers powerful workforce management without the complexity. Streamline scheduling, optimize labor costs, and boost productivity with our intuitive, affordable solution." as const;
