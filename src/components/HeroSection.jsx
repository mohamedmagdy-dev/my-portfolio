// lib
import { Link } from "react-router";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";

// Store
import useLoaderStore from "../store/useLoaderStore";

export default function HeroSection() {
  const isMidAnimationTl = useLoaderStore((state) => state.isMidAnimationTl);
  const firstNameRef = useRef(null);
  const secondNameRef = useRef(null);
  const seeWorkButtonRef = useRef(null);

  // Intro Text Animation
  useGSAP(
    () => {
      const firstNameChars = SplitText.create(firstNameRef.current, {
        type: "chars",
        mask: "chars",
      });

      const secondNameChars = SplitText.create(secondNameRef.current, {
        type: "chars",
        mask: "chars",
      });

      gsap.set([firstNameChars.chars, secondNameChars.chars], {
        opacity: 0,
        fontVariationSettings: "'wght' 900,'wdth' 60,'slnt' 0",
      });

      if (isMidAnimationTl) {
        const tl = gsap.timeline();
        tl.to([firstNameChars.chars, secondNameChars.chars], {
          opacity: 1,
          delay: 0.3,
          ease: "power4.out",
        });
        tl.from(
          [firstNameChars.chars, secondNameChars.chars],
          {
            y: 400,
            stagger: 0.05,
            ease: "power4.out",
            duration: 1,
          },
          "<",
        );
        tl.to(
          [".hero-dec", ".hero-scroll-indicator", seeWorkButtonRef.current],
          {
            opacity: 1,
            stagger: 0.3,
          },
        );
      }

      const allChars = [...firstNameChars.chars, ...secondNameChars.chars];

      const handleEnter = (e) => {
        gsap.to(e.currentTarget, {
          fontVariationSettings: "'wght' 700, 'wdth' 120, 'slnt' 0",
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const handleLeave = (e) => {
        gsap.to(e.currentTarget, {
          fontVariationSettings: "'wght' 900, 'wdth' 60, 'slnt' 0",
          duration: 0.5,
          ease: "power2.out",
        });
      };

      allChars.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });

      return () => {
        allChars.forEach((el) => {
          el.removeEventListener("mouseenter", handleEnter);
          el.removeEventListener("mouseleave", handleLeave);
        });
      };
    },
    {
      dependencies: [isMidAnimationTl],
    },
  );

  // See Word Button Animation
  useGSAP(
    () => {
      const target = seeWorkButtonRef.current;
      const xTo = gsap.quickTo(target, "x", {
        duration: 0.5,
        ease: "elastic",
      });

      const yTo = gsap.quickTo(target, "y", {
        duration: 0.5,
        ease: "elastic",
      });

      const handleMouseMove = (e) => {
        const rect = target.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        const strength = 0.45;

        xTo(deltaX * strength);
        yTo(deltaY * strength);

        gsap.to(target, {
          borderColor: "var(--color-accent)",
          duration: 0.5,
          ease: "power4.out",
        });
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
        gsap.to(target, {
          borderColor: "var(--color-muted)",
          duration: 0.5,
          ease: "power4.out",
        });
      };

      target.addEventListener("mousemove", handleMouseMove);
      target.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        target.removeEventListener("mousemove", handleMouseMove);
        target.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: seeWorkButtonRef },
  );

  return (
    <section className="px-3 lg:px-20 pt-24 bg-charcoal font-main text-cream border-b border-gray-300/20 ">
      <div className="py-9 min-h-[calc(100vh-100px)] flex flex-col justify-between">
        <div className="flex justify-between items-center w-full text-muted max-sm:text-sm">
          <span>{"{Frontend Developer}"}</span>
          <span className="max-md:hidden">{"{Creative Developer}"}</span>
          <span>{"{Alexandria, Egypt}"}</span>
        </div>
        <h1 className="text-[clamp(3.8rem,15vw,14rem)] text-center leading-[1.2] tracking-wider">
          <div
            ref={firstNameRef}
            className=" md:text-left max-sm:text-nowrap"
            aria-label="Mohamed"
          >
            Mohamed
          </div>
          <div
            ref={secondNameRef}
            className="md:text-right max-sm:text-nowrap"
            aria-label="Magdy"
          >
            Magdy
          </div>
        </h1>
        <div className="lg:flex justify-between relative items-center w-full">
          <p
            className="hero-dec  text-xl font-bold md:w-100 opacity-0"
            aria-label="   I design & build interactive websites with a strong focus on detail
            From smooth animations to pixel-perfect interfaces, I turn ideas
            into digital experiences that feel as good as they look."
          >
            I design & build interactive websites with a strong focus on detail
            From smooth animations to pixel-perfect interfaces, I turn ideas
            into digital experiences that feel as good as they look.
          </p>
          <span className="opacity-0 hero-scroll-indicator max-lg:hidden text-muted text-sm absolute right-1/2 translate-x-1/2 bottom-4">
            ↓ SCROLL. GENTLY
          </span>
          <Link
            to={"/work"}
            ref={seeWorkButtonRef}
            className="opacity-0 border inline-block max-lg:mt-8 border-gray-300/20 rounded-full py-4 px-10 text-sm"
          >
            SEE THE WORK →
          </Link>
        </div>
      </div>
    </section>
  );
}
