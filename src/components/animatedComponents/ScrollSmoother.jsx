// lib
import { useGSAP } from "@gsap/react";
import { ScrollSmoother as sm } from "gsap/ScrollSmoother";

// store
import useScrollStore from "../../store/useScrollStore";
export default function ScrollSmoother({ children }) {
  const setScrollHandler = useScrollStore((state) => state.setScrollHandler);
  useGSAP(() => {
    const scrollSmoother = sm.create({
      ignoreMobileResize: true,
      normalizeScroll: true,
    });
    setScrollHandler(scrollSmoother);
  });
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
