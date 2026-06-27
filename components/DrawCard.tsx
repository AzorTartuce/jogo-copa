"use client";

import { motion } from "framer-motion";
import { useGame } from "@/lib/store";
import { TIER_COLOR, TIER_LABEL, ovTier } from "@/lib/utils";

export default function DrawCard() {
  const { current, spinning, slots } = useGame();
  const allFilled = slots.every(Boolean);

  if (!current) {
    return (
      <div className="my-4 flex min-h-[170px] flex-col justify-center gap-2 rounded-2xl border border-brand bg-gradient-to-br from-panel2 to-[#252f4f] p-6 text-center">
        <div className="text-5xl">🕰️</div>
        <p className="mx-auto max-w-md text-sm text-muted">
          {allFilled
            ? "Todos os slots preenchidos! Inicie a simulação abaixo."
            : "Clique em Girar a Máquina do Tempo para sortear uma Intervenção Temporal."}
        </p>
      </div>
    );
  }

  const tier = ovTier(current.ov);

  return (
    <motion.div
      key={`${current.id}-${current.ov}-${spinning}`}
      initial={{ rotateY: spinning ? -90 : 0, opacity: spinning ? 0.3 : 1, scale: 0.95 }}
      animate={{ rotateY: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="my-4 flex min-h-[170px] flex-col justify-center gap-1.5 rounded-2xl border border-brand bg-gradient-to-br from-panel2 to-[#252f4f] p-6 text-center"
    >
      <div className="text-4xl">{current.emoji}</div>
      <div className="text-xs font-semibold uppercase tracking-widest text-brand">
        {current.cat} · {TIER_LABEL[tier]}
      </div>
      <div className="text-xl font-extrabold">
        {current.jogador} — {current.poder}
      </div>
      <div className="mx-auto max-w-lg text-sm text-muted">{current.desc}</div>
      <div className={`text-4xl font-black ${TIER_COLOR[tier]}`}>{current.ov}</div>
      <div className="meter mx-auto mt-1 w-full max-w-xs">
        <i style={{ width: `${current.ov}%` }} />
      </div>
    </motion.div>
  );
}
