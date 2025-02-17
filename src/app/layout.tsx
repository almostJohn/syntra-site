import * as React from "react";
import type { Metadata } from "next";
import { inter } from "~/util/fonts";
import "../styles/globals.css";

export const metadata: Metadata = {
	title: {
		template: "%s | SimplyNote",
		default: "SimplyNote - Take notes with ease.",
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
	other: {
		"google-adsense-account": "ca-pub-1884698517257860",
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
				className={`${inter.className} bg-neutral-100 text-neutral-900 antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
