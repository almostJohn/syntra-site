import "@/styles/globals.css";
import type { Metadata } from "next";
import {
	type PropsWithChildren,
	unstable_ViewTransition as ViewTransition,
} from "react";
import { siteConfig } from "@/config/site";
import { geist } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import { ToastProvider } from "@/components/toast-provider";

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
	appleWebApp: {
		title: siteConfig.name,
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
		<ToastProvider>
			<html lang="en" suppressHydrationWarning>
				<body
					className={cn(
						"bg-neutral-100 text-neutral-800 antialiased dark:bg-neutral-800 dark:text-neutral-100",
						geist.className,
					)}
				>
					<ViewTransition>
						<Providers>{children}</Providers>
					</ViewTransition>
				</body>
			</html>
		</ToastProvider>
	);
}
