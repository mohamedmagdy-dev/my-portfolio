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
import { Route, Routes } from "react-router";

export default function App() {
  const loaderState = useLoaderStore((state) => state.isLoading);

  return (
    <>
      <CustomCursor />
      {loaderState && <WebsiteLoader />}
      <PageSwitchAnimation />
      <Header />

      <ScrollSmoother>
        <Routes>
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
