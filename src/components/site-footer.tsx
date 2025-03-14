import * as React from "react";
import Link from "next/link";

export function SiteFooter() {
	return (
		<footer className="border-t border-border/40 py-6 md:py-0">
			<div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
				<p className="text-center text-sm text-muted-foreground leading-loose md:text-left">
					Made with 💖 by{" "}
					<a
						href="https://github.com/almostJohn"
						className="font-semibold underline-offset-4 hover:underline"
					>
						@almostJohn
					</a>
				</p>
				<div className="flex items-center gap-4">
					<Link
						href="/terms"
						className="text-sm text-muted-foreground underline-offset-4 hover:underline"
					>
						Terms
					</Link>
					<Link
						href="/privacy"
						className="text-sm text-muted-foreground underline-offset-4 hover:underline"
					>
						Privacy
					</Link>
					<a
						href="mailto:garcia.johngale@gmail.com"
						rel="noreferrer"
						target="_blank"
						className="text-sm text-muted-foreground underline-offset-4 hover:underline"
					>
						Contact
					</a>
				</div>
			</div>
		</footer>
	);
}
