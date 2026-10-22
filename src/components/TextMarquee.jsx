import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
export default function TextMarquee() {
  const section = useRef(null);
  const textMarquee = useRef(null);

  useGSAP(() => {
    const splitText = new SplitText(textMarquee.current, {
      type: "chars,words",
    });

    const scrollTween = gsap.to(textMarquee.current, {
      xPercent: -130,
      ease: "none",
      scrollTrigger: {
        trigger: section.current,
        end: "+=3000",
        scrub: true,
        pin: true,
      },
    });

    splitText.chars.forEach((char) => {
      gsap.from(
        char,
        {
          yPercent: "random(-200, 200)",
          rotation: "random(-20, 20)",
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: "left 100%",
            end: "left 30%",
            scrub: 1,
          },
        },
        0,
      );
    });
  });
  return (
    <section
      className="flex items-center justify-end h-screen overflow-hidden bg-cream text-charcoal text-main font-bold"
      ref={section}
    >
      <p
        ref={textMarquee}
        className="text-[clamp(4rem,10vw,9rem)] text-nowrap translate-x-full"
      >
        I create experiences at the intersection of{" "}
        <span className="text-accent">design</span> and
        <span className="text-accent">code.</span>
      </p>
    </section>
  );
}
