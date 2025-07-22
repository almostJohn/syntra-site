import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getCurrentUser } from "@/lib/auth";
import { Navbar } from "@/components/private/navbar";
import { BottomNav } from "@/components/private/bottom-nav";
import { SideNav } from "@/components/private/side-nav";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export default async function AppLayout({ children }: PropsWithChildren) {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col max-w-7xl h-screen mx-auto">
			<Navbar user={user} />
			<div className="flex-1 flex overflow-hidden">
				<SideNav />
				<ScrollArea className="flex flex-1 flex-col min-h-full px-3 pb-18">
					<div className="px-3 py-6 md:p-8">{children}</div>
				</ScrollArea>
				<BottomNav />
			</div>
		</div>
	);
}
