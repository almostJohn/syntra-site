import { MarkTaskAsIncomplete } from "./mark-task-as-incomplete";
import { MarkTaskAsInProgress } from "./mark-task-as-inprogress";
import { MarkTaskAsComplete } from "./mark-task-as-complete";
import { DeleteTaskDialog } from "./delete-task-dialog";

type Task = {
	id: string;
	title: string | null;
	description: string;
	status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE";
};

type TaskCardProps = {
	task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
	return (
		<div className="rounded p-4 border border-border bg-background shadow-sm transition-shadow hover:shadow">
			<div className="flex flex-col gap-y-4">
				<div className="flex flex-col gap-2">
					<div className="flex items-center justify-between">
						<h3 className="text-sm font-medium">{task.title}</h3>
						<DeleteTaskDialog taskId={task.id} />
					</div>
					<p className="text-sm text-muted-foreground whitespace-pre-wrap">
						{task.description}
					</p>
				</div>
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
