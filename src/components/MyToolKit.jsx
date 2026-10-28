import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const frontendTools = [
  {
    name: "HTML",
    description: "Core Web",
    bg: "#E34F26",
    text: "#FFFFFF",
  },
  {
    name: "CSS",
    description: "Core Web",
    bg: "#1572B6",
    text: "#FFFFFF",
  },
  {
    name: "JavaScript",
    description: "Language",
    bg: "#F7DF1E",
    text: "#000000",
  },
  {
    name: "Tailwind",
    description: "CSS Framework",
    bg: "#06B6D4",
    text: "#FFFFFF",
  },
  {
    name: "GSAP",
    description: "Animations",
    bg: "#0A0A0A",
    text: "#88CE02",
  },
  {
    name: "React",
    description: "UI Library",
    bg: "#20232A",
    text: "#61DAFB",
  },
  {
    name: "Zustand",
    description: "State Management",
    bg: "#292524",
    text: "#F97316",
  },
  {
    name: "TypeScript",
    description: "Type System",
    bg: "#3178C6",
    text: "#FFFFFF",
  },
  {
    name: "Git & GitHub",
    description: "Version Control",
    bg: "#F05032",
    text: "#FFFFFF",
  },
  {
    name: "Vite & npm",
    description: "Build Tools",
    bg: "#646CFF",
    text: "#FFFFFF",
  },
  {
    name: "Figma",
    description: "UI/UX Design",
    bg: "#0ACF83",
    text: "#FFFFFF",
  },
];

export default function MyToolKit() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".frontend-tool");
      if (!cards.length || !cardsContainerRef.current) return;

      const scrollDistance = cards[cards.length - 1].offsetLeft + 16;

      gsap.to(cardsContainerRef.current, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-dark-surface p-10 overflow-hidden">
      <div
        ref={cardsContainerRef}
        className="relative flex gap-10 shrink-0 items-center my-auto h-screen "
      >
        <h2 className="font-bold text-cream text-[clamp(2.5rem,10vw,10rem)] font-main text-nowrap shrink-0">
          My Toolkit
        </h2>
        {frontendTools.map((tool) => {
          return (
            <div key={tool.name} className="frontend-tool shrink-0">
              <div
                style={{
                  backgroundColor: tool.bg,
                }}
                className={
                  "w-[calc(100vw-48px)] md:w-100 h-140 rounded-2xl p-6 flex items-center justify-center"
                }
              >
                <div className="my-auto text-center">
                  <h3
                    className={`text-5xl md:text-7xl font-bold font-main mb-5`}
                    style={{ color: tool.text }}
                  >
                    {tool.name}
                  </h3>
                  <span
                    className={`text-xl rounded-full px-6 py-2 `}
                    style={{ color: tool.bg, backgroundColor: tool.text }}
                  >
                    {tool.description}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
