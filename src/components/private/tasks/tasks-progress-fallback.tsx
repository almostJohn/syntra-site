export function TasksProgressFallback() {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center justify-between">
				<h3 className="text-sm font-medium">Overall Progress</h3>
				<span className="text-sm text-neutral-500">No tasks yet</span>
			</div>
			<div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3 overflow-hidden flex">
				<div className="rounded-full h-full w-full bg-neutral-500 text-neutral-800 dark:text-neutral-100 inline-flex items-center justify-center text-center text-sm font-medium" />
			</div>
			<div className="flex justify-between text-xs text-neutral-500">
				<div className="flex flex-wrap gap-2">
					<div className="flex items-center gap-1">
						<div className="size-2 rounded-full bg-red-500" />
						<span>Incomplete (0)</span>
					</div>
					<div className="flex items-center gap-1">
						<div className="size-2 rounded-full bg-orange-500" />
						<span>In Progress (0)</span>
					</div>
					<div className="flex items-center gap-1">
						<div className="size-2 rounded-full bg-green-500" />
						<span>Complete (0)</span>
					</div>
				</div>
				<div className="font-medium flex justify-end text-right">
					{0}% Completed
				</div>
			</div>
		</div>
	);
}
