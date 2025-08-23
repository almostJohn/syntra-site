import { NextLink } from "@/components/ui/next-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BackgroundGrid } from "@/components/background-grid";
import { Announcement } from "@/components/announcement";
import { Features } from "@/components/features";
import { CTA } from "@/components/cta";

export default function HomePage() {
	return (
		<div className="relative min-h-screen flex flex-col overflow-hidden">
			<BackgroundGrid />
			<div className="relative z-10 py-12 md:py-20">
				<div className="mx-auto max-w-7xl px-8 md:px-8">
					<div className="mx-auto max-w-4xl text-center">
						<div className="flex flex-col items-center">
							<div className="mb-5">
								<Announcement />
							</div>
							<h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
								Organize and{" "}
								<span className="text-blue-500">manage with simple Kanban</span>{" "}
								workflow
							</h1>
							<p className="mt-8 text-base text-pretty sm:text-xl/8 max-w-2xl">
								<span className="opacity-70">
									taskthing provides the intuitive tools and visual workflow to
								</span>{" "}
								<span className="opacity-100">
									organize, track, and complete
								</span>{" "}
								<span className="opacity-60">your tasks efficiently.</span>
							</p>
							<div className="flex flex-col gap-4 items-center w-full md:flex-row md:w-auto mt-8 opacity-0 animate-slide">
								<NextLink
									href="/login"
									className={cn(
										buttonVariants({
											size: "lg",
											className:
												"h-12 px-8 w-full md:w-auto text-lg font-semibold",
										}),
									)}
								>
									Get Started
								</NextLink>
								<NextLink
									href="#features"
									className={cn(
										buttonVariants({
											variant: "outline",
											size: "lg",
											className:
												"h-12 px-8 w-full md:w-auto text-lg font-semibold",
										}),
									)}
								>
									Features
								</NextLink>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Features />
			<CTA />
		</div>
	);
}
