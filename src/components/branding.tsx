import { NextLink } from "./ui/next-link";

export function Branding({ href }: { href: string }) {
	return (
		<NextLink
			href={href}
			className="text-xl font-bold leading-none tracking-tighter md:text-2xl"
		>
			Syntra
		</NextLink>
	);
}
