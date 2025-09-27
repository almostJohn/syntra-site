import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";

export const metadata = {
	title: "home",
};

export default function HomePage() {
	return (
		<div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center">
			<div className="flex flex-col gap-6 text-center">
				<div className="flex flex-col gap-2">
					<h1 className="mb-1 text-center text-3xl font-bold md:text-4xl">
						syntra <span className="underline">v1</span>
					</h1>
					<div className="mx-auto flex justify-center">
						<div className="inline-flex rounded-none border border-neutral-700 bg-neutral-800 px-3 py-1 text-sm font-semibold">
							Personal Workspace
						</div>
					</div>
					<p className="mx-auto mt-6 max-w-2xl px-2 text-center text-xl text-pretty text-neutral-500">
						<em className="text-neutral-100">Organizing my workflow.</em> A
						personal kanban-style task management system built for individual
						productivity. Simple, focused, and designed exclusively for my own
						use.
					</p>
				</div>
				<div className="mx-auto mt-3 flex w-full max-w-2xl flex-col gap-4 px-8 sm:flex-row md:w-auto md:px-0">
					<Link
						href="/login"
						className={cn(
							buttonVariants({
								className:
									"group h-9 w-full rounded-none bg-neutral-100 px-6 py-2 text-neutral-900 hover:bg-neutral-100/80 md:w-auto",
							}),
						)}
					>
						open board{" "}
						<ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
					</Link>
					<a
						href="https://github.com/almostJohn/syntra-site"
						rel="noreferrer"
						target="_blank"
						className={cn(
							buttonVariants({
								className:
									"group h-9 w-full rounded-none border border-neutral-100 bg-transparent px-6 py-2 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-900 md:w-auto",
							}),
						)}
					>
						star on github
						<Star className="size-4 shrink-0" />
					</a>
				</div>
			</div>
		</div>
	);
}
