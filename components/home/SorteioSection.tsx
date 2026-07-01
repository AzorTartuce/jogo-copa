"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { CARDS } from "@/lib/data";
import { legendTier, TIER_STYLE } from "@/lib/legends";
import type { Card } from "@/lib/types";
import { CAT_BG, playerAvatarUrl, randItem } from "@/lib/utils";
import MagneticButton from "./MagneticButton";
import TierBurst from "./TierBurst";

export default function SorteioSection() {
  const [card, setCard] = useState<Card | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [history, setHistory] = useState<Card[]>([]);
  const [drawCount, setDrawCount] = useState(0);
  const busy = useRef(false);

  const tier = card ? legendTier(card) : null;
  const style = tier ? TIER_STYLE[tier] : null;

  const draw = () => {
    if (busy.current) return;
    busy.current = true;
    const hadCard = card !== null;
    setRevealed(false); // vira pra frente (mistério)

    window.setTimeout(
      () => {
        const next = randItem(CARDS);
        setCard(next);
        setRevealed(true);
        setDrawCount((n) => n + 1);
        setHistory((h) => [next, ...h].slice(0, 5));
        busy.current = false;
      },
      hadCard ? 450 : 0,
    );
  };

  return (
    <section
      id="sorteio"
      className="stage-dark grain relative overflow-hidden py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Sorteio de Lendas
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">
            115 lendas. <span className="text-gradient-gold">Efeitos por raridade.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            De Pelé a memes históricos — gire a máquina e veja a carta virar. Craques
            de <span className="text-gradient-gold font-semibold">tier lendário</span>{" "}
            chegam com fogos de artifício.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 md:grid-cols-[1fr_320px]">
          {/* Carta 3D flip */}
          <div className="flex flex-col items-center">
            <div className="flip-scene relative h-[440px] w-[300px] sm:h-[500px] sm:w-[340px]">
              <TierBurst
                trigger={drawCount}
                count={style?.particles ?? 0}
                color={style?.color ?? "#fff"}
              />

              <motion.div
                animate={
                  style?.shake && revealed
                    ? { x: [0, -6, 6, -4, 4, 0], y: [0, 3, -3, 2, 0] }
                    : { x: 0, y: 0 }
                }
                transition={{ duration: 0.5 }}
                className="h-full w-full"
              >
                <div className={`flip-inner h-full w-full ${revealed ? "is-flipped" : ""}`}>
                  {/* Frente — mistério */}
                  <div className="flip-face flex h-full w-full flex-col items-center justify-center rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 shadow-2xl">
                    <div className="anim-shimmer absolute inset-0 rounded-3xl opacity-40" />
                    <span className="font-display text-8xl">⚽</span>
                    <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate-400">
                      Máquina do Tempo
                    </p>
                    <span className="mt-2 text-5xl font-bold text-white/20">?</span>
                  </div>

                  {/* Verso — lenda revelada */}
                  <div
                    className={`flip-face flip-back overflow-hidden rounded-3xl border border-white/15 bg-slate-950 shadow-2xl ${
                      style?.glowClass ?? ""
                    }`}
                  >
                    {card && (
                      <div className="flex h-full flex-col">
                        <div
                          className={`relative flex flex-1 items-center justify-center bg-gradient-to-br ${CAT_BG[card.cat]}`}
                        >
                          <span
                            className={`absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-bold tracking-wide ${style?.textClass}`}
                          >
                            {style?.label}
                          </span>
                          <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-sm font-bold text-white">
                            {card.ov} OVR
                          </span>
                          <Image
                            src={playerAvatarUrl(card.jogador)}
                            alt={card.jogador}
                            width={160}
                            height={160}
                            unoptimized
                            className="h-40 w-40 drop-shadow-xl"
                          />
                          <span className="absolute bottom-3 right-4 text-4xl">{card.emoji}</span>
                        </div>
                        <div className="bg-slate-950 px-5 py-4 text-white">
                          <p className="font-display text-xl font-bold leading-tight">
                            {card.jogador}
                          </p>
                          <p className="text-sm font-semibold text-cyan-300">{card.poder}</p>
                          <p className="mt-1.5 text-sm leading-snug text-slate-300">
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            <MagneticButton
              onClick={draw}
              ariaLabel="Sortear lenda"
              className="btn-gold mt-8 rounded-full px-10 py-4 text-base font-bold uppercase tracking-wide"
            >
              {card ? "🎰 Sortear de novo" : "🎰 Sortear"}
            </MagneticButton>
          </div>

          {/* Histórico das últimas 5 */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Últimas lendas
            </p>
            {history.length === 0 ? (
              <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
                Nenhuma carta ainda. Gire a máquina para começar.
              </p>
            ) : (
              <ul className="space-y-2">
                {history.map((c, i) => {
                  const t = TIER_STYLE[legendTier(c)];
                  return (
                    <motion.li
                      key={`${drawCount}-${i}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                    >
                      <span className="text-2xl">{c.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">{c.jogador}</p>
                        <p className={`text-[11px] font-bold ${t.textClass}`}>{t.label}</p>
                      </div>
                      <span className="text-sm font-bold text-slate-300">{c.ov}</span>
                    </motion.li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
