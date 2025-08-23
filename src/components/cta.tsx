import { Icons } from "./icons";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { NextLink } from "./ui/next-link";

export function CTA() {
	return (
		<div className="mx-auto relative z-10 max-w-6xl px-6 md:px-0 py-12 md:py-24">
			<div className="rounded-lg p-12 bg-neutral-800 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-800 shadow-sm">
				<div className="flex flex-col justify-center gap-4 text-center">
					<h3 className="text-2xl font-bold leading-snug md:text-3xl">
						Ready to Streamline Your Workflow?
					</h3>
					<p className="text-base text-pretty">
						Start organizing your projects today with our blazing-fast kanban
						system. No setup required.
					</p>
					<div className="flex flex-col items-center justify-center w-full gap-2 mt-6 md:flex-row md:w-auto">
						<NextLink
							href="/login"
							className={cn(
								buttonVariants({
									className:
										"bg-neutral-100 w-full md:w-auto text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100 hover:bg-neutral-100/90 dark:hover:bg-neutral-800/90",
								}),
							)}
						>
							Get Started for Free
						</NextLink>
						<NextLink
							href="#features"
							className={cn(
								buttonVariants({
									variant: "link",
									className: "group w-full md:w-auto",
								}),
							)}
						>
							Explore Features{" "}
							<Icons.arrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
						</NextLink>
					</div>
				</div>
			</div>
		</div>
	);
}
