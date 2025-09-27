export const siteConfig = {
	name: "syntra",
	title: {
		default: "syntra",
		template: "%s — syntra",
	},
	description:
		"A personal kanban-style task management system built for individual productivity. Simple, focused, and designed exclusively for my own use.",
	creator: "@almostJohn",
} as const;

export type SiteConfig = typeof siteConfig;
