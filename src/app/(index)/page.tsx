import * as React from "react";
import Link from "next/link";
import {
	PageHeader,
	PageHeaderContainer,
	PageHeaderBody,
	PageHeaderHeading,
	PageHeaderDescription,
	PageHeaderActions,
} from "~/components/page-header";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { GlowingDiv } from "~/components/glowing-div";
import { Announcement } from "~/components/announcement";
import { Edit, Save, Lock } from "lucide-react";

const featureItems = [
	{
		title: "Rich Text Editing",
		icon: Edit,
		description:
			"Format your notes with bold, italics, lists, and more for better organization.",
	},
	{
		title: "Auto-Save",
		icon: Save,
		description: "Never lose your work with automatic saving as you type.",
	},
	{
		title: "Secure Storage",
		icon: Lock,
		description: "Your notes are securely stored using the Web Storage API.",
	},
];

export default function IndexPage() {
	return (
		<>
			<PageHeader>
				<PageHeaderContainer>
					<PageHeaderBody>
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2">
								<Announcement />
								<PageHeaderHeading>
									{"Simple note-taking for complex thoughts"}
								</PageHeaderHeading>
								<PageHeaderDescription>
									{
										"Capture ideas, organize your life, and never forget anything with our intuitive notepad application."
									}
								</PageHeaderDescription>
							</div>
							<PageHeaderActions>
								<Link
									href="/notes"
									className={cn(
										buttonVariants({ size: "lg", className: "px-8" }),
									)}
								>
									Get Started
								</Link>
								<Link
									href="/about"
									className={cn(
										buttonVariants({
											variant: "outline",
											size: "lg",
											className: "px-8",
										}),
									)}
								>
									Learn more
								</Link>
							</PageHeaderActions>
						</div>
						<div className="flex items-center justify-center">
							<div className="block p-0 w-full rounded-md border shadow-xl">
								<div className="flex flex-col">
									<div className="border-b border-border p-4">
										<div className="flex items-center justify-between">
											<span className="font-medium truncate">
												Untitled Note
											</span>
											<GlowingDiv />
										</div>
									</div>
									<div className="p-4 flex-1 overflow-hidden">
										<p className="text-sm text-muted-foreground line-clamp-4">
											{
												"SimplyNote is a fast, stand-alone, and free browser-based text editor for quick note-taking and editing. No installs or sign-ups—just a simple, distraction-free experience with autosave and privacy."
											}
										</p>
									</div>
									<div className="p-3 bg-muted/50 text-xs text-muted-foreground mt-auto">
										Jan 1, 2025 • 12:00 AM
									</div>
								</div>
							</div>
						</div>
					</PageHeaderBody>
				</PageHeaderContainer>
			</PageHeader>

			<section
				id="features"
				className="w-full py-12 md:py-24 lg:py-32 bg-muted"
			>
				<div className="container">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
								Powerful features for your notes
							</h2>
							<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-base/relaxed">
								Everything you need to capture, organize, and access your notes
								from anywhere.
							</p>
						</div>
					</div>
					<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
						{featureItems.map((item, i) => (
							<div
								key={i}
								className="block p-5 bg-background border rounded-md shadow-sm"
							>
								<div className="flex flex-col space-y-4">
									<item.icon className="size-10 mb-2 text-primary" />
									<h3 className="text-xl font-medium leading-snug">
										{item.title}
									</h3>
									<p className="text-muted-foreground text-sm">
										{item.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
								Ready to start taking better notes?
							</h2>
							<p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Join users who trust SimplyNote for their daily note-taking
								needs.
							</p>
						</div>
						<div className="flex flex-col gap-2 min-[400px]:flex-row">
							<Link
								href="/notes"
								className={cn(
									buttonVariants({ size: "lg", className: "px-8" }),
								)}
							>
								Get Started
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
