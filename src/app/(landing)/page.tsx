import { ArrowUpRight } from "lucide-react";
import { MainLayout } from "@/components/main-layout";
import {
	PageActions,
	PageHeader,
	PageHeaderBody,
	PageHeaderDescription,
	PageHeaderHeading,
} from "@/components/page-header";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import { Announcement } from "@/components/announcement";
import { SectionList } from "@/components/section-list";
import { Features } from "@/components/features";
import { CTASection } from "@/components/cta-section";

export const metadata = {
	title: "Home",
};

export default function HomePage() {
	return (
		<MainLayout>
			{/* Hero Section */}
			<PageHeader>
				<PageHeaderBody>
					<Announcement />
					<PageHeaderHeading>
						Build Something
						<span className="block text-blue-600">Amazing Today</span>
					</PageHeaderHeading>
					<PageHeaderDescription>
						Visualize, manage, and prioritize tasks effortlessly with our
						intuitive kanban-style workflow system. Stay organized and boost
						productivity like never before.
					</PageHeaderDescription>
					<PageActions>
						<NextLink
							href="/login"
							className={cn(
								"group inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-6 py-2 text-lg font-semibold whitespace-nowrap text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30",
							)}
						>
							Get Started For Free{" "}
							<ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
						</NextLink>
					</PageActions>
				</PageHeaderBody>
			</PageHeader>

			{/* Features Section */}
			<SectionList
				id="features"
				title="Everything You Need to Succeed"
				description="Work smarter together with tools that don't get in the way."
			>
				<Features />
			</SectionList>

			{/* CTA Section */}
			<CTASection />
		</MainLayout>
	);
}
