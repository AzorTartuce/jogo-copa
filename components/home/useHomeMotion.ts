"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * `true` só depois da hidratação em telas ≥ breakpoint. Começa `false` para que
 * o SSR e o mobile nunca montem cenas 3D pesadas — fallback gracioso (SECTIONS.md).
 */
export function useIsDesktop(query = "(min-width: 768px)"): boolean {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setIs(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return is;
}

/**
 * Habilita efeitos ricos (3D, scroll storytelling, partículas) apenas quando
 * faz sentido: desktop + usuário não pediu menos movimento.
 */
export function useRichMotion(): boolean {
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();
  return desktop && !reduced;
}

/** `true` após a primeira renderização no cliente (evita hydration mismatch). */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
