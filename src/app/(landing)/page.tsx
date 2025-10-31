import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Star } from "lucide-react";
import { NextLink } from "@/components/ui/next-link";
import { Icons } from "@/components/icons";

export default function HomePage() {
	return (
		<div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center">
			<div className="flex flex-col gap-6 text-center">
				<div className="flex flex-col gap-2">
					<div className="mb-2 flex items-center justify-center gap-1.5 text-center">
						<Icons.todo className="size-12 shrink-0" />
						<h1 className="text-center text-3xl font-bold md:text-4xl">
							Syntra
						</h1>
					</div>
					<em className="text-center text-base font-medium text-neutral-900">
						&quot;Organizing my workflow.&quot;
					</em>
					<p className="mx-auto max-w-2xl px-4 text-center text-xl text-pretty text-neutral-500">
						A personal kanban-style task management system built for individual
						productivity. Simple, focused, and designed exclusively for my own
						use.
					</p>
				</div>
				<div className="mx-auto mt-3 flex w-full max-w-2xl flex-col gap-4 px-8 sm:flex-row md:w-auto md:px-0">
					<NextLink
						href="/login"
						className={cn(
							buttonVariants({
								className: "group",
							}),
						)}
					>
						Open Board{" "}
						<ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
					</NextLink>
					<a
						href="https://github.com/almostJohn/syntra-site"
						rel="noreferrer"
						target="_blank"
						className={cn(
							buttonVariants({
								className: "group",
								variant: "outline",
							}),
						)}
					>
						<Star className="size-4 shrink-0" />
						Star on GitHub
					</a>
				</div>
			</div>
		</div>
	);
}
