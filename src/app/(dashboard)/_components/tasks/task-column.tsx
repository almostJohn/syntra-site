import type { PropsWithChildren } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

type TaskColumnProps = PropsWithChildren & {
	title: string;
	count: number;
	color: string;
};

export function TaskColumn({ title, count, color, children }: TaskColumnProps) {
	return (
		<div className="bg-transparent rounded-sm border border-neutral-200 dark:border-neutral-700 shadow-lg">
			<div className="flex flex-col">
				<div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className={`rounded-full size-3 ${color}`} />
							<h3 className="text-sm font-medium">{title}</h3>
						</div>
						<div className="flex items-center justify-center rounded-full bg-neutral-500 text-neutral-100 size-6 text-xs font-medium text-center">
							{count}
						</div>
					</div>
				</div>
				<ScrollArea className="overflow-y-auto max-h-[calc(100vh-220px)] mt-auto p-4">
					<div className="flex flex-col space-y-4">{children}</div>
				</ScrollArea>
			</div>
		</div>
	);
}
