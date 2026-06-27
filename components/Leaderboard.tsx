"use client";

import { useEffect, useState } from "react";
import { loadLeaderboard } from "@/lib/leaderboard";
import type { LeaderboardEntry } from "@/lib/types";

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    setEntries(loadLeaderboard());
  }, []);

  return (
    <section className="rounded-2xl border border-line bg-panel p-5">
      <h2 className="mb-3 text-xl font-bold">🏆 Ranking Local (Top 10)</h2>
      {entries.length === 0 ? (
        <p className="text-sm text-muted">Sem partidas ainda.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted">
              <th className="border-b border-line p-2 font-semibold">#</th>
              <th className="border-b border-line p-2 font-semibold">Cenário</th>
              <th className="border-b border-line p-2 font-semibold">Modo</th>
              <th className="border-b border-line p-2 font-semibold">Score</th>
              <th className="border-b border-line p-2 font-semibold">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={`${e.date}-${i}`}>
                <td className="border-b border-line p-2">{i + 1}</td>
                <td className="border-b border-line p-2">{e.scn}</td>
                <td className="border-b border-line p-2 text-muted">{e.mode}</td>
                <td className="border-b border-line p-2 font-bold">{e.score}</td>
                <td className="border-b border-line p-2">
                  {e.win ? "🏆 Vitória" : "💔 Derrota"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
