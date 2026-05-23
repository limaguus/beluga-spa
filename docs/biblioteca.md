# Componente: Biblioteca

> **Tipo:** Modal overlay global — aberto a partir da tela Aulas
> **Arquivo JS:** `assets/js/screens/biblioteca.js`
> **Arquivo CSS:** `assets/css/pages/biblioteca.css`

---

## Estrutura do Componente

### Objetivo

Modal de pesquisa de videoaulas acadêmicas. Abre sobre qualquer tela (injetado no `<body>`), oferece filtragem por categoria via sidebar e busca textual por título ou descrição. Cada card abre o vídeo em um player embutido (modal interno com iframe do YouTube) — sem redirecionamento para nova aba. Preparado para substituição do mock por API real.

### Organização visual

```
┌─────────────────────────────────────────────────────────────────────┐
│  (backdrop blur + escurecimento)                                    │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  📚 Biblioteca                                           [✕]  │  │
│  │  Pesquise conteúdos recomendados para seus estudos            │  │
│  ├────────────────────────────────────────────────────────────── │  │
│  │  [🔍 Buscar videoaulas, tópicos, matérias...] [Pesquisar]     │  │
│  ├──────────────┬────────────────────────────────────────────────┤  │
│  │ Categorias   │  Recomendados para você:  ★ Personalizado      │  │
│  │              │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐         │  │
│  │ Todas as     │  │thumb │ │thumb │ │thumb │ │thumb │         │  │
│  │ Algoritmos   │  │      │ │      │ │      │ │      │         │  │
│  │ Sistemas O.  │  │título│ │título│ │título│ │título│         │  │
│  │ Design       │  └──────┘ └──────┘ └──────┘ └──────┘         │  │
│  │ ...          │                                                │  │
│  │              │  Mais conteúdos                                │  │
│  │              │  ┌──────┐ ┌──────┐ ...                        │  │
│  └──────────────┴────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## HTML

### Hierarquia completa

```
body
└── div#bib-overlay.bib-overlay[role=dialog]   ← overlay injetado via JS
    └── div.bib-modal
        ├── header.bib-header
        │   ├── div.bib-header-text
        │   │   ├── h2.bib-title          ← SVG + "Biblioteca"
        │   │   └── p.bib-subtitle
        │   └── button#bib-close.bib-close
        ├── div.bib-search-row
        │   ├── div.bib-search-wrap
        │   │   ├── svg.bib-search-icon   ← lupa (pointer-events: none)
        │   │   └── input#bib-search-input.bib-search-input
        │   └── button#bib-search-btn.bib-search-btn
        └── div.bib-body
            ├── aside.bib-sidebar
            │   ├── p.bib-sidebar-label   ← "Categorias" (uppercase)
            │   └── nav#bib-cats.bib-cats
            │       └── button.bib-cat-btn[data-cat] × 9  ← buildSidebarHTML()
            │           └── (.active no selecionado)
            └── div#bib-content.bib-content
                ├── div.bib-section       ← "Recomendados para você:"
                │   ├── div.bib-section-header
                │   │   ├── h3.bib-section-title
                │   │   └── span.bib-section-tag  ← ★ badge amarelo
                │   └── div.bib-cards-grid
                │       └── a.bib-card[href=youtube][data-youtube-id][data-video-title] × N  ← buildVideoCard()
                │           ├── div.bib-card-thumb
                │           │   ├── img[loading=lazy][onerror=...]
                │           │   ├── div.bib-card-play  ← ícone play (hover)
                │           │   └── span.bib-card-duration
                │           └── div.bib-card-body
                │               ├── span.bib-badge  ← "★ Recomendado" (se rec)
                │               ├── h4.bib-card-title
                │               └── p.bib-card-desc
                └── div.bib-section       ← "Mais conteúdos"
                    └── div.bib-cards-grid
                        └── a.bib-card × N
```

### Classes importantes

| Classe | Elemento | Função |
|---|---|---|
| `.bib-overlay` | `<div>` | Overlay fullscreen, `opacity: 0` + `pointer-events: none` por padrão |
| `.bib-overlay.open` | `<div>` | `opacity: 1` + `pointer-events: all` — ativado via JS |
| `.bib-modal` | `<div>` | Janela `min(1100px, 100%)`, `max-height: 88vh` |
| `.bib-body` | `<div>` | Grid `170px 1fr` (sidebar + conteúdo) |
| `.bib-cat-btn` | `<button>` | Botão de categoria — hover com `translateX(2px)` |
| `.bib-cat-btn.active` | `<button>` | Categoria selecionada — fundo e borda azuis |
| `.bib-cards-grid` | `<div>` | `grid auto-fill minmax(195px, 1fr)` — responsivo automático |
| `.bib-card` | `<a>` | Card clicável — abre player embutido via modal (intercepta o `href` do YouTube) |
| `.bib-card--rec` | `<a>` | Borda azul para recomendados |
| `.bib-card-thumb` | `<div>` | Aspect ratio 16:9 via `padding-bottom: 56.25%` |
| `.bib-card-play` | `<div>` | Overlay de play — `opacity: 0`, visível no hover |
| `.bib-card-duration` | `<span>` | Texto sobreposto na thumbnail, canto inferior direito |
| `.bib-card-title` | `<h4>` | Truncado em 2 linhas com `-webkit-line-clamp: 2` |
| `.bib-card-desc` | `<p>` | Truncado em 2 linhas com `-webkit-line-clamp: 2` |
| `.bib-section-tag` | `<span>` | Badge amarelo "★ Personalizado para você" |
| `.bib-empty` | `<div>` | Estado vazio — ícone + texto centralizados |

---

## CSS

### Arquivos que estilizam este componente

```
main.css
 └── pages/biblioteca.css  ← todos os estilos exclusivos (prefixo bib-)
```

### Animação de abertura — CSS transition (não keyframe)

A abertura **não usa `@keyframes`** — usa `transition` com estado inicial/final:

```css
.bib-overlay {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.28s ease;
}
.bib-overlay.open {
  opacity: 1;
  pointer-events: all;
}

.bib-modal {
  transform: translateY(20px);
  transition: transform 0.28s ease;
}
.bib-overlay.open .bib-modal {
  transform: translateY(0);
}
```

O overlay faz fade-in enquanto o modal sobe 20px simultaneamente. Isso exige o double `requestAnimationFrame` no JS para que a transição dispare (ver `openBiblioteca()`).

### Thumbnail com aspect ratio 16:9

```css
.bib-card-thumb {
  position: relative;
  padding-bottom: 56.25%;   /* 9/16 = 56.25% — mantém proporção */
  background: #0a0f1e;
}
.bib-card-thumb img {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
}
```

Técnica de "padding hack" para aspect ratio antes do `aspect-ratio` CSS ser amplamente suportado.

### Hover do card com play overlay

```css
.bib-card-play { opacity: 0; transition: opacity 0.2s; }
.bib-card:hover .bib-card-play { opacity: 1; }

.bib-card-thumb img { transition: opacity 0.2s, transform 0.3s; }
.bib-card:hover .bib-card-thumb img { opacity: 0.78; transform: scale(1.05); }
```

Hover anima três coisas simultaneamente: imagem escurece, imagem cresce (zoom 5%), overlay de play aparece.

### Botão fechar — hover laranja

```css
.bib-close:hover {
  background: rgba(249,115,22,0.12);
  border-color: rgba(249,115,22,0.3);
  color: #f97316;
}
```

Único uso da cor laranja (`#f97316`) neste componente — contraste intencional com o azul padrão.

### Responsive — mobile sheet

```css
@media (max-width: 768px) {
  .bib-overlay { align-items: flex-end; }   /* ancora na base */
  .bib-modal {
    max-height: 92vh;
    border-radius: 20px 20px 0 0;           /* só cantos superiores arredondados */
    width: 100%;
  }
  .bib-body { grid-template-columns: 1fr; } /* sidebar sobre conteúdo */
  .bib-cats { flex-direction: row; flex-wrap: wrap; }  /* pills horizontais */
  .bib-cards-grid { grid-template-columns: repeat(2, 1fr); }
}
```

Em mobile o modal vira um "bottom sheet" — fixo na base, cantos superiores arredondados, sidebar de categorias vira linha de pills.

---

## JavaScript

### Estado do módulo

```javascript
let _activeCategoria = "todas";
let _searchQuery = "";
let _overlayEl = null;
```

Estado **não persiste** entre aberturas — `openBiblioteca()` reseta `_activeCategoria` e `_searchQuery` a cada chamada.

### `BIBLIOTECA_DATA` — mock com 9 categorias e 17 vídeos

```javascript
const BIBLIOTECA_DATA = {
  categorias: [{ id: "todas", label: "Todas as aulas" }, ...],  // 9 itens
  videos: [{ id, titulo, categoria, youtubeId, duracao, descricao, recomendado }, ...]  // 17 itens
};
```

Vídeos com `recomendado: true` (6 no total) aparecem na seção "Recomendados para você".

### `getFilteredVideos()` — duplo filtro

```javascript
function getFilteredVideos() {
  let vids = BIBLIOTECA_DATA.videos;
  if (_activeCategoria !== "todas")
    vids = vids.filter(v => v.categoria === _activeCategoria);
  if (_searchQuery.trim()) {
    const q = _searchQuery.toLowerCase();
    vids = vids.filter(v =>
      v.titulo.toLowerCase().includes(q) ||
      v.descricao.toLowerCase().includes(q)
    );
  }
  return vids;
}
```

Categoria filtra primeiro, busca textual filtra depois (operação AND). A busca não filtra por categoria — busca em título e descrição.

### `buildContentHTML()` — três estados de renderização

```javascript
function buildContentHTML() {
  const vids = getFilteredVideos();
  const isFiltering = _searchQuery.trim() !== "" || _activeCategoria !== "todas";

  if (vids.length === 0)
    return `<div class="bib-empty">...</div>`;

  if (isFiltering)
    return `<div class="bib-section"><h3>${vids.length} resultado(s)...</h3>...`;

  // Estado default: duas seções separadas
  const recomendados = vids.filter(v => v.recomendado);
  const outros = vids.filter(v => !v.recomendado);
  return recsSection + outrosSection;
}
```

| Estado | Condição | Renderização |
|---|---|---|
| Vazio | `vids.length === 0` | `.bib-empty` com ícone |
| Filtrando | busca ativa ou categoria ≠ "todas" | Uma seção com contagem de resultados |
| Default | `filter === "todas"` e sem busca | Duas seções: Recomendados + Mais conteúdos |

### `buildVideoCard(v)` — card como link `<a>` com player embutido

```javascript
function buildVideoCard(v) {
  const thumb = `https://i.ytimg.com/vi/${v.youtubeId}/mqdefault.jpg`;
  return `
    <a class="bib-card${v.recomendado ? " bib-card--rec" : ""}"
       href="https://www.youtube.com/watch?v=${v.youtubeId}"
       data-youtube-id="${v.youtubeId}"
       data-video-title="${v.titulo}"
       title="${v.titulo}">
      ...
      onerror="this.parentElement.classList.add('bib-card-thumb--fallback');this.remove()"
    </a>`;
}
```

O card mantém o `href` do YouTube como fallback (sem JS, o link funciona normalmente). Com JS, o clique é interceptado via delegação em `#bib-content` — `e.preventDefault()` cancela a navegação e `openVideoPlayer()` abre o player embutido. `mqdefault.jpg` é a thumbnail de média qualidade do YouTube. O `onerror` remove a `<img>` com erro e aplica fallback gradiente ao container.

### `openBiblioteca()` — double rAF para transição CSS

```javascript
export function openBiblioteca() {
  _activeCategoria = "todas";
  _searchQuery = "";

  const prev = document.getElementById("bib-overlay");
  if (prev) prev.remove();  // garante que não há overlay anterior

  document.body.insertAdjacentHTML("beforeend", buildModalHTML());
  _overlayEl = document.getElementById("bib-overlay");
  attachEvents();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      _overlayEl.classList.add("open");  // dispara a transition CSS
    });
  });

  setTimeout(() => {
    document.getElementById("bib-search-input")?.focus();
  }, 280);  // aguarda a animação terminar (0.28s) antes de focar
}
```

O double `requestAnimationFrame` garante que o elemento já foi pintado pelo browser antes de adicionar `.open` — sem isso, o elemento seria inserido e a classe adicionada no mesmo frame, e o browser não detectaria a transição.

### `closeBiblioteca()` — remove listener de Escape

```javascript
function closeBiblioteca() {
  if (!_overlayEl) return;
  _overlayEl.classList.remove("open");
  document.removeEventListener("keydown", onEscape);  // cleanup correto
}
```

Diferente do notificacoes.js e conquistas.js, este componente **remove corretamente** o listener de Escape ao fechar. A função `onEscape` é nomeada (não anônima), o que permite o `removeEventListener`.

### Busca — três formas de acionar

| Trigger | Como funciona |
|---|---|
| `input` no campo | Atualiza `_searchQuery` em tempo real, `updateContent()` imediato |
| `keydown Enter` | Atualiza `_searchQuery` e `updateContent()` |
| Clique em "Pesquisar" | Lê valor atual do input, `updateContent()` |

A duplicidade entre `input` e `Enter`/botão é redundante (o `input` já filtra em tempo real), mas não causa problemas.

### Eventos

| Elemento | Evento | Ação |
|---|---|---|
| `#bib-close` | `click` | `closeBiblioteca()` |
| `#bib-overlay` | `click` no overlay (fora do modal) | `closeBiblioteca()` |
| `#bib-cats` | `click` (delegado) | Atualiza `_activeCategoria`, `updateSidebar()` + `updateContent()` |
| `#bib-search-input` | `input` | Atualiza `_searchQuery`, `updateContent()` |
| `#bib-search-input` | `keydown Enter` | Atualiza `_searchQuery`, `updateContent()` |
| `#bib-search-btn` | `click` | Lê input, `updateContent()` |
| `#bib-content` | `click` (delegado) | Intercepta clique em `.bib-card`, chama `openVideoPlayer(youtubeId, videoTitle)` |
| `document` | `keydown Escape` | `closeBiblioteca()` (via `onEscape`) |

---

## Fluxo do Componente

```
Usuário clica "Biblioteca" na tela Aulas
  ↓ openBiblioteca()
  ↓ Estado resetado (_activeCategoria = "todas", _searchQuery = "")
  ↓ Overlay anterior removido (se existir)
  ↓ buildModalHTML() → buildSidebarHTML() + buildContentHTML()
  ↓ Injetado no <body>, eventos anexados
  ↓ double rAF → .open adicionado → fade-in + slide-up
  ↓ (280ms) → foco no input de busca
       ↓
Usuário digita "cálculo"
  ↓ _searchQuery = "cálculo"
  ↓ updateContent() → isFiltering = true
  ↓ Mostra "X resultado(s) encontrado(s)" com os vídeos filtrados
       ↓
Usuário clica categoria "Algoritmos"
  ↓ _activeCategoria = "algoritmos"
  ↓ updateSidebar() → "Algoritmos" recebe .active
  ↓ updateContent() → filtra por categoria (busca ainda ativa = AND)
       ↓
Usuário clica em um card
  ↓ click interceptado via delegação em #bib-content (e.preventDefault())
  ↓ openVideoPlayer(youtubeId, videoTitle)
  ↓ Modal injetado no <body> com iframe embed (?autoplay=1)
  ↓ double rAF → .open adicionado → fade-in + slide-up
  ↓
Usuário fecha o player (✕ / Escape / clique no backdrop)
  ↓ iframe.src = "" → vídeo para imediatamente
  ↓ overlay removido do DOM
  ↓ listener de Escape do player removido
       ↓
Usuário pressiona Escape (com Biblioteca aberta, sem player)
  ↓ onEscape → closeBiblioteca()
  ↓ .open removido → fade-out
  ↓ document.removeEventListener("keydown", onEscape)
```

---

## Como Modificar no Futuro

### Substituir mock por API

```javascript
// Em openBiblioteca(), antes de buildModalHTML():
export async function openBiblioteca() {
  const data = await fetch("/api/biblioteca").then(r => r.json());
  // Substituir BIBLIOTECA_DATA por data
}
```

O arquivo já tem comentários indicando os pontos de integração.

### Adicionar loading state

```javascript
function buildContentHTML() {
  if (_loading)
    return `<div class="bib-loading"><span>Carregando...</span></div>`;
  // ... restante da lógica
}
```

### Fechar com animação (aguardar fade-out)

```javascript
function closeBiblioteca() {
  if (!_overlayEl) return;
  _overlayEl.classList.remove("open");
  document.removeEventListener("keydown", onEscape);
  setTimeout(() => _overlayEl?.remove(), 280);  // aguarda transition de 0.28s
}
```

Atualmente o overlay não é removido do DOM ao fechar — apenas perde a classe `.open`. Para remover após o fade-out, adicionar o setTimeout acima.

---

## Relação Entre Arquivos

```
assets/js/screens/biblioteca.js
 └── BIBLIOTECA_DATA (local — 9 categorias, 17 vídeos)
 └── _activeCategoria, _searchQuery, _overlayEl (estado de módulo)
 └── exporta: openBiblioteca()
```

### `openVideoPlayer(youtubeId, title)` — player embutido

Função exportada por este módulo, usada tanto pela Biblioteca quanto pela tela Aulas.

```javascript
export function openVideoPlayer(youtubeId, title) {
  // Remove player anterior (se existir)
  const prev = document.getElementById("beluga-video-player");
  if (prev) prev.remove();

  // Injeta overlay com iframe embed
  document.body.insertAdjacentHTML("beforeend", `
    <div id="beluga-video-player" class="video-player-overlay" ...>
      <div class="video-player-modal">
        <button class="video-player-close" ...>✕</button>
        <div class="video-player-iframe-wrap">
          <iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" ...></iframe>
        </div>
      </div>
    </div>
  `);

  // Fecha ao clicar em ✕, no backdrop, ou ao pressionar Escape
  // Ao fechar: iframe.src = "" para o vídeo, overlay é removido do DOM
}
```

**Como o modal é acionado:** clique em qualquer `.bib-card` dentro de `#bib-content` (delegação de eventos).

**Como o modal é fechado (três formas):**
1. Botão ✕ (`.video-player-close`) — posicionado acima do iframe
2. Tecla `Escape` — listener nomeado `onPlayerKey`, removido ao fechar
3. Clique no backdrop (`.video-player-overlay`, fora do `.video-player-modal`)

**Parada do vídeo:** ao fechar, `iframe.src = ""` é executado antes de remover o elemento, garantindo que o áudio/vídeo para imediatamente.

O CSS do player (`.video-player-overlay`, `.video-player-modal`, `.video-player-close`, `.video-player-iframe-wrap`) está em `assets/css/components/modals.css`.

---

## Correções de Segurança (Etapa 3)

### Validação de YouTube ID (**S4**)

```javascript
// S4: valida o formato do ID do YouTube antes de usar em URLs e iframes — previne injeção
function isValidYoutubeId(id) {
  return typeof id === "string" && /^[a-zA-Z0-9_-]{8,15}$/.test(id);
}
```

Aplicado em dois pontos:

1. **`buildVideoCard(v)`** — retorna `""` se `v.youtubeId` for inválido, evitando geração de URLs malformadas no `href` e na thumbnail.
2. **`openVideoPlayer(youtubeId, title)`** — retorna imediatamente se o ID for inválido, impedindo que um valor malicioso seja inserido no atributo `src` do `<iframe>`.

### Sanitização de atributos HTML (**S5**)

```javascript
// S5: escapa o título para uso em atributos HTML — previne quebra de atributo
const safeTitle = escapeHtml(title);
// aria-label="${safeTitle}"  e  title="${safeTitle}"
```

Atributos protegidos:

| Atributo | Onde | Proteção |
|---|---|---|
| `data-video-title` | `buildVideoCard()` — `<a>` card | quebra se título contém `"` |
| `title` | `buildVideoCard()` — `<a>` card | idem |
| `aria-label` | `openVideoPlayer()` — `<div>` overlay | idem |
| `title` | `openVideoPlayer()` — `<iframe>` | idem |

---

### Quem chama este componente

| Arquivo | Como usa |
|---|---|
| `assets/js/screens/aulas.js` | `import { openBiblioteca, openVideoPlayer } from "./biblioteca.js"` → botão "Biblioteca" e player de vídeo nos topic cards |

### Componentes globais

| Componente | Presente? |
|---|---|
| Topbar | Não (sobreposto pelo overlay) |
| Beluginha IA | Presente abaixo (z-index 700 vs 9000 da biblioteca) |
| `rel="noopener noreferrer"` | **Sim** — segurança em links externos |
| `loading="lazy"` | **Sim** — imagens carregam sob demanda |
