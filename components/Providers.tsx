"use client";

/**
 * O jogo roda sempre no modo escuro (a classe `dark` é fixada no <html> em
 * app/layout.tsx). Mantido como wrapper simples caso precisemos de providers
 * globais no futuro.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
