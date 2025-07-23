import { NextLink } from "@/components/ui/next-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

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
			<div className="relative z-10 max-w-5xl mx-auto px-4 pt-10 md:pt-24 pb-24">
				<div className="border border-neutral-200 dark:border-neutral-700 p-8 md:p-12 backdrop-blur-sm">
					<div className="flex flex-col gap-6 items-center justify-center text-center">
						<h1 className="text-4xl font-bold leading-tight md:text-5xl">
							Organize and manage with simple Kanban workflow
						</h1>
						<p className="text-lg text-balance text-neutral-500 max-w-lg md:text-xl">
							Syntra provides the intuitive tools and visual workflow to
							organize, track, and complete your tasks efficiently.
						</p>
						<div className="flex flex-col w-full gap-4 items-center md:flex-row md:w-auto">
							<NextLink
								href="/login"
								className={cn(
									buttonVariants({
										size: "lg",
										className:
											"rounded-full text-lg h-12 px-8 font-bold w-full md:w-auto",
									}),
								)}
							>
								Get Started
							</NextLink>
							<a
								href="https://github.com/almostJohn/syntra-site"
								rel="noreferrer"
								target="_blank"
								className={cn(
									buttonVariants({
										variant: "outline",
										size: "lg",
										className:
											"rounded-full text-lg font-bold h-12 px-9 w-full md:w-auto group",
									}),
								)}
							>
								Open Source{" "}
								<Icons.arrowRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
