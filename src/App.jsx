import "./styles/App.css";

// Components
import WebsiteLoader from "./components/websiteLoader";
import ScrollSmoother from "./components/animatedComponents/ScrollSmoother";
import HeroSection from "./components/HeroSection";

export default function App() {
  return (
    <>
      <WebsiteLoader />
      <ScrollSmoother>
        {/* <HeroSection /> */}
      </ScrollSmoother>
    </>
  );
}
