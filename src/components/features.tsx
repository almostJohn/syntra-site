import { Icons } from "./icons";

const features = [
	{
		title: "Status Tracking",
		icon: Icons.barChart,
		description:
			"Monitor your project progress with live updates. See exactly where each task stands and identify bottlenecks instantly.",
	},
	{
		title: "Categories",
		icon: Icons.tag,
		description:
			"Organize tasks by categories, departments, or custom labels. Keep your workflow structured and easily navigable.",
	},
	{
		title: "Priority Levels",
		icon: Icons.flag,
		description:
			"Set priority levels and focus on what matters most. Never miss critical deadlines with intelligent task prioritization.",
	},
];

export function Features() {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
			{features.map(({ title, icon: Icon, description }) => (
				<div
					key={title}
					className="group hover:shadow-scheme-primary flex flex-col rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-2xl"
				>
					<div className="space-y-4">
						<div className="group-hover:bg-scheme-primary bg-scheme-primary/20 inline-flex items-center justify-center rounded-full p-2 group-hover:text-white">
							<Icon className="size-10 shrink-0" />
						</div>
						<h3 className="mt-3 text-xl font-bold text-orange-800">{title}</h3>
						<p className="leading-relaxed text-orange-700">{description}</p>
					</div>
				</div>
			))}
		</div>
	);
}
