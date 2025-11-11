import Link from "next/link";
import { jetBrainsMono } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ArrowUpRight, Star } from "lucide-react";

export default function Page() {
	return (
		<div className="flex min-h-screen items-center justify-center p-6 sm:p-4">
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-2 text-center">
					<h1
						className={cn(
							"text-2xl font-bold sm:text-3xl",
							jetBrainsMono.className,
						)}
					>
						Syntra
					</h1>
					<p className="mx-auto max-w-lg text-lg text-pretty text-neutral-500 sm:text-xl">
						A personal kanban-style task management system built for individual
						productivity. Simple, focused, and design exclusively for my own
						use.
					</p>
				</div>
				<div className="animate-slide flex flex-col gap-3 opacity-0 sm:flex-row sm:items-center sm:justify-center">
					<Link
						href="/login"
						className={cn(buttonVariants({ className: "group" }))}
					>
						Login{" "}
						<ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
					</Link>
					<a
						href="https://github.com/almostJohn/syntra-site/stargazers"
						rel="noreferrer"
						target="_blank"
						className={cn(
							buttonVariants({ variant: "outline", className: "group" }),
						)}
					>
						<Star className="size-4 shrink-0 transition-all duration-300 ease-in-out group-hover:rotate-360 group-hover:text-rose-600" />{" "}
						Star on GitHub
					</a>
				</div>
			</div>
		</div>
	);
}
