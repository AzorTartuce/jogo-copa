"use client";

import { motion } from "framer-motion";
import { MODES, SCENARIOS } from "@/lib/data";
import { useGame } from "@/lib/store";
import DailyChallenge from "./DailyChallenge";

export default function ScenarioScreen() {
  const {
    selectedScenarioId,
    selectedModeId,
    selectScenario,
    selectMode,
    startGame,
  } = useGame();

  const ready = selectedScenarioId != null && selectedModeId != null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <DailyChallenge />

      <div className="flex items-center gap-3 py-1 text-sm text-muted">
        <span className="h-px flex-1 bg-line" />
        ou jogue um cenário livre
        <span className="h-px flex-1 bg-line" />
      </div>

      <section className="rounded-2xl border border-line bg-panel p-5">
        <h2 className="mb-4 text-xl font-bold">🌍 Escolha o Cenário Icônico</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SCENARIOS.map((s) => {
            const active = selectedScenarioId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => selectScenario(s.id)}
                className={`rounded-xl border bg-panel2 p-4 text-left transition hover:-translate-y-0.5 hover:border-brand ${
                  active ? "border-brand ring-2 ring-brand/60" : "border-line"
                }`}
              >
                <div className="text-3xl">{s.flag}</div>
                <h3 className="mt-1 font-bold">
                  {s.sel} {s.ano}
                </h3>
                <p className="mt-1 text-sm leading-snug text-muted">
                  {s.nome}
                  <br />
                  {s.desafio}
                </p>
                <span className="mt-2 inline-block rounded-full bg-line px-2.5 py-1 text-xs text-brand">
                  Resistência {s.diff}
                  {s.next ? " · campanha" : ""}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-panel p-5">
        <h2 className="mb-4 text-xl font-bold">⏳ Escolha a Tática de Tempo</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {MODES.map((m) => {
            const active = selectedModeId === m.id;
            return (
              <button
                key={m.id}
                onClick={() => selectMode(m.id)}
                className={`rounded-xl border bg-panel2 p-4 text-left transition hover:-translate-y-0.5 hover:border-brand ${
                  active ? "border-brand ring-2 ring-brand/60" : "border-line"
                }`}
              >
                <h3 className="font-bold">{m.nome}</h3>
                <p className="mt-1 text-sm leading-snug text-muted">{m.desc}</p>
                <span className="mt-2 inline-block rounded-full bg-line px-2.5 py-1 text-xs text-brand">
                  {m.rerolls} rerolls
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="flex justify-center">
        <button
          onClick={startGame}
          disabled={!ready}
          className="btn-brand rounded-xl px-6 py-3.5 text-base font-bold transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ▶ Entrar na Máquina do Tempo
        </button>
      </div>
    </motion.div>
  );
}
