// Videos
import video from "../assets/videos/VideoRevel.mp4";

// Lib
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function VideoRevel() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.to("svg", {
        scale: 60,
        transformOrigin: "center 54%",
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "1500px",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-white"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={video}
      />

      <svg
        viewBox="-139.15 -61.5 320 180"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      >
        <defs>
          <mask id="mego-cutout-mask">
            <rect x="-1000" y="-1000" width="3000" height="3000" fill="white" />
            <path
              fill="black"
              d="M9 46L4.50 46L4.50 11L11.15 11L20.85 33.15L30.40 11L37.20 11L37.20 46L32.45 46L32.45 17.05L23.10 38.10L18.40 38.10L9 17.05L9 46Z"
            />
          </mask>
        </defs>

        <rect
          x="-1000"
          y="-1000"
          width="3000"
          height="3000"
          fill="#ffffff"
          mask="url(#mego-cutout-mask)"
        />
      </svg>
    </section>
  );
}
