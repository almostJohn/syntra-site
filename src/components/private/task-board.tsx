import type { PropsWithChildren } from "react";
import { CreateTask } from "./create-task";

type TaskBoardProps = PropsWithChildren & {
	title: string;
	color: string;
	taskLength: number;
	projectId: string;
	status: "INCOMPLETE" | "IN_PROGRESS" | "COMPLETE";
};

export function TaskBoard({
	title,
	color,
	taskLength,
	projectId,
	status,
	children,
}: TaskBoardProps) {
	return (
		<div className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-sm shadow-lg">
			<div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className={`size-3 rounded-full ${color} shrink-0`} />
						<div className="text-lg font-semibold">{title}</div>
					</div>
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center text-center rounded-full text-xs font-medium size-5 shrink-0 bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100">
							{taskLength}
						</div>
						<CreateTask projectId={projectId} status={status} />
					</div>
				</div>
			</div>
			{children}
		</div>
	);
}
