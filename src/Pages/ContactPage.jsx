import { useEffect } from "react";

const socialLinks = [
  {
    name: "GitHub",
    label: "Code & Projects",
    href: "https://github.com/mohamedmagdy-dev",
  },
  {
    name: "LinkedIn",
    label: "Professional Profile",
    href: "https://www.linkedin.com/in/mohamedmagdy-dev/",
  },
  {
    name: "Instagram",
    label: "Creative & Stories",
    href: "https://www.instagram.com/mohamedmagdyelsayed7/",
  },
];

export default function ContactPage() {
  const email = "mohamedmagdyelsayed7@gmail.com";

  useEffect(() => {
    document.title = "Contact | Mohamed Magdy";
  }, []);



  return (
    <section className="min-h-screen bg-charcoal text-cream px-3 lg:px-20 pt-36 pb-20 flex flex-col justify-between selection:bg-accent selection:text-charcoal">
      {/* 1. Main Headline */}
      <div>
        <h1 className="text-[clamp(2.5rem,7vw,7.5rem)] font-bold font-main leading-[1.02] tracking-tight mb-8">
          Have an idea? <br />
          <span className="text-muted hover:text-cream transition-colors duration-500">
            Let’s make it happen.
          </span>
        </h1>
      </div>

      <div className="my-10 py-10 border-y border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
        <div>
          <p className="text-accent text-xs uppercase tracking-widest font-main mb-2">
            Direct Reach
          </p>
          <a
            href={`mailto:${email}`}
            className="text-[clamp(1.5rem,3.5vw,3.5rem)] font-bold font-main text-cream group-hover:text-accent transition-colors duration-300 break-all"
          >
            {email}
          </a>
        </div>
      </div>

      <div className="my-6">
        <p className="text-accent text-xs uppercase tracking-widest font-main mb-4">
          (Find Me Elsewhere)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group p-6 rounded-2xl bg-dark-surface/50 border border-white/10 hover:border-accent/60 hover:bg-dark-surface transition-all duration-300 flex items-center justify-between"
            >
              <div>
                <p className="text-lg font-bold font-main text-cream group-hover:text-accent transition-colors">
                  {item.name}
                </p>
                <p className="text-xs text-muted mt-1">{item.label}</p>
              </div>
              <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted group-hover:text-accent group-hover:border-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-white/10">
        <div>
          <p className="text-accent text-xs uppercase tracking-widest font-main mb-2">
            (Location & Time)
          </p>
          <p className="text-xl font-bold font-main text-cream">
            Alexandria, Egypt
          </p>
          <p className="text-sm text-muted mt-1">
            UTC / GMT +2 · Eastern European Time
          </p>
        </div>

        <div>
          <p className="text-accent text-xs uppercase tracking-widest font-main mb-2">
            (Frontend & Engineering Services)
          </p>
          <p className="text-base font-medium text-cream leading-relaxed">
            Modern React & Next.js Architecture · High-Performance Web Apps ·
            Fluid GSAP Micro-Interactions · Responsive & Pixel-Perfect UI/UX
            Implementation · Clean & Scalable Codebase
          </p>
        </div>
      </div>

      <div className="pt-12 mt-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted font-main">
        <p>© {new Date().getFullYear()} Mohamed Magdy</p>
        <p className="uppercase tracking-widest">
          Designed & Developed with Passion
        </p>
      </div>
    </section>
  );
}
