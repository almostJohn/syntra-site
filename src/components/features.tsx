import { Icons } from "./icons";
import { cn } from "@/lib/utils";

const featuresList = [
	{
		title: "Blazingly Fast",
		description:
			"Move tasks between columns instantly with quick button actions - no waiting, no lag",
		icon: Icons.lightning,
		color: "text-amber",
	},
	{
		title: "Simple Kanban Workflow",
		description:
			"Clean, organized boards with To Do, In Progress, and Done columns for clear project visibility",
		icon: Icons.gridPlus,
		color: "text-blue",
	},
	{
		title: "Effortless Task Management",
		description:
			"Create, and track tasks with intuitive controls and instant updates",
		icon: Icons.sparkles,
		color: "text-rose",
	},
];

type FeaturesList = (typeof featuresList)[number];

export function Features() {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 px-4 md:px-0">
			{featuresList.map(({ title, description, icon, color }, index) => (
				<FeatureCard
					key={index}
					title={title}
					description={description}
					icon={icon}
					color={color}
				/>
			))}
		</div>
	);
}

function FeatureCard({ title, description, icon: Icon, color }: FeaturesList) {
	return (
		<div className="rounded-md p-6 border border-neutral-300 dark:border-neutral-700 shadow-sm group">
			<div className="flex flex-col gap-4">
				<Icon
					className={cn(
						"size-6 shrink-0 transition-transform duration-500 group-hover:-rotate-180",
						color === "text-amber"
							? "text-amber-500"
							: color === "text-blue"
							? "text-blue-500"
							: color === "text-rose"
							? "text-rose-500"
							: "",
					)}
				/>
				<h2 className="text-base font-medium tracking-tight sm:text-xl/8">
					{title}
				</h2>
				<p className="text-neutral-500 text-sm">{description}</p>
			</div>
		</div>
	);
}
