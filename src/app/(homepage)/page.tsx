import { HeroSection } from "@/components/public/sections/hero-section";
import { HERO_SECTION_TITLE, HERO_SECTION_DESCRIPTION } from "@/lib/constants";

export default function HomePage() {
	return (
		<>
			<HeroSection
				title={HERO_SECTION_TITLE}
				description={HERO_SECTION_DESCRIPTION}
			/>
		</>
	);
}
