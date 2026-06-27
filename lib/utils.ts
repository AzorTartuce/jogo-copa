import type { Tier } from "./types";

/** Mapeia um overall (0-100) para um "tier" de qualidade usado nas cores/labels. */
export function ovTier(ov: number): Tier {
  if (ov < 30) return 1;
  if (ov < 60) return 2;
  if (ov < 75) return 3;
  if (ov < 90) return 4;
  return 5;
}

export const TIER_LABEL: Record<Tier, string> = {
  1: "Meme",
  2: "Fraco",
  3: "Bom",
  4: "Muito Bom",
  5: "Lendário",
};

/** Classe utilitária de cor por tier (usa as cores definidas no globals.css). */
export const TIER_COLOR: Record<Tier, string> = {
  1: "text-rose-400",
  2: "text-amber-400",
  3: "text-emerald-400",
  4: "text-cyan-400",
  5: "text-yellow-300",
};

export function randItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}
