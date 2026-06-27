import type { LeaderboardEntry } from "./types";

const LB_KEY = "mdt_leaderboard_v2";
const MAX = 10;

export function loadLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LB_KEY);
    return raw ? (JSON.parse(raw) as LeaderboardEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveScore(entry: LeaderboardEntry): LeaderboardEntry[] {
  const lb = loadLeaderboard();
  lb.push(entry);
  lb.sort((a, b) => b.score - a.score);
  const trimmed = lb.slice(0, MAX);
  try {
    window.localStorage.setItem(LB_KEY, JSON.stringify(trimmed));
  } catch {
    /* ignora indisponibilidade do storage */
  }
  return trimmed;
}
