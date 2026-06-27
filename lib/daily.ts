import { CARDS, SCENARIOS } from "./data";
import type { Card, DailyRecord, DailyStreak, Scenario, Tier } from "./types";
import { ovTier } from "./utils";

// Epoch de referência para numerar os desafios (#1 = 2024-01-01).
const EPOCH = Date.UTC(2024, 0, 1);
const DAY_MS = 86_400_000;

/* ─────────────── Datas ─────────────── */

export function getTodayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function getPuzzleNumber(dateKey: string): number {
  const [y, m, day] = dateKey.split("-").map(Number);
  const t = Date.UTC(y, m - 1, day);
  return Math.floor((t - EPOCH) / DAY_MS) + 1;
}

function previousKey(dateKey: string): string {
  const [y, m, day] = dateKey.split("-").map(Number);
  return getTodayKey(new Date(Date.UTC(y, m - 1, day) - DAY_MS));
}

/** Milissegundos até a próxima meia-noite local (para o "volte amanhã"). */
export function msToNextDay(now = new Date()): number {
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return next.getTime() - now.getTime();
}

/* ─────────────── RNG determinístico (mulberry32) ─────────────── */

function mulberry32(a: number): () => number {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(str: string): number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

/** Float determinístico para o n-ésimo sorteio do dia. */
function seededFloat(seed: number, n: number): number {
  return mulberry32((seed + n * 0x9e3779b1) >>> 0)();
}

/* ─────────────── Config do dia ─────────────── */

export function getDailyScenario(dateKey: string): Scenario {
  const r = mulberry32(hashSeed(dateKey + "|scn"))();
  return SCENARIOS[Math.floor(r * SCENARIOS.length)];
}

export function getDailySeed(dateKey: string): number {
  return hashSeed(dateKey + "|draws");
}

/** Carta sorteada de forma determinística no n-ésimo giro do dia. */
export function dailyDraw(seed: number, n: number): Card {
  const idx = Math.floor(seededFloat(seed, n) * CARDS.length);
  return { ...CARDS[idx] };
}

/* ─────────────── Grade compartilhável (Wordle-style) ─────────────── */

const TIER_SQUARE: Record<Tier, string> = {
  1: "🟥",
  2: "🟧",
  3: "🟨",
  4: "🟩",
  5: "🟦",
};

/** Monta a grade de 5 emojis: ✨ para slot com afinidade, senão quadrado por tier. */
export function buildGrid(cards: Card[], matched: boolean[]): string {
  return cards.map((c, i) => (matched[i] ? "✨" : TIER_SQUARE[ovTier(c.ov)])).join("");
}

export function buildDailyShare(rec: DailyRecord, streak: number): string {
  const lines = [
    `⚽ Máquina do Tempo #${rec.puzzle} — ${rec.win ? "✅" : "❌"}`,
    `${rec.scn}: ${rec.total} pts`,
    rec.grid,
  ];
  if (rec.combos.length) lines.push(`🔗 ${rec.combos.join(" · ")}`);
  if (streak > 1) lines.push(`🔥 Sequência: ${streak} dias`);
  lines.push("#MáquinaDoTempo");
  return lines.join("\n");
}

/* ─────────────── Persistência ─────────────── */

const REC_KEY = "mdt_daily_v1";
const STREAK_KEY = "mdt_daily_streak_v1";

type RecordMap = Record<string, DailyRecord>;

function loadAllRecords(): RecordMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(REC_KEY) || "{}") as RecordMap;
  } catch {
    return {};
  }
}

export function loadDailyRecord(dateKey: string): DailyRecord | null {
  return loadAllRecords()[dateKey] ?? null;
}

export function saveDailyRecord(rec: DailyRecord): void {
  if (typeof window === "undefined") return;
  const all = loadAllRecords();
  all[rec.date] = rec;
  try {
    window.localStorage.setItem(REC_KEY, JSON.stringify(all));
  } catch {
    /* ignora */
  }
}

export function loadStreak(): DailyStreak {
  if (typeof window === "undefined") return { current: 0, max: 0, lastDate: "" };
  try {
    return (
      (JSON.parse(window.localStorage.getItem(STREAK_KEY) || "null") as DailyStreak) ?? {
        current: 0,
        max: 0,
        lastDate: "",
      }
    );
  } catch {
    return { current: 0, max: 0, lastDate: "" };
  }
}

/** Atualiza a sequência ao concluir o desafio do dia. Retorna a sequência atual. */
export function updateStreak(dateKey: string): number {
  const s = loadStreak();
  if (s.lastDate === dateKey) return s.current; // já contabilizado hoje
  const current = s.lastDate === previousKey(dateKey) ? s.current + 1 : 1;
  const next: DailyStreak = {
    current,
    max: Math.max(s.max, current),
    lastDate: dateKey,
  };
  try {
    window.localStorage.setItem(STREAK_KEY, JSON.stringify(next));
  } catch {
    /* ignora */
  }
  return current;
}
