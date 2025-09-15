import { BarChart3, Tags, Flag } from "lucide-react";

const featuresList = [
	{
		title: "Status Tracking",
		description: "Monitor your project progress with live updates.",
		icon: BarChart3,
	},
	{
		title: "Categories",
		description: "Organize tasks by categories, departments, or custom labels.",
		icon: Tags,
	},
	{
		title: "Priority Levels",
		description: "Set priority levels and focus on what matters most.",
		icon: Flag,
	},
];

export function Features() {
	return (
		<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{featuresList.map(({ title, description, icon: Icon }, i) => (
				<div
					key={i}
					className="bg-background group flex flex-col rounded-md border p-6 shadow-sm transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/30"
				>
					<div className="space-y-4">
						<div className="inline-flex items-center justify-center rounded-full bg-blue-600/10 p-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
							<Icon className="size-8 shrink-0" />
						</div>
						<h3 className="mt-3 text-xl font-bold">{title}</h3>
						<p className="text-muted-foreground text-base leading-relaxed">
							{description}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
