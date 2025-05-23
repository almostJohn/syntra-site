import { NextLink } from "./ui/next-link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import {
	Sparkles,
	PenLine,
	FileText,
	Bookmark,
	CheckSquare,
	Calendar,
	Tag,
	Search,
} from "lucide-react";

type HeroSectionProps = {
	title: string;
	description: string;
};

export function HeroSection({ title, description }: HeroSectionProps) {
	return (
		<section
			id="hero"
			className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-neutral-50 to-blue-50"
		>
			<div className="absolute inset-0 overflow-hidden">
				<PenLine className="text-blue-500/20 absolute top-20 left-[15%] size-12 animate-pulse" />
				<FileText className="text-indigo-500/20 absolute top-40 right-[10%] size-16" />
				<Bookmark className="text-emerald-500/20 absolute bottom-20 left-[20%] size-14" />
				<CheckSquare
					className="text-green-500/20 absolute top-1/4 left-[80%] size-12 animate-bounce"
					style={{
						animationDuration: "3s",
					}}
				/>
				<Calendar className="text-amber-500/20 absolute bottom-32 right-[25%] w-12 h-12" />
				<Tag className="text-purple-500/20 absolute top-3/4 left-[30%] w-16 h-16" />
				<Search className="text-cyan-500/20 absolute top-1/3 left-[5%] w-14 h-14" />
				<div className="absolute top-[15%] right-[15%] w-32 h-40 bg-white/80 dark:bg-slate-700/80 rounded-md shadow-lg transform rotate-6 p-3">
					<div className="w-full h-3 bg-blue-200 dark:bg-blue-700 mb-2 rounded-sm"></div>
					<div className="w-3/4 h-2 bg-slate-200 dark:bg-slate-600 mb-2 rounded-sm"></div>
					<div className="w-full h-2 bg-slate-200 dark:bg-slate-600 mb-2 rounded-sm"></div>
					<div className="w-5/6 h-2 bg-slate-200 dark:bg-slate-600 mb-2 rounded-sm"></div>
				</div>
				<div className="absolute bottom-[20%] left-[15%] w-28 h-36 bg-white/80 dark:bg-slate-700/80 rounded-md shadow-lg transform -rotate-3 p-3">
					<div className="w-full h-3 bg-green-200 dark:bg-green-700 mb-2 rounded-sm"></div>
					<div className="w-2/3 h-2 bg-slate-200 dark:bg-slate-600 mb-2 rounded-sm"></div>
					<div className="w-full h-2 bg-slate-200 dark:bg-slate-600 mb-2 rounded-sm"></div>
					<div className="w-3/4 h-2 bg-slate-200 dark:bg-slate-600 mb-2 rounded-sm"></div>
				</div>
			</div>
			<div className="relative z-10 container px-4 md:px-6">
				<div className="flex flex-col items-center justify-center text-center space-y-4">
					<div className="inline-block p-2 bg-blue-100 rounded-full mb-4">
						<Sparkles className="size-6 text-blue-600" />
					</div>
					<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
						{title}
					</h1>
					<p className="text-muted-foreground md:text-xl max-w-[700px]">
						{description}
					</p>
					<div className="flex items-center animate-slide opacity-0">
						<NextLink
							href="/login"
							className={cn(
								buttonVariants({
									variant: "primary",
									size: "lg",
									className: "px-8 py-6 text-lg font-semibold mt-4",
								}),
							)}
						>
							Start Taking Notes
						</NextLink>
					</div>
				</div>
			</div>
		</section>
	);
}
