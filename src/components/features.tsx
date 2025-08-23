import { Icons } from "./icons";

const featuresList = [
	{
		title: "Blazingly Fast",
		description:
			"Move tasks between columns instantly with quick button actions - no waiting, no lag",
		icon: Icons.lightning,
	},
	{
		title: "Simple Kanban Workflow",
		description:
			"Clean, organized boards with To Do, In Progress, and Done columns for clear project visibility",
		icon: Icons.gridPlus,
	},
	{
		title: "Effortless Task Management",
		description:
			"Create, and track tasks with intuitive controls and instant updates",
		icon: Icons.sparkles,
	},
];

export function Features() {
	return (
		<div
			id="features"
			className="mx-auto max-w-6xl px-6 md:px-0 py-12 md:py-24"
		>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2 items-center justify-center text-center mb-4">
					<h2 className="text-4xl font-bold tracking-tight mb-3 md:text-5xl">
						Features
					</h2>
					<p className="text-neutral-500 text-base text-pretty sm:text-xl/8 max-w-2xl">
						Built for speed and simplicity. Manage your projects with
						lightning-fast performance.
					</p>
				</div>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
					{featuresList.map(({ title, description, icon: Icon }, index) => (
						<div
							key={index}
							className="rounded-lg p-6 border border-neutral-300 dark:border-neutral-700 bg-transparent dark:bg-transparent"
						>
							<div className="flex flex-col gap-4">
								<Icon className="size-8 shrink-0" />
								<h3 className="text-xl font-bold leading-snug">{title}</h3>
								<p className="text-neutral-500 text-base text-pretty">
									{description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
