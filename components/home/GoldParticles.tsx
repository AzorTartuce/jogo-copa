"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Partículas douradas ambientais em Canvas 2D (SECTIONS.md §CTA). Sobem
 * lentamente como fagulhas de estádio. Leve e performance-first.
 */
export default function GoldParticles({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vy: number; r: number; a: number };
    let ps: P[] = [];

    const spawn = (): P => ({
      x: Math.random() * w,
      y: h + Math.random() * 40,
      vy: Math.random() * 0.5 + 0.2,
      r: Math.random() * 2 + 0.6,
      a: Math.random() * 0.5 + 0.2,
    });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(60, Math.floor(w / 14));
      ps = Array.from({ length: count }, spawn);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.y -= p.vy;
        p.x += Math.sin(p.y * 0.02) * 0.3;
        if (p.y < -10) Object.assign(p, spawn());
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253,224,71,${p.a})`;
        ctx.shadowColor = "rgba(245,158,11,0.8)";
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
