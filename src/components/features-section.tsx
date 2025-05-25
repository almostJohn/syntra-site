import {
	Smartphone,
	Lock,
	Search,
	PenTool,
	FolderTree,
	FolderKanban,
} from "lucide-react";

type FeaturesSectionProps = {
	title: string;
	description: string;
};

const features = [
	{
		title: "Smart Organization",
		description:
			"Quickly organize your notes using tags — the simple way to categorize and find what you need instantly.",
		icon: FolderTree,
	},
	{
		title: "Sync Across Devices",
		description:
			"Access your notes from anywhere with real-time syncing across all your devices.",
		icon: Smartphone,
	},
	{
		title: "Rich Formatting",
		description:
			"Express yourself with rich text, checklists, code blocks, and embedded media.",
		icon: PenTool,
	},
	{
		title: "Powerful Search",
		description:
			"Find any note instantly with our lightning-fast search across all your content.",
		icon: Search,
	},
	{
		title: "Kanban Boards",
		description:
			"Organize projects with visual kanban boards to track progress and manage tasks efficiently.",
		icon: FolderKanban,
	},
	{
		title: "Secure Storage",
		description:
			"Keep your notes safe with end-to-end encryption and secure cloud storage.",
		icon: Lock,
	},
];

export function FeaturesSection({ title, description }: FeaturesSectionProps) {
	return (
		<section id="features" className="w-full py-12 md:py-24 lg:py-32">
			<div className="container px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<div className="inline-block rounded-md bg-blue-100 px-3 py-1 text-sm">
							Features
						</div>
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
							{title}
						</h2>
						<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							{description}
						</p>
					</div>
				</div>
				<div className="mx-auto max-w-5xl px-6 md:px-0 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
					{features.map((item, index) => (
						<div
							key={index}
							className="flex flex-col items-center space-y-2 rounded-md border p-6 shadow-sm"
						>
							<div className="rounded-full bg-blue-100 p-3">
								<item.icon className="size-6 text-blue-600" />
							</div>
							<h3 className="text-xl font-bold">{item.title}</h3>
							<p className="text-center text-muted-foreground">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
