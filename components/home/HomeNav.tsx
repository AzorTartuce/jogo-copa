"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/lib/store";
import { HOME_SECTIONS, scrollToSection } from "./homeUtils";

export default function HomeNav() {
  const goToScenarioSelect = useGame((s) => s.goToScenarioSelect);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-2 shadow-lg" : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2 text-white transition hover:opacity-80"
        >
          <span className="text-xl">⚽</span>
          <span className="font-display text-sm font-bold leading-none">
            Máquina do Tempo
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {HOME_SECTIONS.slice(1, -1).map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={goToScenarioSelect}
            className="btn-gold rounded-full px-4 py-2 text-sm font-bold"
          >
            Jogar
          </button>
        </div>
      </div>
    </header>
  );
}
