"use client";

import { motion } from "framer-motion";
import { MODES } from "@/lib/data";
import { useGame } from "@/lib/store";

const MODE_META: Record<string, { icon: string; badge: string; badgeColor: string }> = {
  classico: { icon: "⚖️", badge: "Recomendado",   badgeColor: "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/40 dark:text-green-400 dark:border-green-700" },
  caotico:  { icon: "🎲", badge: "Mais divertido", badgeColor: "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-700" },
  historico:{ icon: "💀", badge: "Difícil",        badgeColor: "bg-red-100 text-red-600 border-red-300 dark:bg-red-900/40 dark:text-red-400 dark:border-red-700" },
};

const HOW_TO_PLAY = [
  { step: "01", title: "Escolha o cenário",   desc: "Selecione um dos 10 momentos icônicos do futebol mundial que você quer reescrever." },
  { step: "02", title: "Gire a máquina",      desc: "Sorteie cartas de Intervenção Temporal — cada uma traz um poder baseado em anedotas reais de jogadores lendários." },
  { step: "03", title: "Monte sua estratégia",desc: "Escale 11 jogadores + técnico no campo. Posições com afinidade de categoria dão bônus de Overall." },
  { step: "04", title: "Inicie a simulação",  desc: "Acompanhe a partida lance a lance e descubra se você conseguiu mudar a história." },
];

export default function HomeScreen() {
  const { selectMode, goToScenarioSelect, startDaily } = useGame();

  const handleMode = (id: string) => {
    selectMode(id as "classico" | "caotico" | "historico");
    goToScenarioSelect();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
    >
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.4, ease: "easeOut" }}
          className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-panel text-4xl shadow-sm"
        >
          ⚽
        </motion.div>

        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Máquina do Tempo
          <br />
          <span className="text-brand">do Futebol</span>
        </h1>

        <p className="mx-auto mt-3 max-w-md text-base text-muted">
          Reescreva os maiores traumas do futebol mundial. Monte sua equipe de
          intervenções temporais e mude o resultado das partidas mais icônicas da história.
        </p>

        {/* Desafio diário — destaque no hero */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 inline-flex flex-col items-center gap-3 sm:flex-row"
        >
          <button
            onClick={startDaily}
            className="btn-brand rounded-lg px-6 py-3 text-sm font-semibold transition"
          >
            📅 Jogar Desafio Diário
          </button>
          <button
            onClick={goToScenarioSelect}
            className="rounded-lg border border-line bg-panel px-6 py-3 text-sm font-semibold text-ink transition hover:border-slate-400"
          >
            🗺️ Escolher Cenário Livre
          </button>
        </motion.div>
      </div>

      {/* ── Como funciona ─────────────────────────────────────────── */}
      <div>
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted">
          Como funciona
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_TO_PLAY.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="rounded-xl border border-line bg-panel p-4 shadow-sm"
            >
              <span className="text-xs font-bold text-brand">{item.step}</span>
              <p className="mt-1 text-sm font-semibold text-ink">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Modos de jogo ─────────────────────────────────────────── */}
      <div>
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted">
          Modos de jogo
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {MODES.map((m, i) => {
            const meta = MODE_META[m.id];
            return (
              <motion.button
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                onClick={() => handleMode(m.id)}
                className="group rounded-xl border border-line bg-panel p-5 text-left shadow-sm transition hover:border-brand hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-3xl">{meta.icon}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${meta.badgeColor}`}>
                    {meta.badge}
                  </span>
                </div>

                <p className="mt-3 text-base font-bold text-ink">{m.nome}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{m.desc}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full bg-bg2 px-2.5 py-1 text-[11px] font-medium text-muted">
                    {m.rerolls} rerolls
                  </span>
                  <span className="text-xs font-semibold text-brand opacity-0 transition group-hover:opacity-100">
                    Jogar →
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
        <p className="mt-3 text-center text-xs text-muted">
          Clique em um modo para escolher o cenário e começar a jogar.
        </p>
      </div>
    </motion.div>
  );
}
