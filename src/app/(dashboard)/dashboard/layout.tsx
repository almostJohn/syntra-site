import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession, type AuthPayload } from "@/lib/auth";
import { Sidebar as SidebarWrapper } from "@/components/dashboard/sidebar/sidebar";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
	title: "Dashboard",
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
	const session = await getSession<AuthPayload>();

	if (!session) {
		redirect("/login");
	}

	return (
		<main className="flex min-h-screen">
			<SidebarWrapper email={session.email} displayName={session.displayName}>
				{children}
			</SidebarWrapper>
		</main>
	);
}
