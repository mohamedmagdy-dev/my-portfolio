// lib
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

// utils
import horizontalLoop from "../utils/horizontalLoop";

export default function HorizontalSlider() {
  const titleContainer = useRef(null);

  useGSAP(
    () => {
      const titles = gsap.utils.toArray(".title");
      const loop = horizontalLoop(titles, {
        paused: false,
        repeat: -1,
        speed: 0.7,
      });
    },
    {
      scope: titleContainer,
    },
  );

  const skills = [
    "React.js",
    "GSAP Animation",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Zustand",
    "Creative Dev",
    "Responsive UI",
    "React.js",
    "TypeScript",
    "Tailwind CSS",
    "Zustand",
    "Creative Dev",
    "Responsive UI",
  ];

  return (
    <section
      ref={titleContainer}
      className="py-8 border-b border-gray-300/20 overflow-hidden text-white font-extrabold italic text-5xl lg:text-6xl flex items-center gap-8 whitespace-nowrap select-none"
    >
      {skills.map((skill, index) => (
        <div key={index} className="title shrink-0 flex items-center gap-6">
          <span>{skill}</span>
          <span className="text-accent text-3xl not-italic">✦</span>
        </div>
      ))}
    </section>
  );
}
