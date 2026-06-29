"use client";

import { motion } from "framer-motion";
import { CATEGORY_EMOJI, SLOTS } from "@/lib/data";
import { affinityMatch } from "@/lib/game";
import { useGame } from "@/lib/store";
import { useToast } from "@/lib/toast";
import { TIER_COLOR, ovTier } from "@/lib/utils";

export default function SlotGrid() {
  const { slots, current, placeCard } = useGame();
  const toast = useToast((s) => s.show);

  const handleClick = (i: number) => {
    if (slots[i]) return;
    if (!current) {
      toast("Gire a máquina primeiro!");
      return;
    }
    const matched = affinityMatch(current, i);
    const ok = placeCard(i);
    if (ok) {
      toast(
        matched
          ? `✨ Afinidade! ${SLOTS[i].nome} (+12)`
          : `Carta encaixada em ${SLOTS[i].nome}`,
      );
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {SLOTS.map((slot, i) => {
        const card = slots[i];
        const willMatch = !card && !!current && affinityMatch(current, i);
        const targetable = !card && !!current;
        const placedMatch = !!card && affinityMatch(card, i);

        return (
          <motion.button
            key={slot.id}
            layout
            onClick={() => handleClick(i)}
            disabled={!!card}
            className={`relative min-h-[140px] rounded-xl border p-3 text-center text-left transition ${
              card
                ? `cursor-default shadow-sm ${
                    placedMatch
                      ? "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950/20"
                      : "border-line bg-panel"
                  }`
                : `${
                    willMatch
                      ? "border-green-400 bg-green-50 ring-1 ring-green-300 hover:shadow-sm dark:bg-green-950/20 dark:ring-green-800"
                      : targetable
                        ? "border-brand/40 bg-panel hover:border-brand hover:shadow-sm"
                        : "border-dashed border-line bg-bg2 hover:border-slate-300 dark:hover:border-slate-600"
                  }`
            }`}
          >
            {willMatch && (
              <span className="absolute right-1.5 top-1.5 rounded-full bg-green-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                +12
              </span>
            )}
            {placedMatch && (
              <span className="absolute right-1.5 top-1.5 text-xs text-green-500" title="Afinidade ativa">
                ✨
              </span>
            )}

            <div className="text-xl">{slot.emoji}</div>
            <div className="my-1 text-[11px] font-medium text-ink">{slot.nome}</div>
            <div className="mb-2 text-[9px] text-muted">
              {slot.affinity.map((c) => CATEGORY_EMOJI[c]).join(" ")}
            </div>

            {card ? (
              <>
                <div className="text-[11px] font-semibold leading-snug text-ink">
                  {card.jogador}
                  <br />
                  <span className="font-normal text-muted">{card.poder}</span>
                </div>
                <div className={`mt-1.5 text-lg font-black ${TIER_COLOR[ovTier(card.ov)]}`}>
                  {card.ov}
                </div>
              </>
            ) : (
              <div className="text-[11px] text-muted/60">vazio</div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
