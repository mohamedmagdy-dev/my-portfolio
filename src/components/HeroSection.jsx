import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
export default function HeroSection() {
  const contentRevelElement = useRef(null);
  useGSAP(() => {
    let windowHeight = window.innerHeight;
    const contentRevelTl = gsap.timeline();

    gsap.set(contentRevelElement.current, {
      opacity: 1,
    });

    contentRevelTl.from(contentRevelElement.current, {
      delay: 0.5,
      opacity: 1,
      duration: 2.3,
      rotate: "45deg",
      y: windowHeight - contentRevelElement.current.offsetHeight / 2,
      ease: "expo.out",
    });

    contentRevelTl.to(contentRevelElement.current, {
      duration: 1.2,
      width: "100%",
      height: "100%",
      borderRadius: 0,
      ease: "power4.inOut",
    });

  });
  return (
    <div className="min-h-screen w-full bg-green-200 flex items-center justify-center">
      <h1 className="text-9xl">Hello Mego</h1>
      <div className="elementContainer size-full absolute inset-0 bg-white mix-blend-lighten">
        <div
          ref={contentRevelElement}
          className="element absolute opacity-0 w-50 h-70 lg:w-100 bg-black top-[50%] left-[50%] -translate-1/2 rounded-xl"
        ></div>
      </div>
    </div>
  );
}
