type TaskProgressBarProps = {
	todo: number;
	inProgress: number;
	done: number;
};

export function TaskProgressBar({
	todo,
	inProgress,
	done,
}: TaskProgressBarProps) {
	const total = todo + inProgress + done;
	const todoPercentage = (todo / total) * 100;
	const inProgressPercentage = (inProgress / total) * 100;
	const donePercentage = (done / total) * 100;

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center justify-between">
				<h2 className="text-sm font-medium">Overall Progress</h2>
				<p className="text-sm text-neutral-500">({total}) Total Tasks</p>
			</div>
			<div className="flex h-3 w-full overflow-hidden rounded-full border border-neutral-300 bg-neutral-200">
				{todo > 0 && (
					<div
						className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
						style={{ width: `${todoPercentage}%` }}
					/>
				)}
				{inProgress > 0 && (
					<div
						className="h-full bg-orange-500 transition-all duration-300 ease-in-out"
						style={{ width: `${inProgressPercentage}%` }}
					/>
				)}
				{done > 0 && (
					<div
						className="h-full bg-green-500 transition-all duration-300 ease-in-out"
						style={{ width: `${donePercentage}%` }}
					/>
				)}
			</div>
			<div className="flex justify-between text-xs">
				<div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
					<div className="flex items-center gap-1 font-medium">
						<div className="size-1.5 shrink-0 rounded-full bg-blue-500" />
						<span>Todo ({todo})</span>
					</div>
					<div className="flex items-center gap-1 font-medium">
						<div className="size-1.5 shrink-0 rounded-full bg-orange-500" />
						<span>In Progress ({inProgress})</span>
					</div>
					<div className="flex items-center gap-1 font-medium">
						<div className="size-1.5 shrink-0 rounded-full bg-green-500" />
						<span>Done ({done})</span>
					</div>
				</div>
				<div className="flex items-start justify-end text-right font-medium">
					{Math.round(donePercentage)}% Done
				</div>
			</div>
		</div>
	);
}
