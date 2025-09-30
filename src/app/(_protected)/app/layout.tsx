import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";
import { auth } from "@/lib/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navbar } from "../_components/navbar.app";
import { Sidenav } from "../_components/sidenav.app";

export const metadata: Metadata = {
	title: {
		default: "app",
		template: "%s — app",
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
	const user = await auth.getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<main className="flex min-h-screen flex-col">
			<Navbar user={user} />
			<div className="flex flex-1 overflow-hidden">
				<Sidenav />
				<ScrollArea className="flex min-h-full flex-1 flex-col">
					<div className="w-full px-4 py-6 sm:px-6 md:px-8">{children}</div>
				</ScrollArea>
			</div>
		</main>
	);
}
