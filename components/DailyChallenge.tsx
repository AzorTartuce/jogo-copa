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
    <section className="rounded-2xl border border-brand/50 bg-gradient-to-br from-panel2 to-[#241f4f] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">📅 Desafio Diário #{puzzle}</h2>
          <p className="text-sm text-muted">
            Mesmo cenário e mesmas cartas para todo mundo hoje. Uma jogada por dia!
          </p>
        </div>
        {(streak > 0 || maxStreak > 0) && (
          <div className="text-right text-sm text-muted">
            <div>
              🔥 Sequência: <b className="text-ink">{streak}</b>
            </div>
            <div>
              🏅 Recorde: <b className="text-ink">{maxStreak}</b>
            </div>
          </div>
        )}
      </div>

      {!record ? (
        <button
          onClick={startDaily}
          className="btn-brand mt-4 w-full rounded-xl px-5 py-3 font-bold transition hover:-translate-y-0.5 sm:w-auto"
        >
          ▶ Jogar Desafio de Hoje
        </button>
      ) : (
        <div className="mt-4 rounded-xl border border-line bg-bg2/60 p-4">
          <div className="text-center">
            <div className="text-lg font-bold">
              {record.win ? "✅ Você salvou a história!" : "❌ Não foi dessa vez"}
            </div>
            <div className="my-1 text-sm text-muted">
              {record.scn} · {record.total} pts
            </div>
            <div className="my-2 text-3xl tracking-widest">{record.grid}</div>
            {record.combos.length > 0 && (
              <div className="text-xs text-emerald-300">🔗 {record.combos.join(" · ")}</div>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={share}
              className="btn-brand rounded-xl px-5 py-2.5 font-bold transition hover:-translate-y-0.5"
            >
              📤 Compartilhar
            </button>
            <span className="text-sm text-muted">
              Próximo desafio em <b className="text-ink">{countdown}</b>
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
