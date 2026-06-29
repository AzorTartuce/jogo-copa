"use client";

import GameScreen from "@/components/GameScreen";
import HomeScreen from "@/components/HomeScreen";
import ResultScreen from "@/components/ResultScreen";
import ScenarioScreen from "@/components/ScenarioScreen";
import ThemeToggle from "@/components/ThemeToggle";
import Toast from "@/components/Toast";
import { useGame } from "@/lib/store";

export default function Home() {
  const { screen, goToHome } = useGame();
  const onHome = screen === "home";

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header className="mb-8 flex items-center justify-between border-b border-line pb-5">
        <button
          onClick={goToHome}
          className="flex items-center gap-2 transition hover:opacity-70"
        >
          <span className="text-xl">⚽</span>
          <div className="text-left">
            <p className="text-sm font-bold leading-tight text-ink">
              Máquina do Tempo
            </p>
            <p className="text-[11px] leading-tight text-muted">do Futebol</p>
          </div>
        </button>

        <div className="flex items-center gap-2">
          {!onHome && (
            <button
              onClick={goToHome}
              className="rounded-lg border border-line bg-bg2 px-3 py-1.5 text-xs font-medium text-muted transition hover:border-slate-400 hover:text-ink"
            >
              ← Início
            </button>
          )}
          <ThemeToggle />
        </div>
      </header>

      {screen === "home"     && <HomeScreen />}
      {screen === "scenario" && <ScenarioScreen />}
      {screen === "game"     && <GameScreen />}
      {screen === "result"   && <ResultScreen />}

      <footer className="mt-12 border-t border-line pt-6 text-center text-xs text-muted">
        Máquina do Tempo do Futebol · Next.js + React + Tailwind
      </footer>

      <Toast />
    </main>
  );
}
