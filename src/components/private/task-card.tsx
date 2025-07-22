import { UpdateTaskStatus } from "./update-task-status";
import { DeleteTask } from "./delete-task";

type Task = {
	id: string;
	name: string;
	status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE";
};

type TaskCardProps = {
	projectId: string;
	task: Task;
};

export function TaskCard({ projectId, task }: TaskCardProps) {
	return (
		<div className="group cursor-pointer flex flex-col gap-2">
			<div className="p-4 rounded-sm border border-neutral-200 dark:border-neutral-700">
				<div className="whitespace-pre-wrap text-sm">{task.name}</div>
				<div className="flex items-center justify-end gap-2">
					<DeleteTask projectId={projectId} taskId={task.id} />
					{task.status === "IN_PROGRESS" && (
						<UpdateTaskStatus
							projectId={projectId}
							taskId={task.id}
							status="INCOMPLETE"
							isBackward
						/>
					)}
					{task.status === "COMPLETE" && (
						<UpdateTaskStatus
							projectId={projectId}
							taskId={task.id}
							status="IN_PROGRESS"
							isBackward
						/>
					)}
					{task.status === "INCOMPLETE" && (
						<UpdateTaskStatus
							projectId={projectId}
							taskId={task.id}
							status="IN_PROGRESS"
							isForward
						/>
					)}
					{task.status === "IN_PROGRESS" && (
						<UpdateTaskStatus
							projectId={projectId}
							taskId={task.id}
							status="COMPLETE"
							isForward
						/>
					)}
				</div>
			</div>
		</div>
	);
}
