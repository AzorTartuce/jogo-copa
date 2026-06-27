"use client";

import { motion } from "framer-motion";
import { buildDailyShare } from "@/lib/daily";
import { useGame } from "@/lib/store";
import { useToast } from "@/lib/toast";
import type { NarrativeLine } from "@/lib/types";
import Leaderboard from "./Leaderboard";

const LINE_COLOR: Record<NarrativeLine["kind"], string> = {
  info: "text-brand font-semibold",
  good: "text-emerald-300",
  bad: "text-rose-300",
  neutral: "text-amber-200",
  end: "text-ink font-bold",
};

export default function ResultScreen() {
  const { phase, result, daily, dailyRecord, dailyStreak, nextPhase, goToScenarioSelect } =
    useGame();
  const toast = useToast((s) => s.show);

  if (!phase || !result) return null;

  const { win, base, affinityBonus, comboBonus, total, golsCasa, golsAdv, lines } =
    result;
  const hasNext = !daily && win && !!phase.next;
  const hasBonus = affinityBonus > 0 || comboBonus > 0;

  const share = () => {
    const txt =
      daily && dailyRecord
        ? buildDailyShare(dailyRecord, dailyStreak)
        : `${win ? "Salvei" : "Tentei salvar"} ${phase.sel} de ${phase.ano} na Máquina do Tempo do Futebol! Overall: ${total}/500 ⚽🕰️ #MáquinaDoTempo`;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: "Máquina do Tempo do Futebol", text: txt }).catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(txt);
      toast("Resultado copiado para a área de transferência!");
    } else {
      toast(txt);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <section className="rounded-2xl border border-line bg-panel p-5">
        <h2
          className={`text-center text-2xl font-black sm:text-3xl ${
            win ? "text-gold" : "text-rose-400"
          }`}
        >
          {win
            ? `✨ VOCÊ SALVOU ${phase.sel.toUpperCase()} DE ${phase.ano}!`
            : "💔 A HISTÓRIA SE REPETIU..."}
        </h2>

        <div className="my-2 text-center text-2xl font-black sm:text-3xl">
          {phase.flag} {phase.sel}{" "}
          <span className="text-brand">{golsCasa}</span> x{" "}
          <span className="text-rose-400">{golsAdv}</span> {phase.adv}
        </div>

        <div className="mb-3 text-center">
          <div className="text-lg">
            Pontuação Final: <b className="text-2xl text-brand">{total}</b>
          </div>
          {hasBonus ? (
            <div className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-muted">
              <span>Base {base}/500</span>
              {affinityBonus > 0 && (
                <span className="text-emerald-300">Afinidade +{affinityBonus}</span>
              )}
              {comboBonus > 0 && (
                <span className="text-emerald-300">Combos +{comboBonus}</span>
              )}
            </div>
          ) : (
            <div className="mt-1 text-sm text-muted">Base {base}/500 · sem bônus</div>
          )}
          {result.combos.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {result.combos.map((c) => (
                <span
                  key={c.name}
                  title={c.desc}
                  className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300"
                >
                  🔗 {c.name} +{c.value}
                </span>
              ))}
            </div>
          )}
        </div>

        {daily && dailyRecord && (
          <div className="mb-3 rounded-xl border border-brand/40 bg-bg2/60 p-3 text-center">
            <div className="text-xs uppercase tracking-widest text-muted">
              Desafio Diário #{dailyRecord.puzzle}
            </div>
            <div className="my-1 text-3xl tracking-widest">{dailyRecord.grid}</div>
            {dailyStreak > 1 && (
              <div className="text-sm text-amber-300">🔥 Sequência: {dailyStreak} dias</div>
            )}
          </div>
        )}

        <div className="min-h-[200px] space-y-2 rounded-xl border border-line bg-[#0d1322] p-4 text-[15px] leading-relaxed">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.45, duration: 0.4 }}
              className={LINE_COLOR[line.kind]}
            >
              {line.text}
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <button
            onClick={share}
            className="btn-brand rounded-xl px-5 py-3 font-bold transition hover:-translate-y-0.5"
          >
            🐦 Compartilhar
          </button>
          {hasNext && (
            <button
              onClick={nextPhase}
              className="rounded-xl border border-line px-5 py-3 font-bold transition hover:border-brand"
            >
              ➡ Próxima Fase
            </button>
          )}
          <button
            onClick={goToScenarioSelect}
            className="rounded-xl border border-line px-5 py-3 font-bold transition hover:border-brand"
          >
            {daily ? "🏠 Voltar ao Início" : "🔁 Jogar de Novo"}
          </button>
        </div>
      </section>

      {!daily && <Leaderboard />}
    </motion.div>
  );
}
