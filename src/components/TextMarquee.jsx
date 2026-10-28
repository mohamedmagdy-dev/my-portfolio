import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
export default function TextMarquee() {
  const section = useRef(null);
  const textMarquee = useRef(null);

  useGSAP(
    () => {
      const splitText = new SplitText(textMarquee.current, {
        type: "chars,words",
      });

      const tl = gsap.timeline({
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          trigger: section.current,
          end: "+=3000",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          onLeave: () => {
            gsap.to(section.current, {
              paddingLeft: "30px",
              paddingRight: "30px",
              paddingBottom: "30px",
              ease: "none",
              overwrite: "auto",
            });
            gsap.to(`div`, {
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
              ease: "none",
              overwrite: "auto",
            });
          },
          onEnterBack: () => {
            gsap.to(section.current, {
              padding: "0px",
              overwrite: "auto",
            });
            gsap.to(`div`, {
              borderBottomLeftRadius: "0px",
              borderBottomRightRadius: "0px",
              overwrite: "auto",
            });
          },
        },
      });

      const scrollTween = tl.to(textMarquee.current, {
        xPercent: -130,
      });

      splitText.chars.forEach((char) => {
        gsap.from(char, {
          yPercent: "random(-150, 150)",
          rotation: "random(-20, 20)",
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: "left 100%",
            end: "left 30%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    {
      scope: section,
    },
  );
  return (
    <section
      className="bg-dark-surface overflow-hidden h-screen "
      ref={section}
    >
      <div className="flex items-center justify-end h-full overflow-hidden bg-cream text-charcoal text-main font-bold">
        <p
          ref={textMarquee}
          className="text-[clamp(4rem,10vw,9rem)] text-nowrap translate-x-full"
        >
          Code is how I <span className="text-accent">build</span> it.
          Creativity is how I make it{" "}
          <span className="text-accent">matter.</span>
        </p>
      </div>
    </section>
  );
}
