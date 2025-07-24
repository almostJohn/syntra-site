import { formatDistanceToNow } from "date-fns";
import { TaskDropdown } from "./task-dropdown";

type Task = {
	id: string;
	name: string;
	status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE";
	createdAt: Date;
};

type TaskCardProps = {
	task: Task;
	projectId: string;
};

export function TaskCard({ task, projectId }: TaskCardProps) {
	return (
		<div className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-md">
			<div className="flex items-center justify-between px-3 py-1 w-full">
				<div className="text-sm whitespace-pre-wrap max-w-sm">{task.name}</div>
				<TaskDropdown projectId={projectId} task={task} />
			</div>
			<div className="text-xs text-neutral-500 mt-auto px-3 py-2">
				Created{" "}
				{formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
			</div>
		</div>
	);
}
