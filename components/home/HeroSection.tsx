"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "framer-motion";
import { useGame } from "@/lib/store";
import Stage3D from "./Stage3D";
import StarfieldCanvas from "./StarfieldCanvas";
import MagneticButton from "./MagneticButton";
import { scrollToSection } from "./homeUtils";

const SUBTITLE = "Volte no tempo e reescreva o placar da história.";

export default function HeroSection() {
  const startDaily = useGame((s) => s.startDaily);
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([".hero-title", ".hero-sub span", ".hero-cta", ".hero-badge"], {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.6 },
      )
        .fromTo(
          ".hero-title",
          { opacity: 0, filter: "blur(20px)", y: 10 },
          { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.2 },
          "-=0.2",
        )
        .fromTo(
          ".hero-sub span",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.04 },
          "-=0.6",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
          "-=0.3",
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2",
        );
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="hero"
      ref={root}
      className="stage-dark grain relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 text-center"
    >
      <StarfieldCanvas className="pointer-events-none absolute inset-0 h-full w-full" />

      {/* Elemento 3D central com profundidade */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Stage3D className="h-[60vh] w-[60vh] max-w-[560px] opacity-90" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <span className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-cyan-200 opacity-0">
          <span className="anim-pulse-glow h-1.5 w-1.5 rounded-full bg-cyan-300" />
          Máquina do Tempo do Futebol
        </span>

        <h1 className="hero-title font-display text-4xl font-bold leading-[1.05] text-white opacity-0 sm:text-6xl md:text-7xl">
          Reescreva o
          <br />
          <span className="text-gradient-gold">impossível</span>
        </h1>

        <p className="hero-sub mx-auto mt-6 max-w-md text-base text-slate-300 sm:text-lg">
          {SUBTITLE.split("").map((ch, i) => (
            <span key={i} className="inline-block opacity-0" style={{ whiteSpace: "pre" }}>
              {ch}
            </span>
          ))}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <MagneticButton
            onClick={() => scrollToSection("partidas")}
            ariaLabel="Jogar agora"
            className="hero-cta btn-gold rounded-full px-9 py-4 text-base font-bold uppercase tracking-wide opacity-0"
          >
            ⚽ Jogar Agora
          </MagneticButton>

          <MagneticButton
            onClick={startDaily}
            strength={10}
            tilt={8}
            ariaLabel="Jogar desafio diário"
            className="hero-cta rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white opacity-0 backdrop-blur transition hover:border-white/40"
          >
            📅 Desafio Diário
          </MagneticButton>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("partidas")}
        className="hero-scroll absolute bottom-8 left-1/2 z-10 -translate-x-1/2 opacity-0"
        aria-label="Rolar para baixo"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/30 p-1.5">
          <span className="anim-floaty h-2 w-1 rounded-full bg-white/70" />
        </span>
      </button>
    </section>
  );
}
