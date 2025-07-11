import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import {
	History,
	FolderPlus,
	FolderMinus,
	Plus,
	Edit,
	Trash2,
	FolderEdit,
} from "lucide-react";

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

type LogsProps = {
	activities: Activity[];
};

function getLogsIcon(type: Activity["type"]) {
	switch (type) {
		case "CREATE_PROJECT":
			return <FolderPlus className="size-4 text-emerald-500" />;
		case "UPDATE_PROJECT":
			return <FolderEdit className="size-4 text-blue-500" />;
		case "DELETE_PROJECT":
			return <FolderMinus className="size-4 text-rose-500" />;
		case "CREATE_TASK":
			return <Plus className="size-4 text-emerald-500" />;
		case "UPDATE_TASK":
			return <Edit className="size-4 text-blue-500" />;
		case "DELETE_TASK":
			return <Trash2 className="size-4 text-rose-500" />;
		default:
			return <History className="size-4" />;
	}
}

function getLogsLabel(type: Activity["type"]) {
	switch (type) {
		case "CREATE_PROJECT":
			return "Project Created";
		case "UPDATE_PROJECT":
			return "Project Updated";
		case "DELETE_PROJECT":
			return "Project Deleted";
		case "CREATE_TASK":
			return "Task Created";
		case "UPDATE_TASK":
			return "Task Updated";
		case "DELETE_TASK":
			return "Task Deleted";
		default:
			return "Logs Updated";
	}
}

function getBadgeColor(type: Activity["type"]) {
	if (type.includes("CREATE")) return "bg-emerald-100 text-emerald-800";
	if (type.includes("UPDATE")) return "bg-blue-100 text-blue-800";
	if (type.includes("DELETE")) return "bg-rose-100 text-rose-800";
	return "bg-neutral-200 dark:bg-neutral-700";
}

export function Logs({ activities }: LogsProps) {
	return (
		<div className="flex flex-col gap-4">
			{activities.map((activity) => (
				<div
					key={activity.id}
					className="flex gap-4 p-4 border border-neutral-200 dark:border-neutral-700 rounded-sm"
				>
					<div className="flex flex-shrink-0 mt-1">
						{getLogsIcon(activity.type)}
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-2">
							<div
								className={cn(
									"inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full",
									getBadgeColor(activity.type),
								)}
							>
								{getLogsLabel(activity.type)}
							</div>
							<div className="text-xs text-neutral-500">
								{formatDistanceToNow(new Date(activity.createdAt), {
									addSuffix: true,
								})}
							</div>
						</div>
						<p className="text-sm">{activity.description}</p>
					</div>
				</div>
			))}
		</div>
	);
}
