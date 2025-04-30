export const siteConfig = {
	name: "simplynote",
	description:
		"SimplyNote is a minimalist online notepad that lets you write, style, and organize your notes using Markdown. From bold text to checklists and code blocks, it’s perfect for jotting down ideas or creating clean, structured content—quickly and distraction-free.",
	title: {
		default: "simplynote",
		template: "%s | simplynote",
	},
	creator: "@almostJohn",
};

export type SiteConfig = typeof siteConfig;
