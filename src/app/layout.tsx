import * as React from "react";
import type { Metadata } from "next";
import { inter } from "~/util/fonts";
import "../styles/globals.css";
import { SiteHeader } from "~/components/site-header";
import { SiteFooter } from "~/components/site-footer";

export const metadata: Metadata = {
	title: {
		template: "%s | noted",
		default: "noted - Simple tools for everyday tasks.",
	},
	icons: {
		other: [
			{
				url: "/logo.svg",
				sizes: "16x16",
				type: "image/svg",
			},
		],
	},
	appleWebApp: {
		title: "noted",
	},
	applicationName: "noted",
	openGraph: {
		siteName: "noted",
		type: "website",
		title: "noted",
	},
	twitter: {
		card: "summary_large_image",
		creator: "@almostJohn",
	},
};

export default function RootLayout({
	children,
}: {
	readonly children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.className} bg-neutral-50 text-neutral-950 selection:bg-teal-300 selection:text-neutral-950 antialiased`}
			>
				<main className="min-h-screen">
					<SiteHeader />
					{children}
					<SiteFooter />
				</main>
			</body>
		</html>
	);
}
