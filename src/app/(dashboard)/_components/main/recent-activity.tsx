import { formatDistanceToNow } from "date-fns";
import { History } from "lucide-react";

type TaskActivity = {
	id: string;
	type: "TASK_CREATE" | "TASK_UPDATE";
	title: string | null;
	createdAt: Date;
};

type NoteActivity = {
	id: string;
	type: "NOTE_CREATE" | "NOTE_UPDATE";
	title: string | null;
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
		<div className="p-6 bg-muted/40 border border-border rounded-md shadow-md">
			<div className="flex flex-col space-y-4">
				<h3 className="text-lg font-bold">Recent Activity</h3>
				<div className="flex flex-col">
					{activities.length === 0 && (
						<p className="text-sm text-muted-foreground">
							No recent activity found.
						</p>
					)}
					<div className="divide-y">
						{activities.map((activity) => (
							<div key={activity.id} className="flex flex-col pt-1 pb-3">
								<div className="flex items-center space-x-3 pt-2">
									<div className="inline-flex items-center justify-center rounded-sm bg-[#5865f2]/10 border border-[#5865f2] text-[#5865f2] size-10">
										<History className="size-5 shrink-0" />
									</div>
									<div className="flex flex-col space-y-0.5">
										{(activity.type === "TASK_CREATE" ||
											activity.type === "TASK_UPDATE") && (
											<>
												<div className="flex items-center gap-2">
													<h2 className="font-medium">
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
													{activity.title || "Untitled"}
												</p>
											</>
										)}
										{(activity.type === "NOTE_CREATE" ||
											activity.type === "NOTE_UPDATE") && (
											<>
												<div className="flex items-center gap-2">
													<h2 className="font-medium">
														{activity.type === "NOTE_CREATE"
															? "Note Created"
															: activity.type === "NOTE_UPDATE"
															? "Node Updated"
															: ""}
													</h2>
													<span className="text-xs text-muted-foreground">
														{formatDistanceToNow(new Date(activity.createdAt), {
															addSuffix: true,
														})}
													</span>
												</div>
												<p className="text-sm text-muted-foreground">
													{activity.title || "Untitled"}
												</p>
											</>
										)}
										{(activity.type === "USER_CREATE" ||
											activity.type === "USER_UPDATE") && (
											<>
												<h2 className="font-medium">
													{activity.type === "USER_CREATE"
														? "User Created"
														: activity.type === "USER_UPDATE"
														? "User Updated"
														: ""}
												</h2>
												<p className="text-sm text-muted-foreground">
													{formatDistanceToNow(new Date(activity.createdAt), {
														addSuffix: true,
													})}
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
