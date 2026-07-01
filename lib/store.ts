import { create } from "zustand";
import {
  buildGrid,
  dailyDraw,
  getDailyScenario,
  getDailySeed,
  getPuzzleNumber,
  getTodayKey,
  saveDailyRecord,
  updateStreak,
} from "./daily";
import { CARDS, MODES, SCENARIOS, getFormationSlots } from "./data";
import { affinityMatch, simulate } from "./game";
import { saveScore } from "./leaderboard";
import type {
  Card,
  DailyRecord,
  GameMode,
  Scenario,
  SimulationResult,
} from "./types";
import { clamp, randItem } from "./utils";

type Screen = "home" | "scenario" | "game" | "result";

interface GameState {
  screen: Screen;

  // Seleção
  selectedScenarioId: number | null;
  selectedModeId: GameMode["id"] | null;

  // Partida em andamento
  phase: Scenario | null;
  mode: GameMode | null;
  rerolls: number;
  current: Card | null;
  spinning: boolean;
  slots: (Card | null)[];

  // Desafio diário
  daily: boolean;
  seed: number;
  drawCount: number;
  dailyRecord: DailyRecord | null;
  dailyStreak: number;

  // Resultado
  result: SimulationResult | null;

  // Formação
  formationId: string;

  // Ações
  selectScenario: (id: number) => void;
  selectMode: (id: GameMode["id"]) => void;
  selectFormation: (id: string) => void;
  startGame: () => void;
  startDaily: () => void;
  spin: () => void;
  reroll: () => void;
  placeCard: (index: number) => boolean;
  runSimulation: () => void;
  nextPhase: () => void;
  goToScenarioSelect: () => void;
  goToHome: () => void;
}

const EMPTY_SLOTS: (Card | null)[] = Array(12).fill(null);

function randomDraw(chaos: boolean): Card {
  const card = { ...randItem(CARDS) };
  if (chaos) {
    const jitter = Math.floor(Math.random() * 41) - 20; // -20..+20
    card.ov = clamp(card.ov + jitter, 0, 100);
  }
  return card;
}

/**
 * Sorteia uma carta que ainda não esteja escalada no time, evitando jogadores
 * repetidos. Retorna também o próximo `drawCount` (no diário cada tentativa
 * avança o giro determinístico para manter a reprodutibilidade).
 */
function drawUnique(s: GameState): { card: Card; drawCount: number } {
  const used = new Set(s.slots.filter(Boolean).map((c) => (c as Card).id));
  let n = s.drawCount;
  let card: Card;
  let attempts = 0;
  do {
    card = s.daily ? dailyDraw(s.seed, n) : randomDraw(s.mode!.chaos);
    n++;
    attempts++;
  } while (used.has(card.id) && attempts < 500);
  return { card, drawCount: s.daily ? n : s.drawCount };
}

export const useGame = create<GameState>((set, get) => ({
  screen: "home",
  selectedScenarioId: null,
  selectedModeId: null,
  phase: null,
  mode: null,
  rerolls: 0,
  current: null,
  spinning: false,
  slots: [...EMPTY_SLOTS],
  daily: false,
  seed: 0,
  drawCount: 0,
  dailyRecord: null,
  dailyStreak: 0,
  result: null,
  formationId: "433",

  selectScenario: (id) => set({ selectedScenarioId: id }),
  selectMode: (id) => set({ selectedModeId: id }),
  selectFormation: (id) => set({ formationId: id, slots: [...EMPTY_SLOTS], current: null }),

  startGame: () => {
    const { selectedScenarioId, selectedModeId } = get();
    if (selectedScenarioId == null || selectedModeId == null) return;
    const scn = SCENARIOS.find((s) => s.id === selectedScenarioId);
    const mode = MODES.find((m) => m.id === selectedModeId);
    if (!scn || !mode) return;
    set({
      screen: "game",
      phase: scn,
      mode,
      rerolls: mode.rerolls,
      current: null,
      slots: [...EMPTY_SLOTS],
      result: null,
      daily: false,
      drawCount: 0,
      dailyRecord: null,
    });
  },

  startDaily: () => {
    const dateKey = getTodayKey();
    const scn = getDailyScenario(dateKey);
    const mode = MODES.find((m) => m.id === "classico")!;
    set({
      screen: "game",
      phase: scn,
      mode,
      rerolls: mode.rerolls,
      current: null,
      slots: [...EMPTY_SLOTS],
      result: null,
      daily: true,
      seed: getDailySeed(dateKey),
      drawCount: 0,
      dailyRecord: null,
    });
  },

  spin: () => {
    const s = get();
    if (!s.mode || s.spinning || s.current) return;
    if (s.slots.every(Boolean)) return;
    const { card, drawCount } = drawUnique(s);
    set({
      spinning: true,
      current: card,
      drawCount,
    });
    setTimeout(() => set({ spinning: false }), 600);
  },

  reroll: () => {
    const s = get();
    if (s.rerolls <= 0 || !s.current || !s.mode || s.spinning) return;
    const { card, drawCount } = drawUnique(s);
    set({
      rerolls: s.rerolls - 1,
      spinning: true,
      current: card,
      drawCount,
    });
    setTimeout(() => set({ spinning: false }), 600);
  },

  placeCard: (index) => {
    const { current, slots } = get();
    if (!current || slots[index]) return false;
    const next = [...slots];
    next[index] = current;
    set({ slots: next, current: null });
    return true;
  },

  runSimulation: () => {
    const { slots, phase, mode, daily, formationId } = get();
    if (!phase || !mode || !slots.every(Boolean)) return;
    const cards = slots as Card[];
    const activeSlots = getFormationSlots(formationId);
    const result = simulate(cards, phase, activeSlots);

    if (daily) {
      const dateKey = getTodayKey();
      const matched = cards.map((c, i) => affinityMatch(c, i, activeSlots));
      const record: DailyRecord = {
        date: dateKey,
        puzzle: getPuzzleNumber(dateKey),
        win: result.win,
        total: result.total,
        grid: buildGrid(cards, matched),
        combos: result.combos.map((c) => c.name),
        scn: `${phase.flag} ${phase.sel} ${phase.ano}`,
      };
      saveDailyRecord(record);
      const streak = updateStreak(dateKey);
      set({ screen: "result", result, dailyRecord: record, dailyStreak: streak });
    } else {
      saveScore({
        scn: `${phase.flag} ${phase.sel} ${phase.ano}`,
        score: result.total,
        win: result.win,
        mode: mode.nome,
        date: Date.now(),
      });
      set({ screen: "result", result });
    }
  },

  nextPhase: () => {
    const { phase, mode, daily } = get();
    if (daily || !phase?.next || !mode) {
      get().goToScenarioSelect();
      return;
    }
    set({
      screen: "game",
      phase: phase.next,
      rerolls: mode.rerolls,
      current: null,
      slots: [...EMPTY_SLOTS],
      result: null,
    });
  },

  goToScenarioSelect: () =>
    set({
      screen: "scenario",
      selectedScenarioId: null,
      selectedModeId: null,
      phase: null,
      mode: null,
      current: null,
      slots: [...EMPTY_SLOTS],
      result: null,
      daily: false,
      drawCount: 0,
      dailyRecord: null,
    }),

  goToHome: () =>
    set({
      screen: "home",
      selectedScenarioId: null,
      selectedModeId: null,
      phase: null,
      mode: null,
      current: null,
      slots: [...EMPTY_SLOTS],
      result: null,
      daily: false,
      drawCount: 0,
      dailyRecord: null,
    }),
}));
