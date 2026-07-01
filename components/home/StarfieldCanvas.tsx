"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Starfield leve em Canvas 2D com um "buraco negro" sutil no centro e parallax
 * suave respondendo ao mouse (SECTIONS.md §Hero). Performance-first: sem libs.
 */
export default function StarfieldCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    type Star = { x: number; y: number; z: number; r: number };
    let stars: Star[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(160, Math.floor((w * h) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.8 + 0.2,
        r: Math.random() * 1.4 + 0.3,
      }));
    };

    const onMove = (e: MouseEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    let t = 0;
    const draw = () => {
      t += 0.0035;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      ctx.clearRect(0, 0, w, h);

      // Buraco negro sutil (halo radial no topo-centro)
      const cx = w * 0.5;
      const cy = h * 0.32;
      const halo = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(w, h) * 0.5);
      halo.addColorStop(0, "rgba(34,211,238,0.10)");
      halo.addColorStop(0.5, "rgba(167,139,250,0.05)");
      halo.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        const px = s.x + pointer.x * 30 * s.z;
        const py = s.y + pointer.y * 30 * s.z;
        const twinkle = reduced ? 0.7 : 0.5 + Math.sin(t * 6 * s.z + s.x) * 0.35;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,235,255,${twinkle * s.z})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) window.addEventListener("mousemove", onMove);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduced]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
