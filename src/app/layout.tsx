import * as React from "react";
import type { Metadata } from "next";
import { geist } from "~/util/fonts";
import "../styles/globals.css";

export const metadata: Metadata = {
	title: {
		template: "%s | SimplyNote",
		default: "SimplyNote - Simple tool for everyday tasks.",
	},
	icons: {
		other: [
			{
				url: "/remasteredLogo.svg",
				sizes: "16x16",
				type: "image/svg",
			},
		],
	},
	appleWebApp: {
		title: "SimplyNote",
	},
	applicationName: "SimplyNote",
	openGraph: {
		siteName: "SimplyNote",
		type: "website",
		title: "SimplyNote",
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
				className={`${geist.className} bg-background text-foreground antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
