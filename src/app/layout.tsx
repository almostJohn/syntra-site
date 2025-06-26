import "@/styles/globals.css";
import type { Metadata } from "next";
import {
	type PropsWithChildren,
	unstable_ViewTransition as ViewTransition,
} from "react";
import { Toaster } from "sonner";
import { siteConfig } from "@/config/site";
import { geist } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
	appleWebApp: {
		title: siteConfig.name,
	},
	applicationName: siteConfig.name,
	openGraph: {
		siteName: siteConfig.name,
		type: "website",
		title: siteConfig.title,
		description: siteConfig.description,
	},
	twitter: {
		card: "summary_large_image",
		creator: siteConfig.creator,
		title: siteConfig.title,
		description: siteConfig.description,
	},
	creator: siteConfig.creator,
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"bg-background text-neutral-900 antialiased selection:bg-[#5865f2]/10 selection:text-[#5865f2]",
					geist.className,
				)}
			>
				<div>
					<ViewTransition>{children}</ViewTransition>
					<Toaster position="top-center" richColors />
				</div>
			</body>
		</html>
	);
}
