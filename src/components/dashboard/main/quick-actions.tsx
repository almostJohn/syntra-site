import { NextLink } from "@/components/ui/next-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FolderKanban, UserPlus, Scroll } from "lucide-react";

const quickLinks = [
	{
		title: "Create Note",
		href: "/dashboard/notes/create",
		icon: Scroll,
		iconColor: "text-blue-600",
	},
	{
		title: "Create Board",
		href: "/dashboard/boards/create",
		icon: FolderKanban,
		iconColor: "text-green-600",
	},
	{
		title: "Invite Member",
		href: "/dashboard/teams/invite",
		icon: UserPlus,
		iconColor: "text-purple-600",
	},
];

export function QuickActions() {
	return (
		<div className="bg-background p-6 rounded-md border border-border shadow">
			<h3 className="text-lg font-bold mb-4">Quick Actions</h3>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{quickLinks.map(({ title, href, icon: Icon, iconColor }) => (
					<NextLink
						key={href}
						href={href}
						className={cn(
							buttonVariants({
								variant: "outline",
								className:
									"h-20 flex flex-col items-center justify-center space-y-2",
							}),
						)}
					>
						<Icon className={`size-6 shrink-0 ${iconColor}`} />
						<span className="font-semibold">{title}</span>
					</NextLink>
				))}
			</div>
		</div>
	);
}
