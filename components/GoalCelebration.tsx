"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

const COLORS = ["#16a34a", "#eab308", "#ef4444", "#3b82f6", "#a855f7", "#f97316", "#ffffff"];
const EMOJIS = ["⚽", "🎉", "🏆", "🔥", "🎊", "⭐"];

interface Props {
  onDone: () => void;
}

export default function GoalCelebration({ onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  // Gera partículas frescas a cada montagem do componente
  const particles = useMemo(() => {
    return Array.from({ length: 55 }, (_, i) => {
      const angle = (i / 55) * Math.PI * 2 + (Math.random() * 0.6 - 0.3);
      const dist = 22 + Math.random() * 38;
      return {
        id: i,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 5 + Math.random() * 11,
        duration: 1.1 + Math.random() * 0.7,
        rotate: Math.random() > 0.5 ? 360 : -360,
        isEmoji: i < 8,
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
      transition={{ duration: 0.15 }}
      className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
    >
      {/* Fundo semi-escuro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.65, 0.55] }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black"
      />

      {/* Flash verde inicial */}
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
        className="absolute inset-0 bg-green-500"
      />

      {/* Texto GOOOL! */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0.15, opacity: 0 }}
          animate={{ scale: [0.15, 1.35, 1.1, 1.2], opacity: [0, 1, 1, 1] }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="select-none text-7xl font-black text-white sm:text-9xl"
            style={{
              textShadow:
                "0 0 20px rgba(34,197,94,1), 0 0 60px rgba(34,197,94,0.7), 0 4px 24px rgba(0,0,0,0.9)",
            }}
          >
            GOOOL!
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="mt-2 text-xl font-bold text-white/90"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
        >
          🎉 Torcida em delírio!
        </motion.p>
      </div>

      {/* Confetti explodindo do centro */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: "50%", top: "50%" }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: `${p.dx}vw`,
            y: `${p.dy}vh`,
            scale: [0, 1.6, 1],
            opacity: [1, 1, 0],
            rotate: p.rotate,
          }}
          transition={{ duration: p.duration, ease: "easeOut" }}
        >
          {p.isEmoji ? (
            <span className="text-2xl leading-none">{p.emoji}</span>
          ) : (
            <div
              style={{
                width: p.size,
                height: p.isRect ? p.size * 0.4 : p.size,
                backgroundColor: p.color,
                borderRadius: p.isRect ? 2 : "50%",
              }}
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
