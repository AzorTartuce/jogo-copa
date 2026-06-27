import { AFFINITY_BONUS, SLOTS } from "./data";
import type {
  Card,
  Category,
  ComboBonus,
  NarrativeLine,
  Scenario,
  SimulationResult,
} from "./types";

/** Indica se a carta combina com a afinidade do slot na posição dada. */
export function affinityMatch(card: Card, slotIndex: number): boolean {
  return SLOTS[slotIndex]?.affinity.includes(card.cat) ?? false;
}

/** Calcula os combos ativos para um conjunto de 5 cartas. */
export function computeCombos(cards: Card[]): {
  combos: ComboBonus[];
  total: number;
} {
  const counts = new Map<Category, number>();
  for (const c of cards) counts.set(c.cat, (counts.get(c.cat) ?? 0) + 1);
  const max = Math.max(0, ...counts.values());
  const distinct = counts.size;

  const combos: ComboBonus[] = [];
  if (max >= 5) {
    combos.push({ name: "Time Unido", value: 60, desc: "5 cartas da mesma categoria" });
  } else if (max === 4) {
    combos.push({ name: "Entrosamento Total", value: 40, desc: "4 cartas da mesma categoria" });
  } else if (max === 3) {
    combos.push({ name: "Entrosamento", value: 25, desc: "3 cartas da mesma categoria" });
  }
  if (distinct === 5) {
    combos.push({ name: "Time Versátil", value: 30, desc: "Uma carta de cada categoria" });
  }

  const total = combos.reduce((acc, c) => acc + c.value, 0);
  return { combos, total };
}

/**
 * Roda a simulação final. O total agora considera:
 *  - soma dos overalls (base)
 *  - bônus de afinidade (carta na categoria certa do slot)
 *  - bônus de combos
 */
export function simulate(cards: Card[], scenario: Scenario): SimulationResult {
  const base = cards.reduce((acc, c) => acc + c.ov, 0);

  let affinityBonus = 0;
  cards.forEach((c, i) => {
    if (affinityMatch(c, i)) affinityBonus += AFFINITY_BONUS;
  });

  const { combos, total: comboBonus } = computeCombos(cards);

  const total = base + affinityBonus + comboBonus;
  const target = scenario.diff * 5;
  const win = total >= target;

  const margin = total - target;
  let golsCasa: number;
  let golsAdv: number;

  if (win) {
    golsCasa = 1 + Math.floor(Math.random() * 2) + (margin > 40 ? 1 : 0);
    golsAdv = Math.max(0, golsCasa - 1 - Math.floor(Math.random() * 2));
    if (golsAdv >= golsCasa) golsAdv = golsCasa - 1;
  } else {
    golsCasa = Math.floor(Math.random() * 2);
    golsAdv = golsCasa + 1 + Math.floor(Math.random() * 2);
  }

  const lines = buildNarrative(
    cards,
    scenario,
    golsCasa,
    golsAdv,
    win,
    affinityBonus,
    combos,
  );

  return {
    win,
    base,
    affinityBonus,
    comboBonus,
    combos,
    total,
    target,
    golsCasa,
    golsAdv,
    lines,
  };
}

function buildNarrative(
  cards: Card[],
  s: Scenario,
  gc: number,
  ga: number,
  win: boolean,
  affinityBonus: number,
  combos: ComboBonus[],
): NarrativeLine[] {
  const lines: NarrativeLine[] = [];
  lines.push({
    kind: "info",
    text: `🏟️ SIMULAÇÃO: ${s.sel} vs ${s.adv} — ${s.nome} (${s.ano})`,
  });

  if (affinityBonus > 0) {
    lines.push({
      kind: "good",
      text: `🎯 Sinergia de slots ativada: +${affinityBonus} de impacto!`,
    });
  }
  for (const combo of combos) {
    lines.push({ kind: "good", text: `🔗 ${combo.name}! +${combo.value} (${combo.desc})` });
  }

  const minutes = ["12", "23", "38", "45+2", "58", "67", "78", "85", "90+3"];
  const best = [...cards].sort((a, b) => b.ov - a.ov);
  let mi = 0;

  for (let g = 0; g < gc && mi < minutes.length - 1; g++) {
    const card = best[g % best.length];
    lines.push({
      kind: "good",
      text: `🟢 Min ${minutes[mi++]}: [${card.jogador} — ${card.poder}] ${card.narr} ⚽ GOL!`,
    });
  }

  for (let g = 0; g < ga && mi < minutes.length - 1; g++) {
    lines.push({
      kind: "bad",
      text: `🔴 Min ${minutes[mi++]}: ${s.adv} aproveita um vacilo e marca. Pressão total no ${s.sel}.`,
    });
  }

  const filler = best[best.length - 1];
  lines.push({
    kind: "neutral",
    text: `🟡 Min ${minutes[mi++] ?? "80"}: [${filler.jogador}] segura o ritmo e o jogo fica eletrizante.`,
  });

  lines.push({
    kind: "end",
    text: `🏆 FIM DE JOGO (90+3): ${s.sel} ${gc} x ${ga} ${s.adv}`,
  });

  lines.push(
    win
      ? { kind: "good", text: "✨ Linha do tempo reescrita com sucesso!" }
      : {
          kind: "bad",
          text: "😢 O trauma permanece... tente outra combinação de intervenções.",
        },
  );

  return lines;
}
