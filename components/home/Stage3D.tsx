"use client";

import dynamic from "next/dynamic";
import { useRichMotion } from "./useHomeMotion";

// Carrega R3F/three só no cliente e só quando realmente for usado.
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

interface Props {
  variant?: "orb" | "trophy";
  className?: string;
}

/**
 * Renderiza a cena 3D em desktop (sem reduced-motion) e um orbe CSS glow como
 * fallback gracioso em mobile / telas fracas / reduced-motion (SECTIONS.md).
 */
export default function Stage3D({ variant = "orb", className = "" }: Props) {
  const rich = useRichMotion();

  return (
    <div className={`relative ${className}`}>
      {rich ? (
        <Scene3D variant={variant} />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div
            className={`orb-fallback anim-floaty h-48 w-48 sm:h-60 sm:w-60 ${
              variant === "trophy" ? "gold" : ""
            }`}
          />
        </div>
      )}
    </div>
  );
}
