## Objetivo
Transformar a home page em uma experiência cinematográfica premium que gere curiosidade, desejo imediato de jogar e retenção. Visual dark premium (modo escuro) / white premium (modo claro). Estética: futebol + tecnologia + nostalgia + espetáculo. Zero visual genérico SaaS, zero neon roxo, zero efeitos que atrapalhem leitura.

## Stack (Base + Evolução)

## Mantes 
- Next.js 15 (App Router) + React 19 + TypeScript
Tailwind CSS v4 (tema em app/globals.css)
Zustand (estado global do jogo)
Framer Motion — microinterações, hover, toasts, transições de Ul
localStorage — ranking local (Top 10)

## Adicionar 
- GSAP + ScrollTrigger — scroll storytelling, pin, scrub, timelines
React Three Fiber + Drei — momentos 3D pontuais e
valiosos

## Não-negociáveis: performance, responsividade, mobile com fallback gracioso (sem travar, sem 3D pesado).

## Nova Arquitetura da Home

Hero = #hero	Impacto imediato, slogan, CTA principal, profundidade	R3F + GSAP + Framer
Partidas Históricas = #partidas	Escolher partida/modo, parecer real/sair da tela	R3F (cards 3D) + GSAP
Sorteio de Lendas = #sorteio	Variedade, humor, efeitos por raridade	R3F (carta 3D) + Framer
Simulação / Acompanhar Partida = #simulacao	Narrativa emocional, tensão, torcida	GSAP ScrollTrigger + Framer 
Compartilhamento / Desafio = #compartilhar	Prova social, desafiar amigos	Framer Motion
CTA Final = #cta	Conversão máxima	GSAP + microinterações magnéticas

## Decisão de Tecnologia por Tipo de Animação

Microinterações, hover, feedback, transições de UI	Framer Motion	Botões, cards, toasts, modais, entrada/saída de componentes 

Scroll storytelling, pin, scrub, timelines sincronizadas	GSAP ScrollTrigger	Hero (entrada), Partidas (pin horizontal), Simulação (timeline da partida)

Objetos 3D com profundidade real, iluminação, shaders	React Three Fiber + Drei	Hero (cena central), Partidas (cards 3D), Sorteio (carta 3D), CTA (troféu/bola)

## Specs Detalhadas por Seção


Entrada cinematográfica (GSAP timeline):

Título resolve blur(20px) → blur(0) em 1.2s, ease power3.out

Subtítulo: stagger letra a letra, 0.04s/char

CTA sobe translateY(30px) → 0 com fade, delay 0.3s

Background: Canvas 2D leve — starfield + black hole sutil + um elemento R3F central (bola/troféu/estádio em profundidade) respondendo a mouse/scroll (parallax 3D real).

CTA Principal: "JOGAR AGORA" — botão magnético (inclina toward cursor, max 15°), partículas douradas sutis no hover.

## 2. Partidas Históricas (#partidas) — "Pareça real, saia da tela"

Cards com tilt 3D real (R3F) — não CSS transform. Cada card é uma cena R3F miniatura com iluminação dinâmica, reflexo, profundidade.

Conteúdo por card: partida histórica (7×1, Final 2014, Maracanazo, Uruguai×Itália, França 98, etc.) + seletor de modo de jogo integrado (tabs visuais).

Layout: Carousel horizontal com snap + indicador de progresso. Mobile: swipe nativo + dots.

Animação (GSAP): Seção pinada, revelação escalonada dos cards (stagger 0.15s), progressão horizontal suave.

## 3. Sorteio de Lendas (#sorteio) — "Grande, compacto, legível, efeitos por tier"

Área principal (acima da dobra mobile): Carta 3D grande (R3F) ocupando ~80vh, legível, animação de "virar" ao sortear.

Texto sempre legível: Satoshi/Cabinet Grotesk, mínimo 16px, contraste AA, sem poluição visual sobre a carta.

Efeitos especiais por tier de raridade:

Tier S (Pelé, Messi, CR7, Ronaldo, Maradona, Zidane, Ronaldinho, Marta): partículas douradas, shader glow pulsante, camera shake leve, som sutil.

Tier A: brilho prateado, partículas brancas.

Tier B/C: animação base suave (flip + fade).

Botão "SORTEAR": magnético (inclina toward cursor), feedback visual scale down/up.

Histórico: últimas 5 lendas sorteadas (mini-cards) em painel lateral/abaixo.

## 4. Simulação / Acompanhar Partida (#simulacao) — "Emoção, tensão, torcida"

Narrativa dirigida por scroll (GSAP ScrollTrigger + pin):

Scroll = tempo da partida. Cada seção pinada = um momento (início, 1º tempo, intervalo, 2º tempo, final).

Eventos animados: "⚽ GOL DO BRASIL — Pelé aos 23'", "🟨 Cartão para Zidane", "🔁 Substituição: entra Messi".

Contadores animados: placar, posse de bola, finalizações.

Áudio opcional: som de estádio, apito, torcida (respeita prefers-reduced-motion e autoplay policy).

Mobile: Cards verticais com botão "Próximo lance" (sem pin, scroll natural).

## 5. Compartilhamento / Desafio (#compartilhar)

Geração de card de resultado (imagem para redes sociais) com Framer Motion (animação de "construção" do card).

Copy-to-clipboard com toast animado.

Botão "DESAFIAR AMIGOS" com deep link/share API nativa.

## 6. CTA Final (#cta) — "Conversão máxima"

Título resolve do blur + scale (0.9 → 1).

Botão primário magnético (inclina toward cursor).

Troféu/bola 3D sutil no fundo (R3F, baixa complexidade).

Partículas douradas ambientais (Canvas 2D, performance-first).

## Preciso que seja responsivo em dispositivos moveis e diferentes dispositivos que acessarem o jogo