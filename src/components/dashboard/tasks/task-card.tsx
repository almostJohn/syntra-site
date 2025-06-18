import { MarkTaskAsIncompleteButton } from "./mark-task-as-incomplete-button";
import { MarkTaskAsInProgressButton } from "./mark-task-as-inprogress-button";
import { MarkTaskAsCompleteButton } from "./mark-task-as-complete-button";
import { DeleteTaskButton } from "./delete-task-button";

type Task = {
	id: string;
	title: string | null;
	content: string;
	status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE";
};

type TaskCardProps = {
	task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
	return (
		<div className="block p-4 border border-border bg-background rounded-sm shadow-sm transition-shadow hover:shadow">
			<div className="flex flex-col gap-y-4">
				<div className="flex flex-col gap-2">
					<div className="flex items-center justify-between">
						<h4 className="text-sm font-medium">{task.title}</h4>
						<DeleteTaskButton taskId={task.id} />
					</div>
					<p className="text-sm text-muted-foreground">{task.content}</p>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start">
						{task.status === "IN_PROGRESS" && (
							<MarkTaskAsIncompleteButton taskId={task.id} isBackward={true} />
						)}
						{task.status === "COMPLETE" && (
							<MarkTaskAsInProgressButton taskId={task.id} isBackward={true} />
						)}
					</div>
					<div className="flex items-center justify-end">
						{task.status === "INCOMPLETE" && (
							<MarkTaskAsInProgressButton taskId={task.id} isForward={true} />
						)}
						{task.status === "IN_PROGRESS" && (
							<MarkTaskAsCompleteButton taskId={task.id} isForward={true} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
