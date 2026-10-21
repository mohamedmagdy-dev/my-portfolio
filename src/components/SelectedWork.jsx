// lib
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const selectedWork = [
  {
    id: 1,
    category: "Ecommerce",
    title: "Nest E-commerce",
    description: "Modern full-featured e-commerce web application.",
    image: "/images/projects/ecommerce.webp",
    projectLink: "https://nest-ecommerce-lovat.vercel.app/",
    githubLink: "https://github.com/mohamedmagdy-dev/Nest-Ecommerce",
  },
  {
    id: 2,
    category: "Shop",
    title: "GreenLeaf",
    description: "Curated online store for plant lovers.",
    image: "/images/projects/greenleaf.webp",
    projectLink: "https://online-plant-store-eight.vercel.app/",
    githubLink: "https://github.com/mohamedmagdy-dev/Online-plant-store",
  },
  {
    id: 3,
    category: "Landing Page",
    title: "Logitech G102",
    description: "Interactive & animated product landing page.",
    image: "/images/projects/g102.webp",
    projectLink: "https://g102-landing.vercel.app/",
    githubLink: "https://github.com/mohamedmagdy-dev/G102-Landing",
  },
  {
    id: 4,
    category: "Admin Dashboard",
    title: "Admin Dashboard",
    description: "E-commerce management & operations dashboard.",
    image: "/images/projects/dashboard.webp",
    projectLink: "https://ecommerce-dashboard-seven-omega.vercel.app/",
    githubLink: "https://github.com/mohamedmagdy-dev/Ecommerce-Dashboard",
  },
];

export default function SelectedWork() {
  const workContainer = useRef(null);
  let firstEnter;

  useGSAP(
    () => {
      gsap.set(".img-preview", {
        xPercent: -50,
        yPercent: -50,
      });

      gsap.utils.toArray(".project-container").forEach((el) => {
        const image = el.querySelector(".img-preview");
        const xSetter = gsap.quickTo(image, "x", {
          duration: 0.4,
          ease: "power3",
        });

        const ySetter = gsap.quickTo(image, "y", {
          duration: 0.4,
          ease: "power3",
        });

        const align = (e) => {
          if (firstEnter) {
            xSetter(e.offsetX, e.offsetX);
            ySetter(e.offsetY, e.offsetY);
            firstEnter = false;
          } else {
            xSetter(e.offsetX);
            ySetter(e.offsetY);
          }
        };

        const startFollow = () => el.addEventListener("mousemove", align);
        const stopFollow = () => el.removeEventListener("mousemove", align);

        const fade = gsap.to(image, {
          autoAlpha: 1,
          duration: 0.1,
          ease: "none",
          paused: true,
          onReverseComplete: stopFollow,
        });

        el.addEventListener("mouseenter", (e) => {
          firstEnter = true;
          fade.play();
          startFollow();
          align(e);
        });

        el.addEventListener("mouseleave", () => {
          fade.reverse();
        });
      });
    },
    {
      scope: workContainer,
    },
  );

  return (
    <section className=" pt-25 lg:pt-50 px-3 lg:px-20">
      <h2 className="mb-10 text-muted font-main text-sm uppercase">
        Selected work (0{selectedWork.length})
      </h2>
      <div ref={workContainer}>
        {/* Project Details */}
        <div className=" border-y border-gray-300/20 flex-1">
          {selectedWork.map((work) => {
            return (
              <a key={work.id} href={work.projectLink} target="_blank">
                <div className="relative project-container group border-b border-gray-300/20 py-5 lg:py-15 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="group-hover:lg:ml-10 duration-300 flex items-center gap-10">
                    <span className="text-accent font-main text-sm">
                      0{work.id}
                    </span>
                    <div>
                      <h3 className="transition-[font-variation-settings] [font-variation-settings:'wdth'_100] group-hover:lg:[font-variation-settings:'wdth'_105]  group-hover:text-accent  duration-500 font-main mb-2 capitalize text-[clamp(2rem,10vw,5rem)] text-cream">
                        {work.title}
                      </h3>
                      <p className="uppercase text-sm text-muted ">
                        {work.description}
                      </p>
                    </div>
                  </div>
                  <span className="max-md:block max-md:text-center self-end max-md:mt-10 text-cream text-sm mr-3 lg:opacity-0 lg:group-hover:opacity-100 group-hover:mr-0 duration-300">
                    VIEW PROJECT↝
                  </span>
                  <div className="img-preview opacity-0 hidden  lg:block absolute top-0 left-0 -translate-1/2 pointer-events-none z-50 overflow-hidden rounded-xl w-150 h-75">
                    <img
                      className="w-full h-full object-contain rounded-xl"
                      src={work.image}
                      alt={work.title}
                    />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
