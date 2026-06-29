"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

const COLORS = [
  "#f59e0b", "#d97706", "#eab308", "#fde68a",
  "#ffffff", "#f97316", "#fbbf24", "#fef08a",
];
const EMOJIS = ["🏆", "👑", "⭐", "🌟", "🎊", "🎉", "🥇", "🎆", "🎇", "✨"];

interface Props {
  onDone: () => void;
}

export default function ChampionCelebration({ onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 5000);
    return () => clearTimeout(t);
  }, [onDone]);

  // Partículas em 3 ondas: centro, esquerda e direita
  const particles = useMemo(() => {
    const origins = [
      { x: "50%", y: "50%" },
      { x: "20%", y: "60%" },
      { x: "80%", y: "60%" },
      { x: "35%", y: "30%" },
      { x: "65%", y: "30%" },
    ];

    return Array.from({ length: 130 }, (_, i) => {
      const origin = origins[i % origins.length];
      const angle = (i / 26) * Math.PI * 2 + (Math.random() * 0.8 - 0.4);
      const dist  = 20 + Math.random() * 48;
      return {
        id: i,
        originX: origin.x,
        originY: origin.y,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - 10,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 14,
        duration: 1.2 + Math.random() * 1.4,
        delay: (i % 5) * 0.18,
        rotate: Math.random() > 0.5 ? 540 : -540,
        isEmoji: i < 20,
        emoji: EMOJIS[i % EMOJIS.length],
        isRect: !!(i % 3 === 0),
      };
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
    >
      {/* Fundo escuro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.72, 0.65] }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 bg-black"
      />

      {/* Flash dourado */}
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.55 }}
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, #f59e0b 0%, #92400e 100%)" }}
      />

      {/* Raios de luz dourada */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4, rotate: 0 }}
        animate={{ opacity: [0, 0.35, 0.2, 0], scale: [0.4, 2.5, 3], rotate: 45 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          style={{
            width: 600,
            height: 600,
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(251,191,36,0.25) 10deg, transparent 20deg, rgba(251,191,36,0.2) 30deg, transparent 40deg, rgba(251,191,36,0.3) 50deg, transparent 60deg, rgba(251,191,36,0.15) 70deg, transparent 80deg, rgba(251,191,36,0.25) 90deg, transparent 100deg, rgba(251,191,36,0.2) 110deg, transparent 120deg, transparent 360deg)",
            borderRadius: "50%",
          }}
        />
      </motion.div>

      {/* Texto principal */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Troféu */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: [0, 1.5, 1.2], rotate: [-20, 10, 0] }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-7xl sm:text-8xl"
        >
          🏆
        </motion.div>

        {/* CAMPEÃO! */}
        <motion.div
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{ scale: [0.1, 1.4, 1.15, 1.25], opacity: [0, 1, 1, 1] }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <p
            className="select-none text-6xl font-black text-white sm:text-8xl"
            style={{
              textShadow:
                "0 0 24px rgba(251,191,36,1), 0 0 70px rgba(251,191,36,0.8), 0 4px 28px rgba(0,0,0,0.9)",
            }}
          >
            CAMPEÃO!
          </p>
        </motion.div>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="mt-3 text-xl font-bold text-amber-200 sm:text-2xl"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
        >
          Você reescreveu a história! 🌟
        </motion.p>

        {/* Barra de estrelas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.75, duration: 0.4 }}
          className="mt-4 flex gap-2 text-3xl"
        >
          {["⭐", "⭐", "⭐", "⭐", "⭐"].map((s, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.08 }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Confetti dourado explodindo de múltiplos pontos */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: p.originX, top: p.originY }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: `${p.dx}vw`,
            y: `${p.dy}vh`,
            scale: [0, 1.8, 1],
            opacity: [1, 1, 0],
            rotate: p.rotate,
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
        >
          {p.isEmoji ? (
            <span className="text-2xl leading-none">{p.emoji}</span>
          ) : (
            <div
              style={{
                width: p.size,
                height: p.isRect ? p.size * 0.35 : p.size,
                backgroundColor: p.color,
                borderRadius: p.isRect ? 2 : "50%",
                boxShadow: `0 0 ${p.size}px ${p.color}`,
              }}
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
