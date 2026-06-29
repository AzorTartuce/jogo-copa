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
    <section className="rounded-xl border border-line bg-panel p-5 shadow-sm">
      <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider text-muted">
        Ranking Local
      </h2>
      {entries.length === 0 ? (
        <p className="mt-2 text-sm text-muted">Nenhuma partida registrada ainda.</p>
      ) : (
        <table className="mt-3 w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted">
              <th className="border-b border-line pb-2 font-medium">#</th>
              <th className="border-b border-line pb-2 font-medium">Cenário</th>
              <th className="border-b border-line pb-2 font-medium">Modo</th>
              <th className="border-b border-line pb-2 font-medium">Score</th>
              <th className="border-b border-line pb-2 font-medium">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={`${e.date}-${i}`} className="hover:bg-bg2">
                <td className="border-b border-line py-2 pr-2 text-muted">{i + 1}</td>
                <td className="border-b border-line py-2 pr-2 font-medium">{e.scn}</td>
                <td className="border-b border-line py-2 pr-2 text-muted">{e.mode}</td>
                <td className="border-b border-line py-2 pr-2 font-bold">{e.score}</td>
                <td className="border-b border-line py-2">
                  {e.win ? (
                    <span className="text-green-600">Vitória</span>
                  ) : (
                    <span className="text-red-500">Derrota</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
