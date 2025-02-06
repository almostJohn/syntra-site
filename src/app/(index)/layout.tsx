import * as React from "react";
import { SiteHeader } from "~/components/site-header";
import { SiteFooter } from "~/components/site-footer";

export default function IndexLayout({
	children,
}: {
	readonly children: React.ReactNode;
}) {
	return (
		<>
			<SiteHeader />
			{children}
			<SiteFooter />
		</>
	);
}
