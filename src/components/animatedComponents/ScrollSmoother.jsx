// lib
import { useGSAP } from "@gsap/react";
import { ScrollSmoother as sm } from "gsap/ScrollSmoother";
import { useLocation } from "react-router";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// store
import useScrollStore from "../../store/useScrollStore";
import useLoaderStore from "../../store/useLoaderStore";

export default function ScrollSmoother({ children, locationKey }) {
  const setScrollHandler = useScrollStore((state) => state.setScrollHandler);
  const isLoaderLoading = useLoaderStore((state) => state.isLoading);
  const location = useLocation();
  const activePath = locationKey || location.pathname;

  useGSAP(() => {
    const scrollSmoother = sm.create({
      ignoreMobileResize: true,
      normalizeScroll: true,
    });
    setScrollHandler(scrollSmoother);
  }, []);

  useGSAP(() => {
    const smoother = sm.get();
    if (smoother) {
      if (isLoaderLoading) {
        smoother.paused(true);
      } else {
        smoother.paused(false);
        smoother.scrollTo(0, false);
        // Defer refresh slightly so DOM has completely mounted new elements
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }
    }
  }, [isLoaderLoading, activePath]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
