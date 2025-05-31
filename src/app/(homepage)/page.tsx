import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import {
	HERO_SECTION_TITLE,
	HERO_SECTION_DESCRIPTION,
	FEATURE_SECTION_TITLE,
	FEATURE_SECTION_DESCRIPTION,
} from "@/lib/constants";

export default function HomePage() {
	return (
		<>
			<HeroSection
				title={HERO_SECTION_TITLE}
				description={HERO_SECTION_DESCRIPTION}
			/>
			<FeaturesSection
				title={FEATURE_SECTION_TITLE}
				description={FEATURE_SECTION_DESCRIPTION}
			/>
		</>
	);
}
