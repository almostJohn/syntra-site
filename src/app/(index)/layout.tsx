import * as React from "react";
import { SiteHeader } from "~/components/site-header";
import { SiteFooter } from "~/components/site-footer";
import { Note } from "~/components/note";

export default function IndexLayout({
	children,
}: {
	readonly children: React.ReactNode;
}) {
	return (
		<>
			<Note />
			<SiteHeader />
			{children}
			<SiteFooter />
		</>
	);
}
