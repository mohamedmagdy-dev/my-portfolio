// lib
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// utils
import horizontalLoop from "../utils/horizontalLoop";
import { useRef } from "react";
import clsx from "clsx";

const projects = [
  {
    id: 1,
    imageUrl:
      "/images/projects/mobile-size/nest-ecommerce-lovat.vercel.app_.webp",
    category: "E-Commerce",
    title: "Nest E-Commerce",
    bgGradientFrom: "from-[#81a9fe]",
    bgGradientTo: "to-[#312e81]",
    link: "https://nest-ecommerce-lovat.vercel.app/",
  },
  {
    id: 2,
    imageUrl:
      "/images/projects/mobile-size/online-plant-store-eight.vercel.app_.webp",
    category: "Shop",
    title: "GreenLeaf",
    bgGradientFrom: "from-[#34d399]",
    bgGradientTo: "to-[#064e3b]",
    link: "https://online-plant-store-eight.vercel.app/",
  },
  {
    id: 3,
    imageUrl: "/images/projects/mobile-size/g102-landing.vercel.app_.webp",
    category: "Landing Page",
    title: "Logitech G102",
    bgGradientFrom: "from-[#fb923c]",
    bgGradientTo: "to-[#881337]",
    link: "https://g102-landing.vercel.app/",
  },
  {
    id: 4,
    imageUrl:
      "/images/projects/mobile-size/ecommerce-dashboard-seven-omega.vercel.app_.webp",
    category: "Dashboard",
    title: "Admin Dashboard",
    bgGradientFrom: "from-[#38bdf8]",
    bgGradientTo: "to-[#0f172a]",
    link: "https://ecommerce-dashboard-seven-omega.vercel.app/",
  },
  {
    id: 5,
    imageUrl: "/images/projects/mobile-size/zync-space.vercel.app_login.webp",
    category: "Web Application",
    title: "Zync Space",
    bgGradientFrom: "from-[#c084fc]",
    bgGradientTo: "to-[#3b0764]",
    link: "https://zync-space.vercel.app/",
  },
  {
    id: 6,
    imageUrl:
      "/images/projects/mobile-size/youssef-portfolio-umber.vercel.app_.webp",
    category: "Portfolio",
    title: "Youssef Portfolio",
    bgGradientFrom: "from-[#f472b6]",
    bgGradientTo: "to-[#4c0519]",
    link: "https://youssef-portfolio-umber.vercel.app/",
  },
];

export default function HorizontalWorkSlider() {
  const HorizontalWorkSliderRef = useRef(null);

  useGSAP(
    () => {
      // ScrollTrigger.create,

      const workBoxes = gsap.utils.toArray(".work-box");

      const loop = horizontalLoop(workBoxes, {
        draggable: true,
        paddingRight: 40,
        paused: true,
        center: true,
      });

      const proxy = loop.draggable.target;
      const clamp = gsap.utils.clamp(-5, 5);

      const skewSetter = gsap.quickSetter(workBoxes, "skewX", "deg");

      ScrollTrigger.create({
        trigger: HorizontalWorkSliderRef.current,
        start: "top center",
        end: "bottom+=1000 bottom",
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

      gsap.ticker.add(() => {
        if (loop.draggable.isDragging || loop.draggable.isThrowing) {
          const vx = InertiaPlugin.getVelocity(proxy, "x");
          skewSetter(clamp(vx / -300));
        } else {
          gsap.to(workBoxes, {
            skewX: 0,
            duration: 0.3,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      });
    },
    {
      scope: HorizontalWorkSliderRef,
    },
  );

  return (
    <section
      ref={HorizontalWorkSliderRef}
      className="py-25 lg:py-50 "
    >
      <div className="flex items-center gap-4 justify-between mb-10 text-muted text-sm uppercase px-3 lg:px-20 ">
        <span>(mobile eye)</span>
        <span>Drag or scroll</span>
      </div>
      <div className="flex gap-10 justify-start items-center overflow-hidden max-sm:px-5">
        {projects.map((project) => (
          <a
            href={project.link}
            target="_blank"
            className="work-box"
            key={project.id}
          >
            <div
              className={clsx(
                " relative overflow-hidden rounded-sm h-150 w-screen sm:w-90 shrink-0 p-3 ",
                project.bgGradientFrom,
                project.bgGradientTo,
              )}
            >
              <div className="h-full overflow-hidden rounded-sm">
                <img
                  src={project.imageUrl}
                  className="w-full rounded-sm"
                  alt={project.title}
                />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-muted text-sm px-1">
              <span>{project.category}</span>
              <span>{project.title}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
