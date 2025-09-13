export function Footer() {
	return (
		<footer className="border-border bottom-0 w-full border-t">
			<div className="mx-auto flex h-16 max-w-5xl items-center justify-center px-4 text-center xl:px-6">
				<p className="text-muted-foreground text-center text-sm">
					Built by{" "}
					<a
						href="https://github.com/almostJohn"
						rel="noreferrer"
						target="_blank"
						className="font-medium underline underline-offset-4"
					>
						almostJohn
					</a>
					. The source code is available at{" "}
					<a
						href="https://github.com/almostJohn/syntra-site"
						rel="noreferrer"
						target="_blank"
						className="font-medium underline underline-offset-4"
					>
						GitHub
					</a>
					.
				</p>
			</div>
		</footer>
	);
}
