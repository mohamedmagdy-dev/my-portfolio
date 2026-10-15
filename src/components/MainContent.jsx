// components
import ScrollSmoother from "./animatedComponents/ScrollSmoother";
import HeroSection from "./HeroSection";

export default function MainContent() {
  return (
    <ScrollSmoother>
      <div className="bg-charcoal">
        <HeroSection />
      </div>
    </ScrollSmoother>
  );
}
