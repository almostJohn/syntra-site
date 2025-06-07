import { formatDistanceToNow } from "date-fns";
import { History } from "lucide-react";

type TaskActivity = {
	id: string;
	type: "TASK";
	title: string;
	createdAt: Date;
};

type ScheduleTaskActivity = {
	id: string;
	type: "SCHEDULE_TASK";
	name: string;
	createdAt: Date;
	assignedTo: string;
};

type Activity = TaskActivity | ScheduleTaskActivity;

type RecentActivityProps = {
	activities: Activity[];
};

export function RecentActivity({ activities }: RecentActivityProps) {
	return (
		<div className="block p-6 rounded-md bg-background border border-border shadow">
			<div className="flex flex-col space-y-4">
				<h3 className="text-lg font-bold">Recent Activity</h3>
				<div className="flex flex-col gap-2">
					{activities.length === 0 && (
						<p className="text-sm text-muted-foreground">
							No recent activity found.
						</p>
					)}
					{activities.map((activity) => (
						<div key={activity.id} className="flex items-center space-x-2">
							<div className="inline-flex items-center justify-center rounded-sm bg-blue-50 border border-blue-600 text-blue-600 size-8">
								<History className="size-4 shrink-0" />
							</div>
							{activity.type === "TASK" ? (
								<div className="flex flex-col space-y-1">
									<span className="font-semibold">
										{activity.title ?? "(Untitled)"}
									</span>
									<span className="text-sm text-muted-foreground">
										{formatDistanceToNow(new Date(activity.createdAt), {
											addSuffix: true,
										})}
									</span>
								</div>
							) : (
								<div className="flex flex-col space-y-1">
									<span className="font-semibold">{activity.name}</span>
									<span className="text-sm">
										Assigned to: {activity.assignedTo}
									</span>
									<span className="text-sm text-muted-foreground">
										{formatDistanceToNow(new Date(activity.createdAt), {
											addSuffix: true,
										})}
									</span>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
