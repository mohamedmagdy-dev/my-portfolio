// lib
import { useGSAP } from "@gsap/react";
import { ScrollSmoother as sm } from "gsap/ScrollSmoother";
import { useLocation } from "react-router";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// store
import useScrollStore from "../../store/useScrollStore";
export default function ScrollSmoother({ children }) {
  const setScrollHandler = useScrollStore((state) => state.setScrollHandler);
  const location = useLocation();
  useGSAP(() => {
    const scrollSmoother = sm.create({
      ignoreMobileResize: true,
      normalizeScroll: true,
    });
    setScrollHandler(scrollSmoother);
  });

    useGSAP(() => {
      const smoother = sm.get();
      if (smoother) {
        smoother.scrollTo(0, false);
        ScrollTrigger.refresh();
      }
    }, [location.pathname]);


  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
