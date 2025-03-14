import * as React from "react";
import type { Metadata } from "next";
import { inter } from "~/util/fonts";
import { Providers } from "./providers";
import { Toaster } from "~/components/ui/toaster";
import "../styles/globals.css";

export const metadata: Metadata = {
	title: {
		template: "%s | SimplyNote",
		default: "SimplyNote - Take notes with ease.",
	},
	icons: {
		other: [
			{
				url: "/favicon.svg",
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
				className={`${inter.className} bg-background text-foreground antialiased selection:bg-teal-500/30 selection:text-teal-500`}
			>
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
