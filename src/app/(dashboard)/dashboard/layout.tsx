import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession, type AuthPayload } from "@/lib/auth";
import { Sidebar } from "../_components/sidebar";
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
		creator: "@almostJohn",
		title: siteConfig.title,
		description: siteConfig.description,
	},
	creator: "@almostJohn",
};

export default async function DashboardLayout({ children }: PropsWithChildren) {
	const session = await getSession<AuthPayload>();

	if (!session) {
		redirect("/login");
	}

	return (
		<main className="flex h-screen">
			{session && (
				<Sidebar email={session.email} displayName={session.displayName}>
					{children}
				</Sidebar>
			)}
		</main>
	);
}
