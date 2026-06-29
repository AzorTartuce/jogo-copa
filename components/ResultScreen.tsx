"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { buildDailyShare } from "@/lib/daily";
import { MAX_BASE } from "@/lib/data";
import { playChampionSound, playGoalSound, playWhistleSound } from "@/lib/sounds";
import { useGame } from "@/lib/store";
import { useToast } from "@/lib/toast";
import type { NarrativeLine } from "@/lib/types";
import ChampionCelebration from "./ChampionCelebration";
import GoalCelebration from "./GoalCelebration";
import Leaderboard from "./Leaderboard";

// ─── Eventos aleatórios que surgem durante a partida ─────────────────────────

const RANDOM_EVENTS: NarrativeLine[] = [
  // Defesas
  { kind: "neutral", text: "🧤 Defesaça! O goleiro voou no canto e espalmou para fora!" },
  { kind: "neutral", text: "🧤 Goleiro saiu nos pés do atacante e salvou com o pé!" },
  { kind: "neutral", text: "🧤 Milagre! Bola já passava a linha, mas o goleiro agarrou!" },
  { kind: "neutral", text: "🥅 Cabeçada perigosa na pequena área — goleiro encaixou!" },
  { kind: "neutral", text: "🧤 Goleiro espalma para escanteio após bicicleta na área!" },
  // Trave e poste
  { kind: "neutral", text: "📐 NA TRAVE! A bola bateu no poste e saiu. Que susto!" },
  { kind: "neutral", text: "📐 Bola no ângulo superior! Trave salva o adversário!" },
  { kind: "neutral", text: "📐 Bateu na trave e voltou! O goleiro ficou parado olhando." },
  { kind: "neutral", text: "📐 Travessão! Cabeçada incrível, mas não desta vez..." },
  // Faltas e cartões
  { kind: "bad",     text: "🟨 Cartão amarelo! Falta dura na entrada da área" },
  { kind: "bad",     text: "🟨 Segundo amarelo! Adversário expulso — 10 em campo!" },
  { kind: "bad",     text: "🟥 Cartão vermelho direto! Falta gravíssima no meio-campo" },
  { kind: "neutral", text: "🦵 Falta cobrada na barreira — bola desviada para escanteio" },
  { kind: "neutral", text: "📏 Impedimento! Árbitro anulou o lance por milímetros" },
  // Chances claras
  { kind: "neutral", text: "🎯 Um a um com o goleiro! Chutou em cima do arqueiro" },
  { kind: "neutral", text: "🎯 Finalizou por cima do gol vazio! Que desperdício absurdo!" },
  { kind: "neutral", text: "💨 Contra-ataque veloz! Mas o último passe saiu errado" },
  { kind: "neutral", text: "🔄 Escanteio cobrado na área — zagueiro afastou de cabeça" },
  { kind: "neutral", text: "💥 Voleio na entrada da área! Bola nas mãos do goleiro" },
  // VAR e árbitro
  { kind: "info",    text: "📺 VAR em análise... revisando lance polêmico na área..." },
  { kind: "info",    text: "📺 VAR confirma decisão do árbitro. Jogo segue." },
  { kind: "info",    text: "📺 Pênalti revisado pelo VAR — árbitro volta atrás!" },
  { kind: "neutral", text: "⚖️ Jogadores reclamam com o árbitro. Cartão para o capitão" },
  // Atmosfera
  { kind: "good",    text: "📢 A torcida levanta do assento! Estádio todo vibrando!" },
  { kind: "good",    text: "📢 Cânticos ecoam pelo estádio — energia nas alturas!" },
  { kind: "neutral", text: "🩹 Jogador caiu machucado. Médico entra para atendimento." },
  { kind: "neutral", text: "🔄 Substituição tática! Treinador tenta mudar o panorama" },
  { kind: "neutral", text: "⏱️ Árbitro acrescenta 6 minutos! Tensão máxima no estádio!" },
  { kind: "neutral", text: "🌧️ Chuva intensa dificulta as jogadas — campo escorregadio" },
];

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface FeedItem extends NarrativeLine {
  isRandom: boolean;
  isGoal: boolean;
  isOppGoal: boolean;
}

// ─── Monta feed intercalando eventos reais + aleatórios ──────────────────────

function buildMasterFeed(lines: NarrativeLine[]): FeedItem[] {
  const feed: FeedItem[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isGoal    = line.kind === "good" && line.text.includes("GOL!");
    const isOppGoal = line.kind === "bad"  && line.text.includes("marca");

    // Injeta 1 ou 2 eventos aleatórios antes de eventos não-iniciais e não-finais
    if (i > 0 && i < lines.length - 2 && !isGoal) {
      const n = Math.random() < 0.65 ? 1 : Math.random() < 0.35 ? 2 : 0;
      for (let j = 0; j < n; j++) {
        const ev = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
        feed.push({ ...ev, isRandom: true, isGoal: false, isOppGoal: false });
      }
    }

    feed.push({ ...line, isRandom: false, isGoal, isOppGoal });
  }

  return feed;
}

// Delay antes de mostrar o próximo item
function nextDelay(prev: FeedItem | null, isFirst: boolean): number {
  if (isFirst)           return 600;
  if (prev?.isGoal)      return 4200; // pausa longa após gol — deixa celebração respirar
  if (prev?.isOppGoal)   return 3000;
  if (prev?.isRandom)    return 2000;
  return 2800;
}

// ─── Estilos por tipo de item ─────────────────────────────────────────────────

const REAL_BG: Record<NarrativeLine["kind"], string> = {
  info:    "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30",
  good:    "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950/30",
  bad:     "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30",
  neutral: "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30",
  end:     "border-slate-300 bg-slate-100 dark:border-slate-600 dark:bg-slate-800/60",
};

const REAL_TEXT: Record<NarrativeLine["kind"], string> = {
  info:    "text-blue-700 dark:text-blue-300",
  good:    "text-green-700 font-semibold dark:text-green-400",
  bad:     "text-red-600 font-semibold dark:text-red-400",
  neutral: "text-amber-700 dark:text-amber-400",
  end:     "text-slate-800 font-bold dark:text-slate-200",
};

// ─── Componente principal ─────────────────────────────────────────────────────

export default function ResultScreen() {
  const { phase, result, daily, dailyRecord, dailyStreak, nextPhase, goToScenarioSelect } =
    useGame();
  const toast = useToast((s) => s.show);

  const [feedIdx,       setFeedIdx]       = useState(0);
  const [liveHome,      setLiveHome]      = useState(0);
  const [liveAway,      setLiveAway]      = useState(0);
  const [matchDone,     setMatchDone]     = useState(false);
  const [scoreKey,      setScoreKey]      = useState(0);
  const [celKey,        setCelKey]        = useState<number | null>(null);
  const [showChampion,  setShowChampion]  = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Monta o feed uma vez (result.lines é estável após o mount)
  const masterFeed = useMemo<FeedItem[]>(() => {
    if (!result) return [];
    return buildMasterFeed(result.lines);
  }, [result]);

  // Avança item por item com delay variável
  useEffect(() => {
    if (matchDone) return;
    if (feedIdx >= masterFeed.length) {
      setMatchDone(true);
      playWhistleSound();
      if (result?.win) {
        setTimeout(() => {
          setShowChampion(true);
          playChampionSound();
        }, 800);
      }
      return;
    }
    const prev = feedIdx > 0 ? masterFeed[feedIdx - 1] : null;
    const delay = nextDelay(prev, feedIdx === 0);

    const t = setTimeout(() => {
      const item = masterFeed[feedIdx];
      if (item.isGoal) {
        setLiveHome((h) => h + 1);
        setScoreKey((k) => k + 1);
        setCelKey(Date.now());
        playGoalSound();
      } else if (item.isOppGoal) {
        setLiveAway((a) => a + 1);
        setScoreKey((k) => k + 1);
      }
      setFeedIdx((i) => i + 1);
    }, delay);

    return () => clearTimeout(t);
  }, [feedIdx, masterFeed, matchDone]);

  // Auto-scroll para o último lance
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [feedIdx]);

  if (!phase || !result) return null;

  const { win, base, affinityBonus, comboBonus, total } = result;
  const hasNext  = !daily && win && !!phase.next;
  const hasBonus = affinityBonus > 0 || comboBonus > 0;
  const visibleItems = masterFeed.slice(0, feedIdx);

  const skipToEnd = () => {
    let home = 0, away = 0;
    for (const l of result.lines) {
      if (l.kind === "good" && l.text.includes("GOL!")) home++;
      if (l.kind === "bad"  && l.text.includes("marca")) away++;
    }
    setLiveHome(home);
    setLiveAway(away);
    setFeedIdx(masterFeed.length);
    setMatchDone(true);
    setCelKey(null);
    playWhistleSound();
  };

  const share = () => {
    const txt =
      daily && dailyRecord
        ? buildDailyShare(dailyRecord, dailyStreak)
        : `${win ? "Salvei" : "Tentei salvar"} ${phase.sel} de ${phase.ano} na Máquina do Tempo! Overall: ${total}/${MAX_BASE} ⚽🕰️ #MáquinaDoTempo`;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: "Máquina do Tempo do Futebol", text: txt }).catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(txt);
      toast("Resultado copiado!");
    } else {
      toast(txt);
    }
  };

  return (
    <>
      {/* Celebração de gol */}
      <AnimatePresence>
        {celKey !== null && (
          <GoalCelebration key={celKey} onDone={() => setCelKey(null)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showChampion && (
          <ChampionCelebration key="champion" onDone={() => setShowChampion(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <section className="rounded-xl border border-line bg-panel p-5 shadow-sm">

          {/* ── Placar ao vivo ─────────────────────────────────────── */}
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {!matchDone ? (
                  <>
                    <motion.span
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="h-2 w-2 rounded-full bg-red-500"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                      Ao Vivo
                    </span>
                  </>
                ) : (
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                    Tempo Final
                  </span>
                )}
              </div>
              {!matchDone && (
                <button
                  onClick={skipToEnd}
                  className="text-[10px] text-muted underline underline-offset-2 hover:text-ink"
                >
                  Pular para o final →
                </button>
              )}
            </div>

            {/* Placar pisca em amarelo quando sai gol */}
            <motion.div
              key={scoreKey}
              initial={scoreKey > 0 ? { backgroundColor: "#fef08a", scale: 1.05 } : {}}
              animate={{ backgroundColor: "#f1f5f9", scale: 1 }}
              transition={{ duration: 0.7 }}
              className="rounded-xl border border-line bg-bg2 px-4 py-4 text-center"
            >
              <p className="text-3xl font-black tracking-tight sm:text-4xl">
                {phase.flag} {phase.sel}{" "}
                <span className="text-green-600">{liveHome}</span>
                <span className="mx-2 text-slate-400">×</span>
                <span className="text-red-500">{liveAway}</span>{" "}
                {phase.adv}
              </p>
            </motion.div>
          </div>

          {/* ── Feed de lances ─────────────────────────────────────── */}
          <div className="rounded-xl border border-line bg-bg2 p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
              Lances da Partida
            </p>

            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {visibleItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    {item.isRandom ? (
                      /* Evento aleatório — tom mais discreto */
                      <div className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs italic text-slate-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400">
                        {item.text}
                      </div>
                    ) : item.isGoal ? (
                      /* Gol do nosso time — destaque máximo */
                      <div className="rounded-lg border-2 border-green-400 bg-green-50 px-3 py-2.5 text-sm font-bold text-green-700 ring-2 ring-green-100 dark:border-green-600 dark:bg-green-950/40 dark:text-green-400 dark:ring-green-900/40">
                        {item.text}
                      </div>
                    ) : item.isOppGoal ? (
                      /* Gol do adversário */
                      <div className="rounded-lg border-2 border-red-300 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 dark:border-red-700 dark:bg-red-950/40 dark:text-red-400">
                        {item.text}
                      </div>
                    ) : (
                      /* Evento narrativo normal */
                      <div
                        className={`rounded-lg border px-3 py-2 text-sm leading-snug ${REAL_BG[item.kind]} ${REAL_TEXT[item.kind]}`}
                      >
                        {item.text}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Indicador de aguardando próximo lance */}
              {!matchDone && (
                <div className="flex items-center gap-2 px-1 py-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-slate-300"
                      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                    />
                  ))}
                  <span className="text-xs text-muted">próximo lance…</span>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          {/* ── Resultado final — aparece só após o apito ──────────── */}
          <AnimatePresence>
            {matchDone && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-5 space-y-4"
              >
                {/* Banner de resultado */}
                <div
                  className={`rounded-xl border p-4 text-center ${
                    win
                      ? "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950/30"
                      : "border-red-200 bg-red-50 dark:border-red-700 dark:bg-red-950/30"
                  }`}
                >
                  <p className={`text-xl font-black sm:text-2xl ${win ? "text-green-700 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {win
                      ? `✨ Você salvou ${phase.sel} de ${phase.ano}!`
                      : "💔 A história se repetiu..."}
                  </p>

                  <div className="mt-2">
                    <span className="text-sm text-muted">Pontuação Final: </span>
                    <span className="text-xl font-black text-ink">{total}</span>
                    <span className="text-sm text-muted">/{MAX_BASE}</span>
                  </div>

                  {hasBonus && (
                    <div className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-muted">
                      <span>Base {base}</span>
                      {affinityBonus > 0 && <span className="text-green-700">Afinidade +{affinityBonus}</span>}
                      {comboBonus > 0  && <span className="text-green-700">Combos +{comboBonus}</span>}
                    </div>
                  )}

                  {result.combos.length > 0 && (
                    <div className="mt-2 flex flex-wrap justify-center gap-2">
                      {result.combos.map((c) => (
                        <span
                          key={c.name}
                          title={c.desc}
                          className="rounded-full border border-green-300 bg-green-100 px-2.5 py-0.5 text-xs text-green-700"
                        >
                          🔗 {c.name} +{c.value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Desafio diário */}
                {daily && dailyRecord && (
                  <div className="rounded-lg border border-line bg-bg2 p-4 text-center">
                    <p className="text-xs uppercase tracking-widest text-muted">
                      Desafio Diário #{dailyRecord.puzzle}
                    </p>
                    <div className="my-2 text-3xl tracking-widest">{dailyRecord.grid}</div>
                    {dailyStreak > 1 && (
                      <p className="text-sm font-medium text-amber-600">🔥 Sequência: {dailyStreak} dias</p>
                    )}
                  </div>
                )}

                {/* Ações */}
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={share}
                    className="btn-brand rounded-lg px-5 py-2.5 text-sm font-semibold transition"
                  >
                    📤 Compartilhar
                  </button>
                  {hasNext && (
                    <button
                      onClick={nextPhase}
                      className="rounded-lg border border-line bg-bg2 px-5 py-2.5 text-sm font-semibold transition hover:border-brand hover:text-brand"
                    >
                      → Próxima Fase
                    </button>
                  )}
                  <button
                    onClick={goToScenarioSelect}
                    className="rounded-lg border border-line bg-bg2 px-5 py-2.5 text-sm font-semibold transition hover:border-brand hover:text-brand"
                  >
                    {daily ? "← Início" : "🔁 Jogar de Novo"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </section>

        {!daily && matchDone && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Leaderboard />
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
