import * as React from "react";
import type { Metadata } from "next";
import { inter } from "~/util/fonts";
import "../styles/globals.css";

export const metadata: Metadata = {
	title: {
		template: "%s | simplynote",
		default: "simplynote - Simple tool for everyday tasks.",
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
		title: "simplynote",
	},
	applicationName: "simplynote",
	openGraph: {
		siteName: "simplynote",
		type: "website",
		title: "simplynote",
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
				className={`${inter.className} bg-background text-foreground antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
