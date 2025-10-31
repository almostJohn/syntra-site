import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";
import { auth } from "@/lib/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navbar } from "@/components/custom/navbar";
import { SideNav } from "@/components/custom/side-nav";
import { BottomNav } from "@/components/custom/bottom-nav";

export const metadata: Metadata = {
	title: {
		default: "App (Dashboard)",
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
	const currentUser = await auth.getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	return (
		<main className="flex h-screen flex-col">
			<Navbar user={currentUser} />
			<div className="flex flex-1 overflow-hidden">
				<SideNav />
				<ScrollArea className="flex flex-1 flex-col">
					<div className="w-full px-4 pt-6 pb-26 sm:px-6 md:px-8 md:pb-6">
						{children}
					</div>
				</ScrollArea>
				<BottomNav userId={currentUser.id} />
			</div>
		</main>
	);
}
