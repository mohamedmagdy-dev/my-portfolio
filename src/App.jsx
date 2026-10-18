// Styles
import "./styles/App.css";

// Components
import WebsiteLoader from "./components/WebsiteLoader";
import MainContent from "./components/MainContent";
import HeroSection from "./components/HeroSection";
import ScrollSmoother from "./components/animatedComponents/ScrollSmoother";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";

// Store
import useLoaderStore from "./store/useLoaderStore";

export default function App() {
  const loaderState = useLoaderStore((state) => state.isLoading);

  return (
    <>
      <CustomCursor />
      <Header />
      {loaderState && <WebsiteLoader />}
      <ScrollSmoother>
        <HeroSection />
        {!loaderState && <MainContent />}
      </ScrollSmoother>
    </>
  );
}
