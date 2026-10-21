// lib
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

export default function AboutMe() {
  const aboutMeRef = useRef(null);

  useGSAP(
    () => {
      const splitDesc = SplitText.create("p", {
        type: "words",
      });
      gsap.set(splitDesc.words, {
        opacity: 0.2,
      });

      gsap.to(splitDesc.words, {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: aboutMeRef.current,
          pin: true,
          start: "top top",
          scrub: 1,
        },
      });
    },
    { scope: aboutMeRef },
  );

  return (
    <section
      ref={aboutMeRef}
      className="px-3 lg:px-20  h-screen flex items-center justify-center"
    >
      <div>
        <h2 className="mb-10 text-accent font-main text-sm uppercase">
          (Hello)
        </h2>
        <p className="text-[clamp(1.5rem,4vw,4rem)] text-white font-main leading-relaxed md:text-center font-bold">
          I'm Mego — a creative developer who turns ideas into interactive
          experiences. I blend bold visuals, smooth motion and thoughtful
          details to build websites that feel different, move with purpose and
          leave a lasting <span className="text-accent">Impression.</span>
        </p>
      </div>
    </section>
  );
}
