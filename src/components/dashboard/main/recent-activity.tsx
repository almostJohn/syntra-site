import { formatDistanceToNow } from "date-fns";
import { History } from "lucide-react";

type TaskActivity = {
	id: string;
	type: "TASK_CREATE" | "TASK_UPDATE";
	title: string;
	createdAt: Date;
};

type NoteActivity = {
	id: string;
	type: "NOTE_CREATE" | "NOTE_UPDATE";
	title: string;
	createdAt: Date;
};

type UserActivity = {
	id: string;
	type: "USER_CREATE" | "USER_UPDATE";
	createdAt: Date;
};

type Activity = TaskActivity | NoteActivity | UserActivity;

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
					<div className="divide-y">
						{activities.map((activity, index) => (
							<div
								key={activity.id + index + 1}
								className="flex flex-col pt-1 pb-3"
							>
								<div className="flex items-center space-x-3 pt-2">
									<div className="inline-flex items-center justify-center rounded-sm bg-blue-50 border border-blue-600 text-blue-600 size-10">
										<History className="size-5 shrink-0" />
									</div>
									<div className="flex flex-col space-y-0.5">
										{(activity.type === "TASK_CREATE" ||
											activity.type === "TASK_UPDATE") && (
											<>
												<div className="flex items-center space-x-2">
													<h2 className="font-bold">
														{activity.type === "TASK_CREATE"
															? "Task Created"
															: activity.type === "TASK_UPDATE"
																? "Task Updated"
																: ""}
													</h2>
													<span className="text-xs text-muted-foreground">
														{formatDistanceToNow(new Date(activity.createdAt), {
															addSuffix: true,
														})}
													</span>
												</div>
												<p className="text-sm text-muted-foreground">
													Title: {activity.title || "Untitled"}
												</p>
											</>
										)}
										{(activity.type === "NOTE_CREATE" ||
											activity.type === "NOTE_UPDATE") && (
											<>
												<div className="flex items-center space-x-2">
													<h2 className="font-bold">
														{activity.type === "NOTE_CREATE"
															? "Note Created"
															: activity.type === "NOTE_UPDATE"
																? "Note Updated"
																: ""}
													</h2>
													<span className="text-xs text-muted-foreground">
														{formatDistanceToNow(new Date(activity.createdAt), {
															addSuffix: true,
														})}
													</span>
												</div>
												<p className="text-sm text-muted-foreground">
													Title: {activity.title || "Untitled"}
												</p>
											</>
										)}
										{(activity.type === "USER_CREATE" ||
											activity.type === "USER_UPDATE") && (
											<>
												<div className="flex items-center space-x-2">
													<h2 className="font-bold">
														{activity.type === "USER_CREATE"
															? "User Created"
															: activity.type === "USER_UPDATE"
																? "User Updated"
																: ""}
													</h2>
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
