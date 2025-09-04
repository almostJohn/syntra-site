import * as React from "react";
import { Main as MainLayout } from "@/components/layout/page/main";
import { Rocket } from "lucide-react";
import { Icons } from "@/components/icons";

export const metadata = {
	title: "Changelog",
};

type ChangelogEntry = {
	version: string;
	date: string;
	title: string;
	description: string;
	type: "major" | "minor" | "patch";
	features: string[];
	icon: React.ComponentType<{ className?: string }>;
};

const changelogData: ChangelogEntry[] = [
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

export default function ChangelogPage() {
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

				{/* Roadmap Timeline */}
				<div className="relative">
					<div className="bg-scheme-foreground/20 absolute top-0 bottom-0 left-8 w-0.5" />

					<div className="space-y-12">
						{changelogData.map((entry) => {
							const IconComponent = entry.icon;

							return (
								<div
									key={entry.version}
									className="relative flex items-start gap-8"
								>
									<div className="relative z-10 flex-shrink-0">
										<div className="bg-scheme-primary flex size-16 items-center justify-center rounded-full border-4 border-white text-white shadow-lg">
											<IconComponent className="size-7 shrink-0" />
										</div>
										<div className="bg-scheme-foreground/20 absolute top-8 left-16 h-0.5 w-8" />
									</div>
									<div className="flex-1 rounded-lg bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
										<div className="flex flex-col gap-2 p-6">
											<div className="flex items-center justify-between">
												<div className="bg-scheme-primary inline-flex cursor-pointer items-center rounded-full px-2 py-0.5 text-xs font-semibold text-white">
													{entry.version}
												</div>
												<span className="text-scheme-foreground/50 text-sm">
													{entry.date}
												</span>
											</div>
											<div className="mt-3 text-lg font-bold sm:text-xl">
												{entry.title}
											</div>
											<div className="text-scheme-foreground/50">
												{entry.description}
											</div>
										</div>
										<div className="p-6">
											<div className="space-y-2">
												<h4 className="mb-3 font-medium">
													Key Features & Improvements
												</h4>
												<ul className="space-y-2">
													{entry.features.map((feature, featureIndex) => (
														<li
															key={featureIndex}
															className="flex items-start gap-2"
														>
															<Icons.check className="text-scheme-primary size-5 shrink-0" />
															<span className="text-scheme-foreground/50 text-sm">
																{feature}
															</span>
														</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div className="relative mt-12 flex items-start gap-8 opacity-60">
						<div className="relative z-10 flex-shrink-0">
							<div className="border-scheme-foreground flex size-16 items-center justify-center rounded-full border-2 border-dashed">
								<span className="text-2xl">🚀</span>
							</div>
							<div className="bg-scheme-foreground/40 absolute top-8 left-16 h-0.5 w-8" />
						</div>
						<div className="border-scheme-foreground/40 flex-1 rounded-lg border border-dashed bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
							<div className="flex flex-col gap-2 p-6">
								<h1 className="text-scheme-foreground/50 text-lg font-bold sm:text-xl">
									More exciting updates coming soon...
								</h1>
								<p className="text-scheme-foreground/50">
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
