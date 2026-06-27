# ⚽ Máquina do Tempo do Futebol

Jogo de estratégia/simulação onde você é um "viajante temporal" que tenta
reescrever os momentos mais traumáticos da história do futebol mundial.
Preencha os **5 Slots da Linha do Tempo** com **Intervenções Temporais**
(cartas baseadas em anedotas e lendas) e rode a simulação para mudar o placar.

Implementação em **React + Next.js 15 (App Router)** a partir do
[`projeto.md`](./projeto.md).

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tema customizado em `app/globals.css`)
- **Zustand** para estado global do jogo
- **Framer Motion** para animações (giro das cartas, narrativa, toasts)
- **localStorage** para o ranking local (Top 10)

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
```

Para produção:

```bash
npm run build
npm start
```

## Estrutura

```
app/
  layout.tsx        # metadata, fontes, globals
  page.tsx          # roteia entre as telas (cenário / jogo / resultado)
  globals.css       # tema Tailwind v4 + estilos custom
components/
  ScenarioScreen    # escolha de cenário + modo
  GameScreen        # giro, rerolls e slots
  DrawCard          # carta sorteada (com animação)
  SlotGrid          # os 5 slots da linha do tempo
  ResultScreen      # placar + narrativa animada + share
  Leaderboard       # ranking local
  Toast             # notificações
lib/
  types.ts          # tipos do domínio
  data.ts           # cenários, modos e banco de 55 cartas
  store.ts          # estado do jogo (Zustand)
  game.ts           # simulação + geração de narrativa
  leaderboard.ts    # persistência do ranking (localStorage)
  toast.ts          # estado dos toasts
  utils.ts          # tiers de overall, helpers
legacy/
  index.html        # protótipo original em HTML/JS puro
```

## Como jogar

1. Escolha um dos **10 cenários icônicos** e a **tática de tempo** (Clássico,
   Caótico ou Histórico — variam a quantidade de rerolls).
2. Clique em **Girar a Máquina do Tempo** para sortear uma intervenção.
3. Encaixe a carta em um dos 5 slots — ou use um **Reroll** se não gostar.
4. Com os 5 slots preenchidos, clique em **Iniciar Simulação**.
5. A soma dos overalls é comparada com a resistência do adversário
   (`diff × 5`) e a narrativa do jogo é exibida minuto a minuto.

> Vencer o **Brasil 2014** (semifinal) desbloqueia a **final no Maracanã** —
> a campanha continua.

## Próximos passos (do GDD)

- Backend real (Supabase) para ranking online — hoje é `localStorage`.
- Mais cartas e narrativas específicas por cenário.
- Compartilhamento com imagem/GIF do resultado.
