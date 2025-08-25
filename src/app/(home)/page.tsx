import { NextLink } from "@/components/ui/next-link";
import { BackgroundGrid } from "@/components/background-grid";
import {
	PageHeader,
	PageHeaderContainer,
	PageHeaderBody,
	PageHeaderHeading,
	PageHeaderDescription,
	PageHeaderActions,
} from "@/components/page-header";
import { Announcement } from "@/components/announcement";
import { SectionList } from "@/components/section-list";
import { Features } from "@/components/features";
import { CTA } from "@/components/cta";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
	title: "Home",
};

export default function HomePage() {
	return (
		<div className="relative min-h-screen flex flex-col overflow-hidden">
			<BackgroundGrid />
			<PageHeader>
				<PageHeaderContainer>
					<PageHeaderBody>
						<Announcement />
						<PageHeaderHeading>
							Organize and{" "}
							<span className="text-blue-500">manage with simple Kanban</span>{" "}
							workflow.
						</PageHeaderHeading>
						<PageHeaderDescription>
							<span className="opacity-70">
								taskthing provides the intuitive tools and visual workflow to
							</span>{" "}
							<span className="opacity-100">organize, track, and complete</span>{" "}
							<span className="opacity-60">your tasks efficiently.</span>
						</PageHeaderDescription>
						<PageHeaderActions className="px-6 md:px-0">
							<NextLink
								href="/login"
								className={cn(
									buttonVariants({
										size: "lg",
										className: "h-11 px-9 text-lg w-full md:w-auto",
									}),
								)}
							>
								Get started for free
							</NextLink>
							<NextLink
								href="#features"
								className={cn(
									buttonVariants({
										variant: "outline",
										size: "lg",
										className: "h-11 px-9 text-lg w-full md:w-auto group",
									}),
								)}
							>
								See features{" "}
								<Icons.arrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5 block md:hidden" />
							</NextLink>
						</PageHeaderActions>
					</PageHeaderBody>
				</PageHeaderContainer>
			</PageHeader>
			<SectionList
				id="features"
				title="Features"
				description="Built for speed and simplicity. Manage your projects with lightning-fast performance."
				className="relative z-10"
			>
				<Features />
			</SectionList>
			<section
				id="cta"
				className="mx-auto relative z-10 max-w-5xl px-6 md:px-0 py-12 md:py-24"
			>
				<div className="px-4 md:px-0">
					<CTA />
				</div>
			</section>
		</div>
	);
}
