"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/lib/toast";

export default function Toast() {
  const message = useToast((s) => s.message);
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-line bg-panel px-4 py-2.5 text-sm font-medium text-ink shadow-lg"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
