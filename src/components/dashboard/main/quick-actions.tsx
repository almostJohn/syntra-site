// import { NextLink } from "@/components/ui/next-link";
// import { buttonVariants } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { NotebookPen, Settings, UserPlus, Users } from "lucide-react";
import { CreateTaskDialog } from "../dialog/create-task-dialog";

// const quickLinks = [
// 	{
// 		title: "Create Task",
// 		href: "/dashboard/tasks/create",
// 		icon: NotebookPen,
// 		iconColor: "text-blue-600",
// 	},
// 	{
// 		title: "Create Team",
// 		href: "/dashboard/teams/create",
// 		icon: Users,
// 		iconColor: "text-purple-600",
// 	},
// 	{
// 		title: "Invite Member",
// 		href: "/dashboard/teams/invite",
// 		icon: UserPlus,
// 		iconColor: "text-green-600",
// 	},
// 	{
// 		title: "Account Settings",
// 		href: "/dashboard/account",
// 		icon: Settings,
// 		iconColor: "text-orange-600",
// 	},
// ];

export function QuickActions() {
	return (
		<div className="block p-6 bg-background border border-border shadow rounded-md">
			<div className="flex flex-col space-y-4">
				<h3 className="text-lg font-bold">Quick Actions</h3>
				<div className="grid grid-cols-2 gap-6 w-full">
					<CreateTaskDialog />
					{/* {quickLinks.map(({ title, href, icon: Icon, iconColor }) => (
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
							<span className="font-medium">{title}</span>
						</NextLink>
					))} */}
				</div>
			</div>
		</div>
	);
}
