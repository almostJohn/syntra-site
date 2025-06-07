import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import type { Auth } from "@/lib/auth/types";
import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getSession } from "@/lib/auth/getSession";
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
	const session = await getSession<Auth>();

	if (!session) {
		redirect("/login");
	}

	return (
		<main className="min-h-screen">
			<SidebarWrapper email={session.email} name={session.name}>
				{children}
			</SidebarWrapper>
		</main>
	);
}
