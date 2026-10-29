// lib
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

// utils
import horizontalLoop from "../utils/horizontalLoop";
import { getSliderProjects } from "../firebase/services/projectsService";

const fallbackProjects = [
  {
    id: 1,
    mobileImage:
      "/images/projects/mobile-size/nest-ecommerce-lovat.vercel.app_.webp",
    category: "E-Commerce",
    title: "Nest E-Commerce",
    projectLink: "https://nest-ecommerce-lovat.vercel.app/",
  },
  {
    id: 2,
    mobileImage:
      "/images/projects/mobile-size/online-plant-store-eight.vercel.app_.webp",
    category: "Shop",
    title: "GreenLeaf",
    projectLink: "https://online-plant-store-eight.vercel.app/",
  },
  {
    id: 3,
    mobileImage: "/images/projects/mobile-size/g102-landing.vercel.app_.webp",
    category: "Landing Page",
    title: "Logitech G102",
    projectLink: "https://g102-landing.vercel.app/",
  },
  {
    id: 4,
    mobileImage:
      "/images/projects/mobile-size/ecommerce-dashboard-seven-omega.vercel.app_.webp",
    category: "Dashboard",
    title: "Admin Dashboard",
    projectLink: "https://ecommerce-dashboard-seven-omega.vercel.app/",
  },
  {
    id: 5,
    mobileImage:
      "/images/projects/mobile-size/zync-space.vercel.app_login.webp",
    category: "Web Application",
    title: "Zync Space",
    projectLink: "https://zync-space.vercel.app/",
  },
  {
    id: 6,
    mobileImage:
      "/images/projects/mobile-size/youssef-portfolio-umber.vercel.app_.webp",
    category: "Portfolio",
    title: "Youssef Portfolio",
    projectLink: "https://youssef-portfolio-umber.vercel.app/",
  },
];

export default function HorizontalWorkSlider() {
  const [projects, setProjects] = useState(fallbackProjects);
  const HorizontalWorkSliderRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    getSliderProjects()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setProjects(data);
        }
      })
      .catch((err) => {
        console.warn("Could not load slider projects from Firestore:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useGSAP(
    () => {
      if (!projects || projects.length === 0) return;

      const workBoxes = gsap.utils.toArray(".work-box");
      if (workBoxes.length === 0) return;

      const loop = horizontalLoop(workBoxes, {
        draggable: true,
        paddingRight: 40,
        paused: true,
        center: true,
      });

      const proxy = loop.draggable.target;
      const clamp = gsap.utils.clamp(-5, 5);
      const skewSetter = gsap.quickSetter(workBoxes, "skewX", "deg");

      const trigger = ScrollTrigger.create({
        trigger: HorizontalWorkSliderRef.current,
        start: "top center",
        end: "bottom+=1000 bottom",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!loop.draggable.isDragging && !loop.draggable.isThrowing) {
            const velocity = self.getVelocity();
            gsap.to(loop, {
              totalTime: `+=${velocity * 0.001}`,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        },
      });

      let isSkewed = false;

      const tickerCallback = () => {
        if (loop.draggable.isDragging || loop.draggable.isThrowing) {
          const vx = InertiaPlugin.getVelocity(proxy, "x");
          const skew = clamp(vx / -300);

          skewSetter(skew);

          if (Math.abs(skew) > 0.001) {
            isSkewed = true;
          }
        } else if (isSkewed) {
          isSkewed = false;

          gsap.to(workBoxes, {
            skewX: 0,
            duration: 0.3,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      };

      gsap.ticker.add(tickerCallback);

      return () => {
        gsap.ticker.remove(tickerCallback);
        trigger?.kill();
        loop?.kill?.();
      };
    },
    {
      scope: HorizontalWorkSliderRef,
      dependencies: [projects],
    },
  );

  return (
    <section ref={HorizontalWorkSliderRef} className="py-25 lg:py-50 ">
      <div className="flex items-center gap-4 justify-between mb-10 text-muted text-sm uppercase px-3 lg:px-20 ">
        <span>(mobile eye)</span>
        <span>Drag or scroll</span>
      </div>
      <div className="flex gap-10 justify-start items-center overflow-hidden max-sm:px-5">
        {projects.map((project, idx) => {
          const imageSrc =
            project.mobileImage || project.imageUrl || project.desktopImage;
          const link = project.projectLink || project.link || "#";

          return (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="work-box"
              key={project.id || idx}
            >
              <div
                className={clsx(
                  " relative overflow-hidden rounded-sm h-150 w-screen sm:w-90 shrink-0 p-3 ",
                )}
              >
                <div className="h-full overflow-hidden rounded-sm">
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      className="w-full rounded-sm"
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-muted text-sm px-1">
                <span>{project.category}</span>
                <span>{project.title}</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
