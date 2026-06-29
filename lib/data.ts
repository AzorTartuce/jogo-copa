import type { Card, Category, FormationDef, GameMode, Scenario, Slot } from "./types";

const COACH_DEF: Omit<Slot, "id"> = { emoji: "📋", abbr: "TEC", nome: "Técnico", affinity: ["Lenda", "Moda"] };
const GK_DEF:    Omit<Slot, "id"> = { emoji: "🧤", abbr: "GOL", nome: "Goleiro", affinity: ["Lenda", "Drama"] };

export const FORMATIONS: FormationDef[] = [
  {
    id: "433", label: "4-3-3",
    outfield: [
      { emoji: "🛡️", abbr: "LE",  nome: "Lateral Esq.",  affinity: ["Drama", "Reverso"]  },
      { emoji: "🛡️", abbr: "ZAG", nome: "Zagueiro",      affinity: ["Drama"]              },
      { emoji: "🛡️", abbr: "ZAG", nome: "Zagueiro",      affinity: ["Drama"]              },
      { emoji: "🛡️", abbr: "LD",  nome: "Lateral Dir.",  affinity: ["Drama", "Reverso"]  },
      { emoji: "⚡",  abbr: "ME",  nome: "Meia Esq.",     affinity: ["Reverso", "Balada"] },
      { emoji: "⚡",  abbr: "VOL", nome: "Volante",       affinity: ["Drama", "Lenda"]    },
      { emoji: "⚡",  abbr: "MD",  nome: "Meia Dir.",     affinity: ["Reverso", "Balada"] },
      { emoji: "⚽",  abbr: "PE",  nome: "Ponta Esq.",    affinity: ["Balada", "Meme"]    },
      { emoji: "⚽",  abbr: "CA",  nome: "Centroavante",  affinity: ["Lenda", "Balada"]   },
      { emoji: "⚽",  abbr: "PD",  nome: "Ponta Dir.",    affinity: ["Balada", "Meme"]    },
    ],
    fieldRows: [[9, 10, 11], [6, 7, 8], [2, 3, 4, 5]],
  },
  {
    id: "442", label: "4-4-2",
    outfield: [
      { emoji: "🛡️", abbr: "LE",  nome: "Lateral Esq.",  affinity: ["Drama", "Reverso"]  },
      { emoji: "🛡️", abbr: "ZAG", nome: "Zagueiro",      affinity: ["Drama"]              },
      { emoji: "🛡️", abbr: "ZAG", nome: "Zagueiro",      affinity: ["Drama"]              },
      { emoji: "🛡️", abbr: "LD",  nome: "Lateral Dir.",  affinity: ["Drama", "Reverso"]  },
      { emoji: "⚡",  abbr: "ALE", nome: "Ala Esq.",      affinity: ["Reverso", "Balada"] },
      { emoji: "⚡",  abbr: "MCE", nome: "Meia Centro",   affinity: ["Lenda", "Reverso"]  },
      { emoji: "⚡",  abbr: "MCD", nome: "Meia Centro",   affinity: ["Lenda", "Reverso"]  },
      { emoji: "⚡",  abbr: "ALD", nome: "Ala Dir.",      affinity: ["Reverso", "Balada"] },
      { emoji: "⚽",  abbr: "CA",  nome: "Centroavante",  affinity: ["Lenda", "Balada"]   },
      { emoji: "⚽",  abbr: "CA",  nome: "Centroavante",  affinity: ["Lenda", "Balada"]   },
    ],
    fieldRows: [[10, 11], [6, 7, 8, 9], [2, 3, 4, 5]],
  },
  {
    id: "4231", label: "4-2-3-1",
    outfield: [
      { emoji: "🛡️", abbr: "LE",  nome: "Lateral Esq.",  affinity: ["Drama", "Reverso"]  },
      { emoji: "🛡️", abbr: "ZAG", nome: "Zagueiro",      affinity: ["Drama"]              },
      { emoji: "🛡️", abbr: "ZAG", nome: "Zagueiro",      affinity: ["Drama"]              },
      { emoji: "🛡️", abbr: "LD",  nome: "Lateral Dir.",  affinity: ["Drama", "Reverso"]  },
      { emoji: "⚡",  abbr: "VOL", nome: "Volante",       affinity: ["Drama", "Lenda"]    },
      { emoji: "⚡",  abbr: "VOL", nome: "Volante",       affinity: ["Drama", "Lenda"]    },
      { emoji: "⚡",  abbr: "MEA", nome: "Meia Ata. Esq", affinity: ["Reverso", "Balada"] },
      { emoji: "⚡",  abbr: "MAM", nome: "Meia Atacante", affinity: ["Balada", "Lenda"]   },
      { emoji: "⚡",  abbr: "MAD", nome: "Meia Ata. Dir", affinity: ["Reverso", "Balada"] },
      { emoji: "⚽",  abbr: "CA",  nome: "Centroavante",  affinity: ["Lenda", "Balada"]   },
    ],
    fieldRows: [[11], [8, 9, 10], [6, 7], [2, 3, 4, 5]],
  },
  {
    id: "352", label: "3-5-2",
    outfield: [
      { emoji: "🛡️", abbr: "ZAG", nome: "Zagueiro",      affinity: ["Drama"]              },
      { emoji: "🛡️", abbr: "ZAG", nome: "Zagueiro",      affinity: ["Drama"]              },
      { emoji: "🛡️", abbr: "ZAG", nome: "Zagueiro",      affinity: ["Drama"]              },
      { emoji: "⚡",  abbr: "ALE", nome: "Ala Esq.",      affinity: ["Reverso", "Balada"] },
      { emoji: "⚡",  abbr: "MCE", nome: "Meia Centro",   affinity: ["Lenda", "Reverso"]  },
      { emoji: "⚡",  abbr: "VOL", nome: "Volante",       affinity: ["Drama", "Lenda"]    },
      { emoji: "⚡",  abbr: "MCD", nome: "Meia Centro",   affinity: ["Lenda", "Reverso"]  },
      { emoji: "⚡",  abbr: "ALD", nome: "Ala Dir.",      affinity: ["Reverso", "Balada"] },
      { emoji: "⚽",  abbr: "CA",  nome: "Centroavante",  affinity: ["Lenda", "Balada"]   },
      { emoji: "⚽",  abbr: "CA",  nome: "Centroavante",  affinity: ["Lenda", "Balada"]   },
    ],
    fieldRows: [[10, 11], [5, 6, 7, 8, 9], [2, 3, 4]],
  },
  {
    id: "532", label: "5-3-2",
    outfield: [
      { emoji: "🛡️", abbr: "ALE", nome: "Ala Defensivo",  affinity: ["Drama", "Reverso"]  },
      { emoji: "🛡️", abbr: "ZAG", nome: "Zagueiro",       affinity: ["Drama"]              },
      { emoji: "🛡️", abbr: "ZAG", nome: "Zagueiro",       affinity: ["Drama"]              },
      { emoji: "🛡️", abbr: "ZAG", nome: "Zagueiro",       affinity: ["Drama"]              },
      { emoji: "🛡️", abbr: "ALD", nome: "Ala Defensivo",  affinity: ["Drama", "Reverso"]  },
      { emoji: "⚡",  abbr: "MCE", nome: "Meia Centro",    affinity: ["Lenda", "Reverso"]  },
      { emoji: "⚡",  abbr: "VOL", nome: "Volante",        affinity: ["Drama", "Lenda"]    },
      { emoji: "⚡",  abbr: "MCD", nome: "Meia Centro",    affinity: ["Lenda", "Reverso"]  },
      { emoji: "⚽",  abbr: "CA",  nome: "Centroavante",   affinity: ["Lenda", "Balada"]   },
      { emoji: "⚽",  abbr: "CA",  nome: "Centroavante",   affinity: ["Lenda", "Balada"]   },
    ],
    fieldRows: [[10, 11], [7, 8, 9], [2, 3, 4, 5, 6]],
  },
];

export function getFormationSlots(formationId: string): Slot[] {
  const f = FORMATIONS.find((f) => f.id === formationId) ?? FORMATIONS[0];
  return [
    { id: 0, ...COACH_DEF },
    { id: 1, ...GK_DEF },
    ...f.outfield.map((s, i) => ({ id: i + 2, ...s })),
  ];
}

/** Slots padrão (4-3-3) — mantido para compatibilidade com affinityMatch sem formação. */
export const SLOTS = getFormationSlots("433");

/** Soma máxima de overalls com 12 jogadores × 100. */
export const MAX_BASE = SLOTS.length * 100;

/** Bônus de overall ao encaixar uma carta num slot de categoria afim. */
export const AFFINITY_BONUS = 10;

/** Emoji por categoria, usado nas dicas de afinidade. */
export const CATEGORY_EMOJI: Record<Category, string> = {
  Balada: "🍾",
  Drama: "🎭",
  Moda: "💎",
  Meme: "😂",
  Lenda: "👑",
  Reverso: "🔄",
};

export const MODES: GameMode[] = [
  {
    id: "classico",
    nome: "Clássico",
    rerolls: 3,
    desc: "3 re-sorteios. Equilíbrio entre sorte e estratégia.",
    chaos: false,
  },
  {
    id: "caotico",
    nome: "Caótico",
    rerolls: 5,
    desc: "5 re-sorteios, mas os overalls saem mais imprevisíveis.",
    chaos: true,
  },
  {
    id: "historico",
    nome: "Histórico",
    rerolls: 1,
    desc: "1 re-sorteio. Desafio máximo para os corajosos.",
    chaos: false,
  },
];

// Campanha do Brasil 2014: vencer a semi desbloqueia a final no Maracanã.
const brasil2014Final: Scenario = {
  id: 101,
  flag: "🇧🇷",
  sel: "Brasil",
  ano: 2014,
  nome: "Final vs Argentina (Maracanã)",
  adv: "Argentina",
  diff: 95,
  desafio: "Vencer Messi e Higuaín em casa e ser campeão do mundo",
  next: null,
};

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    flag: "🇧🇷",
    sel: "Brasil",
    ano: 2014,
    nome: "Semifinal vs Alemanha",
    adv: "Alemanha",
    diff: 92,
    desafio: "Passar pela Alemanha sem Neymar e Thiago Silva",
    next: brasil2014Final,
  },
  {
    id: 2,
    flag: "🇫🇷",
    sel: "França",
    ano: 2006,
    nome: "Final vs Itália",
    adv: "Itália",
    diff: 90,
    desafio: "Impedir a cabeçada de Zidane e vencer nos pênaltis",
    next: null,
  },
  {
    id: 3,
    flag: "🇦🇷",
    sel: "Argentina",
    ano: 2014,
    nome: "Final vs Alemanha",
    adv: "Alemanha",
    diff: 91,
    desafio: "Fazer Higuaín ou Messi acertar o gol decisivo",
    next: null,
  },
  {
    id: 4,
    flag: "🇵🇹",
    sel: "Portugal",
    ano: 2022,
    nome: "Oitavas vs Marrocos",
    adv: "Marrocos",
    diff: 80,
    desafio: "Tirar Cristiano Ronaldo do banco e furar a retranca",
    next: null,
  },
  {
    id: 5,
    flag: "🏴",
    sel: "Inglaterra",
    ano: 1986,
    nome: "Quartas vs Argentina",
    adv: "Argentina",
    diff: 88,
    desafio: "Anular o gol da 'Mão de Deus' de Maradona",
    next: null,
  },
  {
    id: 6,
    flag: "🇳🇱",
    sel: "Holanda",
    ano: 2010,
    nome: "Final vs Espanha",
    adv: "Espanha",
    diff: 89,
    desafio: "Fazer Robben furar o Casillas no mano a mano",
    next: null,
  },
  {
    id: 7,
    flag: "🇮🇹",
    sel: "Itália",
    ano: 1994,
    nome: "Final vs Brasil (pênaltis)",
    adv: "Brasil",
    diff: 90,
    desafio: "Mudar a ordem dos batedores e evitar o isolamento de Baggio",
    next: null,
  },
  {
    id: 8,
    flag: "🇪🇸",
    sel: "Espanha",
    ano: 2002,
    nome: "Quartas vs Coreia do Sul",
    adv: "Coreia do Sul",
    diff: 78,
    desafio: "Vencer apesar dos erros absurdos de arbitragem",
    next: null,
  },
  {
    id: 9,
    flag: "🇩🇪",
    sel: "Alemanha",
    ano: 2018,
    nome: "Fase de Grupos vs Coreia do Sul",
    adv: "Coreia do Sul",
    diff: 75,
    desafio: "Evitar o vexame e a eliminação precoce",
    next: null,
  },
  {
    id: 10,
    flag: "🇺🇾",
    sel: "Uruguai",
    ano: 2014,
    nome: "Fase de Grupos vs Itália",
    adv: "Itália",
    diff: 82,
    desafio: "Impedir a mordida de Suárez (e a suspensão)",
    next: null,
  },
];

export const CARDS: Card[] = [
  // ── Categoria 1: Baladas, Festas e Noites Selvagens ──
  { id: 1, jogador: "Romário", poder: "Night Club 1994", desc: "Sai da balada com criatividade potencializada.", ov: 95, emoji: "🍾", cat: "Balada", narr: "Romário recebe na área com criatividade absurda e MARCA!" },
  { id: 2, jogador: "Ronaldinho Gaúcho", poder: "Alegria Contagiante", desc: "A energia da festa invade o vestiário.", ov: 87, emoji: "🎭", cat: "Balada", narr: "Ronaldinho dança no meio-campo e o time joga sorrindo." },
  { id: 3, jogador: "Pelé", poder: "Noite de Ouro", desc: "Convida o time para celebrar antes mesmo de ganhar.", ov: 92, emoji: "🌙", cat: "Balada", narr: "O grupo entra em campo com confiança de campeão." },
  { id: 4, jogador: "Gérard Piqué", poder: "Rockstar Energy", desc: "A atitude rockstar desinibe o time inteiro.", ov: 78, emoji: "🎸", cat: "Balada", narr: "Piqué sobe pra área como se fosse o show principal." },
  { id: 5, jogador: "Neymar", poder: "Festa da Seleção", desc: "Organiza aquela festa 'antes da final'.", ov: 84, emoji: "🎉", cat: "Balada", narr: "Neymar puxa o time pra cima com pura energia." },
  { id: 6, jogador: "George Best", poder: "Última Rodada", desc: "O boêmio que gastava fama, dinheiro e bola com estilo.", ov: 83, emoji: "🥃", cat: "Balada", narr: "Best dribla três e ainda pisca pra torcida." },
  { id: 7, jogador: "Adriano Imperador", poder: "Saudade da Quebrada", desc: "A alegria da pelada da comunidade vira gol de placa.", ov: 88, emoji: "👑", cat: "Balada", narr: "Adriano pega de primeira: foguete no ângulo!" },
  { id: 8, jogador: "Garrincha", poder: "Alegria do Povo", desc: "Joga pelo puro prazer e dribla por diversão.", ov: 90, emoji: "🦅", cat: "Balada", narr: "Garrincha humilha o lateral com um drible impossível." },

  // ── Categoria 2: Prisões, Resgates e Histórias Dramáticas ──
  { id: 9, jogador: "Ronaldinho (Prisão)", poder: "Circo Atrás das Grades", desc: "Leva a alegria das quadras improvisadas pro jogo.", ov: 89, emoji: "⚽", cat: "Drama", narr: "Ronaldinho aplica um lençol e a torcida vai à loucura." },
  { id: 10, jogador: "Benzema", poder: "Fogo na Veia", desc: "Aquela raiva contida finalmente invade o time.", ov: 80, emoji: "🔥", cat: "Drama", narr: "Benzema ataca com fúria e a defesa adversária treme." },
  { id: 11, jogador: "Ryan Giggs", poder: "Velocidade Pura", desc: "Corre como se estivesse fugindo de algo.", ov: 85, emoji: "💨", cat: "Drama", narr: "Giggs dispara pela esquerda e ninguém o alcança." },
  { id: 12, jogador: "Eric Cantona", poder: "Rei do Drama", desc: "Liderança e carisma absolutamente memoráveis.", ov: 88, emoji: "🎩", cat: "Drama", narr: "Cantona levanta o queixo e comanda o time como um rei." },
  { id: 13, jogador: "Sócrates", poder: "Democracia Corinthiana", desc: "O Doutor organiza o time como um movimento.", ov: 87, emoji: "✊", cat: "Drama", narr: "Sócrates dá um lençol de calcanhar e arma o ataque." },
  { id: 14, jogador: "Di Stéfano (Sequestro)", poder: "Saudade Resgatada", desc: "O craque sequestrado volta com sede de jogo.", ov: 86, emoji: "🕊️", cat: "Drama", narr: "Di Stéfano aparece em todo lugar do campo ao mesmo tempo." },

  // ── Categoria 3: Estilo de Vida e Moda ──
  { id: 15, jogador: "David Beckham", poder: "Aroma da Confiança", desc: "O perfume icônico invade o vestiário.", ov: 82, emoji: "💎", cat: "Moda", narr: "Beckham cobra a falta com a curva perfeita: golaço!" },
  { id: 16, jogador: "Cristiano Ronaldo", poder: "Máquina de Ganhar", desc: "A obsessão com treino contagia todo o grupo.", ov: 93, emoji: "💪", cat: "Moda", narr: "CR7 salta mais alto que todos: SIIIUUU, é GOL!" },
  { id: 17, jogador: "Neymar", poder: "Vibe Criativa", desc: "O cabelo 'diferente' libera a criatividade.", ov: 76, emoji: "🌈", cat: "Moda", narr: "Neymar inventa um drible improvável na linha de fundo." },
  { id: 18, jogador: "Zinedine Zidane", poder: "Maestro Elegante", desc: "A elegância zen traz calma tática absoluta.", ov: 91, emoji: "👔", cat: "Moda", narr: "Zidane dá um passe de mestre que ninguém viu chegar." },
  { id: 19, jogador: "Paul Pogba", poder: "Dab da Vitória", desc: "O estilo e o dab desestabilizam o adversário.", ov: 79, emoji: "🕺", cat: "Moda", narr: "Pogba acerta um chutaço de fora da área e dá o dab." },
  { id: 20, jogador: "Mario Götze", poder: "Mostre ao Mundo", desc: "A frase do técnico vira destino: a hora chegou.", ov: 85, emoji: "✨", cat: "Moda", narr: "Götze domina no peito e bate de primeira: gol!" },

  // ── Categoria 4: Anedotas Hilárias e Memes ──
  { id: 21, jogador: "Diego Maradona", poder: "Mão de Deus Invertida", desc: "A 'mão de deus' agora trabalha CONTRA o adversário.", ov: 94, emoji: "🔮", cat: "Meme", narr: "A bola desvia misteriosamente e entra no gol!" },
  { id: 22, jogador: "Pelé", poder: "King of Kings", desc: "Pelé, literalmente, vai jogar.", ov: 96, emoji: "👑", cat: "Meme", narr: "Pelé pega a bola no meio e marca um golaço histórico." },
  { id: 23, jogador: "Gengis Khan", poder: "Defensor Mongol", desc: "Colocar literalmente um conquistador na zaga (puro meme).", ov: 20, emoji: "⚔️", cat: "Meme", narr: "Gengis Khan tenta marcar e leva um drible humilhante." },
  { id: 24, jogador: "Mario Balotelli", poder: "Why Always Me?", desc: "A celebração caótica desestabiliza o rival.", ov: 72, emoji: "🧨", cat: "Meme", narr: "Balotelli marca e tira a camisa: o caos se instala." },
  { id: 25, jogador: "Higuaín", poder: "O Gol Perdido", desc: "Dessa vez, sozinho na frente do gol, ele NÃO erra.", ov: 70, emoji: "😅", cat: "Meme", narr: "Higuaín fica de frente pro gol e... DESSA VEZ FAZ!" },
  { id: 26, jogador: "El Hadji Diouf", poder: "Cuspe Reverso", desc: "A polêmica vira pura intimidação psicológica.", ov: 55, emoji: "💢", cat: "Meme", narr: "Diouf provoca tanto que o zagueiro perde a cabeça." },
  { id: 27, jogador: "Roberto Baggio", poder: "Pênalti no Ângulo", desc: "Dessa vez o rabo de cavalo divino acerta o gol.", ov: 84, emoji: "🎯", cat: "Meme", narr: "Baggio respira fundo e manda no ângulo: nada de isolar!" },
  { id: 28, jogador: "Taffarel", poder: "Pega Ladrão", desc: "Todo mundo pede: 'Taffarel, pega!' — e ele pega.", ov: 86, emoji: "🧤", cat: "Meme", narr: "Taffarel voa e defende o pênalti decisivo!" },

  // ── Categoria 5: Habilidades Especiais (Jogadores Lendários) ──
  { id: 29, jogador: "Pelé", poder: "Sabiá do Futebol", desc: "Do banco, sussurra as melhores jogadas no ouvido.", ov: 89, emoji: "🐦", cat: "Lenda", narr: "Pelé orienta a jogada e o time executa com perfeição." },
  { id: 30, jogador: "Johan Cruyff", poder: "Giro de Cruyff", desc: "O famoso giro vira estratégia ofensiva do time.", ov: 90, emoji: "🌀", cat: "Lenda", narr: "Cruyff gira, deixa o zagueiro no chão e cruza rasteiro." },
  { id: 31, jogador: "Gerd Müller", poder: "Assassino da Área", desc: "O instinto de goleador do 'Bombardeiro' ressurge.", ov: 91, emoji: "⚰️", cat: "Lenda", narr: "Müller aparece na pequena área e empurra pro gol." },
  { id: 32, jogador: "Franz Beckenbauer", poder: "Imperador da Defesa", desc: "Organiza toda a defesa com elegância imperial.", ov: 89, emoji: "🏰", cat: "Lenda", narr: "Beckenbauer comanda a linha e anula o ataque rival." },
  { id: 33, jogador: "Lionel Messi", poder: "GOAT Mode", desc: "Simplesmente o melhor decide entrar em campo.", ov: 96, emoji: "🐐", cat: "Lenda", narr: "Messi passa por quatro e toca na saída do goleiro: GOL!" },
  { id: 34, jogador: "Zico", poder: "Galinho de Quintino", desc: "A precisão cirúrgica nas faltas e passes.", ov: 90, emoji: "🐓", cat: "Lenda", narr: "Zico cobra a falta com efeito impossível: no ângulo!" },
  { id: 35, jogador: "Lev Yashin", poder: "Aranha Negra", desc: "O maior goleiro de todos fecha o gol por completo.", ov: 88, emoji: "🕷️", cat: "Lenda", narr: "Yashin defende o impossível e segura o resultado." },
  { id: 36, jogador: "Bobby Moore", poder: "Carrinho Perfeito", desc: "O desarme mais limpo e elegante da história.", ov: 85, emoji: "🛡️", cat: "Lenda", narr: "Moore dá um carrinho cirúrgico e tira o gol certo." },

  // ── Categoria 6: Momentos Icônicos Reversados ──
  { id: 37, jogador: "Roberto Carlos", poder: "Chute Mágico", desc: "Aquele chute impossível contra a França agora é NOSSO.", ov: 86, emoji: "⚡", cat: "Reverso", narr: "Roberto Carlos solta a bomba: a bola faz a curva e entra!" },
  { id: 38, jogador: "Zidane", poder: "Cabeçada Reversa", desc: "A cabeçada da final de 2006, mas pro lado certo.", ov: 87, emoji: "💫", cat: "Reverso", narr: "Zidane sobe mais que a defesa e cabeceia: gol de placa!" },
  { id: 39, jogador: "Luis Suárez", poder: "Agressividade Contida", desc: "A intensidade canalizada — sem morder ninguém!", ov: 79, emoji: "🦷", cat: "Reverso", narr: "Suárez briga por cada bola e pressiona a saída rival." },
  { id: 40, jogador: "Frank Lampard", poder: "Gol que Valeu", desc: "O gol fantasma de 2010, mas dessa vez o juiz valida.", ov: 83, emoji: "👻", cat: "Reverso", narr: "Lampard chuta, a bola bate no travessão e DENTRO: vale!" },
  { id: 41, jogador: "Sergio Ramos", poder: "Minuto 93", desc: "O gol no fim que vira tudo, a favor do seu time.", ov: 84, emoji: "⏱️", cat: "Reverso", narr: "Ramos sobe no último lance e cabeceia: gol no 93!" },
  { id: 42, jogador: "Andrés Iniesta", poder: "Gol da Tranquilidade", desc: "O gol da final de 2010 vira sua sentença de vitória.", ov: 90, emoji: "🧘", cat: "Reverso", narr: "Iniesta domina e bate cruzado: GOL na prorrogação!" },

  // ── Bônus criativos ──
  { id: 43, jogador: "Cafu", poder: "Pendolino Eterno", desc: "Sobe e desce a lateral o jogo inteiro sem cansar.", ov: 86, emoji: "🚄", cat: "Lenda", narr: "Cafu cruza na medida e o time só empurra pro gol." },
  { id: 44, jogador: "Dida", poder: "Muralha de Milão", desc: "Pega tudo, inclusive o que parecia impossível.", ov: 84, emoji: "🧱", cat: "Lenda", narr: "Dida espalma o chute certeiro no canto." },
  { id: 45, jogador: "Rivaldo", poder: "Bicicleta de Barcelona", desc: "A bicicleta histórica que decidia jogos.", ov: 89, emoji: "🚲", cat: "Reverso", narr: "Rivaldo encaixa a bicicleta: a bola morre no ângulo!" },
  { id: 46, jogador: "Ronaldo Fenômeno", poder: "Elástico Imparável", desc: "A explosão e o drible que mudaram o futebol.", ov: 95, emoji: "🦷", cat: "Lenda", narr: "Ronaldo aplica o elástico, deixa dois pra trás e marca!" },
  { id: 47, jogador: "Kaká", poder: "Cavalgada Tricolor", desc: "Sai do campo de defesa e atravessa o gramado todo.", ov: 88, emoji: "🐎", cat: "Lenda", narr: "Kaká arranca do meio e finaliza na saída do goleiro." },
  { id: 48, jogador: "Falcão", poder: "Rei de Roma", desc: "O comando de meio-campo que dita o ritmo.", ov: 87, emoji: "♟️", cat: "Lenda", narr: "Falcão distribui o jogo como um maestro." },
  { id: 49, jogador: "Carlos Alberto", poder: "Gol de 1970", desc: "O gol mais bonito das Copas vira sua arma.", ov: 90, emoji: "🏆", cat: "Reverso", narr: "Carlos Alberto chega chutando: paulada de 1970!" },
  { id: 50, jogador: "Lothar Matthäus", poder: "Locomotiva Alemã", desc: "Corre os dois lados do campo a partida inteira.", ov: 86, emoji: "🚂", cat: "Lenda", narr: "Matthäus rouba a bola e arma o contra-ataque mortal." },
  { id: 51, jogador: "Gattuso", poder: "Ringhio", desc: "A intensidade de cão de guarda no meio-campo.", ov: 78, emoji: "🐕", cat: "Drama", narr: "Gattuso recupera tudo e incendeia o time." },
  { id: 52, jogador: "Iker Casillas", poder: "Santo de La Roja", desc: "O reflexo divino que salvou a Espanha em 2010.", ov: 88, emoji: "🧤", cat: "Lenda", narr: "Casillas faz a defesa do ano com a ponta do pé!" },
  { id: 53, jogador: "Marta", poder: "Rainha do Futebol", desc: "A melhor do mundo decide vestir a camisa do time.", ov: 94, emoji: "👸", cat: "Lenda", narr: "Marta passa por três e bate colocado: que golaço!" },
  { id: 54, jogador: "Didier Drogba", poder: "Espírito de Istambul", desc: "O gol de cabeça que vira finais impossíveis.", ov: 87, emoji: "🦁", cat: "Reverso", narr: "Drogba sobe no córner e cabeceia firme: gol!" },
  { id: 55, jogador: "Oliver Kahn",           poder: "Titã do Gol",               desc: "A presença que intimidava qualquer atacante.",                                  ov: 87, emoji: "🦾", cat: "Lenda",   narr: "Kahn fecha o ângulo e o atacante chuta pra fora." },

  // ── Balada ───────────────────────────────────────────────────────────────────────
  { id: 56, jogador: "Robinho",               poder: "Samba na Copa",             desc: "Balanço e magia que só aparecem em dias de festa.",                             ov: 70, emoji: "💃", cat: "Balada",  narr: "Robinho faz o giro e a torcida dança junto!" },
  { id: 57, jogador: "Denílson",              poder: "Pedalada Infindável",        desc: "A pedalada que humilha e dessa vez decide o jogo.",                             ov: 65, emoji: "🌀", cat: "Balada",  narr: "Denílson humilha o lateral três vezes seguidas!" },
  { id: 58, jogador: "Edmundo",               poder: "O Animal Solto",             desc: "Energia selvagem canalizada pro gol — sem expulsão.",                           ov: 79, emoji: "🐆", cat: "Balada",  narr: "Edmundo parte em velocidade e ninguém alcança!" },
  { id: 59, jogador: "Bebeto",                poder: "Gol e Berço",                desc: "A comemoração de pai que aquece o coração do vestiário.",                       ov: 83, emoji: "🍼", cat: "Balada",  narr: "Bebeto marca e faz o gesto do bebê pra torcida!" },
  { id: 60, jogador: "Juninho Pernambucano",  poder: "Falta de Cinema",            desc: "As melhores cobranças nascem com música no coração.",                           ov: 85, emoji: "🎊", cat: "Balada",  narr: "Juninho coloca a bola e a falta entra no ângulo!" },
  { id: 61, jogador: "Carlos Valderrama",     poder: "Cabelo e Precisão",          desc: "O cabelo afro guarda segredos táticos que ninguém entende.",                    ov: 80, emoji: "🌺", cat: "Balada",  narr: "Valderrama arma o ataque com um passe milimétrico!" },
  { id: 62, jogador: "Jay-Jay Okocha",        poder: "Magia Nigeriana",            desc: "Dribles inventados que nem ele sabia que existiam.",                            ov: 81, emoji: "✨", cat: "Balada",  narr: "Okocha inventa um drible que não existe no manual!" },
  { id: 63, jogador: "Dimitar Berbatov",      poder: "Craque Preguiçoso",          desc: "Quanto menos força usa, mais bonito fica o gol.",                               ov: 76, emoji: "🦥", cat: "Balada",  narr: "Berbatov caminha até a área e marca de voleio!" },
  { id: 64, jogador: "Guti",                  poder: "Playboy do Bernabéu",        desc: "O estilo madridista que esconde um passe de qualidade absurda.",                ov: 77, emoji: "🌹", cat: "Balada",  narr: "Guti dá uma tabela de calcanhar e arma o gol!" },
  { id: 65, jogador: "Hristo Stoichkov",      poder: "Fúria Búlgara",              desc: "A raiva que vira arte: dribles, gritos e gols na mesma jogada.",                ov: 84, emoji: "🌹", cat: "Balada",  narr: "Stoichkov acerta a falta no ângulo — impossível de pegar!" },

  // ── Drama ────────────────────────────────────────────────────────────────────────
  { id: 66, jogador: "Zlatan Ibrahimović",    poder: "Ego de Campeão",             desc: "A autoconfiança de um deus do futebol contamina o vestiário.",                 ov: 91, emoji: "👑", cat: "Drama",   narr: "Zlatan bate de bicicleta e não comemora: era óbvio." },
  { id: 67, jogador: "Wayne Rooney",          poder: "Raiva do Menino",            desc: "A fúria controlada que transforma pressão em gols.",                           ov: 82, emoji: "🔴", cat: "Drama",   narr: "Rooney parte pela esquerda e finaliza com fúria!" },
  { id: 68, jogador: "Roy Keane",             poder: "Médio de Guerra",            desc: "A intensidade que faz o adversário recuar com medo.",                          ov: 84, emoji: "⚔️", cat: "Drama",   narr: "Keane recupera a bola e dá o passe que vira o jogo!" },
  { id: 69, jogador: "Patrick Vieira",        poder: "Gigante de Highbury",        desc: "Presença física e tática que domina qualquer meio-campo.",                     ov: 85, emoji: "🗼", cat: "Drama",   narr: "Vieira domina o meio e lança o ataque com autoridade!" },
  { id: 70, jogador: "Diego Costa",           poder: "Lobo do Ataque",             desc: "A provocação psicológica que desestabiliza qualquer defesa.",                  ov: 79, emoji: "🌶️", cat: "Drama",   narr: "Costa pressiona o zagueiro até ele errar!" },
  { id: 71, jogador: "Peter Schmeichel",      poder: "Rugido Dinamarquês",         desc: "O grito que motiva o time e paralisa o atacante adversário.",                  ov: 87, emoji: "🗣️", cat: "Drama",   narr: "Schmeichel defende e grita pro time avançar!" },
  { id: 72, jogador: "Romelu Lukaku",         poder: "Trem Descontrolado",         desc: "Força bruta que carrega a marcação inteira nas costas.",                       ov: 83, emoji: "🚂", cat: "Drama",   narr: "Lukaku carrega a marcação e empurra pro gol!" },
  { id: 73, jogador: "Carlos Puyol",          poder: "Zagueiro Kamikaze",          desc: "O capitão que joga o corpo na frente de qualquer chute.",                      ov: 84, emoji: "💥", cat: "Drama",   narr: "Puyol joga o corpo na frente e salva na linha!" },
  { id: 74, jogador: "Alexis Sánchez",        poder: "Guerreiro Chileno",          desc: "Intensidade que não para do aquecimento ao apito final.",                      ov: 81, emoji: "🦊", cat: "Drama",   narr: "Sánchez arrisca de fora e acerta o ângulo!" },
  { id: 75, jogador: "Sergio Busquets",       poder: "Maestro da Posse",           desc: "A pausa inteligente que confunde qualquer marcação adversária.",               ov: 82, emoji: "🧠", cat: "Drama",   narr: "Busquets filtra a pressão e acha o espaço invisível!" },
  { id: 76, jogador: "Toni Kroos",            poder: "Precisão Germânica",         desc: "Cada passe é cirúrgico, cada falta é uma sentença.",                           ov: 88, emoji: "⚙️", cat: "Drama",   narr: "Kroos coloca a falta no ângulo com milímetros de margem!" },
  { id: 77, jogador: "Gianluigi Buffon",      poder: "Eterno Guardião",            desc: "A garra do goleiro que nunca desiste inspira a defesa.",                       ov: 89, emoji: "🧱", cat: "Drama",   narr: "Buffon fecha o ângulo e grita pro time atacar!" },

  // ── Moda ─────────────────────────────────────────────────────────────────────────
  { id: 78, jogador: "Thierry Henry",         poder: "Velocidade Francesa",        desc: "Elegância e explosão que deixam a defesa parada no lugar.",                   ov: 90, emoji: "🥐", cat: "Moda",    narr: "Henry controla no peito e bate de primeira: gol!" },
  { id: 79, jogador: "Dani Alves",            poder: "Lateral Fashionista",        desc: "O cruzamento mais estiloso do mundo sempre vira assistência.",                 ov: 83, emoji: "👠", cat: "Moda",    narr: "Alves cruza na medida e o time empurra!" },
  { id: 80, jogador: "Samuel Eto'o",          poder: "Pantera de Camarões",        desc: "A velocidade e o estilo de quem nasceu pra decidir jogos.",                   ov: 86, emoji: "🐆", cat: "Moda",    narr: "Eto'o faz o pivô e bate cruzado no cantinho!" },
  { id: 81, jogador: "Michael Ballack",       poder: "Capitão Ferro",              desc: "A liderança e o chute de fora da área que sempre assustam.",                  ov: 84, emoji: "🦅", cat: "Moda",    narr: "Ballack chega de trás e bate de primeira: golaço!" },
  { id: 82, jogador: "Yaya Touré",            poder: "Costa do Marfim Explode",    desc: "Do meio pro ataque como um tanque com estilo e potência.",                    ov: 86, emoji: "💎", cat: "Moda",    narr: "Touré arranca do meio e dispara uma bomba no gol!" },
  { id: 83, jogador: "Luka Modrić",           poder: "Dança no Meio-Campo",        desc: "O maestro que controla o jogo com leveza, técnica e elegância.",              ov: 90, emoji: "🕊️", cat: "Moda",    narr: "Modrić gira entre dois e lança o ataque perfeito!" },
  { id: 84, jogador: "Ruud van Nistelrooy",   poder: "Sniper da Área",             desc: "Frieza absoluta: entra na área e converte sem hesitar.",                      ov: 84, emoji: "🎯", cat: "Moda",    narr: "Van Nistelrooy finaliza no ângulo sem hesitar!" },
  { id: 85, jogador: "Ashley Cole",           poder: "Lateral de Ouro",            desc: "Sobe e desce como um foguete, cruzamento sempre na cabeça.",                  ov: 80, emoji: "💨", cat: "Moda",    narr: "Cole sobe pela esquerda e arma uma chance clara!" },
  { id: 86, jogador: "Arjen Robben",          poder: "Corta e Chuta",              desc: "Todos sabem o que vai acontecer — ninguém consegue parar.",                   ov: 87, emoji: "⚡", cat: "Moda",    narr: "Robben corta pro meio e bate no ângulo: GOOOL!" },
  { id: 87, jogador: "Alessandro Del Piero",  poder: "Pintore di Gol",             desc: "Gols que são obras de arte do calcio italiano.",                              ov: 88, emoji: "🎨", cat: "Moda",    narr: "Del Piero recebe no ângulo e encurva pro fundo da rede!" },
  { id: 88, jogador: "Marco Van Basten",      poder: "Voleio Eterno",              desc: "O voleio mais bonito da história do futebol é sua arma secreta.",             ov: 92, emoji: "🌙", cat: "Moda",    narr: "Van Basten acerta o voleio impossível: puro talento!" },
  { id: 89, jogador: "Ronaldo (Corte 2002)",  poder: "O Corte Que Libertou",       desc: "O visual controverso que abriu espaço pra cinco gols históricos.",            ov: 94, emoji: "✂️", cat: "Moda",    narr: "R9 domina, dribla dois e marca com aquele sorrisão!" },

  // ── Meme ─────────────────────────────────────────────────────────────────────────
  { id: 90, jogador: "Peter Crouch",          poder: "Dança do Robô",              desc: "A comemoração mais estranha do futebol vira força pro time.",                 ov: 66, emoji: "🤖", cat: "Meme",    narr: "Crouch estica o pescoço e cabeceia o gol mais esquisito do ano!" },
  { id: 91, jogador: "Tim Howard",            poder: "Goleiro Presidente",         desc: "16 defesas impossíveis num único jogo. O lendário Guardião.",                 ov: 85, emoji: "🇺🇸", cat: "Meme",    narr: "Howard defende mais uma vez o que parecia impossível!" },
  { id: 92, jogador: "Andriy Shevchenko",     poder: "Resgate do Pênalti",         desc: "O pênalti perdido na final de 2005 vira gol agora.",                          ov: 74, emoji: "💸", cat: "Meme",    narr: "Shevchenko dessa vez converte! O trauma acabou!" },
  { id: 93, jogador: "Stuart Pearce",         poder: "Coração de Leão",            desc: "O grito de alívio após converter o pênalti que o atormentou em 1990.",       ov: 76, emoji: "😭", cat: "Meme",    narr: "Pearce bate e marca! O choro de 1990 vira alegria!" },
  { id: 94, jogador: "John Terry",            poder: "De Calcão e Com Raça",       desc: "O capitão sem camisa que coloca o time nas costas mesmo sem jogar.",          ov: 83, emoji: "👕", cat: "Meme",    narr: "Terry entra e cabeceia o gol do título!" },
  { id: 95, jogador: "Diego Forlán",          poder: "Uruguaio Implacável",        desc: "O craque que demorou mas chegou com tudo em 2010.",                          ov: 84, emoji: "🦋", cat: "Meme",    narr: "Forlán acerta a bola que parecia impossível: GOOOL!" },
  { id: 96, jogador: "Stéphane Guivarc'h",   poder: "Campeão Finalmente Marca",   desc: "Ganhou a Copa 98 sem marcar — aqui ele decide a partida.",                    ov: 42, emoji: "🏆", cat: "Meme",    narr: "Guivarc'h está no lugar certo, finalmente: É GOL!" },
  { id: 97, jogador: "Filippo Inzaghi",       poder: "Tava em Posição Legal",      desc: "Dessa vez o assistente não levantou a bandeira — era legal!",                 ov: 82, emoji: "🚩", cat: "Meme",    narr: "Inzaghi estava em posição legal! Gol validado!" },
  { id: 98, jogador: "Ali Daei",              poder: "Goleador dos Recordes",      desc: "O maior artilheiro de seleções decide aparecer no momento certo.",            ov: 81, emoji: "🇮🇷", cat: "Meme",    narr: "Daei aparece no lugar certo e empurra pra rede!" },
  { id: 99, jogador: "Mario Balotelli",       poder: "Super Mario Extra Vida",     desc: "A segunda chance do Mario — dessa vez sem polêmica alguma.",                  ov: 73, emoji: "🎮", cat: "Meme",    narr: "Balotelli marca de primeira e comemora com calma. Quase." },
  { id: 100, jogador: "Bebeto & Romário",     poder: "Dupla Inesquecível",         desc: "Os dois juntos numa só jogada: arte pura e dois gols.",                       ov: 97, emoji: "👶", cat: "Meme",    narr: "Os dois trocam passes impossíveis e a defesa fica estática!" },

  // ── Lenda ────────────────────────────────────────────────────────────────────────
  { id: 101, jogador: "Paolo Maldini",        poder: "Il Capitano Eterno",         desc: "50 anos de carreira condensados num único carrinho perfeito.",                ov: 93, emoji: "🏛️", cat: "Lenda",   narr: "Maldini lê o jogo antes de todos e corta qualquer ataque!" },
  { id: 102, jogador: "Xavi Hernández",       poder: "Metrônomo de Barcelona",     desc: "A posse que asfixia qualquer adversário até o gol sair.",                    ov: 89, emoji: "⏰", cat: "Lenda",   narr: "Xavi toca e toca até a defesa abrir o espaço!" },
  { id: 103, jogador: "Hugo Sánchez",         poder: "Rei das Bicicletas",         desc: "O goleador que decide com uma acrobacia que parece impossível.",              ov: 87, emoji: "⭐", cat: "Lenda",   narr: "Hugo Sánchez parte em velocidade e bicicleta pro gol!" },
  { id: 104, jogador: "Eusébio",              poder: "Pantera Negra",              desc: "A explosão do maior craque de Portugal reescreve a história.",               ov: 90, emoji: "🐆", cat: "Lenda",   narr: "Eusébio dispara pela linha e finaliza no ângulo!" },
  { id: 105, jogador: "Marco Van Basten (Eurocopa)", poder: "Voleio de Munique",  desc: "O gol mais bonito da história da Eurocopa agora é sua arma.",                ov: 93, emoji: "💫", cat: "Lenda",   narr: "Van Basten acerta o voleio impossível em ângulo fechado!" },

  // ── Reverso ──────────────────────────────────────────────────────────────────────
  { id: 106, jogador: "Steven Gerrard",       poder: "Sem Escorregão",             desc: "Desta vez Gerrard mantém o pé firme no momento mais decisivo.",              ov: 87, emoji: "🧊", cat: "Reverso", narr: "Gerrard não escorrega e distribui o jogo com precisão!" },
  { id: 107, jogador: "Gareth Bale",          poder: "Voo do Galês",               desc: "A bicicleta de Kiev como arma de decisão nos momentos críticos.",            ov: 84, emoji: "🦅", cat: "Reverso", narr: "Bale salta mais alto que a defesa e marca de bicicleta!" },
  { id: 108, jogador: "Messi (Final 2022)",   poder: "Destino Cumprido",           desc: "O pênalti que consolidou a lenda maior de todos os tempos.",                 ov: 97, emoji: "🇦🇷", cat: "Reverso", narr: "Messi chuta e converte: Argentina é campeã do mundo!" },
  { id: 109, jogador: "Juan Román Riquelme",  poder: "Calma Absoluta",             desc: "A pausa do mestre que abre o espaço que ninguém jamais viu.",               ov: 87, emoji: "🧘", cat: "Reverso", narr: "Riquelme segura a bola e espera o momento certo!" },
  { id: 110, jogador: "Clarence Seedorf",     poder: "Volta por Cima",             desc: "O meia que decidia Ligas dos Campeões por diferentes clubes.",               ov: 86, emoji: "🔄", cat: "Reverso", narr: "Seedorf recebe na meia-lua e chuta no canto: golaço!" },
  { id: 111, jogador: "Xherdan Shaqiri",      poder: "Saio do Banco e Decido",     desc: "O reserva que entra e marca de bicicleta quando menos se espera.",           ov: 79, emoji: "💫", cat: "Reverso", narr: "Shaqiri entra no segundo tempo e marca de bicicleta!" },
  { id: 112, jogador: "Michael Owen",         poder: "Herói de Wembley",           desc: "O jovem prodígio que virou a final do FA Cup com dois gols.",                ov: 83, emoji: "⚡", cat: "Reverso", narr: "Owen recebe de costas pro gol, vira e finaliza: GOL!" },
  { id: 113, jogador: "Gerd Müller (1974)",   poder: "Giro do Bombardeiro",        desc: "O gol de costas que decidiu a final de 74 vira sua arma.",                  ov: 92, emoji: "💣", cat: "Reverso", narr: "Müller domina de costas, gira e bate: gol de placa!" },
  { id: 114, jogador: "Arjen Robben (2010)",  poder: "Pênalti Convertido",         desc: "O pênalti perdido na final de 2010 — dessa vez não desperdiça.",            ov: 87, emoji: "🧡", cat: "Reverso", narr: "Robben não hesita e converte o pênalti decisivo!" },
  { id: 115, jogador: "Raúl González",        poder: "El Niño Eterno",             desc: "O gol apontando para o céu que definiu uma geração do Madrid.",             ov: 86, emoji: "☝️", cat: "Reverso", narr: "Raúl aparece na área com frieza e define no ângulo!" },
];
