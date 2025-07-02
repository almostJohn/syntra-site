import { truncate } from "@/lib/truncate";
import { formatDistanceToNow } from "date-fns";
import { History } from "lucide-react";

type ProjectActivity = {
	id: string;
	type: "CREATE_PROJECT" | "UPDATE_PROJECT" | "DELETE_PROJECT";
	description: string;
	createdAt: Date;
	projectName: string | null;
};

type TaskActivity = {
	id: string;
	type: "CREATE_TASK" | "UPDATE_TASK" | "DELETE_TASK";
	description: string;
	createdAt: Date;
	taskContent: string | null;
};

type Activity = ProjectActivity | TaskActivity;

type ActivityLogsProps = {
	activities: Activity[];
};

export function ActivityLogs({ activities }: ActivityLogsProps) {
	return (
		<div className="flex flex-col gap-4">
			{activities.map((activity) => (
				<div
					key={activity.id}
					className="bg-transparent p-3 border border-neutral-200 dark:border-neutral-700 rounded-sm shadow-sm transition-shadow hover:shadow-md"
				>
					<div className="flex items-center gap-3">
						<div className="bg-neutral-200 dark:bg-neutral-700 hidden items-center justify-center size-11 rounded-sm shrink-0 md:inline-flex">
							<History className="size-5 shrink-0" />
						</div>
						<div className="flex flex-col space-y-1.5">
							{(activity.type === "CREATE_PROJECT" ||
								activity.type === "UPDATE_PROJECT" ||
								activity.type === "DELETE_PROJECT") && (
								<>
									<div className="flex items-center gap-2">
										<div className="flex gap-1 items-center">
											<h1 className="font-medium">
												{activity.type === "CREATE_PROJECT"
													? "Project Created"
													: activity.type === "UPDATE_PROJECT"
													? "Project Updated"
													: activity.type === "DELETE_PROJECT"
													? "Project Deleted"
													: "Unknown Type Event"}
											</h1>
											<span className="text-[#5865f2] underline underline-offset-2">
												({truncate(activity.id, 16)})
											</span>
										</div>
										<span className="text-xs text-neutral-500">
											{formatDistanceToNow(new Date(activity.createdAt), {
												addSuffix: true,
											})}
										</span>
									</div>
									<p className="text-sm text-neutral-500">
										{activity.description}
									</p>
								</>
							)}
							{(activity.type === "CREATE_TASK" ||
								activity.type === "UPDATE_TASK" ||
								activity.type === "DELETE_TASK") && (
								<>
									<div className="flex items-center gap-2">
										<div className="flex items-center gap-1">
											<h1 className="font-medium">
												{activity.type === "CREATE_TASK"
													? "Task Created"
													: activity.type === "UPDATE_TASK"
													? "Task Updated"
													: activity.type === "DELETE_TASK"
													? "Task Deleted"
													: "Unknown Type Event"}
											</h1>
											<span className="text-[#5865f2] underline underline-offset-2">
												({truncate(activity.id, 16)})
											</span>
										</div>
										<span className="text-xs text-neutral-500">
											{formatDistanceToNow(new Date(activity.createdAt), {
												addSuffix: true,
											})}
										</span>
									</div>
									<p className="text-sm text-neutral-500">
										{activity.description}
									</p>
								</>
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
