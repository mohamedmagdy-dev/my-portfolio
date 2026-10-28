import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";

const steps = [
  "Discover & Define",
  "Design & Explore",
  "Build & Structure",
  "Animate & Interact",
  "Refine & Optimize",
  "Launch & Evolve",
];

export default function MyJourney() {
  const sectionRef = useRef(null);
  const headText = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.inOut",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=12000px",
          pin: true,
          scrub: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      const splitHeadText = new SplitText(headText.current, {
        type: "chars",
      });

      tl.from(splitHeadText.chars, {
        y: "random(-180,180)px",
        stagger: 0.001,
      });

      tl.to(headText.current, {
        scale: 0.1,
        y: "-100vh",
        delay: 0.2,
      });

      const stepsElements = gsap.utils.toArray(".journey-step");

      stepsElements.forEach((step, index) => {
        if (index === steps.length - 1) {
          tl.to(
            step,
            {
              bottom: "50%",
              color: "#1f1d1d",
            },
            "<50%",
          );
          tl.to(
            "div",
            {
              backgroundColor: "#ece9e3",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
            },
            "<",
          );
          tl.to(
            sectionRef.current,
            {
              padding: "30px",
            },
            "<",
          );
        } else {
          tl.to(
            step,
            {
              bottom: "50%",
            },
            "<",
          );
          tl.to(step, {
            scale: 0.1,
            y: "-100vh",
            delay: 0.2,
          });
        }
      });
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className=" h-screen bg-dark-surface font-main font-bold"
    >
      <div className="relative flex h-full items-center justify-center ">
        <h2 ref={headText} className="text-cream text-[clamp(3rem,10vw,15rem)]">
          My Journey
        </h2>

        {steps.map((step, index) => (
          <span
            key={index}
            className="journey-step absolute -bottom-full translate-y-1/2 text-cream text-[clamp(3rem,9vw,14rem)]"
          >
            {step}
          </span>
        ))}
      </div>
    </section>
  );
}
