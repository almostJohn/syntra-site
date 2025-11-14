import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { siteSettings } from "@/lib/site-settings";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navbar } from "@/components/dashboard/navigation/navbar";
import { SideNav } from "@/components/dashboard/navigation/side-nav";

export const metadata: Metadata = {
	title: {
		default: "Dashboard",
		template: "%s | Dashboard",
	},
	description: siteSettings.description,
	appleWebApp: {
		title: siteSettings.name,
	},
	applicationName: siteSettings.name,
	openGraph: {
		siteName: siteSettings.name,
		type: "website",
		title: siteSettings.title,
		description: siteSettings.description,
	},
	twitter: {
		card: "summary_large_image",
		creator: siteSettings.creator,
		title: siteSettings.title,
		description: siteSettings.description,
	},
	creator: siteSettings.creator,
};

export default async function Layout({ children }: PropsWithChildren) {
	const { data: currentUser } = await auth.getCurrentUser();

	if (!currentUser) redirect("/login");

	return (
		<div className="flex h-screen flex-col">
			<Navbar user={currentUser} />
			<div className="flex flex-1 overflow-hidden">
				<SideNav />
				<ScrollArea className="flex flex-1 flex-col">
					<div className="w-full px-4 pt-6 pb-26 sm:px-6 md:px-8 md:pb-6">
						{children}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}
