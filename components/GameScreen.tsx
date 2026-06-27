"use client";

import { motion } from "framer-motion";
import { useGame } from "@/lib/store";
import { useToast } from "@/lib/toast";
import DrawCard from "./DrawCard";
import SlotGrid from "./SlotGrid";

export default function GameScreen() {
  const {
    phase,
    mode,
    rerolls,
    current,
    spinning,
    slots,
    spin,
    reroll,
    runSimulation,
    goToScenarioSelect,
  } = useGame();
  const toast = useToast((s) => s.show);

  if (!phase || !mode) return null;

  const filled = slots.filter(Boolean).length;
  const allFilled = filled === 5;

  const handleReroll = () => {
    if (rerolls <= 0 || !current) return;
    reroll();
    toast(`Reroll usado! Restam ${rerolls - 1}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <section className="rounded-2xl border border-line bg-panel p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold sm:text-xl">
              {phase.flag} {phase.sel} {phase.ano} — {phase.nome}
            </h2>
            <p className="text-sm text-muted">Desafio: {phase.desafio}</p>
          </div>
          <button
            onClick={goToScenarioSelect}
            className="rounded-xl border border-line px-3.5 py-2 text-sm transition hover:border-brand"
          >
            ↩ Trocar Cenário
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-panel p-5">
        <div className="mb-2 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-muted">
          <span>
            Modo: <b className="text-ink">{mode.nome}</b>
          </span>
          <span>
            Rerolls: <b className="text-ink">{rerolls}</b>
          </span>
          <span>
            Slots: <b className="text-ink">{filled}</b>/5
          </span>
          <span>
            Resistência: <b className="text-ink">{phase.diff}</b>
          </span>
        </div>

        <DrawCard />

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={spin}
            disabled={allFilled || spinning || !!current}
            className="btn-brand rounded-xl px-5 py-3 font-bold transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40"
          >
            🎰 Girar a Máquina do Tempo
          </button>
          <button
            onClick={handleReroll}
            disabled={rerolls <= 0 || !current || spinning}
            className="rounded-xl border border-line px-5 py-3 font-bold transition hover:border-brand disabled:cursor-not-allowed disabled:opacity-40"
          >
            🔄 Reroll ({rerolls})
          </button>
        </div>
        <p className="mt-2.5 text-center text-[13px] text-muted">
          {allFilled
            ? "Todos os slots preenchidos! Inicie a simulação."
            : current
              ? "Encaixe num slot vazio — slots em verde dão bônus de afinidade (+12). Ou use um Reroll."
              : "Sorteie uma carta e encaixe no slot certo para ganhar bônus de afinidade e combos."}
        </p>
      </section>

      <section className="rounded-2xl border border-line bg-panel p-5">
        <h2 className="mb-4 text-xl font-bold">🎯 Linha do Tempo — 5 Slots</h2>
        <SlotGrid />
      </section>

      <div className="flex justify-center">
        <button
          onClick={runSimulation}
          disabled={!allFilled}
          className="btn-brand rounded-xl px-6 py-3.5 text-base font-bold transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40"
        >
          🏟️ Iniciar Simulação
        </button>
      </div>
    </motion.div>
  );
}
