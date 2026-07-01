/** Rola suavemente até uma seção da home pelo id (ex: "partidas"). */
export function scrollToSection(id: string) {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const HOME_SECTIONS = [
  { id: "hero", label: "Início" },
  { id: "partidas", label: "Partidas" },
  { id: "sorteio", label: "Lendas" },
  { id: "simulacao", label: "Simulação" },
  { id: "compartilhar", label: "Desafio" },
  { id: "cta", label: "Jogar" },
] as const;
