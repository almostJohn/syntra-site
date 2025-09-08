import { NextLink } from "./ui/next-link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export function MainNav() {
	return (
		<div className="hidden items-center gap-4 md:flex">
			<NextLink
				href="/login"
				className={cn(
					buttonVariants({
						variant: "ghost",
						className: "hover:bg-scheme-primary/30 rounded-lg",
					}),
				)}
			>
				Login
			</NextLink>
			<NextLink
				href="/register"
				className={cn(
					buttonVariants({
						className:
							"bg-scheme-primary hover:bg-scheme-primary/90 hover:shadow-scheme-primary/60 rounded-lg transition-shadow hover:shadow-xl",
					}),
				)}
			>
				Register
			</NextLink>
		</div>
	);
}
