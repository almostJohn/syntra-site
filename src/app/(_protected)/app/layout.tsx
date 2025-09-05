import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth/get-current-user";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
	title: {
		default: "App",
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

export default async function AppPageLayout({ children }: PropsWithChildren) {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<main className="relative flex min-h-screen flex-col">{children}</main>
	);
}
