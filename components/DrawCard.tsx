"use client";

import { motion } from "framer-motion";
import { useGame } from "@/lib/store";
import {
  CAT_BG,
  TIER_BORDER,
  TIER_COLOR,
  TIER_LABEL,
  ovTier,
  playerAvatarUrl,
} from "@/lib/utils";

export default function DrawCard() {
  const { current, spinning, slots } = useGame();
  const allFilled = slots.every(Boolean);

  if (!current) {
    return (
      <div className="my-4 flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-xl border border-line bg-bg2 text-center">
        <span className="text-3xl opacity-40">🕰️</span>
        <p className="max-w-xs text-sm text-muted">
          {allFilled
            ? "Todos os slots preenchidos. Inicie a simulação."
            : "Clique em Girar para sortear uma Intervenção Temporal."}
        </p>
      </div>
    );
  }

  const tier = ovTier(current.ov);
  const avatarUrl = playerAvatarUrl(current.jogador);

  return (
    <motion.div
      key={`${current.id}-${current.ov}-${spinning}`}
      initial={{ opacity: spinning ? 0.2 : 1, y: spinning ? 6 : 0, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`my-4 overflow-hidden rounded-xl border-2 bg-panel shadow-sm ${TIER_BORDER[tier]}`}
    >
      {/* Cabeçalho com avatar */}
      <div className={`relative flex flex-col items-center gap-2 bg-gradient-to-b ${CAT_BG[current.cat]} px-4 pb-4 pt-5`}>
        <span
          className={`absolute right-3 top-3 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${TIER_COLOR[tier]}`}
        >
          {TIER_LABEL[tier]}
        </span>

        <div className="relative">
          <div className={`h-20 w-20 overflow-hidden rounded-full border-2 bg-white ${TIER_BORDER[tier]}`}>
            <img
              src={avatarUrl}
              alt={current.jogador}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 rounded-full bg-white px-1 py-0.5 text-sm shadow-sm">
            {current.emoji}
          </span>
        </div>

        <div className="text-center">
          <p className="text-base font-bold text-slate-800">{current.jogador}</p>
          <p className="text-xs text-slate-500">{current.cat}</p>
        </div>
      </div>

      {/* Corpo */}
      <div className="flex flex-col items-center gap-2 px-5 py-4 text-center">
        <p className="text-sm font-semibold text-brand">{current.poder}</p>
        <p className="text-sm text-muted">{current.desc}</p>

        <div className={`mt-1 text-4xl font-black ${TIER_COLOR[tier]}`}>{current.ov}</div>
        <p className="text-[10px] uppercase tracking-widest text-muted">Overall</p>

        <div className="meter w-full max-w-xs">
          <i style={{ width: `${current.ov}%` }} />
        </div>
      </div>
    </motion.div>
  );
}
