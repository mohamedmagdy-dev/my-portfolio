import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";

const SVG_W = 3898;
const SVG_H = 891;
const PATH_D =
  "M0.398438 611.016C175.398 377.517 857.398 -285.484 1461.4 139.638C1911.53 456.46 2114.4 805.516 2679.4 611.016C3088.4 470.219 3704.54 -33.3124 4354.9 781.516C4700.9 1215.02 5305.6 1466.52 6108.4 328.516";

const TEXT_CREAM = "If our visions align, ";
const TEXT_GRAD = "let’s shape what’s next";
const TOTAL_CHARS = TEXT_CREAM.length + TEXT_GRAD.length;
const VERTICAL_OFFSET = 120; // Pushes the scrolling text down from the top edge

export default function WhatIsNext() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);
      const svg = q(".next-svg")[0];
      const path = q(".next-path")[0];
      const textElem = q(".next-text")[0];
      const tCream = q(".text-cream")[0];
      const tGrad = q(".text-grad")[0];
      const orb = q(".next-orb")[0];
      const intro = q(".next-intro")[0];
      const container = q(".next-container")[0];
      const footer = q(".next-footer")[0];

      if (
        !svg ||
        !path ||
        !textElem ||
        !tCream ||
        !tGrad ||
        !orb ||
        !container ||
        !footer
      )
        return;

      svg.style.aspectRatio = `${SVG_W} / ${SVG_H}`;

      tCream.textContent = TEXT_CREAM;
      tGrad.textContent = TEXT_GRAD + ".";
      const totalMeasured = textElem.getNumberOfChars();
      const charEndPositions = Array.from({ length: totalMeasured }, (_, i) => {
        const { x, y } = textElem.getEndPositionOfChar(i);
        return { x: x + 12, y: y - 14 };
      });
      tCream.textContent = "";
      tGrad.textContent = "";

      const startPt = path.getPointAtLength(0);
      const lastTextPt =
        charEndPositions[charEndPositions.length - 1] || startPt;

      let centerSvg = { x: SVG_W / 2, y: SVG_H / 2 };
      let footerCenterOffset = { x: 0, y: 0 };
      let maxRadius = 1000;

      const updateDimensions = () => {
        const cR = container.getBoundingClientRect();
        const sR = svg.getBoundingClientRect();
        const fR = footer.getBoundingClientRect();

        centerSvg.x = (cR.left + cR.width / 2 - sR.left) * (SVG_W / sR.width);
        centerSvg.y = (cR.top + cR.height / 2 - sR.top) * (SVG_H / sR.height);

        const footerCenterX = fR.left + fR.width / 2;
        const footerCenterY = fR.top + fR.height / 2;
        footerCenterOffset.x = (footerCenterX - sR.left) * (SVG_W / sR.width);
        footerCenterOffset.y = (footerCenterY - sR.top) * (SVG_H / sR.height);

        maxRadius = Math.hypot(fR.width / 2, fR.height / 2);
      };
      updateDimensions();

      const cam = {
        x: startPt.x - centerSvg.x,
        y: startPt.y - SVG_H / 2 - VERTICAL_OFFSET,
      };
      const setCamX = gsap.quickTo(cam, "x", {
        duration: 0.35,
        ease: "power2.out",
        onUpdate: () =>
          svg.setAttribute("viewBox", `${cam.x} ${cam.y} ${SVG_W} ${SVG_H}`),
      });
      const setCamY = gsap.quickTo(cam, "y", {
        duration: 0.35,
        ease: "power2.out",
      });

      const orbPos = { x: startPt.x, y: startPt.y };
      const setOrbX = gsap.quickTo(orbPos, "x", {
        duration: 0.25,
        ease: "power2.out",
        onUpdate: () => orb.setAttribute("cx", orbPos.x),
      });
      const setOrbY = gsap.quickTo(orbPos, "y", {
        duration: 0.25,
        ease: "power2.out",
        onUpdate: () => orb.setAttribute("cy", orbPos.y),
      });

      svg.setAttribute("viewBox", `${cam.x} ${cam.y} ${SVG_W} ${SVG_H}`);
      gsap.set(footer, {
        clipPath: "circle(0px at 50% 50%)",
        pointerEvents: "none",
      });

      let lastIndex = -1;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=5000",
        pin: container,
        scrub: true,
        onRefresh: updateDimensions,
        onUpdate: ({ progress: p }) => {
          if (intro) {
            const introP = gsap.utils.clamp(0, 1, (p - 0.02) / 0.06);
            intro.style.opacity = (1 - introP).toString();
            intro.style.visibility = introP >= 1 ? "hidden" : "visible";
          }

          const wp = gsap.utils.clamp(0, 1, (p - 0.08) / 0.58);

          const idx = Math.floor(wp * TOTAL_CHARS);
          if (idx !== lastIndex) {
            tCream.textContent = TEXT_CREAM.slice(
              0,
              Math.min(idx, TEXT_CREAM.length),
            );
            tGrad.textContent = TEXT_GRAD.slice(
              0,
              Math.max(0, idx - TEXT_CREAM.length),
            );
            lastIndex = idx;
          }

          let textX = startPt.x;
          let textY = startPt.y;

          if (charEndPositions.length > 0) {
            const floatIdx = wp * (charEndPositions.length - 1);
            const i1 = Math.floor(floatIdx);
            const i2 = Math.min(charEndPositions.length - 1, i1 + 1);
            const p1 = charEndPositions[i1] || startPt;
            const p2 = charEndPositions[i2] || p1;

            textX = gsap.utils.interpolate(p1.x, p2.x, floatIdx - i1);
            textY = gsap.utils.interpolate(p1.y, p2.y, floatIdx - i1);
          }

          setCamX(textX - centerSvg.x);
          setCamY(textY - SVG_H / 2 - VERTICAL_OFFSET);

          const footerPhase = gsap.utils.clamp(0, 1, (p - 0.68) / 0.32);
          const dropProgress = gsap.utils.clamp(0, 1, footerPhase / 0.45);
          const expandProgress = gsap.utils.clamp(
            0,
            1,
            (footerPhase - 0.45) / 0.55,
          );

          const footerCenterInSvg = {
            x: cam.x + footerCenterOffset.x,
            y: cam.y + footerCenterOffset.y,
          };

          const currentOrbX = gsap.utils.interpolate(
            lastTextPt.x,
            footerCenterInSvg.x,
            dropProgress,
          );
          const currentOrbY = gsap.utils.interpolate(
            lastTextPt.y,
            footerCenterInSvg.y,
            dropProgress,
          );

          if (expandProgress > 0) {
            const radius = expandProgress * maxRadius;
            footer.style.clipPath = `circle(${radius}px at 50% 50%)`;
            footer.style.pointerEvents = expandProgress > 0.3 ? "auto" : "none";
            gsap.set(orb, { autoAlpha: 1 - expandProgress * 2 });
          } else {
            footer.style.clipPath = "circle(0px at 50% 50%)";
            footer.style.pointerEvents = "none";

            if (footerPhase > 0) {
              gsap.set(orb, { autoAlpha: 1 });
              setOrbX(currentOrbX);
              setOrbY(currentOrbY);
            } else if (wp > 0.01) {
              gsap.set(orb, { autoAlpha: 1 });
              setOrbX(textX);
              setOrbY(textY);
            } else {
              gsap.set(orb, { autoAlpha: 0 });
            }
          }
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-dark-surface text-[#f5e7df]"
    >
      <div className="next-container relative w-full h-screen overflow-hidden flex flex-col justify-between p-6 md:p-8 gap-8">
        <div className="relative w-full flex-1 flex items-center justify-center overflow-visible">
          <div className="next-intro absolute z-10 flex flex-col items-center justify-center pointer-events-none select-none">
            <h2 className="text-[clamp(48px,7vw,120px)] font-bold tracking-tight leading-none text-[#f5e7df] text-nowrap">
              What’s next?
            </h2>
          </div>

          <svg
            className="next-svg absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none overflow-visible z-2"
            style={{ width: "300vw", height: "auto" }}
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="nextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="80%" stopColor="#f6c177" />
                <stop offset="85%" stopColor="#9b7cff" />
                <stop offset="100%" stopColor="#ff6b4a" />
              </linearGradient>
            </defs>

            <path
              className="next-path"
              id="nextMainPath"
              d={PATH_D}
              fill="none"
            />

            <text
              className="next-text select-none font-bold tracking-[-0.04em]"
              style={{ fontSize: "220px", fill: "#f5e7df" }}
            >
              <textPath href="#nextMainPath" textAnchor="start">
                <tspan className="text-cream" />
                <tspan className="text-grad" fill="url(#nextGrad)" />
              </textPath>
            </text>

            <circle
              className="next-orb"
              r="16"
              fill="#ff6b4a"
              style={{ opacity: 0 }}
            />
          </svg>
        </div>

        <footer
          className="next-footer relative w-full h-[45vh] mt-40 rounded-xl bg-linear-to-br from-[#9b7cff] via-[#ff6b4a] to-[#f6c177] text-white z-20 flex flex-col justify-between p-8 md:p-14 overflow-hidden shrink-0"
          style={{ clipPath: "circle(0px at 50% 50%)" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
            <div className="max-w-md">
              <p className="text-xs uppercase tracking-widest text-white/80 font-semibold mb-3">
                Available for hire
              </p>
              <h3 className="text-2xl md:text-5xl font-black font-main leading-tight text-white">
                Open to joining a team.
              </h3>
            </div>

            <div className="flex flex-row gap-12 md:gap-20">
              <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold uppercase tracking-wider text-white/70 mb-1">
                  Explore
                </span>
                <Link
                  to={"/about"}
                  className="text-sm md:text-base font-medium text-white hover:opacity-70 transition-opacity"
                >
                  About
                </Link>
                <Link
                  to={"/work"}
                  className="text-sm md:text-base font-medium text-white hover:opacity-70 transition-opacity"
                >
                  Projects
                </Link>
                <Link
                  to={"/contact"}
                  className="text-sm md:text-base font-medium text-white hover:opacity-70 transition-opacity"
                >
                  Contact Me
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold uppercase tracking-wider text-white/70 mb-1">
                  Contact
                </span>
                <a
                  href="mailto:mohamedmagdyelsayed7@gmail.com"
                  className="text-sm md:text-base font-medium text-white hover:opacity-70 transition-opacity"
                >
                  Email ↗
                </a>
                <a
                  href="https://github.com/mohamedmagdy-dev"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm md:text-base font-medium text-white hover:opacity-70 transition-opacity"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/mohamedmagdy-dev/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm md:text-base font-medium text-white hover:opacity-70 transition-opacity"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://www.instagram.com/mohamedmagdyelsayed7/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm md:text-base font-medium text-white hover:opacity-70 transition-opacity"
                >
                  Instagram ↗
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center pt-4 border-t border-white/20 text-xs md:text-sm font-medium text-white/80 relative z-10">
            <p>
              © {new Date().getFullYear()} Mohamed Magdy. All rights reserved.
            </p>
            <p className="hidden md:block text-white/60 text-xs">
              Crafted with Passion & Motion
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
