import type { Card } from "./types";

/** Tier de raridade usado nos efeitos do Sorteio de Lendas (SECTIONS.md §3). */
export type LegendTier = "S" | "A" | "B" | "C";

/** Craques que sempre saem no Tier S, independentemente do overall sorteado. */
const S_TIER_NAMES = [
  "pelé",
  "messi",
  "cristiano ronaldo",
  "cr7",
  "ronaldo",
  "maradona",
  "zidane",
  "ronaldinho",
  "marta",
];

export function legendTier(card: Card): LegendTier {
  const name = card.jogador.toLowerCase();
  const isNamedLegend = S_TIER_NAMES.some((n) => name.includes(n));
  if (isNamedLegend || card.ov >= 93) return "S";
  if (card.ov >= 84) return "A";
  if (card.ov >= 70) return "B";
  return "C";
}

export interface TierStyle {
  label: string;
  /** Classe utilitária de glow (definida em globals.css). */
  glowClass: string;
  /** Cor principal do tier (para partículas/realces). */
  color: string;
  /** Cor de acento para o texto. */
  textClass: string;
  /** Quantidade de partículas no efeito de raridade. */
  particles: number;
  /** Se dispara "camera shake" leve ao revelar. */
  shake: boolean;
}

export const TIER_STYLE: Record<LegendTier, TierStyle> = {
  S: {
    label: "LENDÁRIO",
    glowClass: "tier-S",
    color: "#fde047",
    textClass: "text-gradient-gold",
    particles: 46,
    shake: true,
  },
  A: {
    label: "ÉPICO",
    glowClass: "tier-A",
    color: "#e2e8f0",
    textClass: "text-slate-100",
    particles: 26,
    shake: false,
  },
  B: {
    label: "RARO",
    glowClass: "tier-B",
    color: "#22d3ee",
    textClass: "text-cyan-300",
    particles: 12,
    shake: false,
  },
  C: {
    label: "COMUM",
    glowClass: "tier-C",
    color: "#94a3b8",
    textClass: "text-slate-300",
    particles: 0,
    shake: false,
  },
};
