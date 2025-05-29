import { NextLink } from "@/components/ui/next-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { UserDropdown } from "./user-dropdown";

type MainNavProps = {
	email: string;
	displayName: string;
	isDashboard?: boolean;
};

export function MainNav({ email, displayName, isDashboard }: MainNavProps) {
	return (
		<div className="hidden items-center justify-end gap-3.5 md:flex">
			{!isDashboard && (
				<>
					<NextLink
						href="/dashboard"
						className={cn(
							buttonVariants({ variant: "ghost", className: "group" }),
						)}
					>
						Dashboard{" "}
						<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
					</NextLink>
				</>
			)}
			<UserDropdown email={email} displayName={displayName} />
		</div>
	);
}
