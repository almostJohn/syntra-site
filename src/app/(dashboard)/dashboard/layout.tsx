import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession, type AuthPayload } from "@/lib/auth";
import { Sidebar } from "../_components/sidebar";

export const metadata: Metadata = {
	title: "Dashboard",
	appleWebApp: {
		title: "Syntra",
	},
	applicationName: "Syntra",
	openGraph: {
		siteName: "Syntra",
		type: "website",
		title: "Syntra",
	},
	twitter: {
		card: "summary_large_image",
		creator: "@almostJohn",
	},
	creator: "@almostJohn",
};

export default async function DashboardLayout({ children }: PropsWithChildren) {
	const session = await getSession<AuthPayload>();

	if (!session) {
		redirect("/login");
	}

	return (
		<main className="flex h-screen">
			{session && (
				<Sidebar email={session.email} displayName={session.displayName}>
					{children}
				</Sidebar>
			)}
		</main>
	);
}
