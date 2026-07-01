"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Props {
  /** Muda a cada sorteio para re-disparar a animação. */
  trigger: number;
  count: number;
  color: string;
}

/** Explosão radial de partículas ao revelar uma carta de tier alto (§3). */
export default function TierBurst({ trigger, count, color }: Props) {
  const parts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const dist = 120 + Math.random() * 120;
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          size: 3 + Math.random() * 5,
          delay: Math.random() * 0.1,
        };
      }),
    // Recalcula a cada disparo
    [trigger, count],
  );

  if (count === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible">
      {parts.map((p, i) => (
        <motion.span
          key={`${trigger}-${i}`}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{ opacity: 0, x: p.x, y: p.y, scale: 0 }}
          transition={{ duration: 1, delay: p.delay, ease: "easeOut" }}
          style={{
            width: p.size,
            height: p.size,
            background: color,
            boxShadow: `0 0 10px ${color}`,
          }}
          className="absolute rounded-full"
        />
      ))}
    </div>
  );
}
