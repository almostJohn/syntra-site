export const MAX_TRUST_ACCOUNT_AGE = 60 * 60 * 24 * 7;
export const PASSWORD_MIN_LENGTH = 8;
export const NAME_MIN_LENGTH = 2;

export const DISABLED_ROUTES_AFTER_SIGN_OUT = [
	"/dashboard",
	"/dashboard/profile",
	"/dashboard/account",
	"/dashboard/schedule",
	"/dashboard/teams",
	"/dashboard/adherence",
];
export const DISABLED_ROUTES_AFTER_SIGN_IN = ["/login", "/register"];
export const DISABLED_ROUTE_AFTER_VERIFICATION = "/verify-result";

export const HERO_SECTION_TITLE = "Workforce Management Made Simple" as const;
export const HERO_SECTION_DESCRIPTION =
	"Syntra delivers powerful workforce management without the complexity. Streamline scheduling, optimize labor costs, and boost productivity with our intuitive, affordable solution." as const;
