// lib
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const selectedWork = [
  {
    id: 1,
    category: "Ecommerce",
    title: "Nest E-commerce",
    description: "Modern full-featured e-commerce web application.",
    image: "/public/images/projects/ecommerce.webp",
    projectLink: "https://nest-ecommerce-lovat.vercel.app/",
    githubLink: "https://github.com/mohamedmagdy-dev/Nest-Ecommerce",
  },
  {
    id: 2,
    category: "Shop",
    title: "GreenLeaf",
    description: "Curated online store for plant lovers.",
    image: "/public/images/projects/greenleaf.webp",
    projectLink: "https://online-plant-store-eight.vercel.app/",
    githubLink: "https://github.com/mohamedmagdy-dev/Online-plant-store",
  },
  {
    id: 3,
    category: "Landing Page",
    title: "Logitech G102",
    description: "Interactive & animated product landing page.",
    image: "/public/images/projects/g102.webp",
    projectLink: "https://g102-landing.vercel.app/",
    githubLink: "https://github.com/mohamedmagdy-dev/G102-Landing",
  },
  {
    id: 4,
    category: "Admin Dashboard",
    title: "Admin Dashboard",
    description: "E-commerce management & operations dashboard.",
    image: "/public/images/projects/dashboard.webp",
    projectLink: "https://ecommerce-dashboard-seven-omega.vercel.app/",
    githubLink: "https://github.com/mohamedmagdy-dev/Ecommerce-Dashboard",
  },
];

export default function SelectedWork() {
  const [activeWorkCard, setActiveWorkCard] = useState(1);
  const workImgPreview = useRef(null);
  const workContainer = useRef(null);
  useGSAP(() => {
    
    gsap.set(workImgPreview.current, {
      xPercent: -50,
      yPercent: -50,
      scale: 0.8,
      opacity: 0,
    });
    const xSetter = gsap.quickTo(workImgPreview.current, "x", {
      duration: 0.25,
      ease: "power3.out",
    });
    const ySetter = gsap.quickTo(workImgPreview.current, "y", {
      duration: 0.25,
      ease: "power3.out",
    });
    const handleWorkImgPreviewMove = (e) => {
      xSetter(e.clientX);
      ySetter(e.clientY);
    };
    const handleMouseEnter = () => {
      gsap.to(workImgPreview.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };
    const handleMouseLeave = () => {
      gsap.to(workImgPreview.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };
    const container = workContainer.current;
    container.addEventListener("mousemove", handleWorkImgPreviewMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleWorkImgPreviewMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  });
  const handleChangeActiveCard = (id) => {
    setActiveWorkCard(id);
  };

  return (
    <section className=" py-25 lg:py-50 px-3 lg:px-20 ">
      <h2 className="mb-10 text-muted font-main text-sm uppercase">
        Selected work (0{selectedWork.length})
      </h2>
      <div ref={workContainer} className="relative">
        {/* Project Details */}
        <div className=" border-y border-gray-300/20 flex-1 relative">
          {selectedWork.map((work) => {
            return (
              <a
                key={work.id}
                href={work.projectLink}
                target="_blank"
                onMouseEnter={() => {
                  handleChangeActiveCard(work.id);
                }}
              >
                <div className="group border-b border-gray-300/20 py-5 lg:py-15 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="group-hover:lg:ml-10 duration-300 flex items-center gap-10">
                    <span className="text-accent font-main text-sm">
                      0{work.id}
                    </span>
                    <div>
                      <h3 className="transition-[font-variation-settings] [font-variation-settings:'wdth'_100] group-hover:lg:[font-variation-settings:'wdth'_105]  group-hover:text-accent  duration-500 font-main mb-2 capitalize text-[clamp(3rem,10vw,5rem)] text-cream">
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
                </div>
              </a>
            );
          })}
        </div>
        <div
          ref={workImgPreview}
          className="hidden lg:block absolute top-0 left-0 pointer-events-none z-50 overflow-hidden rounded-xl  w-150 h-75"
        >
          <img
            className="w-full h-full object-contain rounded-xl  "
            src={selectedWork[activeWorkCard - 1].image}
            alt={selectedWork[activeWorkCard - 1].title}
          />
        </div>
      </div>
    </section>
  );
}
