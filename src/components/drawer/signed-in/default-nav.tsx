import { NextLink } from "@/components/ui/next-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserMenu } from "@/components/user-menu";
import { ArrowRight } from "lucide-react";

export function DefaultNav({
	username,
	displayName,
}: {
	username: string;
	displayName: string;
}) {
	return (
		<div className="hidden items-center gap-3 md:flex">
			<NextLink
				href="/dashboard"
				className={cn(buttonVariants({ variant: "ghost", className: "group" }))}
			>
				Dashboard{" "}
				<ArrowRight className="transition-transform group-hover:translate-x-1" />
			</NextLink>
			{username && displayName && (
				<UserMenu username={username} displayName={displayName} />
			)}
		</div>
	);
}
