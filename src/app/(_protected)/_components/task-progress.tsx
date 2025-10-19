type TaskProgressProps = {
	backlog: number;
	todo: number;
	inProgress: number;
	complete: number;
};

export function TaskProgress({
	backlog,
	todo,
	inProgress,
	complete,
}: TaskProgressProps) {
	const total = backlog + todo + inProgress + complete;
	const backlogPercentage = (backlog / total) * 100;
	const todoPercentage = (todo / total) * 100;
	const inProgressPercentage = (inProgress / total) * 100;
	const completePercentage = (complete / total) * 100;

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center justify-between">
				<h3 className="text-sm font-medium">Overall Progress</h3>
				<p className="text-sm text-neutral-500">({total}) Total Tasks</p>
			</div>
			<div className="flex h-3 w-full overflow-hidden rounded-full border border-neutral-700 bg-neutral-800">
				{backlog > 0 && (
					<div
						className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
						style={{ width: `${backlogPercentage}%` }}
					/>
				)}
				{inProgress > 0 && (
					<div
						className="h-full bg-orange-500 transition-all duration-300 ease-in-out"
						style={{ width: `${inProgressPercentage}%` }}
					/>
				)}
				{todo > 0 && (
					<div
						className="h-full bg-purple-500 transition-all duration-300 ease-in-out"
						style={{ width: `${todoPercentage}%` }}
					/>
				)}
				{complete > 0 && (
					<div
						className="h-full bg-green-500 transition-all duration-300 ease-in-out"
						style={{ width: `${completePercentage}%` }}
					/>
				)}
			</div>
			<div className="flex items-center justify-between text-xs text-neutral-500">
				<div className="flex flex-wrap gap-2">
					<div className="flex items-center gap-1">
						<div className="size-1.5 animate-pulse rounded-full bg-blue-500" />
						<p>Backlog ({backlog})</p>
					</div>
					<div className="flex items-center gap-1">
						<div className="size-1.5 animate-pulse rounded-full bg-orange-500" />
						<p>In Progress ({inProgress})</p>
					</div>
					<div className="flex items-center gap-1">
						<div className="size-1.5 animate-pulse rounded-full bg-purple-500" />
						<p>Todo ({todo})</p>
					</div>
					<div className="flex items-center gap-1">
						<div className="size-1.5 animate-pulse rounded-full bg-green-500" />
						<p>Complete ({complete})</p>
					</div>
				</div>
				<div className="flex items-center justify-end text-right">
					<p className="font-medium">
						{Math.round(completePercentage)}% Completed
					</p>
				</div>
			</div>
		</div>
	);
}
