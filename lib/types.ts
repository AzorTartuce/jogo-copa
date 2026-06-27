export type Category =
  | "Balada"
  | "Drama"
  | "Moda"
  | "Meme"
  | "Lenda"
  | "Reverso";

export interface Card {
  id: number;
  jogador: string;
  poder: string;
  desc: string;
  /** Valor base de Overall (0-100). */
  ov: number;
  emoji: string;
  cat: Category;
  /** Frase usada na narrativa da simulação quando a carta gera um lance. */
  narr: string;
}

export interface Scenario {
  id: number;
  flag: string;
  sel: string;
  ano: number;
  nome: string;
  /** Nome do adversário. */
  adv: string;
  /** Resistência do adversário (0-100). Multiplicada por 5 vira o alvo sobre 500. */
  diff: number;
  desafio: string;
  /** Próxima fase da campanha, se houver. */
  next: Scenario | null;
}

export interface GameMode {
  id: "classico" | "caotico" | "historico";
  nome: string;
  rerolls: number;
  desc: string;
  /** Se verdadeiro, aplica variação aleatória no overall sorteado. */
  chaos: boolean;
}

export interface Slot {
  id: number;
  emoji: string;
  nome: string;
  /** Categorias que recebem bônus de afinidade neste slot. */
  affinity: Category[];
}

export type Tier = 1 | 2 | 3 | 4 | 5;

export interface NarrativeLine {
  kind: "info" | "good" | "bad" | "neutral" | "end";
  text: string;
}

export interface ComboBonus {
  name: string;
  value: number;
  desc: string;
}

export interface SimulationResult {
  win: boolean;
  /** Soma pura dos overalls (máx 500). */
  base: number;
  /** Bônus por encaixar cartas em slots de categoria afim. */
  affinityBonus: number;
  /** Bônus total de combos. */
  comboBonus: number;
  combos: ComboBonus[];
  /** base + affinityBonus + comboBonus. */
  total: number;
  target: number;
  golsCasa: number;
  golsAdv: number;
  lines: NarrativeLine[];
}

export interface LeaderboardEntry {
  scn: string;
  score: number;
  win: boolean;
  mode: string;
  date: number;
}

/** Resultado de um Desafio Diário já jogado. */
export interface DailyRecord {
  /** Chave do dia (YYYY-MM-DD). */
  date: string;
  /** Número sequencial do desafio (#N). */
  puzzle: number;
  win: boolean;
  total: number;
  /** Grade de emojis estilo Wordle (sem spoiler). */
  grid: string;
  combos: string[];
  scn: string;
}

export interface DailyStreak {
  current: number;
  max: number;
  lastDate: string;
}
