import { NextLink } from "@/components/ui/next-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
	return (
		<div className="relative min-h-screen overflow-hidden">
			<div
				className="absolute inset-0 opacity-30"
				style={{
					backgroundImage: `
						linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
          	linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
					`,
					backgroundSize: "60px 60px",
				}}
			/>
			<div
				className="absolute inset-0 opacity-20 hidden dark:block"
				style={{
					backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
					backgroundSize: "60px 60px",
				}}
			/>
			<div className="relative z-10 py-24 sm:pt-16 sm:pb-32">
				<div className="mx-auto max-w-7xl px-8 md:px-8">
					<div className="mx-auto max-w-4xl text-center">
						<div className="flex flex-col items-center">
							<div className="flex items-center justify-center gap-2 rounded-full mb-5 px-3 py-1 text-sm font-medium border border-neutral-300 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-700 shadow">
								<span className="text-xs font-bold">PH</span> proudly
								Filipino-founded
							</div>
							<h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
								Organize and{" "}
								<span className="text-blue-500">manage with simple Kanban</span>{" "}
								workflow
							</h1>
							<p className="mt-8 text-base text-pretty sm:text-xl/8 max-w-2xl">
								<span className="opacity-60">
									Syntra provides the intuitive tools and visual workflow to
								</span>{" "}
								<span className="opacity-100">
									organize, track, and complete
								</span>{" "}
								<span className="opacity-60">your tasks efficiently.</span>
							</p>
							<div className="flex items-center w-full md:w-auto mt-6">
								<NextLink
									href="/login"
									className={cn(
										buttonVariants({
											size: "lg",
											className: "h-12 px-8 w-full text-lg font-semibold",
										}),
									)}
								>
									Get Started
								</NextLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
