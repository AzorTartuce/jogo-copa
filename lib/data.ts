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
  { id: 55, jogador: "Oliver Kahn", poder: "Titã do Gol", desc: "A presença que intimidava qualquer atacante.", ov: 87, emoji: "🦾", cat: "Lenda", narr: "Kahn fecha o ângulo e o atacante chuta pra fora." },
];
