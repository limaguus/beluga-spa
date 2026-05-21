# Tela: Plano de Estudos

> **Rota:** `#/plano`
> **Tipo:** Privada — requer autenticação
> **Arquivo principal:** `assets/js/screens/planoEstudo.js`

---

## Estrutura da Tela

### Objetivo

O Plano de Estudos exibe trilhas de conhecimento detalhadas por matéria, organizadas por dia da semana. O aluno navega entre os dias da semana clicando nas tabs no topo do conteúdo principal. Cada dia mostra as trilhas das matérias programadas para aquele dia, com tópicos clicáveis que levam direto às aulas — sem que o aluno precise procurar nada. O plano é gerado (estaticamente por ora) pela Belugin IA com base no desempenho do quiz.

### Organização visual

```
┌──────────────────────────────────────────────────────────────────┐
│  TOPBAR                                                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PLANO-HEADER-ROW                                                │
│  "Plano de Estudos"         [↺ Refazer o Plano de Estudos]      │
│  "Trilha de conhecimento gerada pela Belugin IA"                 │
│                                                                  │
│  PLANO-BODY (grid: 220px + 1fr)                                  │
│  ┌────────────────────┐  ┌──────────────────────────────────┐    │
│  │  PLANO-SIDEBAR     │  │  PLANO-MAIN                      │    │
│  │  [avatar + nome]   │  │                                  │    │
│  │  [legenda cores]   │  │  [Seg][Ter][Qua][Qui][Sex][Sáb][Dom]│ │
│  │                    │  │  ────────────────────────────── │    │
│  │                    │  │  Resumo: 2 matérias · ~X min    │    │
│  │                    │  │  ────────────────────────────── │    │
│  │                    │  │  ┌─ 1º ◉ Trilha A ─────────┐   │    │
│  │                    │  │  │  status · tópico · dur   │   │    │
│  │                    │  │  └──────────────────────────┘   │    │
│  │                    │  │  ┌─ 2º ◉ Trilha B ─────────┐   │    │
│  │                    │  │  │  status · tópico · dur   │   │    │
│  └────────────────────┘  └──────────────────────────────────┘    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## HTML

### Hierarquia completa

```
main.plano
├── div.plano-header-row
│   ├── div.plano-header-text
│   │   ├── h1.plano-title
│   │   └── p.plano-subtitle
│   └── button#btn-refazer.plano-refazer-btn
└── div.plano-body
    ├── aside.plano-sidebar
    │   ├── div.plano-profile-card
    │   │   ├── div.plano-avatar-ring > img.plano-avatar-img
    │   │   └── div.plano-profile-info
    │   │       ├── span.plano-profile-name
    │   │       └── span.plano-profile-role
    │   └── div.plano-legend
    │       ├── p.plano-legend-title
    │       └── div.plano-legend-item × 3
    └── div.plano-main
        ├── div.pt-setup-notice          ← só quando matriz vazia
        ├── div.plano-day-tabs           ← tabs Seg…Dom
        │   └── button.plano-day-tab × 7
        │       ├── span.plano-day-tab-name
        │       ├── span.plano-day-tab-dot   ← só no dia de hoje
        │       └── span.plano-day-tab-count / .plano-day-tab-pill
        ├── div#pt-trails-container.pt-trails   ← conteúdo dinâmico
        │   ├── div.plano-day-summary    ← resumo do dia
        │   └── div.pt-trail × N        ← trilhas do dia
        │       ├── div.pt-trail-head
        │       │   ├── span.pt-trail-order  (1º, 2º)
        │       │   ├── div.pt-ring-wrap > svg.pt-ring
        │       │   ├── div.pt-trail-meta
        │       │   │   ├── h2.pt-trail-name
        │       │   │   └── div.pt-trail-tags
        │       │   │       ├── span.pt-badge
        │       │   │       └── span.pt-ia-hint
        │       │   └── div.pt-trail-count
        │       │       ├── span.pt-count-num
        │       │       ├── span.pt-count-label
        │       │       └── span.pt-count-time
        │       └── div.pt-topics
        │           └── a.pt-topic × N
        │               ├── span.pt-status
        │               ├── span.pt-topic-name
        │               ├── span.pt-topic-dur
        │               └── span.pt-topic-cta
        └── p.plano-note
```

Para dias de descanso/revisão, `#pt-trails-container` recebe um `div.plano-special-day` ao invés das trilhas.

---

## Dados

### `LEVEL_META`

| Chave | Label | Cor | Horas sugeridas |
|---|---|---|---|
| `high` | Atenção | `#ef4444` | 3–4h por semana |
| `medium` | Em progresso | `#f59e0b` | 2h por semana |
| `low` | Consolidado | `#22c55e` | 1h por semana |

### `PLAN_SUBJECTS`

Array de 6 matérias (hardcoded, futuramente virá da Belugin IA):

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | Slug que bate com a rota `#/aulas?materia={id}` |
| `name` | string | Nome completo da matéria |
| `progress` | number | Percentual de progresso geral (0–100) |
| `level` | `"high" \| "medium" \| "low"` | Urgência |
| `topicos` | array | Lista de tópicos da trilha |

Cada tópico:

| Campo | Tipo | Descrição |
|---|---|---|
| `titulo` | string | Nome do tópico |
| `dur` | string | Duração estimada (ex: `"25 min"`) |
| `done` | boolean | Se o tópico foi concluído |
| `rec` | boolean | Se a IA recomenda este tópico com prioridade |

### `WEEK_PLAN`

7 entradas (Seg–Dom) com:

| Campo | Tipo | Descrição |
|---|---|---|
| `day` | string | Abreviação do dia (`"Seg"`, `"Ter"`, …) |
| `subjects` | string[] | IDs das matérias daquele dia |
| `optional` | boolean? | Sábado — revisão livre |
| `rest` | boolean? | Domingo — descanso |

---

## CSS

### Arquivos que estilizam esta tela

```
assets/css/pages/plano.css  ← todos os estilos exclusivos
```

### Classes principais

| Classe | Elemento | Função |
|---|---|---|
| `.plano-body` | `<div>` | Grid `220px 1fr` — sidebar + conteúdo principal |
| `.plano-main` | `<div>` | Coluna direita: flex-column com tabs + trails + nota |
| `.plano-day-tabs` | `<div>` | Faixa horizontal de botões de dia, scroll horizontal oculto |
| `.plano-day-tab` | `<button>` | Tab de um dia — flex-column (nome + indicador) |
| `.plano-day-tab.active` | — | Fundo azul translúcido + borda azul |
| `.plano-day-tab.today` | — | Marca o dia atual |
| `.plano-day-tab-dot` | `<span>` | Bolinha azul indicando o dia de hoje |
| `.plano-day-tab-count` | `<span>` | Badge com número de matérias do dia |
| `.plano-day-tab-pill--rest` | `<span>` | Pill verde "Descanso" (Dom) |
| `.plano-day-tab-pill--opt` | `<span>` | Pill amarela "Revisão" (Sáb) |
| `.plano-day-summary` | `<div>` | Barra de resumo do dia (matérias, tópicos, tempo) |
| `.plano-today-badge` | `<span>` | Pill "Hoje" em azul no resumo |
| `.plano-special-day` | `<div>` | Cartão para dias de descanso ou revisão livre |
| `.plano-opt-subjects` | `<div>` | Links para matérias no dia de revisão livre |
| `.pt-trail` | `<div>` | Card de trilha de uma matéria — `border-left` com `var(--tc)` |
| `.pt-trail-order` | `<span>` | "1º", "2º" — indica a ordem de estudo do dia |
| `.pt-trail-head` | `<div>` | Cabeçalho da trilha: ordem + anel + meta + contador |
| `.pt-ring-wrap` | `<div>` | Wrapper posicionado para o anel SVG + label central |
| `.pt-badge--high/medium/low` | `<span>` | Pill de nível colorido |
| `.pt-trail-count` | `<div>` | "X/Y concluídos" + tempo restante |
| `.pt-count-time` | `<span>` | Tempo pendente (~X min) — verde se tudo feito |
| `.pt-topics` | `<div>` | Lista de tópicos da trilha |
| `.pt-topic` | `<a>` | Linha de tópico — grid 4 colunas, link para aulas |
| `.pt-topic--done` | — | Tópico concluído: riscado + opaco |
| `.pt-topic--rec` | — | Tópico recomendado pela IA: fundo roxo leve |
| `.pt-status--open/done` | `<span>` | Círculo vazio ou preenchido verde |
| `.pt-ia-tag` | `<span>` | Pill "IA" roxa — destaca tópico recomendado |
| `.pt-topic-cta` | `<span>` | "Estudar →" / "Revisar →" |

### Theming por matéria

```javascript
// JS gera via inline style:
`<div class="pt-trail" style="--tc:${meta.color}">`
```

```css
/* CSS consome: */
.pt-trail         { border-left: 3px solid var(--tc, #3b9edd); }
.pt-trail-order   { color: var(--tc, #3b9edd); }
```

Cada trilha herda automaticamente a cor do seu nível sem classe extra.

### Anel SVG de progresso

O viewBox `0 0 36 36` com `r="15.9"` resulta em circunferência ≈ 100px. Por isso `stroke-dasharray="${progress} ${gap}"` onde `gap = 100 - progress` mapeia diretamente percentuais sem cálculo trigonométrico.

### Responsividade

| Breakpoint | Mudança |
|---|---|
| `≤ 900px` | `.pt-trail-name` quebra linha; coluna CTA some das trilhas |
| `≤ 768px` | Sidebar empilha acima; `.pt-topic-dur` some; `.plano-sidebar` vira 2 colunas |
| `≤ 640px` | Tabs menores; pills das tabs somem; cartão especial empilha verticalmente |

---

## JavaScript

### Constantes e dados

```javascript
const LEVEL_META   = { high: {...}, medium: {...}, low: {...} };
const PLAN_SUBJECTS = [ /* 6 matérias com topicos[] */ ];
const WEEK_PLAN     = [ /* 7 dias com subjects[] */ ];
```

### Helpers de dados

```javascript
const DAY_JS_MAP = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

function getTodayDay()          // retorna abreviação do dia atual
function parseDur(dur)          // "25 min" → 25
function subjectPendingMin(s)   // soma dur dos tópicos não-done de uma matéria
function formatTime(min)        // 95 → "1h 35min"
```

### Funções de render

| Função | Saída |
|---|---|
| `progressRing(progress, color)` | SVG anel com `stroke-dasharray` |
| `topicRow(topic, subjectId)` | `<a class="pt-topic">` com status, nome, duração, CTA |
| `trailCard(subject, order)` | `<div class="pt-trail">` completo com cabeçalho + tópicos |
| `daySummaryBar(subjects, isToday)` | Barra com contagem de matérias, tópicos e tempo pendente |
| `restDayCard()` | Cartão de descanso (Domingo) |
| `optionalDayCard()` | Cartão de revisão livre (Sábado) com links para todas as matérias |
| `renderDayContent(dayName)` | Resume + trilhas do dia, ou cartão especial |
| `dayTabs(activeDay)` | Faixa com 7 botões — marca `active` e `today` |

### `planoEstudoScreen()`

Renderiza o HTML estático com o dia atual (`getTodayDay()`) como tab ativa. Chama `dayTabs(today)` e `renderDayContent(today)` diretamente — nenhum estado precisa ser gerenciado no render.

### `planoEstudoInit()`

Conecta dois grupos de eventos:

1. **`#btn-refazer`** → `window.location.hash = "#/quiz"`

2. **`.plano-day-tab`** (cada botão):
   - Remove `.active` + `aria-selected="false"` de todos
   - Adiciona `.active` + `aria-selected="true"` no clicado
   - Anima saída do `#pt-trails-container` (fade + translateY)
   - Após 150ms: substitui `innerHTML` com `renderDayContent(day)`
   - Anima entrada com double `requestAnimationFrame` (mesmo padrão do dashboard)

### Fluxo de navegação

```
Usuário acessa #/plano
       ↓
planoEstudoScreen() → renderiza com dia atual
planoEstudoInit()   → conecta event listeners
       ↓
Usuário clica tab "Ter"
  → fade out container
  → renderDayContent("Ter") → daySummaryBar() + trailCard() × 2
  → fade in container
       ↓
Usuário clica tópico → navega para #/aulas?materia={id}
```

---

## Como Modificar no Futuro

### Integrar com resultado do quiz

Substituir o `level` hardcoded em `PLAN_SUBJECTS` por dado vindo do estado:

```javascript
import { getQuizResult } from "../state/quiz.js";
const result = getQuizResult(); // { "calculo": "high", "algoritmos": "medium", ... }
// Em cada subject: level: result[subject.id] ?? "medium"
```

### Integrar com progresso real de tópicos

Substituir `done: false` em `topicos[]` por leitura do localStorage:

```javascript
import { getTopicProgress } from "../state/progress.js";
// Em cada tópico: done: getTopicProgress(subject.id, topic.titulo)
```

### Atualizar nome/cargo na sidebar

```javascript
import { getUser } from "../state/auth.js";
const user = getUser();
document.querySelector(".plano-profile-name").textContent = user.name.toUpperCase();
```

### Adicionar animação de conclusão de tópico

No `topicRow`, o `<a>` pode virar um componente com checkbox + JS em `planoEstudoInit()` para marcar tópicos como concluídos e re-renderizar o card via `trailCard()`.

---

## Relação Entre Arquivos

```
assets/js/screens/planoEstudo.js
 └── import getDisciplines from state/matriz.js
     └── localStorage["beluga_disciplines"]
 └── renderDayContent() → renderiza trilhas por dia
 └── topicRow() → href="#/aulas?materia={id}"
 └── btn-refazer → href="#/quiz"
 └── acessado de: topbar (link Plano), dashboard (quick action)
```

### Componentes globais

| Componente | Presente? |
|---|---|
| Topbar | **Sim** |
| Beluginha IA | **Sim** |
| `.button` (buttons.css) | **Não** — botão Refazer tem estilo próprio |
| `.input` (forms.css) | **Não** |
