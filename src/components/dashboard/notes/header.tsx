import { Plus } from "lucide-react";
import { NextLink } from "@/components/ui/next-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
	return (
		<div className="flex justify-between">
			<h3 className="text-3xl font-bold">My Notes</h3>
			<div>
				<NextLink
					href="/dashboard/notes/new"
					className={cn(buttonVariants({ variant: "primary" }))}
				>
					<Plus className="size-4 shrink-0" /> Create a new note
				</NextLink>
			</div>
		</div>
	);
}
