"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { MODES, SCENARIOS } from "@/lib/data";
import { useGame } from "@/lib/store";
import type { GameMode } from "@/lib/types";
import TiltCard from "./TiltCard";

const MODE_ICON: Record<string, string> = { classico: "⚖️", caotico: "🎲", historico: "💀" };

export default function PartidasSection() {
  const { selectScenario, selectMode, startGame } = useGame();
  const [mode, setMode] = useState<GameMode["id"]>("classico");
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const play = (scenarioId: number) => {
    // zustand `set` é síncrono: startGame() já enxerga a seleção abaixo.
    selectMode(mode);
    selectScenario(scenarioId);
    startGame();
  };

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".partida-card",
        { opacity: 0, y: 60, rotateX: -8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".partidas-track", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".partidas-head",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 75%" },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="partidas" ref={root} className="relative bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="partidas-head text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
            Partidas Históricas
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-ink sm:text-5xl">
            Escolha a tragédia que vai{" "}
            <span className="text-gradient-brand">apagar</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Dez momentos que o futebol nunca esqueceu. Selecione seu modo e entre
            em campo para reescrever o resultado.
          </p>
        </div>

        {/* Seletor de modo */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                mode === m.id
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-line bg-panel text-muted hover:border-slate-400"
              }`}
            >
              <span className="mr-1.5">{MODE_ICON[m.id]}</span>
              {m.nome}
              <span className="ml-2 text-[11px] opacity-70">{m.rerolls} rerolls</span>
            </button>
          ))}
        </div>

        {/* Carrossel horizontal com snap */}
        <div className="partidas-track no-scrollbar snap-x-mandatory mt-10 flex gap-5 overflow-x-auto px-1 pb-6">
          {SCENARIOS.map((scn) => (
            <div key={scn.id} className="snap-center-item shrink-0 basis-[280px] sm:basis-[320px]">
              <TiltCard className="h-full rounded-2xl">
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-panel to-panel2 shadow-xl">
                  <div className="relative flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800 px-5 py-4 text-white">
                    <span className="text-4xl drop-shadow">{scn.flag}</span>
                    <div className="text-right">
                      <p className="font-display text-lg font-bold leading-none">{scn.sel}</p>
                      <p className="text-xs text-slate-300">{scn.ano}</p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm font-semibold text-ink">{scn.nome}</p>
                    <p className="mt-1 text-xs text-muted">vs {scn.adv}</p>
                    <p className="mt-3 flex-1 text-xs leading-relaxed text-muted">
                      {scn.desafio}
                    </p>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-[11px] font-medium text-muted">
                        <span>Resistência do adversário</span>
                        <span className="text-ink">{scn.diff}</span>
                      </div>
                      <div className="meter mt-1.5">
                        <i style={{ width: `${scn.diff}%` }} />
                      </div>
                    </div>

                    <button
                      onClick={() => play(scn.id)}
                      className="btn-brand mt-5 w-full rounded-xl py-2.5 text-sm font-bold transition"
                    >
                      Reescrever a história →
                    </button>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted">
          ← Arraste para ver todas as 10 partidas →
        </p>
      </div>
    </section>
  );
}
