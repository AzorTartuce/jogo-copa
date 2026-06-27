"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/lib/toast";

export default function Toast() {
  const message = useToast((s) => s.message);
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-brand bg-panel2 px-5 py-3 text-sm shadow-lg"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
