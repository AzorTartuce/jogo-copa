"use client";

import GameScreen from "@/components/GameScreen";
import ResultScreen from "@/components/ResultScreen";
import ScenarioScreen from "@/components/ScenarioScreen";
import Toast from "@/components/Toast";
import { useGame } from "@/lib/store";

export default function Home() {
  const screen = useGame((s) => s.screen);

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          ⚽ Máquina do Tempo do Futebol
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          Reescreva os momentos mais traumáticos da história do futebol
        </p>
      </header>

      {screen === "scenario" && <ScenarioScreen />}
      {screen === "game" && <GameScreen />}
      {screen === "result" && <ResultScreen />}

      <footer className="mt-10 text-center text-xs text-muted">
        Máquina do Tempo do Futebol · Next.js + React + Tailwind · feito a partir
        do projeto.md
      </footer>

      <Toast />
    </main>
  );
}
