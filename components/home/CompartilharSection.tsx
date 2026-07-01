"use client";

import { motion } from "framer-motion";
import { useToast } from "@/lib/toast";
import MagneticButton from "./MagneticButton";

const SHARE_TEXT =
  "⚽ Reescrevi o 7×1 na Máquina do Tempo do Futebol! Vitória 2×0 com Pelé, Messi e Roberto Carlos. Consegue superar? 🕹️";

const RESULT_ROWS = [
  { label: "Brasil 🇧🇷", value: "2", strong: true },
  { label: "Alemanha 🇩🇪", value: "0", strong: false },
];

const GRID = ["🟩", "🟨", "🟩", "🟩", "🟨"];

export default function CompartilharSection() {
  const showToast = useToast((s) => s.show);

  const share = async () => {
    const shareData = {
      title: "Máquina do Tempo do Futebol",
      text: SHARE_TEXT,
      url: typeof window !== "undefined" ? window.location.origin : undefined,
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      /* usuário cancelou — segue pro fallback */
    }
    copy();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_TEXT);
      showToast("Resultado copiado! 📋");
    } catch {
      showToast("Não foi possível copiar 😕");
    }
  };

  return (
    <section id="compartilhar" className="relative bg-bg py-24 sm:py-32">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 md:grid-cols-2">
        {/* Card de resultado "construído" com stagger */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-panel to-panel2 shadow-2xl"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: -20 }, show: { opacity: 1, y: 0 } }}
            className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 text-center text-white"
          >
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Desafio Diário #128
            </p>
            <p className="font-display mt-1 text-lg font-bold">História Reescrita ✅</p>
          </motion.div>

          <div className="space-y-3 p-6">
            {RESULT_ROWS.map((r) => (
              <motion.div
                key={r.label}
                variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                className="flex items-center justify-between"
              >
                <span className="text-sm font-medium text-ink">{r.label}</span>
                <span
                  className={`font-display text-3xl font-bold ${
                    r.strong ? "text-brand" : "text-muted"
                  }`}
                >
                  {r.value}
                </span>
              </motion.div>
            ))}

            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
              className="flex justify-center gap-1.5 pt-2 text-2xl"
            >
              {GRID.map((g, i) => (
                <span key={i}>{g}</span>
              ))}
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              className="pt-2 text-center text-xs text-muted"
            >
              Pelé · Messi · Roberto Carlos · +9
            </motion.p>
          </div>
        </motion.div>

        {/* Copy + ações */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
            Compartilhamento & Desafio
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-ink sm:text-5xl">
            Prove que <span className="text-gradient-brand">mudou o passado</span>
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Gere um card do seu resultado — estilo Wordle, sem spoiler — e desafie
            seus amigos a superarem o seu placar na mesma partida histórica.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <MagneticButton
              onClick={share}
              ariaLabel="Desafiar amigos"
              className="btn-brand rounded-full px-8 py-4 text-base font-bold"
            >
              🏆 Desafiar Amigos
            </MagneticButton>
            <MagneticButton
              onClick={copy}
              strength={10}
              tilt={8}
              ariaLabel="Copiar resultado"
              className="rounded-full border border-line bg-panel px-8 py-4 text-base font-semibold text-ink transition hover:border-slate-400"
            >
              📋 Copiar Resultado
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
