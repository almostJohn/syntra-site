import "@/styles/globals.css";
import type { Metadata } from "next";
import {
	type PropsWithChildren,
	unstable_ViewTransition as ViewTransition,
} from "react";
import { siteSettings } from "@/lib/site-settings";
import { cn } from "@/lib/utils";
import { geist } from "@/lib/fonts";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	title: siteSettings.title,
	description: siteSettings.description,
	appleWebApp: {
		title: siteSettings.name,
	},
	icons: {
		other: [
			{
				url: "/syntra.svg",
				sizes: "32x32",
				type: "image/svg",
			},
		],
	},
	applicationName: siteSettings.name,
	openGraph: {
		siteName: siteSettings.name,
		type: "website",
		title: siteSettings.title,
		description: siteSettings.description,
	},
	twitter: {
		card: "summary_large_image",
		creator: siteSettings.creator,
		title: siteSettings.title,
		description: siteSettings.description,
	},
	creator: siteSettings.creator,
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					`min-h-svh bg-neutral-100 text-neutral-950 antialiased`,
					geist.className,
				)}
			>
				<ViewTransition>
					{children}
					<Toaster position="top-center" />
				</ViewTransition>
			</body>
		</html>
	);
}
