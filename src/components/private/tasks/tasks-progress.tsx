type TasksProgressProps = {
	incomplete: number;
	inProgress: number;
	complete: number;
};

export function TasksProgress({
	incomplete,
	inProgress,
	complete,
}: TasksProgressProps) {
	const total = incomplete + inProgress + complete;
	const incompletePercentage = (incomplete / total) * 100;
	const inProgressPercentage = (inProgress / total) * 100;
	const completePercentage = (complete / total) * 100;

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center justify-between">
				<h3 className="text-sm font-medium">Overall Progress</h3>
				<span className="text-sm text-neutral-500">({total}) Total Tasks</span>
			</div>
			<div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3 overflow-hidden flex">
				{incomplete > 0 && (
					<div
						className="bg-red-500 h-full transition-all duration-300 ease-in-out"
						style={{ width: `${incompletePercentage}%` }}
					/>
				)}
				{inProgress > 0 && (
					<div
						className="bg-orange-500 h-full transition-all duration-300 ease-in-out"
						style={{ width: `${inProgressPercentage}%` }}
					/>
				)}
				{complete > 0 && (
					<div
						className="bg-green-500 h-full transition-all duration-300 ease-in-out"
						style={{ width: `${completePercentage}%` }}
					/>
				)}
			</div>
			<div className="flex justify-between text-xs text-neutral-500">
				<div className="flex flex-wrap gap-2">
					<div className="flex items-center gap-1">
						<div className="size-2 rounded-full bg-red-500" />
						<span>Incomplete ({incomplete})</span>
					</div>
					<div className="flex items-center gap-1">
						<div className="size-2 rounded-full bg-orange-500" />
						<span>In Progress ({inProgress})</span>
					</div>
					<div className="flex items-center gap-1">
						<div className="size-2 rounded-full bg-green-500" />
						<span>Complete ({complete})</span>
					</div>
				</div>
				<div className="font-medium flex justify-end text-right">
					{Math.round(completePercentage)}% Completed
				</div>
			</div>
		</div>
	);
}
