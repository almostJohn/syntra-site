import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getSession } from "@/lib/auth";
import { SidebarWrapper } from "@/components/dashboard/sidebar/sidebar-wrapper";

export const metadata: Metadata = {
	title: {
		default: "Dashboard",
		template: "%s — Dashboard",
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

export default async function DashboardLayout({ children }: PropsWithChildren) {
	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	return (
		<main className="min-h-screen">
			<SidebarWrapper
				username={session.username}
				displayName={session.displayName}
			>
				{children}
			</SidebarWrapper>
		</main>
	);
}
