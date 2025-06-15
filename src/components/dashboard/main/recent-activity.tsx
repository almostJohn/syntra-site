import { formatDistanceToNow } from "date-fns";
import { History } from "lucide-react";

type TaskActivity = {
	id: string;
	type: "TASK_UPDATE";
	title: string;
	createdAt: Date;
};

type ScheduleTaskActivity = {
	id: string;
	type: "SCHEDULE_TASK_UPDATE";
	name: string;
	createdAt: Date;
	assignedTo: string;
};

type TeamActivity = {
	id: string;
	type: "TEAM_UPDATE";
	name: string;
	createdAt: Date;
};

type UserActivity = {
	id: string;
	type: "PROFILE_UPDATE";
	createdAt: Date;
};

type Activity =
	| TaskActivity
	| ScheduleTaskActivity
	| TeamActivity
	| UserActivity;

type RecentActivityProps = {
	activities: Activity[];
};

export function RecentActivity({ activities }: RecentActivityProps) {
	return (
		<div className="block p-6 rounded-xl bg-background border border-border shadow">
			<div className="flex flex-col gap-y-2">
				<h3 className="text-lg font-bold">Recent Activity</h3>
				<div className="flex flex-col">
					{activities.length === 0 && (
						<p className="text-muted-foreground text-sm mt-2">
							No recent activity found.
						</p>
					)}
					<div className="divide-y pt-0">
						{activities.map((activity, index) => (
							<div key={activity.id + index + 1} className="flex flex-col">
								<div className="flex items-center space-x-3.5 py-3.5">
									<div className="inline-flex items-center justify-center rounded-sm bg-blue-50 border border-blue-600 text-blue-600 size-11">
										<History className="size-6 shrink-0" />
									</div>
									<div className="flex flex-col space-y-0.5">
										{activity.type === "TASK_UPDATE" && (
											<>
												<div className="flex items-center space-x-2">
													<h2 className="font-bold">Tasks Update</h2>
													<span className="text-xs text-muted-foreground">
														{formatDistanceToNow(new Date(activity.createdAt), {
															addSuffix: true,
														})}
													</span>
												</div>
												<p className="text-sm font-medium">
													Title: {activity.title || "Untitled"}
												</p>
											</>
										)}
										{activity.type === "SCHEDULE_TASK_UPDATE" && (
											<>
												<div className="flex items-center space-x-2">
													<h2 className="font-bold">Schedule Tasks Update</h2>
													<span className="text-xs text-muted-foreground">
														{formatDistanceToNow(new Date(activity.createdAt), {
															addSuffix: true,
														})}
													</span>
												</div>
												<p className="text-sm text-muted-foreground">
													Name: {activity.name}
												</p>
											</>
										)}
										{activity.type === "TEAM_UPDATE" && (
											<>
												<div className="flex items-center space-x-2">
													<h2 className="font-bold">Teams Update</h2>
													<span className="text-xs text-muted-foreground">
														{formatDistanceToNow(new Date(activity.createdAt), {
															addSuffix: true,
														})}
													</span>
												</div>
												<p className="text-sm text-muted-foreground">
													Team: {activity.name}
												</p>
											</>
										)}
										{activity.type === "PROFILE_UPDATE" && (
											<>
												<div className="flex items-center space-x-2">
													<h2 className="font-bold">Profile Update</h2>
													<span className="text-xs text-muted-foreground">
														{formatDistanceToNow(new Date(activity.createdAt), {
															addSuffix: true,
														})}
													</span>
												</div>
												<p className="text-sm text-muted-foreground">
													User ID: {activity.id}
												</p>
											</>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
