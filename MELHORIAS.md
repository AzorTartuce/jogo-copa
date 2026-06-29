# 🔎 Análise do Jogo & Roadmap de Melhorias

> Análise técnica + de game design feita sobre o código atual
> (Next.js + React). Objetivo: deixar o jogo **mais divertido** e com
> **potencial de viralizar**, especialmente no público brasileiro.

---

## 🧠 Diagnóstico: o problema #1

Hoje o jogo tem um **loop de decisão falso**. Os 5 slots
(Técnico, Convocação, Psicológica, Escalação, Substituição) são apenas
"caixas" — **em qual slot você coloca a carta não muda absolutamente nada**.

Prova no código (`lib/game.ts`):

```ts
const total = cards.reduce((acc, c) => acc + c.ov, 0); // só soma os overalls
const win = total >= scenario.diff * 5;                 // posição é ignorada
```

Consequência: a única jogada real é **"rerollar carta fraca"**. Não há
estratégia, só sorte. O passo "A Decisão" do GDD não existe na prática.

**Tudo abaixo gira em torno de transformar isso numa decisão de verdade.**

---

## 🎯 P0 — Alto impacto, essencial (diversão)

### 1. Fazer os slots terem afinidade (sinergia)
Cada slot ganha uma **categoria preferida**. Encaixar uma carta da categoria
certa dá bônus; da errada, penalidade leve.

| Slot | Categoria que combina | Ideia |
|------|----------------------|-------|
| 🎯 Técnico / Comando | Lenda / Reverso | liderança |
| 👥 Convocação Surpresa | Meme | a "zebra" |
| 🧠 Preparação Psicológica | Balada / Drama | cabeça |
| 📋 Mudança Escalação | Lenda | tática |
| 🔄 Substituição 2º Tempo | Reverso / Drama | reviravolta |

Efeito: agora **onde você coloca importa**. Você sorteia um Meme forte e
precisa decidir: guardo o slot da Convocação pra ele, ou arrisco?

### 2. Bônus de combinação (chemistry)
- **3+ cartas da mesma categoria** → "Entrosamento" (+X no total)
- **1 de cada categoria** → "Time Versátil" (+X)
- Mostra esses bônus na tela de resultado ("Entrosamento +25!").

### 3. Risco real no Reroll + commitment
Como o slot **fecha ao colocar**, e você não sabe o que virá depois, surge
tensão de verdade: aceito esse 78 agora ou gasto reroll torcendo por algo
melhor? Hoje isso quase não existe porque posição não importa.

### 4. Cartas negativas / eventos (tempero)
Adicionar cartas-armadilha ("Cartão Vermelho", "Lesão", "Pizza antes do
jogo") com overall negativo. Isso dá **propósito ao reroll** (descartar o
ruim) e gera momentos engraçados de narrativa.

---

## 🚀 P1 — Crescimento e viralização (sucesso)

### 5. Modo Desafio Diário ("o Wordle do futebol")
Mesmo cenário + mesmo "seed" pra todo mundo no dia. Todos jogam a mesma
sequência de cartas e comparam o placar. **Esse é o motor de viralização** —
funcionou pro Wordle, Termo, Hardle. Combina demais com o público BR.

### 6. Resultado compartilhável como imagem
Hoje o share é texto puro. Gerar uma **imagem do placar** (card bonito com
o resultado, score, escudos) usando canvas/`html-to-image`. Imagem viraliza
em grupo de WhatsApp; texto não.

### 7. Grade de emojis estilo Wordle no share
```
🇧🇷 Brasil 1 x 0 🇩🇪 — 441/500
🟢🟢🟡🟢🟢  #MáquinaDoTempo
```
Compartilhável sem spoiler, instantaneamente reconhecível.

### 8. Streak + estatísticas pessoais
"Você salvou o Brasil 3 dias seguidos." Sequência diária é o que traz a
pessoa de volta amanhã (retenção).

---

## 🎨 P2 — Polimento e "game feel" (retenção)

### 9. Revelação com tensão (juice)
Ao girar, suspense crescente antes de mostrar o overall (contador subindo,
brilho dourado pra carta lendária, "shake" pra meme ruim). A diversão de
jogos de sorteio está **no momento da revelação**.

### 10. Som e vibração
SFX no giro, no encaixe, no apito final + `navigator.vibrate` no mobile.
Barato e multiplica a sensação de qualidade.

### 11. Narrativa mais rica e variável
Hoje a narrativa é templada (mesmos minutos, mesmas frases do adversário).
Sugestões:
- Frases específicas por cenário (Mão de Deus, mordida do Suárez…).
- Eventos aleatórios (pênalti, expulsão, gol no fim).
- Velocidade de digitação ajustável / efeito "ao vivo".

### 12. Coleção / Álbum de figurinhas
Cartas que você já tirou ficam "desbloqueadas" num álbum. Colecionar é um
gancho fortíssimo de retenção (e nostálgico, à la figurinha de Copa).

### 13. Mais campanhas encadeadas
Só o Brasil 2014 tem fase 2. Dar continuação aos outros 9 cenários cria
progressão de verdade.

---

## 🛠️ Saúde técnica (rápido)

- **Reaproveitar os `efeito_*` do GDD**: as cartas no design original tinham
  +Criatividade, +Moral etc. — hoje descartados. Dá pra usá-los nos bônus de
  slot (item 1).
- **Acessibilidade**: foco de teclado nos slots, `aria-label`, contraste.
- **Testes**: a lógica de `simulate()` e bônus merece testes unitários
  (Vitest) — é o coração da justiça do jogo.
- **Backend (futuro)**: o GDD pede Supabase. Necessário p/ ranking global,
  desafio diário e estatísticas. Hoje é tudo `localStorage`.
- **PWA**: "adicionar à tela inicial" + offline. Casual mobile pede isso.

---

## 🥇 Por onde começar (recomendação)

Se for fazer só 3 coisas, na ordem:

1. **Slots com afinidade + combos (P0 #1 e #2)** → vira jogo de estratégia
   de verdade. É a maior mudança de diversão por esforço.
2. **Desafio Diário + share com imagem/emoji (P1 #5, #6, #7)** → o que faz
   o jogo *crescer* sozinho.
3. **Juice na revelação + som (P2 #9, #10)** → o que faz parecer um produto,
   não um protótipo.

> Resumo: o jogo está bem estruturado tecnicamente, mas hoje é **90% sorte**.
> Adicionar **decisão estratégica** (slots que importam) e **gancho viral**
> (desafio diário compartilhável) é o caminho de protótipo → sucesso
