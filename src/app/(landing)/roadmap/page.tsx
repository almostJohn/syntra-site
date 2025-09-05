import * as React from "react";
import { Main as MainLayout } from "@/components/layout/page/main";
import { Rocket } from "lucide-react";
import { Icons } from "@/components/icons";

export const metadata = {
	title: "Roadmap",
};

type RoadmapEntry = {
	version: string;
	date: string;
	title: string;
	description: string;
	type: "major" | "minor" | "patch";
	features: string[];
	icon: React.ComponentType<{ className?: string }>;
};

const roadmapData: RoadmapEntry[] = [
	{
		version: "v0.0.1",
		date: "September 2025",
		title: "Complete Platform Redesign",
		description: "Ground-up rebuild modern architecture",
		type: "major",
		features: [
			"Brand new user interfaces",
			"Mobile-first responsive design",
			"Real-time collaboration",
			"Advanced dashboard analytics",
		],
		icon: Rocket,
	},
];

export default function RoadmapPage() {
	return (
		<MainLayout>
			<div className="container mx-auto max-w-4xl px-6 py-16 sm:px-4">
				{/* Header */}
				<div className="mb-16 text-center">
					<h1 className="from-scheme-primary to-scheme-foreground/80 mb-4 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
						Our Development Journey
					</h1>
					<p className="text-scheme-foreground/50 mx-auto max-w-2xl text-lg text-pretty sm:text-xl">
						Follow our product evolution through each milestone. Every release
						brings us closer to building the perfect solution for our users.
					</p>
				</div>

				{/* Roadmap */}
				<div className="relative">
					{/* Timeline Line */}
					<div className="absolute top-0 bottom-0 left-8 w-0.5 bg-orange-300" />

					{/* Timeline Entries */}
					<div className="space-y-12">
						{roadmapData.map((roadmap) => {
							const IconComponent = roadmap.icon;

							return (
								<div
									key={roadmap.version}
									className="relative flex items-start gap-8"
								>
									{/* Timeline Marker */}
									<div className="relative z-10 shrink-0">
										<div className="flex size-16 items-center justify-center rounded-full border-4 border-orange-300 bg-orange-200">
											<IconComponent className="text-scheme-foreground size-6" />
										</div>
										{/* Connecting Lines */}
										<div className="absolute top-8 left-16 h-0.5 w-8 bg-orange-300" />
									</div>

									{/* Card Content */}
									<div className="flex h-full w-full flex-col rounded-lg border border-orange-300 bg-transparent">
										<div className="flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between">
											<div className="bg-scheme-primary flex w-16 items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold text-white">
												{roadmap.version}
											</div>
											<div className="text-scheme-foreground/50 text-sm">
												{roadmap.date}
											</div>
										</div>
										<div className="flex flex-col gap-2 p-6">
											<h3 className="text-lg font-bold">{roadmap.title}</h3>
											<p className="text-sm text-orange-700">
												{roadmap.description}
											</p>
										</div>
										<div className="mt-auto flex flex-col gap-2 p-6">
											<div className="text-base font-medium">
												Features & Improvements
											</div>
											<div className="space-y-1">
												{roadmap.features.map((feature, featureIndex) => (
													<div
														key={featureIndex}
														className="flex items-center gap-3"
													>
														<Icons.check className="text-scheme-primary size-5 shrink-0" />
														<span className="text-sm">{feature}</span>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* Future Milestone Indicator */}
					<div className="relative mt-12 flex items-start gap-8 opacity-60">
						<div className="relative z-10 shrink-0">
							<div className="flex size-16 items-center justify-center rounded-full border-2 border-dashed border-orange-400 bg-orange-200">
								<Icons.sparkles className="size-6 shrink-0" />
							</div>
							<div className="absolute top-8 left-16 h-0.5 w-8 bg-orange-300" />
						</div>

						{/* Card Content */}
						<div className="flex h-full w-full flex-col rounded-lg border border-dashed border-orange-300 bg-transparent">
							<div className="flex flex-col gap-2 p-6">
								<h3 className="text-lg font-bold">
									More exciting updates coming soon...
								</h3>
								<p className="text-sm text-orange-700">
									Stay tuned for our next major release with even more
									innovative features.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
