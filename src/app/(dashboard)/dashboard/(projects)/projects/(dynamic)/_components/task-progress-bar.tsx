type TaskProgressBarProps = {
	incomplete: number;
	inProgress: number;
	complete: number;
};

export function TaskProgressBar({
	incomplete,
	inProgress,
	complete,
}: TaskProgressBarProps) {
	const total = incomplete + inProgress + complete;

	const incompletePercentage = (incomplete / total) * 100;
	const inProgressPercentage = (inProgress / total) * 100;
	const completePercentage = (complete / total) * 100;

	return (
		<div className="mb-6">
			<div className="flex items-center justify-between mb-2">
				<h3 className="text-sm font-medium">Overall Progress</h3>
				<span className="text-sm text-neutral-500">({total}) Total tasks</span>
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
						className="bg-amber-500 h-full transition-all duration-300 ease-in-out"
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
			<div className="mt-2">
				<div className="flex flex-col gap-3 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-1">
							<div className="size-2 rounded-full bg-red-500" />
							<span>Incomplete ({incomplete})</span>
						</div>
						<div className="flex items-center gap-1">
							<div className="size-2 rounded-full bg-amber-500" />
							<span>In Progress ({inProgress})</span>
						</div>
						<div className="flex items-center gap-1">
							<div className="size-2 rounded-full bg-green-500" />
							<span>Complete ({complete})</span>
						</div>
					</div>
					<div className="font-medium">
						{Math.round(completePercentage)}% Complete
					</div>
				</div>
			</div>
		</div>
	);
}
