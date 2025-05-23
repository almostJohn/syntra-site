import { NextLink } from "@/components/ui/next-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DefaultNav() {
	return (
		<div className="hidden items-center gap-3 md:flex">
			<NextLink
				href="/login"
				className={cn(buttonVariants({ variant: "ghost" }))}
			>
				Login
			</NextLink>
			<NextLink
				href="/register"
				className={cn(buttonVariants({ variant: "primary" }))}
			>
				Register
			</NextLink>
		</div>
	);
}
