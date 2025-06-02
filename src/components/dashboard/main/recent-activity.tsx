import { formatDistanceToNow } from "date-fns";
import { getUserActivities } from "@/data/queries";
import { Scroll, FolderKanban, UserPlus } from "lucide-react";

type RecentActivityProps = {
	userId: string;
};

const iconMap = {
	CREATE_NOTE: <Scroll className="size-4 text-blue-600" />,
	CREATE_BOARD: <FolderKanban className="size-4 text-green-600" />,
	MEMBER_JOINED: <UserPlus className="size-4 text-purple-600" />,
};

const colorMap = {
	CREATE_NOTE: "bg-blue-50 border border-blue-600",
	CREATE_BOARD: "bg-green-50 border border-green-600",
	MEMBER_JOINED: "bg-purple-50 border border-purple-600",
};

const labelMap = {
	CREATE_NOTE: "New note created",
	CREATE_BOARD: "Board updated",
	MEMBER_JOINED: "New member joined",
};

export async function RecentActivity({ userId }: RecentActivityProps) {
	const activities = await getUserActivities(userId, 5);

	return (
		<div className="bg-background p-6 rounded-md border border-border shadow">
			<h3 className="text-lg font-bold mb-4">Recent Activity</h3>
			{activities.length === 0 && (
				<p className="text-muted-foreground text-sm">No recent activity.</p>
			)}
			{activities.map((activity) => (
				<div key={activity.id} className="flex items-center space-x-3">
					<div
						className={`size-8 rounded-full flex items-center justify-center ${colorMap[activity.type as keyof typeof colorMap]}`}
					>
						{iconMap[activity.type as keyof typeof iconMap]}
					</div>
					<div className="flex-1">
						<p className="text-sm font-medium">
							{labelMap[activity.type as keyof typeof labelMap] ??
								"Activity recorded"}
						</p>
						<p className="text-xs text-muted-foreground">
							{formatDistanceToNow(new Date(activity.created_at), {
								addSuffix: true,
							})}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
