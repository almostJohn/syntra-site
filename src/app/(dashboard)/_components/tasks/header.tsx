import { Plus } from "lucide-react";
import { NextLink } from "@/components/ui/next-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
	return (
		<div className="flex items-center justify-between">
			<h3 className="text-2xl font-bold">My Tasks</h3>
			<div>
				<NextLink
					href="/dashboard/tasks/new"
					className={cn(
						buttonVariants({
							variant: "primary",
							className: "h-10 cursor-pointer",
						}),
					)}
				>
					<Plus className="size-4 shrink-0" /> Create a new task
				</NextLink>
			</div>
		</div>
	);
}
