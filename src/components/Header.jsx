// images
import logo from "../assets/images/logo.webp";

// lib
import { Link, NavLink } from "react-router";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";

// store
import useLoaderStore from "../store/useLoaderStore";
import useScrollStore from "../store/useScrollStore";

// constants
const links = ["home", "work", "about", "contact"];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuTl = useRef(null);

  const isLoaderLoading = useLoaderStore((state) => state.isLoading);
  const scrollHandler = useScrollStore((state) => state.scrollHandler);

  useGSAP(
    () => {
      menuTl.current = gsap
        .timeline({ paused: true })
        .to(".small-screen-navigation", {
          height: "130vh",
          paddingTop: "100px",
          duration: 0.6,
          ease: "expo.out",
        })
        .fromTo(
          ".small-screen-navigation span",
          {
            opacity: 0,
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            ease: "expo.out",
            duration: 0.6,
          },
          "-=0.3",
        );
    },
    { scope: headerRef },
  );

  useGSAP(() => {
    if (!menuTl.current) return;

    if (isMenuOpen) {
      menuTl.current.play();
      scrollHandler?.paused?.(true);
    } else {
      menuTl.current.reverse();
      scrollHandler?.paused?.(false);
    }
  }, [isMenuOpen]);

  // Header Animation
  useGSAP(() => {
    if (!isLoaderLoading) {
      gsap.to(headerRef.current, {
        yPercent: 100,
        ease: "expo",
        duration: 1,
      });
    }
  }, [isLoaderLoading]);

  // Close and open header while scroll animation
  useGSAP(() => {
    if (!isLoaderLoading) {
      Observer.create({
        type: "wheel,touch",
        onUp: () => {
          gsap.to(headerRef.current, {
            yPercent: 100,
            ease: "power3.out",
            duration: 1,
          });
        },
        onDown: () => {
          gsap.to(headerRef.current, {
            yPercent: 0,
            ease: "power3.out",
            duration: 1,
          });
        },
      });
    }
  }, [isLoaderLoading]);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header
      ref={headerRef}
      className={"fixed z-20 w-full -translate-y-full bg-linear-to-b"}
    >
      <div className=" px-3 lg:px-20 py-5 flex gap-2 justify-between items-center ">
        <Link to={"/"}>
          <img src={logo} className="w-60 " alt="Website logo" />
        </Link>

        <button
          onClick={handleToggleMenu}
          className="text-sm cursor-pointer lg:hidden flex items-center gap-2 text-cream border border-gray-300/20  py-2 px-3 rounded-full"
        >
          {!isMenuOpen && (
            <div className="flex flex-col gap-1 justify-center">
              <span className="w-4 h-0.5  bg-cream block "></span>
              <span className="w-4 h-0.5 bg-cream block"></span>
              <span className="w-4 h-0.5  bg-cream block"></span>
            </div>
          )}

          {isMenuOpen && (
            <div className="flex flex-col gap-1 justify-center">
              <span className="w-4 h-0.5  bg-cream block translate-y-0.5 rotate-45"></span>
              <span className="w-4 h-0.5  bg-cream block -rotate-45 -translate-y-1"></span>
            </div>
          )}

          {isMenuOpen ? "CLOSE" : "MENU"}
        </button>
        {/* Wide Screen Navigation */}
        <ul className="hidden lg:flex gap-4 text-cream  ">
          {links.map((el, index) => {
            return (
              <NavLink to={`/${el === "home" ? "" : el}`} key={index}>
                {({ isActive }) => {
                  return (
                    <li
                      className={`capitalize py-3 text-lg border-gray-300/20 overflow-hidden flex justify-between items-end gap-1 ${
                        isActive ? "text-accent" : "text-white"
                      }`}
                    >
                      <span>{el}</span>
                      <span className="text-sm text-muted">0{index + 1}</span>
                    </li>
                  );
                }}
              </NavLink>
            );
          })}
        </ul>

        {/* Small Screen Navigation */}
        <ul className="overflow-hidden small-screen-navigation -translate-y-25 flex flex-col lg:hidden absolute -z-10 top-full left-0 px-3 lg:px-20 w-full  h-0    text-cream bg-charcoal">
          {links.map((el, index) => {
            return (
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                to={`/${el === "home" ? "" : el}`}
                key={index}
              >
                {({ isActive }) => {
                  return (
                    <li
                      className={` capitalize py-5 text-7xl border-b border-gray-300/20 overflow-hidden flex justify-between items-end ${
                        isActive ? "text-accent" : "text-white"
                      }`}
                    >
                      <span className=" inline-block">{el}</span>
                      <span className="text-sm text-muted">0{index + 1}</span>
                    </li>
                  );
                }}
              </NavLink>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
