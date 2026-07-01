"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  /** Inclinação máxima em graus. */
  max?: number;
  /** Realce de brilho seguindo o cursor. */
  glare?: boolean;
}

/**
 * Card com inclinação 3D real seguindo o cursor (perspectiva + preserve-3d),
 * com brilho especular opcional. Fica estático em reduced-motion. Usado nos
 * cards das Partidas Históricas (SECTIONS.md §2).
 */
export default function TiltCard({ children, className = "", max = 12, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const ry = (px - 0.5) * 2 * max;
    const rx = (0.5 - py) * 2 * max;
    ref.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    if (glare && glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.25), transparent 55%)`;
    }
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    if (glareRef.current) glareRef.current.style.background = "transparent";
  };

  return (
    <div className="tilt-scene">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className={`tilt-card relative ${className}`}
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}
