import { NextLink } from "./ui/next-link";
import { cn } from "@/lib/utils";

export function MainNav() {
	return (
		<div className="hidden items-center justify-end gap-2 md:flex">
			<NextLink
				href="/login"
				className={cn(
					"inline-flex items-center justify-center rounded bg-transparent px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 hover:bg-blue-600/10 hover:text-blue-600/90",
				)}
			>
				Login
			</NextLink>
			<NextLink
				href="/register"
				className={cn(
					"inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium whitespace-nowrap text-white transition-all duration-300 hover:bg-blue-700",
				)}
			>
				Sign Up
			</NextLink>
		</div>
	);
}
