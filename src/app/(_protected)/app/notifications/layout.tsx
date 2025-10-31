import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: {
		default: "Notifications (Dashboard)",
		template: "%s — App",
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

export default function NotificationsPageLayout({
	children,
}: PropsWithChildren) {
	return <>{children}</>;
}
