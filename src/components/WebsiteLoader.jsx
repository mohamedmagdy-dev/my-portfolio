// lib
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

// Store
import useLoaderStore from "../store/useLoaderStore";

export default function WebsiteLoader() {
  const updateLoaderState = useLoaderStore((state) => state.updateLoaderState);
  const updateAnimationState = useLoaderStore(
    (state) => state.updateAnimationState,
  );

  let rowCards = useRef(null);
  let revelBox = useRef(null);
  let revelBoxParent = useRef(null);

  useGSAP(() => {
    const windowHeight = window.innerHeight;
    const tl = gsap.timeline({
      onComplete: () => {
        updateLoaderState(false);
      },
    });
    tl.to(rowCards.current.children, {
      xPercent: gsap.utils.wrap([100, -100]),
      duration: 1.5,
      ease: "power4.inOut",
    });

    gsap.set(revelBox.current, {
      opacity: 1,
    });

    tl.from(revelBox.current, {
      duration: 2,
      delay: 0.5,
      ease: "expo.out",
      rotate: "45deg",
      y: windowHeight - revelBox.current.offsetHeight / 2,
      onComplete: () => {
        updateAnimationState(true);
      },
    });
    tl.to(revelBox.current, {
      width: "100%",
      height: "100%",
      ease: "power4.inOut",
      borderRadius: 0,
      duration: 1.2,
    });
    tl.to(revelBoxParent.current, {
      background: "var(--color-charcoal)",
    });
  }, []);
  return (
    <div>
      <div
        ref={rowCards}
        className="fixed inset-0 z-9 h-screen flex flex-col overflow-hidden"
      >
        <div className="w-screen flex-1 bg-charcoal"></div>
        <div className="w-screen flex-1 bg-charcoal"></div>
        <div className="w-screen flex-1 bg-charcoal"></div>
        <div className="w-screen flex-1 bg-charcoal"></div>
        <div className="w-screen flex-1 bg-charcoal"></div>
      </div>
      <div
        ref={revelBoxParent}
        className="mix-blend-lighten absolute z-8 size-full inset-0 bg-white overflow-hidden"
      >
        <div
          ref={revelBox}
          className="bg-charcoal w-50 h-70 lg:w-100 rounded-xl opacity-0 absolute -translate-1/2 left-1/2 top-1/2"
        ></div>
      </div>
    </div>
  );
}
