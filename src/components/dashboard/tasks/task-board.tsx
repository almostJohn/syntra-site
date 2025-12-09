import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type TaskBoardProps = PropsWithChildren & {
	title: string;
	color: string;
	taskLength: number;
};

export function TaskBoard({
	title,
	color,
	taskLength,
	children,
}: TaskBoardProps) {
	return (
		<div className="flex flex-col rounded-md border border-neutral-300 bg-white shadow">
			<div className="flex items-center justify-between border-b border-neutral-300 p-4">
				<div className="flex items-center gap-3">
					<div className={cn("size-3 shrink-0 rounded-full", color)} />
					<div className="text-lg font-semibold">{title}</div>
				</div>
				<div className="flex items-center gap-3">
					<div className="inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-neutral-200 text-center text-xs font-medium whitespace-nowrap text-neutral-500">
						{taskLength}
					</div>
				</div>
			</div>
			{children}
		</div>
	);
}
