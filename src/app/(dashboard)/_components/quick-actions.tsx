import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { icons } from "@/components/icons";

export function QuickActions() {
	return (
		<div className="bg-background p-6 rounded-md shadow border border-border">
			<h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<NextLink
					href="/dashboard/notes/create"
					className={cn(
						buttonVariants({
							variant: "outline",
							className:
								"h-20 flex flex-col items-center justify-center space-y-2",
						}),
					)}
				>
					<icons.Scroll className="size-6 text-blue-600" />
					<span className="text-sm font-semibold">Create Note</span>
				</NextLink>
				<NextLink
					href="/dashboard/board/create"
					className={cn(
						buttonVariants({
							variant: "outline",
							className:
								"h-20 flex flex-col items-center justify-center space-y-2",
						}),
					)}
				>
					<icons.Kanban className="size-6 text-green-600" />
					<span className="text-sm font-semibold">Create Board</span>
				</NextLink>
				<NextLink
					href="/dashboard/teams/invite"
					className={cn(
						buttonVariants({
							variant: "outline",
							className:
								"h-20 flex flex-col items-center justify-center space-y-2",
						}),
					)}
				>
					<icons.UserPlus className="size-6 text-purple-600" />
					<span className="text-sm font-semibold">Invite Member</span>
				</NextLink>
			</div>
		</div>
	);
}
