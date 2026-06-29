"use client";

import { useEffect, useState } from "react";
import {
  buildDailyShare,
  getPuzzleNumber,
  getTodayKey,
  loadDailyRecord,
  loadStreak,
  msToNextDay,
} from "@/lib/daily";
import { useGame } from "@/lib/store";
import { useToast } from "@/lib/toast";
import type { DailyRecord } from "@/lib/types";

function formatCountdown(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return `${h}:${m}:${sec}`;
}

export default function DailyChallenge() {
  const startDaily = useGame((s) => s.startDaily);
  const toast = useToast((s) => s.show);

  const [record, setRecord] = useState<DailyRecord | null>(null);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [puzzle, setPuzzle] = useState(0);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const today = getTodayKey();
    setPuzzle(getPuzzleNumber(today));
    setRecord(loadDailyRecord(today));
    const s = loadStreak();
    setStreak(s.current);
    setMaxStreak(s.max);
  }, []);

  useEffect(() => {
    if (!record) return;
    const tick = () => setCountdown(formatCountdown(msToNextDay()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [record]);

  const share = () => {
    if (!record) return;
    const txt = buildDailyShare(record, streak);
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: "Máquina do Tempo do Futebol", text: txt }).catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(txt);
      toast("Resultado diário copiado!");
    } else {
      toast(txt);
    }
  };

  return (
    <section className="rounded-xl border border-brand/30 bg-green-50 p-5 dark:bg-green-950/20">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-base">📅</span>
            <h2 className="text-sm font-bold text-ink">Desafio Diário #{puzzle}</h2>
          </div>
          <p className="mt-0.5 text-xs text-muted">
            Mesmo cenário para todo mundo hoje. Uma jogada por dia.
          </p>
        </div>
        {(streak > 0 || maxStreak > 0) && (
          <div className="text-right text-xs text-muted">
            <p>🔥 Sequência: <span className="font-semibold text-ink">{streak}</span></p>
            <p>🏅 Recorde: <span className="font-semibold text-ink">{maxStreak}</span></p>
          </div>
        )}
      </div>

      {!record ? (
        <button
          onClick={startDaily}
          className="btn-brand mt-3 rounded-lg px-4 py-2 text-sm font-semibold transition"
        >
          ▶ Jogar desafio de hoje
        </button>
      ) : (
        <div className="mt-3 rounded-lg border border-line bg-panel p-4">
          <div className="text-center">
            <p className="text-sm font-semibold text-ink">
              {record.win ? "✅ Você salvou a história!" : "❌ Não foi dessa vez"}
            </p>
            <p className="mt-0.5 text-xs text-muted">
              {record.scn} · {record.total} pts
            </p>
            <div className="my-2 text-2xl tracking-widest">{record.grid}</div>
            {record.combos.length > 0 && (
              <p className="text-xs text-green-600">🔗 {record.combos.join(" · ")}</p>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={share}
              className="btn-brand rounded-lg px-4 py-2 text-sm font-semibold transition"
            >
              📤 Compartilhar
            </button>
            <span className="text-xs text-muted">
              Próximo em <span className="font-medium text-ink">{countdown}</span>
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
