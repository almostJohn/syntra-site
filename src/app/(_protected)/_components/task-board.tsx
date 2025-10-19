import type { PropsWithChildren } from "react";
import { CreateTaskForm } from "./client/create-task.form";

type TaskBoardProps = PropsWithChildren & {
	title: string;
	color: string;
	tasksLength: number;
	projectId: string;
	status: "backlog" | "todo" | "in_progress" | "complete";
};

export function TaskBoard({
	title,
	color,
	tasksLength,
	projectId,
	status,
	children,
}: TaskBoardProps) {
	return (
		<div className="flex flex-col rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-xl">
			<div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
				<div className="flex items-center gap-3">
					<div
						className={`size-1.5 animate-pulse ${color} shrink-0 rounded-full`}
					/>
					<div className="text-lg font-semibold">{title}</div>
				</div>
				<div className="inline-flex size-6 items-center justify-center rounded-full bg-neutral-700 px-2 text-center text-xs font-medium">
					{tasksLength}
				</div>
			</div>
			{children}
			<div className="mt-auto border-t border-neutral-800 p-6">
				<CreateTaskForm projectId={projectId} status={status} />
			</div>
		</div>
	);
}
