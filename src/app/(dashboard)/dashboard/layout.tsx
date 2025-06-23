import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getCurrentUser } from "@/lib/auth";
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
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	return (
		<main className="min-h-screen">
			<SidebarWrapper email={currentUser.email} name={currentUser.name}>
				{children}
			</SidebarWrapper>
		</main>
	);
}
