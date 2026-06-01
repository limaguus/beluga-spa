# Tela: Minhas Aulas

> **Rota:** `#/aulas` e `#/aulas?materia=id`
> **Tipo:** Privada — requer autenticação
> **Arquivo principal:** `assets/js/screens/aulas.js`

---

## Estrutura da Tela

### Objetivo

"Minhas Aulas" exibe os tópicos de estudo de cada disciplina, organizados em cards clicáveis que abrem o vídeo em um player embutido (modal interno). O layout tem três colunas: navegação de matérias (esquerda), coluna central com tabs (direita). A aba "Meus Exercícios" permite ao aluno enviar um PDF e visualizar exercícios com vídeos recomendados (mock da futura integração com OpenAI + YouTube Data API). A matéria ativa pode ser passada via query string na hash.

### Organização visual

```
┌──────────────────────────────────────────────────────────────────────────┐
│  TOPBAR                                                                  │
├──────────────────────────────────────────────────────────────────────────┤
│  AULAS                                                                   │
│  "Minhas Aulas"                     [Minhas Aulas] [Meus Exercícios]    │
│                                                                          │
│  AULAS-BODY (3 colunas: 185px + 1fr + 240px)                            │
│  ┌──────────────┐  ┌───────────────────────────┐  ┌─────────────────┐   │
│  │ SIDEBAR      │  │ AULAS-MAIN (tab: aulas)   │  │ PAINEL DIREITO  │   │
│  │ sticky       │  │                           │  │ sticky          │   │
│  │              │  │ "Inovação e Tecnologia"   │  │ [Último Quiz]   │   │
│  │ [matéria 1]  │  │ [thumb] ★ Tecnologias..  │  │ [Progresso]     │   │
│  │ [matéria 2]  │  │ [thumb] ★ Startups...    │  │ [Notícias]      │   │
│  │ ...          │  │ [BIBLIOTECA]              │  │                 │   │
│  │              │  ├───────────────────────────┤  │                 │   │
│  │              │  │ AULAS-MAIN (tab: exerc.)  │  │                 │   │
│  │              │  │ [↑ Enviar PDF]            │  │                 │   │
│  │              │  │ ✓ exercicio.pdf           │  │                 │   │
│  │              │  │ [ex1 thumb] Chave Est. [] │  │                 │   │
│  │              │  │ [ex2 thumb] Normaliz.  [] │  │                 │   │
│  └──────────────┘  └───────────────────────────┘  └─────────────────┘   │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## HTML

### Hierarquia completa

```
div.aulas
├── div.aulas-page-header
│   ├── h1.aulas-page-title  ← "Minhas Aulas"
│   └── div.aulas-tabs[role=tablist]
│       ├── button.aulas-tab.active[data-tab=aulas][role=tab]
│       └── button.aulas-tab[data-tab=exercicios][role=tab]
└── div.aulas-body
    ├── aside.aulas-sidebar                          ← gerado por buildSidebar()
    │   ├── p.aulas-sidebar-label  ← "Outras matérias:"
    │   └── nav.aulas-subjects-nav
    │       └── button.aulas-subject-btn[data-id] × N  ← uma por matéria
    │           └── (ativa com classe .active)
    ├── main.aulas-main                              ← buildMain() ou buildExerciciosSection()
    │   │
    │   │  ── QUANDO TAB = "aulas" ──
    │   ├── div.aulas-main-header
    │   │   ├── div
    │   │   │   ├── h2.aulas-subject-title
    │   │   │   └── p.aulas-topics-label
    │   │   └── span.aulas-progress-chip  ← "X/N concluídos"
    │   ├── div.aulas-topics-list
    │   │   └── a.aulas-topic-card[href=YouTube][data-youtube-id][data-video-title] × N
    │   │       ├── div.aulas-topic-body
    │   │       │   ├── div.aulas-topic-badges
    │   │       │   ├── h3.aulas-topic-title
    │   │       │   └── span.aulas-topic-duration
    │   │       └── div.aulas-topic-thumb
    │   │           ├── img[src=YouTube thumbnail]
    │   │           └── div.aulas-play-btn[aria-hidden]
    │   └── div.aulas-library-wrap
    │       └── button#btn-biblioteca.aulas-library-btn
    │
    │      ── QUANDO TAB = "exercicios" ──
    │   └── div.exer-section                        ← buildExerciciosSection()
    │       ├── div.exer-upload-area                 ← estado: sem arquivo
    │       │   ├── input#exer-pdf-input.exer-pdf-input[type=file][accept=.pdf]
    │       │   ├── label.exer-upload-label[for=exer-pdf-input]
    │       │   └── p.exer-upload-hint
    │       ├── div.exer-upload-area.exer-upload-area--confirmed  ← estado: com arquivo
    │       │   └── div.exer-file-confirmed
    │       │       ├── svg (checkmark verde)
    │       │       └── span (nome do arquivo)
    │       └── div.exer-list                        ← visível só após upload
    │           └── div.exer-card[data-ex-id] × N   ← buildExercicioCard()
    │               ├── div.exer-card-body
    │               │   ├── h3.exer-card-titulo
    │               │   ├── p.exer-card-video
    │               │   └── label.exer-check-label
    │               │       ├── input.exer-check[type=checkbox][data-ex-id]
    │               │       └── span.exer-check-text  ← "Já resolvi"
    │               └── div.exer-card-thumb
    │                   ├── img[src=YouTube thumbnail]
    │                   └── a.exer-play-btn[data-youtube-id][data-video-title]
    │
    └── aside.aulas-panel                            ← gerado por buildPanel()
        ├── div.aulas-stat-card  ← resultado do quiz (se houver)
        │   ├── p.aulas-stat-label  ← "Último Quiz"
        │   ├── div.aulas-quiz-body
        │   │   ├── span.aulas-quiz-score
        │   │   └── span.aulas-quiz-pct
        │   └── div.aulas-quiz-bar
        │       └── div.aulas-quiz-bar-fill[style=width+color]
        ├── div.aulas-stat-card  ← progresso + alerta
        │   ├── p.aulas-stat-label  ← "Progresso na Matéria"
        │   └── div.aulas-progress-body
        │       ├── (SVG progress ring)
        │       └── div.aulas-alert-badge  ← só aparece se progresso < 40
        └── div.aulas-stat-card.aulas-news-card
            ├── p.aulas-stat-label  ← "Assuntos para você:"
            └── div.aulas-news-list
                └── a.aulas-news-item × N
                    ├── img.aulas-news-thumb
                    └── div.aulas-news-text
                        ├── span.aulas-news-title
                        └── span.aulas-news-fonte
```

### Classes importantes

| Classe                           | Elemento   | Função                                                |
| -------------------------------- | ---------- | ----------------------------------------------------- |
| `.aulas-body`                    | `<div>`    | Grid `185px 1fr 240px`, `align-items: start`          |
| `.aulas-tabs`                    | `<div>`    | Switcher de abas no cabeçalho da página               |
| `.aulas-tab`                     | `<button>` | Botão de aba com `data-tab` (`aulas` ou `exercicios`) |
| `.aulas-tab.active`              | `<button>` | Aba selecionada — fundo azul semi-transparente        |
| `.aulas-sidebar`                 | `<aside>`  | Sticky `top: 20px`, flex coluna                       |
| `.aulas-subject-btn`             | `<button>` | Botão de matéria com `data-id`                        |
| `.aulas-subject-btn.active`      | `<button>` | Matéria selecionada — borda azul, mais opaco          |
| `.aulas-topic-card`              | `<a>`      | Card clicável — abre player embutido via modal        |
| `.aulas-topic-card--recomendado` | `<a>`      | Borda esquerda 3px azul `#2b719c`                     |
| `.aulas-topic-card--concluido`   | `<a>`      | Opacity 0.6, borda esquerda 3px verde                 |
| `.aulas-badge--rec`              | `<span>`   | Badge "★ Recomendado" azul                            |
| `.aulas-badge--done`             | `<span>`   | Badge "✓ Concluído" verde                             |
| `.aulas-topic-thumb`             | `<div>`    | Container da thumbnail (148px largura)                |
| `.aulas-play-btn`                | `<div>`    | Overlay com ícone play, opacity 0 → 1 no hover        |
| `.aulas-topic-thumb--fallback`   | `<div>`    | Classe adicionada pelo `onerror` quando a img falha   |
| `.aulas-panel`                   | `<aside>`  | Sticky `top: 20px`, painel de estatísticas            |
| `.aulas-stat-card`               | `<div>`    | Card individual de estatística                        |
| `.aulas-quiz-bar-fill`           | `<div>`    | Barra de progresso do quiz (cor via inline style)     |
| `.aulas-alert-badge`             | `<div>`    | Alerta laranja "Reforço recomendado" (só se < 40%)    |
| `.aulas-news-item`               | `<a>`      | Link de notícia com thumbnail                         |
| `.aulas-library-btn`             | `<button>` | Botão "BIBLIOTECA" full-width                         |
| `.exer-section`                  | `<div>`    | Wrapper da seção Meus Exercícios                      |
| `.exer-upload-area`              | `<div>`    | Área de upload (borda tracejada)                      |
| `.exer-upload-area--confirmed`   | `<div>`    | Estado pós-upload (borda verde sólida)                |
| `.exer-upload-label`             | `<label>`  | Botão estilizado de seleção de PDF                    |
| `.exer-file-confirmed`           | `<div>`    | Nome do arquivo + ícone de check verde                |
| `.exer-card`                     | `<div>`    | Card de exercício com thumbnail e checkbox            |
| `.exer-card--done`               | `<div>`    | Estado "resolvido" — borda verde, fundo esverdeado    |
| `.exer-card-thumb`               | `<div>`    | Thumbnail do vídeo recomendado (148px)                |
| `.exer-play-btn`                 | `<a>`      | Overlay play do exercício — abre player embutido      |
| `.exer-check`                    | `<input>`  | Checkbox customizado "Já resolvi"                     |
| `.exer-check-text`               | `<span>`   | Label do checkbox — fica verde quando marcado         |

---

## CSS

### Arquivos que estilizam esta tela

```
main.css
 └── base/variables.css
 └── components/forms.css  ← .progress-ring, .ring-bg (shared)
 └── pages/aulas.css       ← todos os estilos exclusivos
```

### Layout de 3 colunas

```css
.aulas-body {
  display: grid;
  grid-template-columns: 185px 1fr 240px;
  gap: 18px;
  align-items: start;
}
```

Ambas as colunas laterais têm largura fixa. A central (`.aulas-main`) ocupa o restante. `align-items: start` impede que as colunas esturem até a altura máxima.

### Colunas laterais sticky

```css
.aulas-sidebar {
  position: sticky;
  top: 20px;
}
.aulas-panel {
  position: sticky;
  top: 20px;
}
```

Sidebar e painel ficam fixos enquanto a coluna central (lista de tópicos) rola.

### Estados dos topic cards

```css
/* Recomendado: borda esquerda azul */
.aulas-topic-card--recomendado {
  border-left: 3px solid #2b719c;
}

/* Concluído: mais transparente, borda verde */
.aulas-topic-card--concluido {
  opacity: 0.6;
  border-left: 3px solid #22c55e;
}
.aulas-topic-card--concluido:hover {
  opacity: 0.85;
}
```

Um card pode ter ambas as classes simultaneamente (recomendado E concluído), nesse caso ambas as regras se aplicam.

### Botão play overlay

```css
.aulas-play-btn {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.2s;
  background: rgba(0, 0, 0, 0.38);
}
.aulas-topic-card:hover .aulas-play-btn {
  opacity: 1;
}
```

O overlay fica invisível por padrão e aparece ao fazer hover no card inteiro — não apenas na thumbnail.

### Fallback da thumbnail

```html
onerror="this.parentElement.classList.add('aulas-topic-thumb--fallback');this.remove()"
```

Quando a imagem do YouTube não carrega (ex: ID inválido), o `onerror` adiciona a classe de fallback ao `.aulas-topic-thumb` e remove a própria `<img>`. O fallback aplica um gradiente escuro.

### Clamp de título de notícia

```css
.aulas-news-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

Títulos de notícia são truncados em 2 linhas com `...` via `-webkit-line-clamp`.

### Responsividade

```css
/* ≤ 1024px */
.aulas-body {
  grid-template-columns: 160px 1fr 220px;
}
.aulas-topic-thumb {
  width: 120px;
}

/* ≤ 768px */
.aulas-body {
  grid-template-columns: 1fr;
}
.aulas-sidebar {
  position: static;
  flex-direction: row; /* botões de matéria viram linha horizontal */
  flex-wrap: wrap;
}
.aulas-subject-btn {
  width: auto;
} /* tamanho automático, não full-width */
.aulas-panel {
  position: static;
  flex-direction: row;
  flex-wrap: wrap;
}
.aulas-stat-card {
  flex: 1 1 160px;
} /* cards de stat em grid automático */
.aulas-news-card {
  flex: 1 1 100%;
} /* notícias ocupam linha inteira */
.aulas-tabs {
  width: 100%;
} /* tabs ocupam linha inteira */
.aulas-tab {
  flex: 1;
} /* cada tab divide o espaço igualmente */
.exer-card-thumb {
  width: 110px;
}
```

---

## JavaScript

### `AULAS_DATA` — estrutura do mock

```javascript
const AULAS_DATA = {
  materias: [
    {
      id: "inovacao",
      nome: "Inovação e Tecnologia",
      quizResult: { acertos: 8, total: 10 },
      progresso: 50,
      topicos: [
        {
          id: "tec-emergentes",
          titulo: "Tecnologias Emergentes",
          youtubeId: "k1vJBpYL_xE",
          duracao: "22 min",
          recomendado: true,
          concluido: false,
        },
        // ...
      ],
      noticias: [
        { titulo: "...", fonte: "MIT Tech Review", url: "#", seed: "n-ia" },
        // ...
      ],
    },
    // 7 matérias no total
  ],
};
```

7 matérias: Inovação, Design de Interfaces, Metodologia, Sistemas Operacionais, Algoritmos, Limite e Derivada, Cursos Extras.

### `EXERCICIOS_DATA` — mock de exercícios

```javascript
// Futuramente substituído por:
//   1. OpenAI API — analisa o PDF e extrai tópicos por exercício
//   2. YouTube Data API — busca vídeos relevantes por tópico
const EXERCICIOS_DATA = [
  {
    id: "ex-chave-estrangeira",
    titulo: "Exercício 1 — Chave Estrangeira",
    videoTitulo: "SQL: Chave Estrangeira e Integridade Referencial",
    youtubeId: "NLMf3OKFJxg",
  },
  {
    id: "ex-normalizacao",
    titulo: "Exercício 2 — Normalização",
    videoTitulo: "Normalização de Banco de Dados: 1FN, 2FN e 3FN",
    youtubeId: "DGInPa8SV2s",
  },
];
```

### Estado do módulo

```javascript
let _activeId = AULAS_DATA.materias[0].id; // matéria selecionada na sidebar
let _activeTab = "aulas"; // "aulas" | "exercicios"
let _uploadedFileName = null; // nome do PDF enviado
let _exercicios = []; // cópia mutável de EXERCICIOS_DATA (com concluido)
```

Todas as variáveis são reinicializadas em `aulasScreen()` a cada navegação. `_exercicios` é uma cópia rasa de `EXERCICIOS_DATA` com o campo `concluido: false` injetado, permitindo mutar o estado sem alterar os dados originais.

### `aulasScreen()` — parsing da query string na hash

```javascript
export function aulasScreen() {
  const hash = window.location.hash; // "#/aulas?materia=algoritmos"
  const qIdx = hash.indexOf("?");
  let requestedId = AULAS_DATA.materias[0].id; // fallback: primeira matéria
  if (qIdx !== -1) {
    const params = new URLSearchParams(hash.slice(qIdx + 1));
    const pid = params.get("materia");
    if (pid) requestedId = pid;
  }
  _activeId = getMateriaById(requestedId).id;
  _activeTab = "aulas";
  _uploadedFileName = null;
  _exercicios = EXERCICIOS_DATA.map((ex) => ({ ...ex, concluido: false }));
  // ...
}
```

A query string está dentro do hash (`#/aulas?materia=id`), não na URL. `URLSearchParams` recebe a parte após `?` do hash (não da URL inteira). `getMateriaById()` tem fallback para a primeira matéria se o `id` não existir.

### `renderProgressRing(percent)` — ring SVG próprio

```javascript
function renderProgressRing(percent) {
  const r = 26;
  const circ = +(2 * Math.PI * r).toFixed(2); // ≈ 163.36
  const filled = +((percent / 100) * circ).toFixed(2);
  const offset = +(circ / 4).toFixed(2); // ≈ 40.84 — inicia o arco no topo
  const stroke = percent < 40 ? "#f97316" : "#2b719c"; // laranja se baixo
  return `<svg ...>
    <circle class="ring-bg" cx="30" cy="30" r="${r}" .../>
    <circle cx="30" cy="30" r="${r}" stroke="${stroke}"
      stroke-dasharray="${filled} ${circ - filled}"
      stroke-dashoffset="${offset}"
      stroke-linecap="round"
    />
  </svg>`;
}
```

Diferente do ring do Dashboard (raio 15.9, circumferência ~100), este usa raio **26** com circumferência **~163**. O offset `circ/4` desloca o ponto de partida 90° para que o arco comece no topo. Cor laranja (`#f97316`) se `percent < 40` — sinaliza alerta.

### `buildTopicCard(t)` — thumbnail via YouTube

```javascript
const thumb = `https://i.ytimg.com/vi/${t.youtubeId}/mqdefault.jpg`;
```

URL direta da CDN do YouTube para thumbnail de qualidade média (320×180). `mqdefault` é menor que `hqdefault` (480×360) — adequado para o tamanho de 148px no card.

### `quizBarColor(pct)`

```javascript
function quizBarColor(pct) {
  if (pct >= 70) return "#22c55e"; // verde
  if (pct >= 40) return "#f59e0b"; // amarelo
  return "#f97316"; // laranja
}
```

Três faixas para a barra de progresso do quiz. Diferente do ring (que usa apenas 2 faixas com `< 40`), a barra tem gradação mais fina.

### `attachLibraryBtn()`

```javascript
function attachLibraryBtn() {
  const btn = document.getElementById("btn-biblioteca");
  if (btn) btn.addEventListener("click", openBiblioteca);
}
```

`openBiblioteca` é importado de `biblioteca.js`. A função é chamada em dois momentos:

1. Em `aulasInit()` — na primeira renderização
2. Após cada troca de matéria (quando na aba "aulas") — porque `innerHTML` é substituído, destruindo o listener anterior

### `attachExerciciosEvents()`

```javascript
function attachExerciciosEvents() {
  const input = document.getElementById("exer-pdf-input");
  if (!input) return;
  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    _uploadedFileName = file.name;
    document.querySelector(".aulas-main").innerHTML = buildExerciciosSection();
    // Após confirmação o input some (estado --confirmed não tem input), não precisa re-registrar
  });
}
```

Chamada apenas quando a aba "Meus Exercícios" é ativada. Após o upload, o input é substituído pelo estado confirmado — não há re-registro necessário.

### `aulasInit()` — troca de matéria, abas e exercícios

Quando o usuário clica em outra matéria:

- Se aba = "aulas": reconstrói `.aulas-main` com `buildMain()` e re-registra `attachLibraryBtn()`
- Se aba = "exercicios": só o painel direito é atualizado (exercícios não são por matéria)
- A sidebar NÃO é reconstruída — só o estado `.active` é atualizado via `classList.toggle`

### Eventos

| Elemento             | Evento                          | Ação                                                                       |
| -------------------- | ------------------------------- | -------------------------------------------------------------------------- |
| `.aulas-subject-btn` | `click`                         | Atualiza `_activeId`, reconstrói main (se aba=aulas) + panel               |
| `.aulas-tab`         | `click` (delegado em `.aulas`)  | Troca `_activeTab`, re-renderiza `.aulas-main`, re-registra eventos da aba |
| `#btn-biblioteca`    | `click`                         | Chama `openBiblioteca()` de `biblioteca.js`                                |
| `.aulas-topic-card`  | `click` (delegado em `.aulas`)  | Abre player de vídeo — `openVideoPlayer(youtubeId, title)`                 |
| `#exer-pdf-input`    | `change`                        | Define `_uploadedFileName`, re-renderiza seção de exercícios               |
| `.exer-play-btn`     | `click` (delegado em `.aulas`)  | Abre player de vídeo — `openVideoPlayer(youtubeId, title)`                 |
| `.exer-check`        | `change` (delegado em `.aulas`) | Atualiza `ex.concluido`, toggle `.exer-card--done` no card                 |

---

## Fluxo da Página

```
Usuário acessa #/aulas?materia=algoritmos
       ↓
aulasScreen()
  ↓ hash.indexOf("?") → parse query string
  ↓ getMateriaById("algoritmos") → _activeId = "algoritmos"
  ↓ buildSidebar() → botões de matéria, "algoritmos" com .active
  ↓ buildMain(materia) → lista de tópicos com thumbnails YouTube
  ↓ buildPanel(materia) → quiz stats + ring de progresso + notícias
       ↓
aulasInit()
  ↓ registra click em cada .aulas-subject-btn
  ↓ attachLibraryBtn()
       ↓
Usuário clica em "Design de Interfaces"
  ↓ _activeId = "design-interfaces"
  ↓ toggle .active nos botões
  ↓ .aulas-main.innerHTML = buildMain(nova matéria)
  ↓ .aulas-panel.innerHTML = buildPanel(nova matéria)
  ↓ attachLibraryBtn()
       ↓
Usuário clica em um topic card
  ↓ click interceptado via delegação em .aulas (e.preventDefault())
  ↓ openVideoPlayer(youtubeId, title) — importado de biblioteca.js
  ↓ Modal injetado no <body> com iframe embed do YouTube (?autoplay=1)
  ↓ double rAF → .open adicionado → fade-in + slide-up
  ↓
Usuário fecha o player (✕ / Escape / clique no backdrop)
  ↓ iframe.src = "" → vídeo para imediatamente
  ↓ overlay removido do DOM
  ↓ listener de Escape removido
```

---

## Como Modificar no Futuro

### Conectar a uma API real

```javascript
// Substituir:
const AULAS_DATA = { materias: [...] };

// Por:
async function loadAulasData() {
  const res = await fetch("/api/aulas");
  return res.json();
}
```

`aulasScreen()` precisaria ser `async` e o router precisaria aguardar a Promise antes de injetar o HTML.

### Persistir estado de "concluído"

Atualmente `concluido` é estático no mock. Para persistir:

```javascript
import { toggleTopicDone } from "../state/aulas.js";
// no buildTopicCard(), adicionar data-topic-id no card
// no aulasInit(), adicionar listener para toggle
```

### Adicionar matéria ao menu lateral dinamicamente

Ler disciplinas do localStorage (como o Quiz faz):

```javascript
import { getDisciplines } from "../state/matriz.js";
const disciplines = getDisciplines();
// gerar botões adicionais na sidebar
```

---

## Relação Entre Arquivos

```
assets/js/screens/aulas.js
 └── import openBiblioteca from ./biblioteca.js
 └── AULAS_DATA (local, mock)
 └── thumbnails: https://i.ytimg.com/vi/${youtubeId}/mqdefault.jpg
 └── notícias: https://picsum.photos/seed/${seed}/80/54
 └── href de tópicos (fallback): https://www.youtube.com/watch?v=${youtubeId}
 └── player embutido: https://www.youtube.com/embed/${youtubeId}?autoplay=1
 └── openVideoPlayer importado de ./biblioteca.js
```

### Player de vídeo embutido

Os topic cards usam delegação de eventos no container estável `.aulas` para interceptar cliques e abrir o vídeo dentro da plataforma:

```javascript
// aulasInit() — delegação no container estável, sobrevive à troca de matéria
document.querySelector(".aulas").addEventListener("click", (e) => {
  const card = e.target.closest(".aulas-topic-card");
  if (!card) return;
  e.preventDefault(); // cancela o href
  openVideoPlayer(card.dataset.youtubeId, card.dataset.videoTitle);
});
```

**Como o modal é acionado:** clique em qualquer parte do `.aulas-topic-card`.

**Como o modal é fechado (três formas):**

1. Botão ✕ (`.video-player-close`) — posicionado acima do iframe
2. Tecla `Escape` — listener removido ao fechar
3. Clique no backdrop (fora do modal)

**Parada do vídeo:** ao fechar, `iframe.src = ""` é executado antes de remover o elemento do DOM, garantindo que o áudio/vídeo para imediatamente.

A função `openVideoPlayer` é importada de `biblioteca.js` (mesmo módulo que fornece `openBiblioteca`). O modal usa as classes `.video-player-overlay` / `.video-player-modal` definidas em `assets/css/components/modals.css`.

### Componentes globais

| Componente                        | Presente?                                                 |
| --------------------------------- | --------------------------------------------------------- |
| Topbar                            | **Sim**                                                   |
| Beluginha IA                      | **Sim**                                                   |
| `.progress-ring` / `.ring-bg`     | **Sim** — mesmas classes do Dashboard, mas raio diferente |
| `.button` (buttons.css)           | **Não** — botão biblioteca tem estilo próprio             |
| `openVideoPlayer` (biblioteca.js) | **Sim** — player embutido de vídeo                        |

---

## Correções de Segurança (Etapa 3)

### Sanitização de atributos HTML (**S5**)

```javascript
// S5: escapa caracteres HTML especiais para atributos — previne quebra de atributo e XSS
function escapeHtml(str) { ... }
```

Em `buildTopicCard(t)`, os atributos `data-video-title` e `title` agora são escapados:

```html
<!-- antes -->
data-video-title="${t.titulo}" title="Assistir: ${t.titulo}"

<!-- depois -->
data-video-title="${escapeHtml(t.titulo)}" title="Assistir:
${escapeHtml(t.titulo)}"
```

O `data-video-title` é lido em `aulasInit()` via `card.dataset.videoTitle` e passado para `openVideoPlayer()`. Como `dataset` decodifica automaticamente entidades HTML, o valor original é preservado no JavaScript. A validação do YouTube ID ocorre dentro de `openVideoPlayer()` em `biblioteca.js` (**S4**).
