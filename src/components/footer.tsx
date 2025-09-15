import { NextLink } from "./ui/next-link";
import { Separator } from "./ui/separator";

export function Footer() {
	return (
		<footer className="border-border bottom-0 w-full border-t">
			<div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 sm:flex-row sm:justify-between sm:px-4">
				<div className="flex flex-col">
					<NextLink
						href="/"
						className="text-xl leading-tight font-bold tracking-tighter"
					>
						Syntra
					</NextLink>
					<p className="text-muted-foreground mt-2 text-sm">
						&copy; {new Date().getFullYear()} Syntra. All Rights Reserved.
					</p>
					<div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
						<NextLink href="#" className="text-blue-600 hover:underline">
							Terms and Conditions
						</NextLink>
						<Separator orientation="vertical" />
						<NextLink href="#" className="text-blue-600 hover:underline">
							Privacy Policy
						</NextLink>
					</div>
				</div>
				<div className="flex flex-col">
					<h3 className="font-bold">Contact</h3>
					<a
						href="mailto:garcia.johngale@gmail.com"
						rel="noreferrer"
						target="_blank"
						className="mt-2 text-sm text-blue-600 hover:underline"
					>
						garcia.johngale@gmail.com
					</a>
					<a
						href="https://almostjohn.vercel.app"
						rel="noreferrer"
						target="_blank"
						className="mt-2 text-sm text-blue-600 hover:underline"
					>
						almostjohn
					</a>
				</div>
			</div>
		</footer>
	);
}
