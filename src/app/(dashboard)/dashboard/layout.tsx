import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Navbar } from "../_components/navbar.dashboard";

export const metadata: Metadata = {
	title: "Dashboard",
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

export default function DashboardLayout({ children }: PropsWithChildren) {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
