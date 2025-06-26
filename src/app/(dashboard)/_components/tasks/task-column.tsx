import type { PropsWithChildren } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

type TaskColumnProps = PropsWithChildren & {
	title: string;
	count: number;
	color: string;
};

export function TaskColumn({ title, count, color, children }: TaskColumnProps) {
	return (
		<div className="bg-muted/40 rounded-sm border border-border shadow-lg">
			<div className="flex flex-col">
				<div className="p-4 border-b border-border">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className={`size-3 rounded-full ${color}`} />
							<h3 className="font-medium">{title}</h3>
						</div>
						<span className="inline-flex items-center justify-center rounded-full bg-muted size-6 text-xs text-center font-medium">
							{count}
						</span>
					</div>
				</div>
				<ScrollArea className="overflow-y-auto max-h-[calc(100vh-220px)] mt-auto p-4">
					<div className="flex flex-col gap-4">{children}</div>
				</ScrollArea>
			</div>
		</div>
	);
}
