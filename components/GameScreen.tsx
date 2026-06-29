"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FORMATIONS } from "@/lib/data";
import { useGame } from "@/lib/store";
import { useToast } from "@/lib/toast";
import DrawCard from "./DrawCard";
import FieldGrid from "./FieldGrid";
import SimulationCinema from "./SimulationCinema";

export default function GameScreen() {
  const {
    phase,
    mode,
    rerolls,
    current,
    spinning,
    slots,
    formationId,
    spin,
    reroll,
    selectFormation,
    runSimulation,
    goToScenarioSelect,
  } = useGame();
  const toast = useToast((s) => s.show);

  const [showCinema, setShowCinema] = useState(false);

  if (!phase || !mode) return null;

  const filled    = slots.filter(Boolean).length;
  const allFilled = filled === 12;

  const handleSimulate = () => {
    if (!allFilled) return;
    setShowCinema(true);
  };

  const handleReroll = () => {
    if (rerolls <= 0 || !current) return;
    reroll();
    toast(`Reroll usado! Restam ${rerolls - 1}`);
  };

  const activeFormation = FORMATIONS.find((f) => f.id === formationId) ?? FORMATIONS[0];

  return (
    <>
      <AnimatePresence>
        {showCinema && (
          <SimulationCinema
            flag={phase.flag}
            sel={phase.sel}
            adv={phase.adv}
            onDone={() => {
              setShowCinema(false);
              runSimulation();
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* ── Barra do cenário ─────────────────────────────────────── */}
        <section className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-line bg-panel p-4 shadow-sm">
          <div>
            <h2 className="text-base font-bold text-ink sm:text-lg">
              {phase.flag} {phase.sel} {phase.ano} — {phase.nome}
            </h2>
            <p className="mt-0.5 text-sm text-muted">{phase.desafio}</p>
          </div>
          <button
            onClick={goToScenarioSelect}
            className="rounded-lg border border-line bg-bg2 px-3 py-1.5 text-sm text-muted transition hover:border-slate-400 hover:text-ink"
          >
            ← Trocar cenário
          </button>
        </section>

        {/* ── Layout side-by-side ──────────────────────────────────── */}
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">

          {/* ── Esquerda: carta + controles ─────────────────────────── */}
          <section className="rounded-xl border border-line bg-panel p-4 shadow-sm">
            {/* Stats compactos */}
            <div className="mb-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted">
              <span>Modo: <span className="font-medium text-ink">{mode.nome}</span></span>
              <span>Rerolls: <span className="font-medium text-ink">{rerolls}</span></span>
              <span>Jogadores: <span className="font-medium text-ink">{filled}/12</span></span>
              <span>Resistência: <span className="font-medium text-ink">{phase.diff}</span></span>
            </div>

            <DrawCard />

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={spin}
                disabled={allFilled || spinning || !!current}
                className="btn-brand rounded-lg px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                🎰 Girar a Máquina
              </button>
              <button
                onClick={handleReroll}
                disabled={rerolls <= 0 || !current || spinning}
                className="rounded-lg border border-line bg-bg2 px-5 py-2.5 text-sm font-semibold transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                🔄 Reroll ({rerolls})
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-muted">
              {allFilled
                ? "Escalação completa — inicie a simulação!"
                : current
                  ? "Clique numa posição no campo à direita. Verde = afinidade (+10)."
                  : "Gire para sortear uma carta e encaixe na posição certa."}
            </p>

            {/* Botão de simulação — visível na coluna esquerda em desktop */}
            <div className="mt-4 hidden justify-center md:flex">
              <button
                onClick={handleSimulate}
                disabled={!allFilled}
                className="btn-brand w-full rounded-lg py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                🏟️ Iniciar Simulação
              </button>
            </div>
          </section>

          {/* ── Direita: campo ──────────────────────────────────────── */}
          <section className="rounded-xl border border-line bg-panel p-4 shadow-sm">
            {/* Seletor de formação */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
                {activeFormation.label}
              </h2>
              <div className="flex flex-wrap items-center gap-1.5">
                {FORMATIONS.map((f) => {
                  const locked = slots.some(Boolean) && f.id !== formationId;
                  return (
                    <button
                      key={f.id}
                      disabled={locked}
                      onClick={() => selectFormation(f.id)}
                      title={locked ? "Remova os jogadores para trocar de formação" : f.label}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                        f.id === formationId
                          ? "bg-brand text-white shadow-sm"
                          : locked
                            ? "cursor-not-allowed border border-line bg-bg2 text-muted opacity-30"
                            : "border border-line bg-bg2 text-muted hover:border-brand/60 hover:text-ink"
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
                {slots.some(Boolean) && (
                  <span className="text-[10px] text-muted">🔒</span>
                )}
              </div>
            </div>

            <FieldGrid />
          </section>
        </div>

        {/* Botão de simulação — apenas em mobile (escondido em md+) */}
        <div className="flex justify-center md:hidden">
          <button
            onClick={handleSimulate}
            disabled={!allFilled}
            className="btn-brand w-full rounded-lg py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            🏟️ Iniciar Simulação
          </button>
        </div>
      </motion.div>
    </>
  );
}
