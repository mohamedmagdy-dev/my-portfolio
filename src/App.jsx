// Styles
import "./styles/App.css";

// Components
import WebsiteLoader from "./components/websiteLoader";
import MainContent from "./components/MainContent";
import HeroSection from "./components/HeroSection";

// Store
import useLoaderStore from "./store/useLoaderStore";

export default function App() {
  const loaderState = useLoaderStore((state) => state.isLoading);

  return (
    <>
      {loaderState && <WebsiteLoader />}
      <HeroSection />

      {!loaderState && <MainContent />}
    </>
  );
}
