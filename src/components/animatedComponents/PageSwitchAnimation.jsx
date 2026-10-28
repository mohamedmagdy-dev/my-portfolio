// lib
import { useRef } from "react";
import { useLocation } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// store
import useLoaderStore from "../../store/useLoaderStore";
import useScrollStore from "../../store/useScrollStore";

export default function PageSwitchAnimation() {
  const location = useLocation();
  const svgRef = useRef(null);
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);
  const isFirstRender = useRef(true);

  // Store
  const isLoaderLoading = useLoaderStore((state) => state.isLoading);
  const scrollHandler = useScrollStore((state) => state.scrollHandler);

  useGSAP(() => {
    const paths = [path1Ref.current, path2Ref.current];
    if (!paths[0] || !paths[1]) return;

    const numPoints = 10;
    const numPaths = paths.length;
    const delayPointsMax = 0.2;
    const delayPerPath = 0.15;
    const duration = 0.8;
    if (!isLoaderLoading) {
      const allPoints = [];
      for (let i = 0; i < numPaths; i++) {
        const pts = [];
        for (let j = 0; j < numPoints; j++) pts.push(0);
        allPoints.push(pts);
      }

      const render = (isClosing) => {
        for (let i = 0; i < numPaths; i++) {
          const path = paths[i];
          const points = allPoints[i];

          let d = "";
          if (!isClosing) {
            d += `M 0 0 H ${points[0]} C`;
            for (let j = 0; j < numPoints - 1; j++) {
              const p = ((j + 1) / (numPoints - 1)) * 100;
              const cp = p - 100 / (numPoints - 1) / 2;
              d += ` ${points[j]} ${cp} ${points[j + 1]} ${cp} ${points[j + 1]} ${p}`;
            }
            d += ` V 100 H 0 Z`;
          } else {
            d += `M 100 0 H ${points[0]} C`;
            for (let j = 0; j < numPoints - 1; j++) {
              const p = ((j + 1) / (numPoints - 1)) * 100;
              const cp = p - 100 / (numPoints - 1) / 2;
              d += ` ${points[j]} ${cp} ${points[j + 1]} ${cp} ${points[j + 1]} ${p}`;
            }
            d += ` V 100 H 100 Z`;
          }

          path.setAttribute("d", d);
        }
      };

      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      const tl = gsap.timeline({
        onStart: () => {
          scrollHandler?.paused?.(true);
        },
        onComplete: () => {
          scrollHandler?.paused?.(false);
        },
      });

      tl.set(svgRef.current, { pointerEvents: "auto" });

      for (let i = 0; i < numPaths; i++) {
        const pts = allPoints[i];
        const pathDelay = delayPerPath * (numPaths - i - 1);
        for (let j = 0; j < numPoints; j++) {
          const pointDelay = Math.random() * delayPointsMax;
          tl.to(
            pts,
            {
              [j]: 100,
              duration,
              ease: "power4.inOut",
              onUpdate: () => render(false),
            },
            pathDelay + pointDelay,
          );
        }
      }

      const phase1EndTime = duration + delayPerPath + delayPointsMax;

      tl.add(() => {
        for (let i = 0; i < numPaths; i++) {
          for (let j = 0; j < numPoints; j++) allPoints[i][j] = 0;
        }
      }, phase1EndTime);

      for (let i = 0; i < numPaths; i++) {
        const pts = allPoints[i];
        const pathDelay = delayPerPath * i;
        for (let j = 0; j < numPoints; j++) {
          const pointDelay = Math.random() * delayPointsMax;
          tl.to(
            pts,
            {
              [j]: 100,
              duration,
              ease: "power4.inOut",
              onUpdate: () => render(true),
            },
            phase1EndTime + pathDelay + pointDelay,
          );
        }
      }

      tl.set(svgRef.current, { pointerEvents: "none" });

      return () => {
        tl.kill();
        scrollHandler?.paused?.(false);
      };
    }
  }, [location.pathname, isLoaderLoading]);

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full z-9999 pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="pageSwitchGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#81a9fe" />
          <stop offset="100%" stopColor="#ece9e3" />
        </linearGradient>
        <linearGradient id="pageSwitchGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff6b4a" />
          <stop offset="100%" stopColor="#f6c177" />
        </linearGradient>
      </defs>

      <path ref={path1Ref} fill="url(#pageSwitchGrad2)" />
      <path ref={path2Ref} fill="url(#pageSwitchGrad1)" />
    </svg>
  );
}
