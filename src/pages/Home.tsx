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
	StatsSection,
	TrustedBySection,
	AssetIntegrationSection,
	FooterCTA,
	AllCryptoMarketList
} from "../features/homepage/components";

const Home = () => {
	return (
		<main>
			<HeroSection />
			<HowItWorksSection />
			<FeaturesSection />
			<AllCryptoMarketList />
			<ParallaxBackground />
			<TestimonialsSection />
			<ContributionTrackerSection />
			<LoanRequestSection />
			<InviteSection />
			<CTASection />
			<StatsSection />
			<AssetIntegrationSection />
			<TrustedBySection />
			<FAQSection />
			<FooterCTA />
			<FloatButton.BackTop visibilityHeight={200} style={{ bottom: 120, right: 20 }} />
		</main>
	);
};

export default Home;
