"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  /** Força do imã (deslocamento máx. em px). */
  strength?: number;
  /** Inclinação máxima em graus (efeito "toward cursor"). */
  tilt?: number;
  ariaLabel?: string;
}

/**
 * Botão magnético (SECTIONS.md): inclina/desloca em direção ao cursor e volta
 * suavemente ao sair. Desativa o efeito para quem prefere menos movimento.
 */
export default function MagneticButton({
  children,
  onClick,
  className = "",
  strength = 18,
  tilt = 12,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  const rotateY = useTransform(sx, [-1, 1], [-tilt, tilt]);
  const rotateX = useTransform(sy, [-1, 1], [tilt, -tilt]);
  const translateX = useTransform(sx, [-1, 1], [-strength, strength]);
  const translateY = useTransform(sy, [-1, 1], [-strength, strength]);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.94 }}
      style={
        reduced
          ? undefined
          : {
              rotateX,
              rotateY,
              x: translateX,
              y: translateY,
              transformStyle: "preserve-3d",
            }
      }
      className={className}
    >
      {children}
    </motion.button>
  );
}
