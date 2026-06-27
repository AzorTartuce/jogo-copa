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
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
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
            className={`relative min-h-[150px] rounded-2xl border-2 p-3.5 text-center transition ${
              card
                ? `cursor-default border-solid bg-panel2 ${
                    placedMatch ? "border-emerald-400/70" : "border-line"
                  }`
                : `border-dashed bg-panel2 ${
                    willMatch
                      ? "border-emerald-400 ring-2 ring-emerald-400/40 hover:border-solid"
                      : targetable
                        ? "border-brand/70 hover:border-solid hover:border-brand"
                        : "border-line"
                  }`
            }`}
          >
            {willMatch && (
              <span className="absolute right-1.5 top-1.5 rounded-full bg-emerald-500/90 px-1.5 py-0.5 text-[10px] font-bold text-black">
                +12 ✨
              </span>
            )}
            {placedMatch && (
              <span className="absolute right-1.5 top-1.5 text-sm" title="Afinidade ativa">
                ✨
              </span>
            )}

            <div className="text-2xl">{slot.emoji}</div>
            <div className="my-1 text-xs text-muted">{slot.nome}</div>
            <div className="mb-1.5 text-[10px] text-muted/80">
              combina: {slot.affinity.map((c) => CATEGORY_EMOJI[c]).join(" ")}
            </div>

            {card ? (
              <>
                <div className="text-[13px] font-bold leading-tight">
                  {card.jogador}
                  <br />
                  {card.poder}
                </div>
                <div className={`mt-1 text-xl font-extrabold ${TIER_COLOR[ovTier(card.ov)]}`}>
                  {card.ov}
                </div>
              </>
            ) : (
              <div className="text-[13px] text-muted">— vazio —</div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
