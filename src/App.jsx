// Styles
import "./styles/App.css";

// Components
import WebsiteLoader from "./components/WebsiteLoader";
import HeroSection from "./components/HeroSection";
import ScrollSmoother from "./components/animatedComponents/ScrollSmoother";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import PageSwitchAnimation from "./components/animatedComponents/PageSwitchAnimation";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import HomePage from "./Pages/HomePage";
import WorkPage from "./Pages/WorkPage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import DashboardPage from "./Pages/DashboardPage";
import LoginPage from "./Pages/LoginPage";

// Store
import useLoaderStore from "./store/useLoaderStore";

// lib
import { useState, useCallback } from "react";
import { Route, Routes, useLocation } from "react-router";

export default function App() {
  const loaderState = useLoaderStore((state) => state.isLoading);
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);

  // Switch the rendered route EXACTLY when the curtains are fully covering the screen
  const handlePhase1Complete = useCallback(() => {
    setDisplayLocation(location);
  }, [location]);

  return (
    <>
      <CustomCursor />
      {loaderState && <WebsiteLoader />}
      <PageSwitchAnimation onPhase1Complete={handlePhase1Complete} />
      <Header />

      <ScrollSmoother locationKey={displayLocation.pathname}>
        <Routes location={displayLocation}>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                {!loaderState && <HomePage />}
              </>
            }
          />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ScrollSmoother>
    </>
  );
}
