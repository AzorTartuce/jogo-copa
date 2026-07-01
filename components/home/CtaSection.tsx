"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { useGame } from "@/lib/store";
import Stage3D from "./Stage3D";
import GoldParticles from "./GoldParticles";
import MagneticButton from "./MagneticButton";
import { scrollToSection } from "./homeUtils";

export default function CtaSection() {
  const { goToScenarioSelect, startDaily } = useGame();
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-title",
        { opacity: 0, filter: "blur(16px)", scale: 0.9 },
        {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 70%" },
        },
      );
      gsap.fromTo(
        ".cta-sub, .cta-actions",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 65%" },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="cta"
      ref={root}
      className="stage-dark grain relative flex min-h-[90svh] items-center justify-center overflow-hidden px-4 text-center"
    >
      <GoldParticles className="pointer-events-none absolute inset-0 h-full w-full" />

      {/* Troféu 3D sutil ao fundo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70">
        <Stage3D variant="trophy" className="h-[50vh] w-[50vh] max-w-[480px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="cta-title font-display text-4xl font-bold leading-tight text-white sm:text-6xl md:text-7xl">
          O passado espera.
          <br />
          <span className="text-gradient-gold">Você vai mudá-lo?</span>
        </h2>

        <p className="cta-sub mx-auto mt-6 max-w-md text-lg text-slate-300">
          Escolha uma partida, sorteie suas lendas e prove que o impossível era
          só uma questão de tempo.
        </p>

        <div className="cta-actions mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <MagneticButton
            onClick={goToScenarioSelect}
            ariaLabel="Começar a jogar"
            className="btn-gold rounded-full px-10 py-5 text-lg font-bold uppercase tracking-wide"
          >
            ⚽ Começar Agora
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollToSection("hero")}
            strength={10}
            tilt={8}
            ariaLabel="Voltar ao topo"
            className="rounded-full border border-white/20 bg-white/5 px-8 py-5 text-lg font-semibold text-white backdrop-blur transition hover:border-white/40"
          >
            ↑ Voltar ao topo
          </MagneticButton>
        </div>

        <button
          onClick={startDaily}
          className="mt-6 text-sm text-slate-400 underline-offset-4 transition hover:text-white hover:underline"
        >
          ou jogue o Desafio Diário de hoje →
        </button>
      </div>
    </section>
  );
}
