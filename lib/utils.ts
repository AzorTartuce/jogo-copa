import type { Category, Tier } from "./types";

/** Gera URL de avatar cartoon via DiceBear — mesmo nome = mesmo rosto sempre. */
export function playerAvatarUrl(name: string): string {
  const seed = encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"));
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}&backgroundColor=transparent`;
}

/** Cor de fundo da seção de avatar por categoria. */
export const CAT_BG: Record<Category, string> = {
  Balada: "from-violet-50 to-purple-100 dark:from-violet-950/70 dark:to-purple-900/60",
  Drama:  "from-rose-50 to-red-100 dark:from-rose-950/70 dark:to-red-900/60",
  Moda:   "from-amber-50 to-yellow-100 dark:from-amber-950/70 dark:to-yellow-900/60",
  Meme:   "from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700",
  Lenda:  "from-yellow-50 to-amber-100 dark:from-yellow-950/70 dark:to-amber-900/60",
  Reverso:"from-cyan-50 to-teal-100 dark:from-cyan-950/70 dark:to-teal-900/60",
};

/** Classe de borda da carta por tier. */
export const TIER_BORDER: Record<Tier, string> = {
  1: "border-slate-300 dark:border-slate-600",
  2: "border-orange-300 dark:border-orange-700",
  3: "border-green-400 dark:border-green-700",
  4: "border-blue-400 dark:border-blue-600",
  5: "border-amber-400 shadow-[0_0_14px_2px_rgba(217,119,6,0.18)] dark:border-amber-500 dark:shadow-[0_0_18px_2px_rgba(253,224,71,0.25)]",
};

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

/** Classe utilitária de cor por tier. */
export const TIER_COLOR: Record<Tier, string> = {
  1: "text-slate-400 dark:text-slate-500",
  2: "text-orange-500 dark:text-orange-400",
  3: "text-green-600 dark:text-green-400",
  4: "text-blue-600 dark:text-cyan-400",
  5: "text-amber-500 dark:text-yellow-400",
};

export function randItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}
