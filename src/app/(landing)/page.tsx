import { Icons } from "@/components/icons";
import { Main as MainLayout } from "@/components/layout/page/main";
import {
	SectionContainer,
	SectionBody,
	SectionHeader,
} from "@/components/layout/page/section";
import { buttonVariants } from "@/components/ui/button";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib";
import { ArrowUpRight } from "lucide-react";
import { Analytics } from "@/components/analytics";

export const metadata = {
	title: "Home",
};

const features = [
	{
		title: "Status Tracking",
		icon: Icons.barChart,
		description: "Real-time progress",
	},
	{
		title: "Categories",
		icon: Icons.tag,
		description: "Organize by type",
	},
	{
		title: "Priority Levels",
		icon: Icons.flag,
		description: "Focus on what matters",
	},
];

export default function HomePage() {
	return (
		<MainLayout>
			{/* Hero Section */}
			<SectionContainer id="hero">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<SectionBody>
						<SectionHeader
							title="Transform Your"
							subtitle="Workflow"
							description="Visualize, manage, and prioritize tasks effortlessly with our
								intuitive kanban-style workflow system. Stay organized and boost
								productivity like never before."
							badgeText="Beta v0.0.1"
							isBadgeEnabled
						/>
						<div className="animate-slide flex flex-col gap-4 opacity-0 sm:flex-row">
							<NextLink
								href="/login"
								className={cn(
									buttonVariants({
										size: "lg",
										className:
											"group bg-scheme-primary hover:bg-scheme-primary/90 hover:shadow-scheme-primary/60 px-6 py-2 text-lg transition-shadow hover:shadow-xl",
									}),
								)}
							>
								Get started
								<ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
							</NextLink>
							<NextLink
								href="/changelog"
								className={cn(
									buttonVariants({
										size: "lg",
										variant: "outline",
										className:
											"border-scheme-primary text-scheme-primary hover:bg-scheme-primary bg-transparent px-6 py-2 text-lg hover:text-white",
									}),
								)}
							>
								Changelog
							</NextLink>
						</div>
					</SectionBody>
					<div className="relative z-10 hidden h-96 md:block">
						<div className="relative size-full">
							<div className="absolute top-20 left-8 flex w-72 rotate-3 transform flex-col rounded-l rounded-r-lg border-l-4 border-sky-500 bg-white p-4 shadow-lg">
								<div className="mb-3 flex items-center">
									<span className="border-scheme-foreground/30 inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium">
										feature
									</span>
								</div>
								<p className="mb-4 text-sm">Create wireframe</p>
								<p className="mt-auto text-xs">Incomplete</p>
							</div>
							<div className="absolute top-16 left-12 z-20 flex w-72 -rotate-1 transform flex-col rounded-l rounded-r-lg border-l-4 border-purple-500 bg-white p-4 shadow-lg">
								<div className="mb-3 flex items-center">
									<span className="border-scheme-foreground/30 inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium">
										docs
									</span>
								</div>
								<p className="mb-4 text-sm">User interviews</p>
								<p className="mt-auto text-xs">In progress</p>
							</div>
							<div className="absolute top-12 left-16 z-30 flex w-72 rotate-1 transform flex-col rounded-l rounded-r-lg border-l-4 border-emerald-500 bg-white p-4 shadow-lg">
								<div className="mb-3 flex items-center">
									<span className="border-scheme-foreground/30 inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium">
										chore
									</span>
								</div>
								<p className="mb-4 text-sm">Setup database</p>
								<p className="mt-auto text-xs">Complete</p>
							</div>
							<div className="absolute top-8 left-20 z-40 flex w-72 -rotate-2 transform flex-col rounded-l rounded-r-lg border-l-4 border-amber-500 bg-white p-4 shadow-lg">
								<div className="mb-3 flex items-center">
									<span className="border-scheme-foreground/30 inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium">
										infra
									</span>
								</div>
								<p className="mb-4 text-sm">Write unit tests</p>
								<p className="mt-auto text-xs">Incomplete</p>
							</div>
							<div className="absolute top-4 left-24 z-50 flex w-72 rotate-3 transform flex-col rounded-l rounded-r-lg border-l-4 border-sky-500 bg-white p-4 shadow-lg">
								<div className="mb-3 flex items-center">
									<span className="border-scheme-foreground/30 inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium">
										docs
									</span>
								</div>
								<p className="mb-4 text-sm">Launch campaign</p>
								<p className="mt-auto text-xs">Incomplete</p>
							</div>
							<div className="absolute top-0 left-28 z-60 flex w-72 -rotate-1 transform flex-col rounded-l rounded-r-lg border-l-4 border-rose-500 bg-white p-4 shadow-lg">
								<div className="mb-3 flex items-center">
									<span className="border-scheme-foreground/30 inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium">
										feature
									</span>
								</div>
								<p className="mb-4 text-sm">Track metrics</p>
								<p className="mt-auto text-xs">In progress</p>
							</div>
							<div className="absolute right-16 bottom-20 z-70 w-50 -rotate-2 transform rounded-lg bg-white p-4 shadow-lg backdrop-blur-sm">
								<div className="mb-2 flex items-center gap-2">
									<div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
									<span className="text-xs font-medium">Tasks Completed</span>
								</div>
								<div className="flex items-center gap-3">
									<div className="flex items-center gap-1">
										<Icons.fileText className="h-3 w-3 text-red-600" />
										<span className="text-xs">PDF</span>
									</div>
									<div className="flex items-center gap-1">
										<Icons.downdload className="h-3 w-3 text-green-600" />
										<span className="text-xs">Excel</span>
									</div>
								</div>
								<div className="mt-2 text-xs">Export ready!</div>
							</div>
						</div>
					</div>
				</div>
				<Analytics />
			</SectionContainer>

			{/* Features */}
			<SectionContainer id="features">
				<SectionBody>
					<SectionHeader
						className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 text-center"
						title="What's Different About Syntra"
						description="Work smarter together with tools that don’t get in the way."
						isGradientText
					/>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
						{features.map(({ title, icon: Icon, description }) => (
							<div
								key={title}
								className="group hover:shadow-scheme-primary/60 flex flex-col rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl"
							>
								<div className="space-y-2">
									<div className="group-hover:bg-scheme-primary inline-flex items-center justify-center rounded-full p-2 group-hover:text-white">
										<Icon className="size-10 shrink-0" />
									</div>
									<h3 className="text-lg font-semibold tracking-tighter">
										{title}
									</h3>
									<p className="text-pretty">{description}</p>
								</div>
							</div>
						))}
					</div>
				</SectionBody>
			</SectionContainer>
		</MainLayout>
	);
}
