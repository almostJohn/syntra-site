import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
	title: {
		default: "Activity Logs",
		template: "%s — Activity Logs",
	},
	description: siteConfig.description,
	appleWebApp: {
		title: siteConfig.name,
	},
	applicationName: siteConfig.name,
	openGraph: {
		siteName: siteConfig.name,
		type: "website",
		title: siteConfig.title,
		description: siteConfig.description,
	},
	twitter: {
		card: "summary_large_image",
		creator: siteConfig.creator,
		title: siteConfig.title,
		description: siteConfig.description,
	},
	creator: siteConfig.creator,
};

export default function DashboardActivityLogsLayout({
	children,
}: PropsWithChildren) {
	return <>{children}</>;
}
