type MainHeaderProps = {
	displayName: string;
};

export function MainHeader({ displayName }: MainHeaderProps) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-col space-y-1.5">
				<h1 className="text-3xl font-bold">Dashboard</h1>
				<p className="text-muted-foreground">
					Welcome back, {displayName}! Here&apos;s what&apos;s happening today.
				</p>
			</div>
		</div>
	);
}
