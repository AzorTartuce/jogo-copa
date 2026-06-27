# ⚽ Máquina do Tempo do Futebol - Game Design Document

## 📋 Visão Geral do Projeto

**Máquina do Tempo do Futebol** é um jogo de estratégia e simulação onde o jogador atua como um "viajante temporal" tentando reescrever os momentos mais traumáticos da história do futebol mundial. Em vez de apenas jogar, o jogador precisa fazer escolhas táticas sobre quais "intervenções temporais" (personagens famosos e suas anedotas lendárias) encaixar nos slots de preparação para alterar o resultado de partidas icônicas.

**Gênero:** Casual Strategy / Sports Narrative Game  
**Plataforma:** Web (React/Next.js) + Mobile responsivo  
**Público-alvo:** Fãs de futebol, jogadores casuais, audiência brasileira em destaque

---

## 🎮 O Fluxo do Jogo (Gameplay Loop)

Em vez de preencher 11 posições de campo, o jogador precisa preencher **5 Slots da Linha do Tempo** para tentar mudar o fatídico jogo contra a Alemanha.

### Passo 1: Escolha a Tática de Tempo

O jogador seleciona o **nível de dificuldade** (ou "modo de loucura da máquina do tempo"):

- **Modo Clássico:** 3 re-sorteios (Rerolls) disponíveis ao longo da partida
- **Modo Caótico:** 5 re-sorteios, mas Intervenções têm valores mais aleatórios
- **Modo Histórico:** 1 re-sorteio, desafio máximo

### Passo 2: Os Slots Vazios

Na tela de jogo, o jogador vê **5 espaços vazios** que representam os pilares da preparação para reverter a derrota:

| Slot | Nome | Função |
|------|------|--------|
| **Slot 1** | 🎯 Técnico / Comando | Liderança, orientações, psicologia de grupo |
| **Slot 2** | 👥 Convocação Surpresa | Trazer jogadores do passado ou surpreendentes |
| **Slot 3** | 🧠 Preparação Psicológica | Mental, confiança, foco |
| **Slot 4** | 📋 Mudança Escalação Titular | Formação, ajustes táticos, reposicionamento |
| **Slot 5** | 🔄 Substituição no 2º Tempo | Jogadores de banco para reviravolta |

### Passo 3: O Giro (O "Dado")

O jogador clica em **"Girar a Máquina do Tempo"**. O sistema sorteia uma **Intervenção Temporal** aleatória com:

- **Nome da Intervenção** (baseado em anedota real ou lenda do jogador)
- **Descrição breve e criativa** (o que aquele poder faz)
- **Valor de Impacto (Overall):** de 0 a 100

### Passo 4: A Decisão

O jogador escolhe em qual slot encaixar a carta de intervenção:

- ✅ Uma vez colocada, aquele slot **fecha permanentemente**
- 🔄 Se não gostar, pode usar um **Reroll** (re-sorteio) para pedir outra carta
- 🔴 Quando os 5 slots estão preenchidos, não há mais volta

---

## 📊 Exemplo Prático de uma Partida

Imagine o jogador passando por este fluxo:

| Rodada | Opção Sorteada | Descrição | Overall | Decisão do Jogador | Status |
|--------|-----------------|-----------|---------|-------------------|--------|
| **Giro 1** | *Romário Night Club 1994* | Romário vem direto da balada com "criatividade potencializada" | 95 | Coloca no Slot "Convocação Surpresa" | 🔒 Preenchido |
| **Giro 2** | *Ronaldinho Circo Mental* | Ronaldinho traz a alegria e criatividade do circo da vida | 87 | Coloca no Slot "Preparação Psicológica" | 🔒 Preenchido |
| **Giro 3** | *Gengis Khan na Zaga* | Meme absurdo (Over 20, muito fraco) | 20 | Usa **Reroll** | 🔄 Girando de novo... |
| **Giro 3.1** | *Escalar 3 Volantes de Contenção* | Roberto Carlos coordena defesa em tridentão | 88 | Coloca no Slot "Mudança Escalação Titular" | 🔒 Preenchido |
| **Giro 4** | *David Beckham - Perfume de Vitória* | O aroma da confiança de Beckham invade o vestiário | 82 | Coloca no Slot "Técnico / Comando" | 🔒 Preenchido |
| **Giro 5** | *Pelé Sabiá do Futebol* | Pelé do banco sussurra as melhores jogadas no ouvido do time | 89 | Coloca no Slot "Substituição no 2º Tempo" | 🔒 Preenchido |

---

## 📈 A Simulação Final (O Resultado)

Assim que o jogador preenche os 5 slots, ele clica em **"Iniciar Simulação"**. O jogo:

1. **Soma o Overall** de todas as 5 intervenções escolhidas
2. **Compara com a dificuldade** do cenário (ex: "Nível Alemanha 2014 = 92 de resistência")
3. **Calcula a probabilidade de vitória** baseada na diferença
4. **Exibe a narrativa do jogo** em tempo real (texto animado)

### Exemplo de Resultado:

> **🏟️ SIMULAÇÃO INICIADA: Brasil vs Alemanha - Semifinal 2014**
>
> 🔴 **Minuto 12:** Bernard tenta a jogada ofensiva, mas perde a bola na construção. Alemanha contraataca.  
> 🟢 **Minuto 23:** *[Presença de Romário da balada]* Criatividade absurda! Romário recebe na área e **É GOL DO BRASIL!** 1-0  
> 🟡 **Minuto 45+2:** Impasse. Primeira etapa termina 1-0 Brasil.  
> 🟢 **Minuto 67:** *[Ronaldinho traz leveza ao vestiário]* Time respira com confiança. Defesa segura.  
> 🔴 **Minuto 78:** Alemanha pressiona, quase empata. Roberto Carlos (3 volantes) bloqueia tudo.  
> 🟢 **Minuto 85:** *[Pelé aconselha do banco]* Pelé sussurra: "Cuidado com a bola parada". A defesa se posiciona.  
> 🏆 **FIM DE JOGO (90+2 min):** **BRASIL 1 x 0 ALEMANHA**
>
> ✨ **VOCÊ SALVOU O BRASIL DO TRAUMA DE 2014!**  
> *Pontuação Final: 441/500 Overall*  
> 🔗 Compartilhe sua vitória no Twitter/X com #MáquinaDoTempo

---

## 🌍 O Sistema de Fases (Campanha)

Se o jogador vence a primeira partida, ele **avança na linha do tempo alternativa**:

### Exemplo: Campanha do Brasil (2014)

- **Fase 1 - O Trauma:** Brasil vs Alemanha (Semifinal)
  - *Desafio:* Passar pela Alemanha sem Neymar e Thiago Silva
  - *Recompensa:* Avança para a Final
  
- **Fase 2 - A Nova Final:** Brasil vs Argentina (Final no Maracanã)
  - *Desafio:* Vencer Messi e Higuaín em casa
  - *Recompensa:* **Campeão do Mundo! 🏆**

Cada fase aumenta de dificuldade. O jogador pode enfrentar **múltiplas campanhas** (um para cada seleção / ano), criando replay value.

---

## 🎯 Os 10 Cenários Icônicos (Banco de Dados Inicial)

| # | Seleção | Ano | Cenário | Desafio |
|---|---------|-----|---------|---------|
| **1** | 🇧🇷 Brasil | 2014 | Semifinal contra Alemanha | Passar sem Neymar e Thiago Silva; vencer Argentina na final |
| **2** | 🇫🇷 França | 2006 | Final contra Itália | Impedir a cabeçada de Zidane no Materazzi (prorrogação) |
| **3** | 🇦🇷 Argentina | 2014 | Final contra Alemanha | Fazer Higuaín ou Messi acertar o gol decisivo |
| **4** | 🇵🇹 Portugal | 2022 | Oitavas contra Marrocos | Tirar Cristiano Ronaldo do banco e furar a retranca |
| **5** | 🇬🇧 Inglaterra | 1986 | Quartas contra Argentina | Anular o gol "Mão de Deus" de Maradona |
| **6** | 🇳🇱 Holanda | 2010 | Final contra Espanha | Fazer Robben chutar por cima do Casillas (1v1) |
| **7** | 🇮🇹 Itália | 1994 | Semifinal contra Brasil (pênaltis) | Mudar ordem de batedores para evitar o isolamento de Baggio |
| **8** | 🇪🇸 Espanha | 2002 | Quartas contra Coreia do Sul | Vencer apesar dos erros absurdos de arbitragem |
| **9** | 🇩🇪 Alemanha | 2018 | Fase de Grupos | Evitar o vexame de cair perdendo para Coreia do Sul |
| **10** | 🇺🇾 Uruguai | 2014 | Fase de Grupos contra Itália | Impedir que Luis Suárez morda Chiellini (suspensão) |

---

## 🌟 Sistema de Poderes: Banco de Dados de Intervenções Temporais

Este é o **coração criativo do jogo**. Cada "intervenção" é baseada em histórias reais, memes, e anedotas legendárias de jogadores famosos. O jogador sorteia essas cartas aleatoriamente.

### Categoria 1: Baladas, Festas e Noites Selvagens

| Jogador | Poder | Descrição | Overall | Efeito |
|---------|-------|-----------|---------|--------|
| **Romário (1994)** | 🍾 Night Club Criativo | Romário sai da balada com "criatividade potencializada" | 95 | +40 Criatividade Ofensiva, +30 Improviso |
| **Ronaldinho Gaúcho** | 🎭 Alegria Contagiante | A energia da festa invade o vestiário | 87 | +35 Moral do Time, +25 Criatividade, -20 Pressão Psicológica |
| **Pelé** | 🌙 Noite de Ouro | Pelé convida o time para celebrar antes de ganhar | 92 | +45 Confiança, +20 Técnica |
| **Gérard Piqué** | 🎸 Rockstar Energy | A atitude "rockstar" de Piqué desinibi o time | 78 | +30 Ousadia, +25 Postura Defensiva |
| **Neymar** | 🎉 Festa da Seleção | Neymar organiza aquela festa "antes da final" | 84 | +32 Moral, +28 Velocidade |

### Categoria 2: Prisões, Resgates e Histórias Dramáticas

| Jogador | Poder | Descrição | Overall | Efeito |
|---------|-------|-----------|---------|--------|
| **Ronaldinho Gaúcho (Prisão)** | ⚽ Circo Atrás das Grades | Ronaldinho leciona futebol para os presos; leva aquela alegria pro jogo | 89 | +40 Criatividade, +35 Improviso, +20 Determinação |
| **Benzema (Chantagem)** | 🔥 Fogo na Veia | Aquela raiva de Benzema virado de costas invade o time | 80 | +35 Agressividade Tática, +25 Vontade |
| **Giggs (Escândalo)** | 💨 Velocidade Pura | Giggs corre como se fugisse de algo | 85 | +40 Velocidade, +30 Mobilidade |
| **Eric Cantona (Ataque)** | 👑 Rei do Drama | Cantona mete aquele chute memorável em alguém do time (mentalmente) | 88 | +45 Liderança, +30 Carisma |

### Categoria 3: Estilo de Vida e Moda

| Jogador | Poder | Descrição | Overall | Efeito |
|---------|-------|-----------|---------|--------|
| **David Beckham (Perfume)** | 💎 Aroma da Confiança | O perfume icônico de Beckham invade o vestiário | 82 | +35 Confiança, +25 Elegância Tática |
| **Cristiano Ronaldo (Ginásio)** | 💪 Máquina de Ganhar | A obsessão de CR7 com treino contagia o grupo | 93 | +45 Resistência, +40 Foco, +30 Disciplina |
| **Neymar (Cabelo Colorido)** | 🌈 Vibe Criativa | O cabelo "diferente" de Neymar libera criatividade | 76 | +28 Criatividade, +22 Autoconfiança |
| **Zinedine Zidane (Terno de Classe)** | 👔 Maestro Elegante | A elegância zen de Zidane traz calma táctica | 91 | +40 Técnica, +35 Visão de Jogo, +25 Serenidade |

### Categoria 4: Anedotas Hilárias e Memes

| Jogador | Poder | Descrição | Overall | Efeito |
|---------|-------|-----------|---------|--------|
| **Diego Maradona** | 🔮 Mão de Deus Invertida | A "mão de deus" agora trabalha CONTRA o adversário | 94 | +50 Sorte, +35 Improviso |
| **Pelé (Pele Jogando)** | ⚽ King of Kings | Pelé, literalmente, vai jogar | 96 | +55 Técnica, +50 Inteligência, +40 Presença |
| **Zinedine Zidane (Cabeçada)** | 💥 Cabeçada Memorável | A cabeçada "daquela partida" acontece, mas A SEU FAVOR | 88 | +45 Gol Improvável, +30 Drama |
| **Gengis Khan (Meme)** | ⚔️ Defensor Mongol | Colocar literalmente um conquistador na zaga | 20 | +10 Defesa (muito fraco, é um meme) |
| **Balotelli (Celebração)** | 🔥 Why Always Me? | A celebração caótica de Balotelli desestabiliza o adversário | 72 | +25 Psicologia Reversa, +20 Caos |

### Categoria 5: Habilidades Especiais (Jogadores Lendários)

| Jogador | Poder | Descrição | Overall | Efeito |
|---------|-------|-----------|---------|--------|
| **Pelé** | 👑 Sabiá do Futebol | Pelé do banco sussurra as melhores jogadas no ouvido | 89 | +40 Visão, +35 Decisão, +30 Liderança |
| **Johan Cruyff** | 🎯 Giro de Cruyff | O famoso "giro Cruyff" vira estratégia ofensiva | 90 | +45 Improviso, +35 Tecnicalidade |
| **Gerd Müller (Muldoon)** | ⚰️ Assassino da Área | O instinto de goleador de Müller ressurge | 91 | +50 Finalização, +35 Oportunismo |
| **Franz Beckenbauer** | 🏰 Imperador da Defesa | A elegância defensiva de Beckenbauer organiza tudo | 89 | +40 Organização Defensiva, +30 Liderança |

### Categoria 6: Momentos Icônicos Reversados

| Jogador | Poder | Descrição | Overall | Efeito |
|---------|-------|-----------|---------|--------|
| **Roberto Carlos** | ⚡ Chute Mágico | Aquele chute memorável contra a França agora é NOSSO | 86 | +38 Chute à Distância, +32 Improviso |
| **Zinedine Zidane (Cabeçada)** | 💫 Cabeçada Reversa | A cabeçada da final de 2006, mas pro lado certo | 87 | +42 Gol de Cabeça, +30 Drama Positivo |
| **Luis Suárez (Mordida)** | 🦷 Agressividade Contida | A agressividade de Suárez, mas canalizada (sem morder!) | 79 | +35 Intensidade, +25 Postura Combativa |

---

## 🔧 Mecânicas Gerais

### Sistema de Pontuação (Overall)

- **0-30:** Meme, muito fraco, não deve ser levado a sério
- **30-60:** Fraco, mas pode funcionar em situações específicas
- **60-75:** Bom, traz impacto positivo notável
- **75-90:** Muito Bom, muda significativamente a partida
- **90-100:** Lendário, praticamente imbatível

### Re-sorteios (Rerolls)

- Jogador começa com **2-5 re-sorteios** (depende do modo)
- Cada re-sorteio **custa nada**, mas a oportunidade é limitada
- Estratégia: saber quando descartar uma carta fraca vs. quando aceitar

### Compartilhamento de Resultados

Após cada simulação, o jogador pode:

- 🐦 **Compartilhar no Twitter/X:** "Salvei o Brasil em 2014! Overall: 441/500"
- 📱 **Compartilhar no WhatsApp / Instagram:** Imagem com o resultado
- 🎥 **Gravar um GIF:** Da simulação completa
- 🏆 **Comparar com amigos:** Ranking de scores

---

## 📱 Estrutura Técnica Sugerida

### Frontend

- **Framework:** React ou Next.js 15
- **Estilização:** Tailwind CSS + Shadcn/UI
- **Animações:** Framer Motion (para a simulação)
- **Estado:** Zustand ou Context API

### Backend

- **Banco de Dados:** Supabase (PostgreSQL)
  - Tabela: `intervencoes_temporais` (cartas de poderes)
  - Tabela: `cenarios` (os 10 cenários icônicos)
  - Tabela: `resultados` (salvar simulações dos usuários)
- **API:** Next.js API Routes ou Vercel Functions

### Funcionalidades Críticas

- ✅ Sorteio aleatório de intervenções (shuffling)
- ✅ Cálculo de probabilidade (Overall vs. Dificuldade)
- ✅ Narrativa dinâmica (texto que muda baseado nos poderes)
- ✅ Persistência de partidas (salvar para depois)
- ✅ Leaderboard simples (top 10 scores)

---

## 🎬 Próximos Passos

1. **Desenhar os Wireframes** das telas (seleção de cenário, tela de jogo, resultado)
2. **Expandir o banco de dados** de intervenções (mínimo 50-100 cartas)
3. **Criar narrativas únicas** para cada cenário (textos de simulação)
4. **Desenvolver o frontend** (React component principal)
5. **Implementar backend** (API de sorteio e cálculo)
6. **Testes com usuários** (feedback sobre dificuldade e criatividade)
7. **Launch MVP** na web (antes de mobile)

---

## 🎨 Tonalidade e Vibe

- **Divertido:** Memes e anedotas são bem-vindos
- **Respeitoso:** Sem ofender jogadores reais (memes construtivos)
- **Criativo:** Liberdade para inventar cenários absurdos
- **Nostálgico:** Capitalizar na nostalgia de grandes momentos do futebol
- **Interativo:** O jogador sente que suas escolhas importam

---

## 📊 Exemplo de Carta (JSON Structure)

```json
{
  "id": 1,
  "jogador": "Romário",
  "nome_poder": "Night Club 1994",
  "descricao": "Romário sai da balada com criatividade potencializada",
  "overall": 95,
  "categoria": "Baladas",
  "efeito_criatividade": 40,
  "efeito_improviso": 30,
  "efeito_confianca": 0,
  "emoji": "🍾",
  "narrativa_jogo": "Romário recebe na área com CRIATIVIDADE absurda e marca!"
}
```

---

**Versão:** 1.0  
**Status:** Game Design Complete  
**Próxima Revisão:** Após feedback de testes iniciais