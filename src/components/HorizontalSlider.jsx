import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function HorizontalSlider() {
  const titleContainer = useRef(null);

  useGSAP(
    () => {
      const titles = gsap.utils.toArray(".title");
      const loop = horizontalLoop(titles, {
        paused: false,
        repeat: -1,
        speed: 0.7,
      });
      function horizontalLoop(items, config) {
        items = gsap.utils.toArray(items);
        config = config || {};
        let tl = gsap.timeline({
            repeat: config.repeat,
            paused: config.paused,
            defaults: { ease: "none" },
            onReverseComplete: () =>
              tl.totalTime(tl.rawTime() + tl.duration() * 100),
          }),
          length = items.length,
          startX = items[0].offsetLeft,
          times = [],
          widths = [],
          xPercents = [],
          curIndex = 0,
          pixelsPerSecond = (config.speed || 1) * 100,
          snap =
            config.snap === false
              ? (v) => v
              : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
          totalWidth,
          curX,
          distanceToStart,
          distanceToLoop,
          item,
          i;
        gsap.set(items, {
          // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
          xPercent: (i, el) => {
            let w = (widths[i] = parseFloat(
              gsap.getProperty(el, "width", "px"),
            ));
            xPercents[i] = snap(
              (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
                gsap.getProperty(el, "xPercent"),
            );
            return xPercents[i];
          },
        });
        gsap.set(items, { x: 0 });
        totalWidth =
          items[length - 1].offsetLeft +
          (xPercents[length - 1] / 100) * widths[length - 1] -
          startX +
          items[length - 1].offsetWidth *
            gsap.getProperty(items[length - 1], "scaleX") +
          (parseFloat(config.paddingRight) || 0);
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = (xPercents[i] / 100) * widths[i];
          distanceToStart = item.offsetLeft + curX - startX;
          distanceToLoop =
            distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
          tl.to(
            item,
            {
              xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
              duration: distanceToLoop / pixelsPerSecond,
            },
            0,
          )
            .fromTo(
              item,
              {
                xPercent: snap(
                  ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
                ),
              },
              {
                xPercent: xPercents[i],
                duration:
                  (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                immediateRender: false,
              },
              distanceToLoop / pixelsPerSecond,
            )
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        function toIndex(index, vars) {
          vars = vars || {};
          Math.abs(index - curIndex) > length / 2 &&
            (index += index > curIndex ? -length : length); // always go in the shortest direction
          let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
          if (time > tl.time() !== index > curIndex) {
            // if we're wrapping the timeline's playhead, make the proper adjustments
            vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
            time += tl.duration() * (index > curIndex ? 1 : -1);
          }
          curIndex = newIndex;
          vars.overwrite = true;
          return tl.tweenTo(time, vars);
        }
        tl.next = (vars) => toIndex(curIndex + 1, vars);
        tl.previous = (vars) => toIndex(curIndex - 1, vars);
        tl.current = () => curIndex;
        tl.toIndex = (index, vars) => toIndex(index, vars);
        tl.times = times;
        tl.progress(1, true).progress(0, true); // pre-render for performance
        if (config.reversed) {
          tl.vars.onReverseComplete();
          tl.reverse();
        }
        return tl;
      }
    },
    {
      scope: titleContainer,
    },
  );

  const skills = [
    "React.js",
    "GSAP Animation",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Zustand",
    "Creative Dev",
    "Responsive UI",
    "React.js",
    "TypeScript",
    "Tailwind CSS",
    "Zustand",
    "Creative Dev",
    "Responsive UI",
  ];

  return (
    <div
      ref={titleContainer}
      className="py-8 border-b border-gray-300/20 overflow-hidden text-white font-extrabold italic text-5xl lg:text-6xl flex items-center gap-8 whitespace-nowrap select-none"
    >
      {skills.map((skill, index) => (
        <div key={index} className="title shrink-0 flex items-center gap-6">
          <span>{skill}</span>
          <span className="text-accent text-3xl not-italic">✦</span>
        </div>
      ))}
    </div>
  );
}
