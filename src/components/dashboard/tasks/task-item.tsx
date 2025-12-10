import { formatDate } from "@/lib/formatting";
import type { Task } from "@/types";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { TaskDropdown } from "./task-dropdown";

type TaskItemProps = {
	projectId: string;
	task: Task;
};

export function TaskItem({ projectId, task }: TaskItemProps) {
	return (
		<div
			className={cn(
				"rounded-md border bg-white p-4 shadow",
				task.status === "todo" && "rounded-l-sm border-l-4 border-blue-500",
				task.status === "in_progress" &&
					"rounded-l-sm border-l-4 border-orange-500",
				task.status === "done" && "rounded-l-sm border-l-4 border-green-500",
			)}
		>
			<div className="flex flex-col gap-3">
				<div className="flex items-center justify-between">
					<h2 className="font-semibold tracking-tight">{task.name}</h2>
					<div className="flex items-center">
						<TaskDropdown
							oldStatus={task.status}
							taskId={task.id}
							projectId={projectId}
						/>
					</div>
				</div>
				<p className="text-sm whitespace-pre-wrap text-neutral-500">
					{task.description}
				</p>
				<div className="max-w-sm">
					<div className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-neutral-300 bg-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-500">
						<Clock className="size-4 shrink-0" />
						created {formatDate(new Date(task.createdAt), "relative")}
					</div>
				</div>
			</div>
		</div>
	);
}
