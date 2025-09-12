import { ArrowUpRight } from "lucide-react";
import { MainLayout } from "@/components/main-layout";
import {
	PageHeader,
	PageHeaderBody,
	PageHeaderHeading,
	PageHeaderDescription,
	PageActions,
} from "@/components/page-header";
import { SectionList } from "@/components/section-list";
import { Features } from "@/components/features";
import { NextLink } from "@/components/ui/next-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
						<span className="bg-gradient-to-r from-blue-600 to-blue-400/90 bg-clip-text text-transparent">
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
										"group rounded-lg bg-blue-600 px-6 py-2 text-lg text-white transition-shadow hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40",
								}),
							)}
						>
							Get Started{" "}
							<ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
						</NextLink>
						<NextLink
							href="#features"
							className={cn(
								buttonVariants({
									variant: "outline",
									size: "lg",
									className:
										"rounded-lg border-blue-600 bg-transparent px-6 py-2 text-lg text-blue-600 hover:bg-blue-600 hover:text-white",
								}),
							)}
						>
							View Features
						</NextLink>
					</PageActions>
				</PageHeaderBody>
			</PageHeader>

			{/* Features Section */}
			<SectionList
				id="features"
				title="What's Different About Syntra?"
				description="Work smarter together with tools that don't get in the way."
			>
				<Features />
			</SectionList>
		</MainLayout>
	);
}
