import { Main as MainLayout } from "@/components/layout/page/main";
import {
	PageHeader,
	PageHeaderBody,
	PageHeaderHeading,
	PageHeaderDescription,
	PageActions,
} from "@/components/layout/page/page-header";
import { SectionList } from "@/components/layout/page/section-list";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Features } from "@/components/features";
import { Analytics } from "@/components/analytics";

export const metadata = {
	title: "Home",
};

export default function HomePage() {
	return (
		<MainLayout>
			{/* Hero Section */}
			<PageHeader>
				<PageHeaderBody>
					<PageHeaderHeading>
						Transform Your{" "}
						<span className="from-scheme-primary to-scheme-foreground/80 bg-gradient-to-r bg-clip-text text-transparent">
							Workflow
						</span>
					</PageHeaderHeading>
					<PageHeaderDescription>
						Visualize, manage, and prioritize tasks effortlessly with our
						intuitive kanban-style workflow system. Stay organized and boost
						productivity like never before.
					</PageHeaderDescription>
					<PageActions className="animate-slide opacity-0">
						<NextLink
							href="/login"
							className={cn(
								buttonVariants({
									size: "lg",
									className:
										"hover:shadow-scheme-primary/60 bg-scheme-primary hover:bg-scheme-primary/90 group rounded-lg px-6 py-2 text-lg text-white transition-shadow hover:shadow-xl",
								}),
							)}
						>
							Get Started{" "}
							<Icons.arrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
						</NextLink>
						<NextLink
							href="/roadmap"
							className={cn(
								buttonVariants({
									variant: "outline",
									size: "lg",
									className:
										"border-scheme-primary text-scheme-primary hover:bg-scheme-primary rounded-lg bg-transparent px-6 py-2 text-lg transition-all hover:text-white",
								}),
							)}
						>
							Roadmap
						</NextLink>
					</PageActions>
					<Analytics />
				</PageHeaderBody>
			</PageHeader>

			{/* Features */}
			<SectionList
				id="features"
				title="What's Different About Syntra"
				description="Work smarter together with tools that don't get in the way."
			>
				<Features />
			</SectionList>
		</MainLayout>
	);
}
