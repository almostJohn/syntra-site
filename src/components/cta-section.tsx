import { cn } from "@/lib/utils";
import { NextLink } from "./ui/next-link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
	return (
		<section id="call-to-action" className="py-20 lg:py-32">
			<div className="mx-auto max-w-5xl px-6 sm:px-4">
				<div className="relative overflow-hidden rounded-md bg-gradient-to-br from-blue-600 to-blue-400 p-12 text-center lg:p-20">
					<div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-10" />

					<div className="relative z-10">
						<h2 className="mb-6 text-3xl font-bold text-balance text-white md:text-4xl lg:text-5xl">
							Ready to get started?
						</h2>
						<p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-pretty text-white/90">
							Transform the way your team works — Syntra makes task management
							simple, visual, and effective.
						</p>
						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<NextLink
								href="/login"
								className={cn(
									"bg-background hover:bg-background/90 group inline-flex items-center justify-center gap-2 rounded px-6 py-2 text-lg font-semibold whitespace-nowrap text-blue-600 transition-all duration-300",
								)}
							>
								Get Started Now{" "}
								<ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
							</NextLink>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
