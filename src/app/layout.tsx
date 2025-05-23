import "@/styles/globals.css";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Manrope } from "next/font/google";
import { unstable_ViewTransition as ViewTransition } from "react";
import { Toaster } from "sonner";
import { siteConfig } from "@/lib/site";

const manrope = Manrope({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-manrope",
});

export const metadata: Metadata = {
	title: siteConfig.title,
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

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${manrope.className} bg-background text-foreground antialiased selection:bg-blue-100 selection:text-blue-600`}
			>
				<div className="min-h-screen relative">
					<ViewTransition>{children}</ViewTransition>
					<Toaster position="top-center" />
				</div>
			</body>
		</html>
	);
}
