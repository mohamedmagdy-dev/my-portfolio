import { useEffect } from "react";
import { Link } from "react-router";

// store
import useScrollStore from "../store/useScrollStore";
import useLoaderStore from "../store/useLoaderStore";

const values = [
  {
    number: "01",
    title: "Motion with Purpose",
    desc: "I believe animations shouldn't just be eye candy. They should guide the user, provide meaningful feedback, and elevate the narrative of the product.",
  },
  {
    number: "02",
    title: "Engineering & Performance",
    desc: "A beautiful website is useless if it's slow. I prioritize clean component architecture, optimal asset loading, and smooth 60fps interactions.",
  },
  {
    number: "03",
    title: "Obsessive Attention to Detail",
    desc: "From subtle hover micro-interactions to pixel-perfect responsive layouts across devices, the magic always lives in the smallest nuances.",
  },
];

export default function AboutPage() {
  const scrollHandler = useScrollStore((state) => state.scrollHandler);
  const isSiteLoaderLoading = useLoaderStore((state) => state.isLoading);

  useEffect(() => {
    if (isSiteLoaderLoading) {
      scrollHandler?.paused?.(true);
    } else {
      scrollHandler?.paused?.(false);
    }
  }, [isSiteLoaderLoading, scrollHandler]);
  useEffect(() => {
    document.title = "About | Mohamed Magdy";
  }, []);

  return (
    <section className="min-h-screen bg-charcoal text-cream px-3 lg:px-20 pt-36 pb-24 selection:bg-accent selection:text-charcoal flex flex-col justify-between">
      {/* 1. Hero Headline */}
      <div className="max-w-6xl">
        <p className="text-accent font-main text-xs sm:text-sm uppercase tracking-widest font-semibold mb-6">
          (Who I Am)
        </p>
        <h1 className="text-[clamp(2.5rem,7vw,7.5rem)] font-bold font-main leading-[1.02] tracking-tight mb-8">
          Crafting digital experiences with <br className="hidden md:inline" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-accent via-cream to-[#ff6b4a]">
            logic and emotion.
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-16 border-y border-white/10 my-12">
        <div className="lg:col-span-4">
          <p className="text-accent text-xs uppercase tracking-widest font-main">
            (The Background)
          </p>
        </div>
        <div className="lg:col-span-8 flex flex-col gap-6 text-lg sm:text-2xl font-main font-medium leading-relaxed text-cream/90">
          <p>
            I’m{" "}
            <span className="text-white font-bold">Mohamed Magdy (Mego)</span>,
            a Creative Frontend Developer based in Alexandria, Egypt. I sit at
            the intersection between refined visual design and technical
            frontend engineering.
          </p>
          <p className="text-muted text-base sm:text-xl">
            My passion is turning static designs into living, breathing web
            products. I specialize in building highly interactive interfaces
            powered by React, modern JavaScript, and fluid GSAP physics —
            ensuring that every scroll, click, and transition feels natural and
            memorable.
          </p>
        </div>
      </div>

      <div className="py-12">
        <p className="text-accent text-xs uppercase tracking-widest font-main mb-10">
          (Core Philosophy)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div
              key={v.number}
              className="p-8 rounded-3xl bg-dark-surface/40 border border-white/10 hover:border-accent/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <span className="text-xs font-mono text-accent mb-8 block">
                {v.number}
              </span>
              <div>
                <h3 className="text-xl font-bold font-main text-cream mb-3 group-hover:text-accent transition-colors">
                  {v.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed font-main">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-10 md:p-16 rounded-3xl bg-dark-surface/60 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="text-accent text-xs uppercase tracking-widest font-main mb-2">
            (Interested in working together?)
          </p>
          <h3 className="text-2xl md:text-4xl font-bold font-main text-cream">
            Let’s craft something memorable.
          </h3>
        </div>
        <Link
          to="/contact"
          className="px-8 py-4 rounded-full bg-accent text-charcoal font-bold tracking-wide hover:bg-cream transition-all duration-300 shadow-lg shrink-0"
        >
          Get In Touch ↗
        </Link>
      </div>

      <div className="pt-16 mt-16 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted font-main">
        <p>© {new Date().getFullYear()} Mohamed Magdy</p>
        <p className="uppercase tracking-widest">Alexandria, Egypt</p>
      </div>
    </section>
  );
}
