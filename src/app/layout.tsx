import "../styles/globals.css";
import type { Metadata } from "next";
import { jetBrainsMono } from "~/lib/fonts";
import { siteConfig } from "~/lib/config";

export const metadata: Metadata = {
	title: siteConfig.title,
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
};

export default function RootLayout({
	children,
}: {
	readonly children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${jetBrainsMono.className} bg-white text-black antialiased selection:bg-blue-500/30 selection:text-blue-600`}
			>
				<main className="min-h-screen">
					<div className="p-4 md:p-0">{children}</div>
				</main>
			</body>
		</html>
	);
}
