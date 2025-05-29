import { NextLink } from "./ui/next-link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { UserMenu } from "./user-menu";

type MainNavProps = {
	email: string;
	displayName: string;
};

export function MainNav({ email, displayName }: MainNavProps) {
	return (
		<div className="hidden items-center justify-end gap-3 md:flex">
			<NextLink
				href="/dashboard"
				className={cn(buttonVariants({ variant: "ghost", className: "group" }))}
			>
				Dashboard
				<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
			</NextLink>
			<UserMenu email={email} displayName={displayName} />
		</div>
	);
}
