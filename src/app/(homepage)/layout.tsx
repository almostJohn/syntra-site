import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { siteConfig } from "@/lib/site";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
	title: "Home",
	description: siteConfig.description,
	appleWebApp: {
		title: siteConfig.name,
	},
	applicationName: siteConfig.name,
	openGraph: {
		siteName: siteConfig.name,
		type: "website",
		title: siteConfig.title,
	},
	twitter: {
		card: "summary_large_image",
		creator: siteConfig.creator,
	},
	creator: siteConfig.creator,
};

export default function HomePageLayout({ children }: PropsWithChildren) {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
