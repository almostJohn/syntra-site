export const siteConfig = {
	name: "Syntra",
	title: {
		default: "Syntra",
		template: "%s | Syntra",
	},
	description:
		"Visualize, manage, and prioritize tasks effortlessly with our intuitive kanban-style workflow system. Stay organized and boost productivity like never before.",
	creator: "@almostJohn",
} as const;

export type SiteConfig = typeof siteConfig;
