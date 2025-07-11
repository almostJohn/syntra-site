import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getSession } from "@/lib/auth/sessions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navbar } from "@/app/(dashboard)/_components/navbar";
import { SideNav } from "@/app/(dashboard)/_components/side-nav";
import { BottomNav } from "@/app/(dashboard)/_components/bottom-nav";

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
		<main className="flex flex-col max-w-7xl h-screen mx-auto">
			<Navbar user={session} />
			<div className="flex flex-1 overflow-hidden">
				<SideNav />
				<ScrollArea className="flex-1 flex flex-col min-h-full p-6 pb-24 md:p-8">
					{children}
				</ScrollArea>
				<BottomNav />
			</div>
		</main>
	);
}
