import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
export default function CustomCursor() {
  const cursorDot = useRef(null);
  const cursorOutline = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 767px)", () => {
      gsap.set(["body", "a", "button"], {
        cursor: "none",
      });
      const xSetter = gsap.quickSetter(cursorDot.current, "x", "px");
      const ySetter = gsap.quickSetter(cursorDot.current, "y", "px");

      const xQuickTo = gsap.quickTo(cursorOutline.current, "x", {
        duration: 0.3,
        ease: "power4",
      });
      const yQuickTo = gsap.quickTo(cursorOutline.current, "y", {
        duration: 0.3,
        ease: "power4",
      });

      const handleMouseCursor = (e) => {
        xSetter(e.clientX);
        ySetter(e.clientY);
        xQuickTo(e.clientX);
        yQuickTo(e.clientY);
      };

      window.addEventListener("mousemove", handleMouseCursor);
      return () => {
        gsap.set(["body", "a", "button"], {
          cursor: "auto",
        });
        window.removeEventListener("mousemove", handleMouseCursor);
      };
    });
    mm.add("(max-width: 766px)", () => {
      gsap.set([cursorDot.current, cursorOutline.current], {
        display: "none",
      });
    });
  });
  return (
    <>
      <div
        ref={cursorOutline}
        className="w-10 h-10 fixed top-0 left-0 pointer-events-none -translate-1/2 rounded-full border border-gray-300/30 z-99"
      ></div>
      <div
        ref={cursorDot}
        className="w-2 h-2 fixed top-0 left-0 pointer-events-none -translate-1/2 rounded-full bg-accent z-99"
      ></div>
    </>
  );
}
