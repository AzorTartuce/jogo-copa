"use client";

import { motion } from "framer-motion";
import { MODES, SCENARIOS } from "@/lib/data";
import { useGame } from "@/lib/store";
import DailyChallenge from "./DailyChallenge";

export default function ScenarioScreen() {
  const { selectedScenarioId, selectedModeId, selectScenario, selectMode, startGame } =
    useGame();

  const ready = selectedScenarioId != null && selectedModeId != null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <DailyChallenge />

      <div className="flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-line" />
        ou jogue um cenário livre
        <span className="h-px flex-1 bg-line" />
      </div>

      {/* Cenários */}
      <section className="rounded-xl border border-line bg-panel p-5 shadow-sm">
        <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider text-muted">
          Cenário Icônico
        </h2>
        <p className="mb-4 text-xs text-muted">Escolha o momento histórico que quer reescrever.</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SCENARIOS.map((s) => {
            const active = selectedScenarioId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => selectScenario(s.id)}
                className={`rounded-lg border p-4 text-left transition hover:border-brand/60 hover:shadow-sm ${
                  active
                    ? "border-brand bg-green-50 ring-1 ring-brand/40 dark:bg-green-950/20"
                    : "border-line bg-panel hover:bg-bg2"
                }`}
              >
                <div className="text-2xl">{s.flag}</div>
                <p className="mt-1.5 text-sm font-semibold text-ink">
                  {s.sel} {s.ano}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-muted">{s.nome}</p>
                <span className="mt-2 inline-block rounded-full bg-bg2 px-2 py-0.5 text-[10px] font-medium text-muted">
                  Resist. {s.diff}{s.next ? " · campanha" : ""}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Modos */}
      <section className="rounded-xl border border-line bg-panel p-5 shadow-sm">
        <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider text-muted">
          Tática de Tempo
        </h2>
        <p className="mb-4 text-xs text-muted">Quantidade de re-sorteios disponíveis.</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {MODES.map((m) => {
            const active = selectedModeId === m.id;
            return (
              <button
                key={m.id}
                onClick={() => selectMode(m.id)}
                className={`rounded-lg border p-4 text-left transition hover:border-brand/60 hover:shadow-sm ${
                  active
                    ? "border-brand bg-green-50 ring-1 ring-brand/40 dark:bg-green-950/20"
                    : "border-line bg-panel hover:bg-bg2"
                }`}
              >
                <p className="text-sm font-semibold text-ink">{m.nome}</p>
                <p className="mt-1 text-xs leading-snug text-muted">{m.desc}</p>
                <span className="mt-2 inline-block rounded-full bg-bg2 px-2 py-0.5 text-[10px] font-medium text-muted">
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
          className="btn-brand rounded-lg px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          ▶ Entrar na Máquina do Tempo
        </button>
      </div>
    </motion.div>
  );
}
