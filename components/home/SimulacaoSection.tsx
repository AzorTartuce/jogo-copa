"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useRichMotion } from "./useHomeMotion";

interface MatchEvent {
  min: string;
  icon: string;
  title: string;
  text: string;
  home: number;
  adv: number;
  posse: number;
  fin: number;
  tone: "info" | "good" | "neutral" | "end";
}

const EVENTS: MatchEvent[] = [
  { min: "0'", icon: "🟢", title: "Apito inicial", text: "A máquina do tempo é ativada. A partida recomeça — desta vez do seu jeito.", home: 0, adv: 0, posse: 40, fin: 0, tone: "info" },
  { min: "12'", icon: "⚽", title: "GOL DO BRASIL — Pelé", text: "Pelé recebe na entrada da área, tira o zagueiro e coloca no ângulo!", home: 1, adv: 0, posse: 52, fin: 3, tone: "good" },
  { min: "27'", icon: "🟨", title: "Cartão para Zidane", text: "O maestro adversário perde a cabeça e leva amarelo. A pressão é sua.", home: 1, adv: 0, posse: 58, fin: 5, tone: "neutral" },
  { min: "45'", icon: "⏸️", title: "Intervalo", text: "Sua linha do tempo está funcionando. Torcida em êxtase no vestiário.", home: 1, adv: 0, posse: 61, fin: 7, tone: "info" },
  { min: "63'", icon: "🔁", title: "Entra Messi", text: "A intervenção temporal coloca o GOAT em campo no lugar do volante.", home: 1, adv: 0, posse: 64, fin: 9, tone: "neutral" },
  { min: "78'", icon: "⚽", title: "GOLAÇO — Roberto Carlos", text: "Bomba de fora da área! A bola faz a curva impossível e morre no ângulo!", home: 2, adv: 0, posse: 66, fin: 12, tone: "good" },
  { min: "90'+4", icon: "🏆", title: "APITO FINAL", text: "A história foi reescrita. O trauma virou glória. VITÓRIA!", home: 2, adv: 0, posse: 67, fin: 14, tone: "end" },
];

const TONE_RING: Record<MatchEvent["tone"], string> = {
  info: "border-white/15",
  good: "border-emerald-400/60 tier-B",
  neutral: "border-amber-400/50",
  end: "border-yellow-400/70 tier-S",
};

function EventCard({ ev, className = "" }: { ev: MatchEvent; className?: string }) {
  return (
    <div
      className={`glass w-full max-w-lg rounded-3xl border p-6 sm:p-8 ${TONE_RING[ev.tone]} ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-white/10 px-3 py-1 font-display text-sm font-bold text-cyan-200">
          {ev.min}
        </span>
        {/* Placar */}
        <div className="flex items-center gap-3 font-display text-3xl font-bold text-white">
          <span>🇧🇷 {ev.home}</span>
          <span className="text-slate-500">×</span>
          <span>{ev.adv} 🇩🇪</span>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-4">
        <span className="text-4xl">{ev.icon}</span>
        <div>
          <p className="font-display text-xl font-bold text-white">{ev.title}</p>
          <p className="mt-1 text-slate-300">{ev.text}</p>
        </div>
      </div>

      {/* Contadores */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between text-xs text-slate-400">
            <span>Posse de bola</span>
            <span className="font-bold text-white">{ev.posse}%</span>
          </div>
          <div className="meter mt-1.5 bg-white/10">
            <i style={{ width: `${ev.posse}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-slate-400">
            <span>Finalizações</span>
            <span className="font-bold text-white">{ev.fin}</span>
          </div>
          <div className="meter mt-1.5 bg-white/10">
            <i style={{ width: `${Math.min(100, ev.fin * 7)}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SimulacaoSection() {
  const rich = useRichMotion();
  const section = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!rich) return;
    const el = section.current;
    const pinEl = pin.current;
    if (!el || !pinEl) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".sim-card");
      gsap.set(cards, { opacity: 0, scale: 0.92, yPercent: 6 });
      gsap.set(cards[0], { opacity: 1, scale: 1, yPercent: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: `+=${cards.length * 420}`,
          scrub: 0.6,
          pin: pinEl,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to(cards[i - 1], { opacity: 0, scale: 0.92, yPercent: -6, duration: 0.4 })
          .to(card, { opacity: 1, scale: 1, yPercent: 0, duration: 0.4 }, "<")
          .to(
            ".sim-progress-fill",
            { scaleX: i / (cards.length - 1), duration: 0.4, ease: "none" },
            "<",
          );
      });
    }, el);

    return () => ctx.revert();
  }, [rich]);

  return (
    <section id="simulacao" ref={section} className="stage-dark grain relative">
      {/* Cabeçalho */}
      <div className="mx-auto max-w-5xl px-4 pt-24 text-center sm:pt-32">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
          Simulação ao Vivo
        </p>
        <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">
          {rich ? "Role a página. " : "Acompanhe "}
          <span className="text-gradient-gold">é o tempo da partida.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          Cada rolagem avança o relógio. Sinta a tensão, a torcida e a virada
          lance a lance.
        </p>
      </div>

      {rich ? (
        /* Desktop: seção pinada, scroll = tempo (GSAP ScrollTrigger) */
        <div ref={pin} className="relative flex h-screen flex-col items-center justify-center">
          <div className="relative flex h-[360px] w-full items-center justify-center">
            {EVENTS.map((ev, i) => (
              <div key={i} className="sim-card absolute px-4">
                <EventCard ev={ev} />
              </div>
            ))}
          </div>
          <div className="mt-8 h-1 w-64 overflow-hidden rounded-full bg-white/10">
            <div className="sim-progress-fill h-full w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-400 to-amber-400" />
          </div>
        </div>
      ) : (
        /* Mobile / reduced-motion: cards verticais, scroll natural */
        <div className="mx-auto flex max-w-lg flex-col items-center gap-6 px-4 py-16">
          {EVENTS.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="sim-card w-full"
            >
              <EventCard ev={ev} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
