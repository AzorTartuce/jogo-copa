"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  flag: string;
  sel: string;
  adv: string;
  onDone: () => void;
}

const STEPS = [
  { label: "3", color: "text-slate-200" },
  { label: "2", color: "text-yellow-400" },
  { label: "1", color: "text-green-400" },
  { label: "⚽", color: "text-white" },
];

const STEP_MS = 750;

export default function SimulationCinema({ flag, sel, adv, onDone }: Props) {
  const [step, setStep] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (step < STEPS.length) {
      const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
      return () => clearTimeout(t);
    }
    setFlash(true);
    const t = setTimeout(onDone, 380);
    return () => clearTimeout(t);
  }, [step, onDone]);

  const current = STEPS[Math.min(step, STEPS.length - 1)];
  const done = step >= STEPS.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Linhas de campo */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-green-400" />
        <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-400" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-green-400" />
        <div className="absolute bottom-0 left-1/2 h-28 w-56 -translate-x-1/2 rounded-t-full border border-green-400" />
        <div className="absolute left-1/2 top-0 h-28 w-56 -translate-x-1/2 rounded-b-full border border-green-400" />
      </div>

      {/* Info da partida */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="mb-12 text-center"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-green-500">
          Iniciando Simulação
        </p>
        <p className="mt-2 text-2xl font-extrabold text-white">
          {flag} {sel}
        </p>
        <p className="text-sm font-medium text-slate-400">vs {adv}</p>
      </motion.div>

      {/* Círculo com contagem */}
      <div className="relative flex h-44 w-44 items-center justify-center">
        {/* Anéis pulsantes */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`ring-${i}-${step}`}
            className="absolute rounded-full border border-green-500/40"
            initial={{ width: 56, height: 56, opacity: 0.9 }}
            animate={{ width: 176, height: 176, opacity: 0 }}
            transition={{ duration: 1.1, delay: i * 0.3, ease: "easeOut" }}
          />
        ))}

        {/* Círculo central */}
        <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full border border-green-500/30 bg-slate-900 shadow-[0_0_40px_8px_rgba(34,197,94,0.12)]">
          <AnimatePresence mode="wait">
            <motion.span
              key={step}
              initial={{ scale: 2.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className={`select-none leading-none ${current.color} ${
                done || step === 3 ? "text-6xl" : "text-7xl font-black"
              }`}
            >
              {current.label}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Texto inferior */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500"
      >
        Calculando resultado
        <motion.span
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        >
          …
        </motion.span>
      </motion.p>

      {/* Flash final */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-white"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
