"use client";

import { motion } from "framer-motion";
import { CATEGORY_EMOJI, FORMATIONS, getFormationSlots } from "@/lib/data";
import { affinityMatch } from "@/lib/game";
import { useGame } from "@/lib/store";
import { useToast } from "@/lib/toast";
import type { Card, Slot } from "@/lib/types";
import { TIER_COLOR, ovTier, playerAvatarUrl } from "@/lib/utils";

const COACH_ID = 0;

interface CellProps {
  slotIdx: number;
  card: Card | null;
  slot: Slot;
  current: Card | null;
  activeSlots: Slot[];
  onClick: (i: number) => void;
}

function SlotCell({ slotIdx, card, slot, current, activeSlots, onClick }: CellProps) {
  const willMatch   = !card && !!current && affinityMatch(current, slotIdx, activeSlots);
  const targetable  = !card && !!current;
  const placedMatch = !!card && affinityMatch(card, slotIdx, activeSlots);

  const ringCls = card
    ? placedMatch
      ? "border-2 border-green-400 bg-green-900/50 shadow-[0_0_10px_rgba(74,222,128,0.4)]"
      : "border border-white/20 bg-black/30"
    : willMatch
      ? "border-2 border-green-400 bg-green-400/20 ring-1 ring-green-300/60 shadow-[0_0_12px_rgba(74,222,128,0.3)]"
      : targetable
        ? "border-2 border-cyan-400/70 bg-cyan-400/10 hover:border-cyan-300"
        : "border border-dashed border-white/25 hover:border-white/50";

  return (
    <motion.button
      layout
      onClick={() => onClick(slotIdx)}
      disabled={!!card}
      whileHover={!card ? { scale: 1.07 } : {}}
      whileTap={!card ? { scale: 0.94 } : {}}
      className={`relative flex w-[72px] flex-col items-center gap-1 rounded-xl p-2 transition focus:outline-none ${ringCls}`}
    >
      {/* Afinidade badge */}
      {willMatch && (
        <span className="absolute -right-1.5 -top-2 z-10 rounded-full bg-green-500 px-1.5 py-px text-[9px] font-bold leading-none text-white shadow">
          +10
        </span>
      )}
      {placedMatch && (
        <span className="absolute -right-1.5 -top-2 z-10 rounded-full bg-green-500 px-1 py-px text-[9px] font-bold leading-none text-white shadow">
          ✨
        </span>
      )}

      {/* Avatar / placeholder */}
      {card ? (
        <>
          <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white/50 bg-white/10 shadow">
            <img
              src={playerAvatarUrl(card.jogador)}
              alt={card.jogador}
              className="h-full w-full"
              loading="lazy"
            />
          </div>
          <span className={`text-xs font-black leading-none ${TIER_COLOR[ovTier(card.ov)]}`}>
            {card.ov}
          </span>
          <span className="max-w-[64px] truncate text-center text-[9px] font-semibold leading-tight text-white/90">
            {card.jogador.split(" ")[0]}
          </span>
        </>
      ) : (
        <>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-white/20 bg-white/5">
            <span className="text-xs font-bold text-white/40">{slot.abbr}</span>
          </div>
          <span className="text-[8px] leading-tight text-white/30">
            {slot.affinity.map((c) => CATEGORY_EMOJI[c]).join("")}
          </span>
        </>
      )}
    </motion.button>
  );
}

export default function FieldGrid() {
  const { slots, current, placeCard, formationId } = useGame();
  const toast = useToast((s) => s.show);

  const formation   = FORMATIONS.find((f) => f.id === formationId) ?? FORMATIONS[0];
  const activeSlots = getFormationSlots(formationId);

  const handleClick = (i: number) => {
    if (slots[i]) return;
    if (!current) { toast("Gire a máquina primeiro!"); return; }
    const matched = affinityMatch(current, i, activeSlots);
    const ok = placeCard(i);
    if (ok) toast(matched ? `✨ Afinidade! ${activeSlots[i].nome} (+10)` : `✓ ${activeSlots[i].nome}`);
  };

  const coachCard       = slots[COACH_ID];
  const coachSlot       = activeSlots[COACH_ID];
  const coachWillMatch  = !coachCard && !!current && affinityMatch(current, COACH_ID, activeSlots);
  const coachPlacedMatch = !!coachCard && affinityMatch(coachCard, COACH_ID, activeSlots);

  return (
    <div className="flex flex-col gap-3">
      {/* ── Campo ──────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ background: "linear-gradient(180deg, #15803d 0%, #166534 50%, #15803d 100%)" }}
      >
        {/* Linhas SVG do campo */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <rect x="3" y="2" width="94" height="96" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          <line x1="3" y1="50" x2="97" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="11" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="0.8" fill="rgba(255,255,255,0.35)" />
          <rect x="25" y="2"  width="50" height="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
          <rect x="38" y="2"  width="24" height="8"  fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
          <rect x="25" y="82" width="50" height="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
          <rect x="38" y="90" width="24" height="8"  fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
        </svg>

        {/* Fileiras de jogadores */}
        <div className="relative z-10 flex flex-col gap-3 py-5">
          {formation.fieldRows.map((rowIds, rowIdx) => (
            <div key={rowIdx} className="flex items-center justify-center gap-2">
              {rowIds.map((slotIdx) => (
                <SlotCell
                  key={slotIdx}
                  slotIdx={slotIdx}
                  card={slots[slotIdx]}
                  slot={activeSlots[slotIdx]}
                  current={current}
                  activeSlots={activeSlots}
                  onClick={handleClick}
                />
              ))}
            </div>
          ))}

          {/* Goleiro (sempre na última linha do campo) */}
          <div className="flex items-center justify-center gap-2">
            <SlotCell
              slotIdx={1}
              card={slots[1]}
              slot={activeSlots[1]}
              current={current}
              activeSlots={activeSlots}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>

      {/* ── Banco — Técnico ─────────────────────────────────────────── */}
      <motion.button
        layout
        onClick={() => handleClick(COACH_ID)}
        disabled={!!coachCard}
        whileHover={!coachCard ? { scale: 1.02 } : {}}
        whileTap={!coachCard ? { scale: 0.98 } : {}}
        className={`relative flex w-full items-center gap-3 rounded-xl border p-3 transition ${
          coachCard
            ? coachPlacedMatch
              ? "cursor-default border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950/20"
              : "cursor-default border-line bg-bg2"
            : coachWillMatch
              ? "border-green-400 bg-green-50 ring-1 ring-green-300 dark:bg-green-950/20"
              : !!current
                ? "border-cyan-400/60 bg-cyan-50/50 hover:border-cyan-400 dark:bg-cyan-950/20"
                : "border-dashed border-line hover:border-slate-300 dark:hover:border-slate-600"
        }`}
      >
        {(coachWillMatch || coachPlacedMatch) && (
          <span className="absolute -right-1 -top-1.5 rounded-full bg-green-500 px-1 py-px text-[8px] font-bold leading-none text-white shadow">
            {coachWillMatch ? "+10" : "✨"}
          </span>
        )}

        {coachCard ? (
          <>
            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-line bg-bg2">
              <img src={playerAvatarUrl(coachCard.jogador)} alt={coachCard.jogador} className="h-full w-full" loading="lazy" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-ink">{coachCard.jogador}</p>
              <p className="truncate text-[10px] text-muted">{coachCard.poder}</p>
              <p className={`text-sm font-black ${TIER_COLOR[ovTier(coachCard.ov)]}`}>OV {coachCard.ov}</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-line text-xl">
              📋
            </div>
            <div>
              <p className="text-xs font-semibold text-ink">Banco — {coachSlot.nome}</p>
              <p className="text-[10px] text-muted">
                Afinidade: {coachSlot.affinity.map((c) => CATEGORY_EMOJI[c]).join(" ")}
              </p>
            </div>
          </>
        )}
      </motion.button>
    </div>
  );
}
