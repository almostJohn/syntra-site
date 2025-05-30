import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
	title: "Home",
	appleWebApp: {
		title: "Syntra",
	},
	applicationName: "Syntra",
	openGraph: {
		siteName: "Syntra",
		type: "website",
		title: "Syntra",
	},
	twitter: {
		card: "summary_large_image",
		creator: "@almostJohn",
	},
	creator: "@almostJohn",
};

export default function HomePageLayout({ children }: PropsWithChildren) {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
