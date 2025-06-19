import { FloatButton } from "antd";
import {
	HeroSection,
	HowItWorksSection,
	FeaturesSection,
	ParallaxBackground,
	TestimonialsSection,
	ContributionTrackerSection,
	LoanRequestSection,
	InviteSection,
	CTASection,
	FAQSection,
	FooterCTA
} from "../features/homepage/components";

const Home = () => {
	return (
		<main>
			<HeroSection />
			<HowItWorksSection />
			<FeaturesSection />
			<ParallaxBackground />
			<TestimonialsSection />
			<ContributionTrackerSection />
			<LoanRequestSection />
			<InviteSection />
			<CTASection />
			<FAQSection />
			<FooterCTA />

			<FloatButton.BackTop visibilityHeight={200} style={{ bottom: 100, right: 20 }} />
		</main>
	);
};

export default Home;
