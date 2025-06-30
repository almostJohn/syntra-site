import {
	MarkTaskAsIncomplete,
	MarkTaskAsInProgress,
	MarkTaskAsComplete,
} from "./mark-task";
import { DeleteTaskDialog } from "./delete-task-dialog";
import { truncate } from "@/lib/truncate";

type Task = {
	id: string;
	content: string;
	status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE";
};

type TaskCardProps = {
	task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
	return (
		<div className="rounded-sm p-5 border border-neutral-200 dark:border-neutral-700 shadow-sm transition-shadow hover:shadow-md">
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<span className="text-xs">{truncate(task.id, 16)}</span>
					</div>
					<div className="flex items-center justify-end">
						<DeleteTaskDialog taskId={task.id} />
					</div>
				</div>
				<p className="text-sm truncate whitespace-pre-wrap">{task.content}</p>
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start">
						{task.status === "IN_PROGRESS" && (
							<MarkTaskAsIncomplete taskId={task.id} isBackward />
						)}
						{task.status === "COMPLETE" && (
							<MarkTaskAsInProgress taskId={task.id} isBackward />
						)}
					</div>
					<div className="flex items-center justify-end">
						{task.status === "INCOMPLETE" && (
							<MarkTaskAsInProgress taskId={task.id} isForward />
						)}
						{task.status === "IN_PROGRESS" && (
							<MarkTaskAsComplete taskId={task.id} isForward />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
