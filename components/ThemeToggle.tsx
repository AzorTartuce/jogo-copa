"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita hydration mismatch — só renderiza no cliente
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-8 w-8" />;

  const dark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Mudar para modo claro" : "Mudar para modo escuro"}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-panel text-base transition hover:border-slate-400 dark:hover:border-slate-500"
      title={dark ? "Modo claro" : "Modo escuro"}
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
