import { useEffect, useRef, useState } from "react";

const TEXT = "WELCOMEITZFIZZ";
const STAT_THRESHOLDS = [0.15, 0.32, 0.52, 0.7];

export default function ItzFizzHero() {
  const carRef = useRef(null);
  const hintRef = useRef(null);
  const letterRefs = useRef([]);
  const statRefs = useRef([]);
  const letterPositions = useRef([]);

  const progressRef = useRef(0); // 0 → 1 virtual scroll
  const targetProgress = useRef(0);

  const letters = TEXT.split("");

  // 🔹 Measure letters once
  const measureLetters = () => {
    letterPositions.current = letterRefs.current.map((el) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      return rect.left + rect.width / 2;
    });
  };

  // 🔹 Virtual scroll handler
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const onWheel = (e) => {
      targetProgress.current += e.deltaY * 0.0005;
      targetProgress.current = Math.max(0, Math.min(1, targetProgress.current));
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    measureLetters();

    return () => {
      window.removeEventListener("wheel", onWheel);
      document.body.style.overflow = "auto";
    };
  }, []);

  // 🔹 Animation loop (LERP smoothing)
  useEffect(() => {
    const animate = () => {
      // Smooth interpolation
      progressRef.current +=
        (targetProgress.current - progressRef.current) * 0.08;

      const progress = progressRef.current;

      // Car movement
      const startX = window.innerWidth * 0.04;
      const endX = window.innerWidth * 0.84;
      const carX = startX + (endX - startX) * progress;

      if (carRef.current) {
        carRef.current.style.transform = `translateX(${carX}px)`;
      }

      // Letter reveal
      const carRear = carX + 10;

      letterRefs.current.forEach((el, i) => {
        if (!el) return;

        if (carRear > letterPositions.current[i]) {
          el.classList.add("opacity-100", "translate-y-0", "scale-y-100");
          el.classList.remove("opacity-0", "translate-y-8", "scale-y-75");
        } else {
          el.classList.remove("opacity-100", "translate-y-0", "scale-y-100");
          el.classList.add("opacity-0", "translate-y-8", "scale-y-75");
        }
      });

      // Stats reveal
      statRefs.current.forEach((card, i) => {
        if (!card) return;

        if (progress >= STAT_THRESHOLDS[i]) {
          card.classList.add("opacity-100", "translate-y-0");
          card.classList.remove("opacity-0", "translate-y-6");
        } else {
          card.classList.remove("opacity-100", "translate-y-0");
          card.classList.add("opacity-0", "translate-y-6");
        }
      });

      // Hint fade
      if (hintRef.current) {
        hintRef.current.style.opacity = progress > 0.05 ? "0" : "1";
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="bg-[#0a0a0f] h-screen w-screen overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_60%,rgba(20,18,30,1)_0%,#0a0a0f_100%)] -z-10" />

      {/* Road */}
      <div className="absolute bottom-[28%] w-full h-[2px] bg-gradient-to-r from-transparent via-[#333] to-transparent" />

      {/* Stats */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[90%] max-w-[860px] grid grid-cols-2 gap-4 pointer-events-none">
        {[
          { num: "58%", label: "Increase in pick up point use", type: "up" },
          { num: "27%", label: "Increase in pick up point use", type: "up" },
          { num: "23%", label: "Decreased in customer phone calls", type: "down" },
          { num: "40%", label: "Decreased in customer phone calls", type: "down" },
        ].map((stat, i) => (
          <div
            key={i}
            ref={(el) => (statRefs.current[i] = el)}
            className="opacity-0 translate-y-6 transition-all duration-500 backdrop-blur-md border border-white/10 rounded-xl p-5 flex gap-4 items-center"
          >
            <div
              className={`text-3xl font-bebas ${
                stat.type === "up" ? "text-green-400" : "text-red-400"
              }`}
            >
              {stat.num}
            </div>
            <span className="text-xs text-gray-400">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* TEXT TRACK */}
      <div className="absolute bottom-[32%] left-0 w-full flex items-end pl-[6vw] pointer-events-none">
        {letters.map((ch, i) => (
          <span
            key={i}
            ref={(el) => (letterRefs.current[i] = el)}
            className={`font-bebas text-yellow-400 text-[clamp(60px,2vw,160px)] inline-block text-center
            ${
              ch === " "
                ? "w-[clamp(18px,3vw,48px)]"
                : "w-[clamp(36px,7vw,96px)]"
            }
            opacity-0 translate-y-8 scale-y-75 transition-all duration-300`}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </div>

      {/* CAR */}
      <div
        ref={carRef}
        className="absolute bottom-[calc(28%+4px)] left-0 will-change-transform"
      >
        <svg
          className="w-[clamp(120px,18vw,260px)]"
          viewBox="0 0 300 120"
          fill="none"
        >
          <ellipse cx="150" cy="108" rx="120" ry="8" fill="rgba(0,0,0,0.5)" />
          <path
            d="M20 80 Q20 65 35 62 L80 62 Q100 35 140 28 L200 28 Q240 28 260 50 L275 62 Q285 62 285 75 L285 90 Q270 98 250 98 L55 98 Q30 98 20 90 Z"
            fill="#1a1a2e"
            stroke="#2a2a4e"
            strokeWidth="1.5"
          />
          <circle cx="70" cy="98" r="17" fill="#0d0d15" />
          <circle cx="230" cy="98" r="17" fill="#0d0d15" />
        </svg>
      </div>

      {/* HINT */}
      <div
        ref={hintRef}
        className="absolute bottom-8 font-bebas text-[13px] tracking-[0.25em] text-gray-500 animate-pulse"
      >
        ↓ SCROLL TO DRIVE
      </div>
    </div>
  );
}