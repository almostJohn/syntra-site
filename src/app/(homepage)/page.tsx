import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
	return (
		<>
			<HeroSection
				title="Capture Your Ideas Effortlessly"
				description={siteConfig.description}
			/>
			<FeaturesSection
				title="Everything You Need for Better Notes"
				description="Our platform combines powerful features with intuitive design to make note-taking a breeze."
			/>
		</>
	);
}
