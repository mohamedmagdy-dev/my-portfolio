import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function TextAnimation({ delay = 0, children }) {
  const container = useRef();

  useGSAP(() => {
    document.fonts.ready.then(() => {
      const splitText = SplitText.create(container.current, { type: "chars" });
      gsap.from(splitText.chars, {
        opacity: 0,
        stagger: 0.1,
        z: -100,
        duration: 1,
        rotateX: 90,
        ease: "expo.out",
        transformOrigin: "bottom",
        delay: delay,
        onComplete: () => {
          splitText.revert();
        },
      });
    });
  }, []);

  return (
    <div
      ref={container}
      className="perspective-dramatic perspective-origin-top-center"
    >
      {children}
    </div>
  );
}
