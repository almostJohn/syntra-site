import type { PropsWithChildren } from "react";

type TaskColumnProps = PropsWithChildren & {
	title: string;
	count: number;
	color: string;
};

export function TaskColumn({ title, count, color, children }: TaskColumnProps) {
	return (
		<div className="block border border-border bg-background rounded-xl shadow-md">
			<div className="flex flex-col">
				<div className="p-4 border-b border-border">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className={`size-3 rounded-full ${color}`} />
							<h3 className="font-medium">{title}</h3>
						</div>
						<span className="inline-flex items-center justify-center size-6 text-xs font-medium rounded-full bg-muted">
							{count}
						</span>
					</div>
				</div>
				<div className="overflow-y-auto max-h-[calc(100vh-220px)] mt-auto p-4">
					<div className="flex flex-col gap-4">{children}</div>
				</div>
			</div>
		</div>
	);
}
