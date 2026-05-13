# Tela: Beluga Feed

> **Rota:** `#/feed`
> **Tipo:** Privada — requer autenticação
> **Arquivo principal:** `assets/js/screens/feed.js`

---

## Estrutura da Tela

### Objetivo

O Feed é a rede social acadêmica do BELUGA. Estudantes publicam relatos de estudo, reagem às publicações alheias (Neurônio de Ouro, Repostar, Comentários) e acompanham o ranking semanal da comunidade. O estado dos posts vive em memória de módulo — não persiste no localStorage.

### Organização visual

```
┌──────────────────────────────────────────────────────────────────────┐
│  TOPBAR                                                              │
├──────────────────────────────────────────────────────────────────────┤
│  "Beluga Feed"                                                       │
│  "Compartilhe seu progresso..."                                      │
│                                                                      │
│  FD-LAYOUT (grid: 1fr + 296px)                                      │
│  ┌───────────────────────────────────┐  ┌──────────────────────┐    │
│  │  FD-MAIN                          │  │  FD-SIDEBAR (sticky) │    │
│  │  ┌───────────────────────────┐    │  │  [Top Estudantes]    │    │
│  │  │  COMPOSER                 │    │  │  🥇 André Sanches    │    │
│  │  │  [avatar] [textarea]      │    │  │  🥈 Laura Silva      │    │
│  │  │  [hints]      [Publicar]  │    │  │  ...                 │    │
│  │  └───────────────────────────┘    │  │                      │    │
│  │                                   │  │  [79h / Meta 120h]   │    │
│  │  FD-LIST (max-height, scroll)     │  │  ████████░░ 65%     │    │
│  │  ┌───────────────────────────┐    │  │                      │    │
│  │  │ [avatar] Maria Cláudia 2h │    │  │  [Cálculo]          │    │
│  │  │ "Estudei 2h de derivada..." │  │  │  Matéria + estudada │    │
│  │  │ [Cálculo] [2h estudadas]  │    │  │                      │    │
│  │  │ [🧠 14] [↺ 4] [💬 6]    │    │  │  🔥 7 dias           │    │
│  │  └───────────────────────────┘    │  │  Sequência coletiva  │    │
│  │  ... (11 posts)                   │  └──────────────────────┘    │
│  └───────────────────────────────────┘                              │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## HTML

### Hierarquia completa

```
section.fd-page
├── div.fd-page-header
│   └── div
│       ├── h1.fd-page-title   ← "Beluga Feed"
│       └── p.fd-page-desc
└── div.fd-layout
    ├── div.fd-main
    │   ├── div#fd-composer.fd-composer
    │   │   ├── div.fd-composer-row
    │   │   │   ├── (avatar do usuário atual)
    │   │   │   └── textarea#fd-text.fd-composer-input
    │   │   └── div.fd-composer-footer
    │   │       ├── div.fd-composer-hints
    │   │       │   ├── span.fd-composer-hint  ← "Matéria"
    │   │       │   └── span.fd-composer-hint  ← "Horas estudadas"
    │   │       └── button#fd-post-btn.fd-post-btn  ← "Publicar"
    │   └── div#fd-list.fd-list
    │       └── article.fd-post[data-id] × 11  ← renderPost()
    │           ├── div.fd-post-header
    │           │   ├── (avatar do autor)
    │           │   └── div.fd-post-meta
    │           │       ├── span.fd-post-author
    │           │       └── span.fd-post-time
    │           ├── div.fd-post-body
    │           │   ├── p.fd-post-content
    │           │   └── div.fd-post-tags  ← tags de matéria + horas (opcionais)
    │           ├── div.fd-reactions
    │           │   ├── button[data-action="like"][data-post-id]
    │           │   ├── button[data-action="repost"][data-post-id]
    │           │   └── button[data-action="comments"][data-post-id]
    │           └── div.fd-comments  ← só existe se showComments = true
    │               ├── div.fd-comment × N
    │               │   ├── (avatar do comentarista)
    │               │   └── div.fd-comment-body
    │               └── div.fd-comment-compose
    │                   ├── (avatar do usuário atual)
    │                   ├── input.fd-comment-input[data-post-id]
    │                   └── button.fd-comment-send[data-post-id]
    └── aside.fd-sidebar
        ├── div.fd-sidebar-card  ← ranking
        │   ├── div.fd-sidebar-card-header
        │   └── div.fd-ranking
        │       └── div.fd-rank-item × 5
        ├── div.fd-sidebar-card.fd-card--stats  ← horas totais + barra
        ├── div.fd-sidebar-card.fd-card--center  ← matéria mais estudada
        └── div.fd-sidebar-card  ← sequência coletiva
```

### Classes importantes

| Classe | Elemento | Função |
|---|---|---|
| `.fd-layout` | `<div>` | Grid `1fr 296px`, `align-items: start` |
| `.fd-composer` | `<div>` | Card do compositor de post |
| `.fd-composer:focus-within` | `<div>` | Borda azul + glow quando o textarea tem foco |
| `.fd-composer-input` | `<textarea>` | Campo de texto — sem borda, sem resize |
| `.fd-composer-input--shake` | `<textarea>` | Animação de shake quando tenta publicar vazio |
| `.fd-post-btn` | `<button>` | Botão Publicar — gradiente azul |
| `.fd-list` | `<div>` | Lista de posts com `max-height` e `overflow-y: auto` |
| `.fd-post` | `<article>` | Card de post individual |
| `.fd-post--gold` | `<article>` | Post com like ativo — borda dourada |
| `.fd-reactions` | `<div>` | Área de botões de reação |
| `.fd-rxn-btn` | `<button>` | Botão de reação individual |
| `.fd-rxn-btn--gold` | `<button>` | "Neurônio de Ouro" ativo — amarelo |
| `.fd-rxn-btn--green` | `<button>` | "Repostar" ativo — verde |
| `.fd-rxn-btn--blue` | `<button>` | "Comentários" com seção aberta — azul |
| `.fd-tag--subject` | `<span>` | Tag de matéria — azul |
| `.fd-tag--hours` | `<span>` | Tag de horas — verde |
| `.fd-avatar--md` | `<div>` | Avatar 40×40px |
| `.fd-avatar--sm` | `<div>` | Avatar 30×30px (comentários) |
| `.fd-sidebar` | `<aside>` | Sidebar sticky — flex coluna |
| `.fd-sidebar-card` | `<div>` | Card de informação da comunidade |
| `.fd-card--stats` | `<div>` | Card com barra de progresso de meta |
| `.fd-card--center` | `<div>` | Card centralizado (matéria mais estudada) |

---

## CSS

### Arquivos que estilizam esta tela

```
main.css
 └── base/variables.css
 └── pages/feed.css  ← todos os estilos exclusivos
```

### Feed list scrollável

```css
.fd-list {
  max-height: calc(100vh - 340px);
  min-height: 300px;
  overflow-y: auto;
  padding-right: 6px;
}
```

A lista tem altura máxima relativa à viewport. Em telas menores, o `min-height: 300px` garante que ao menos parte dos posts apareça. Scrollbar customizada de 4px.

### Composer com focus-within

```css
.fd-composer:focus-within {
  border-color: rgba(59,158,221,0.5);
  box-shadow: 0 0 0 3px rgba(43,113,156,0.07);
}
```

`:focus-within` se ativa quando qualquer elemento dentro do `.fd-composer` tem foco — incluindo o textarea. Isso dá feedback visual ao card inteiro, não apenas ao campo.

### Animação de shake

```css
@keyframes fd-shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-6px); }
  60%       { transform: translateX(6px); }
}
.fd-composer-input--shake {
  animation: fd-shake 0.38s ease;
}
```

Quando o usuário tenta publicar com textarea vazio, a classe `.fd-composer-input--shake` é adicionada ao textarea e removida após 500ms (o JS usa `setTimeout 500ms`, a animação dura 380ms).

### Estados dos botões de reação

```css
.fd-rxn-btn--gold  { color: #f59e0b !important; }   /* Neurônio de Ouro */
.fd-rxn-btn--green { color: #22c55e !important; }   /* Repostar */
.fd-rxn-btn--blue  { color: #3b9edd !important; }   /* Comentários abertos */
```

`!important` garante que o estado ativo override qualquer outro modificador da classe base.

### Responsividade

```css
/* ≤ 1100px */
.fd-layout { grid-template-columns: 1fr 260px; }

/* ≤ 820px */
.fd-layout { grid-template-columns: 1fr; }
.fd-sidebar { position: static; display: grid; grid-template-columns: repeat(2,1fr); }
.fd-list { max-height: none; overflow-y: visible; }  /* remove o scroll em mobile */

/* ≤ 560px */
.fd-sidebar { grid-template-columns: 1fr; }
```

Em mobile: sidebar vai para baixo da coluna principal, torna-se grid 2 colunas (depois 1 coluna), e o feed vira scroll normal da página.

---

## JavaScript

### Estado do módulo

```javascript
let feedState = {
  posts: FEED_POSTS_MOCK.map(p => ({
    ...p,
    reactions: { ...p.reactions },
    comments: p.comments.map(c => ({ ...c })),
  })),
};
```

O estado é uma cópia profunda do mock feita com spread — não modifica os objetos originais. Cada post tem:
- `liked: boolean` — se o usuário atual curtiu
- `reposted: boolean` — se o usuário atual repostou
- `showComments: boolean` — se a seção de comentários está visível

### `avatar(initials, color, size)` — geração de avatares

```javascript
function avatar(initials, color, size = "md") {
  return `<div class="fd-avatar fd-avatar--${size}"
    style="background:${color}1a;border:2px solid ${color}55;color:${color}">
    ${initials}
  </div>`;
}
```

`${color}1a` = cor com `1a` hex → ~10% de opacidade (fundo). `${color}55` → ~33% (borda). `color` puro → texto.

### `hoursTag(h)` — formatação de horas

```javascript
function hoursTag(h) {
  if (!h) return "";
  const label = h < 1 ? `${Math.round(h * 60)}min` : `${h}h`;
  return `<span class="fd-tag fd-tag--hours">⏱ ${label} estudadas</span>`;
}
```

Posts com `studyHours: 0.7` exibem "42min", não "0.7h".

### `feedInit()` — auto-resize da textarea

```javascript
textarea?.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
});
```

Padrão de auto-resize: primeiro reseta para `auto` para o browser recalcular o `scrollHeight`, depois aplica o valor correto. Sem isso, a altura só cresceria nunca encolheria.

### Publicar post

```javascript
postBtn?.addEventListener("click", () => {
  const text = textarea?.value?.trim();
  if (!text) {
    textarea?.classList.add("fd-composer-input--shake");
    setTimeout(() => textarea?.classList.remove("fd-composer-input--shake"), 500);
    return;
  }
  feedState.posts.unshift({
    id: Date.now(),
    author: { ...FEED_ME },
    // ...
  });
  textarea.value = "";
  textarea.style.height = "";
  _rerender();
});
```

`unshift` coloca o novo post no início da lista (mais recente primeiro). `id: Date.now()` garante um ID único sem servidor.

### Event delegation em `#fd-list`

```javascript
list?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (btn) {
    _handleReaction(btn);
    return;
  }
  const send = e.target.closest(".fd-comment-send");
  if (send) _sendComment(Number(send.dataset.postId));
});
```

Um único listener no container cobre todos os posts e comentários dinâmicos. `closest("[data-action]")` sobe na DOM até encontrar um elemento com `data-action`, independente de onde o clique ocorreu dentro do botão.

### `_handleReaction(btn)`

```javascript
switch (btn.dataset.action) {
  case "like":
    post.liked = !post.liked;
    post.reactions.neuronioOuro += post.liked ? 1 : -1;
    break;
  case "repost":
    post.reposted = !post.reposted;
    post.reactions.repost += post.reposted ? 1 : -1;
    break;
  case "comments":
    post.showComments = !post.showComments;
    break;
}
_rerender();
```

"Like" e "Repost" são toggles que também incrementam/decrementam o contador. "Comments" apenas abre/fecha a seção — não incrementa contagem.

### `_sendComment(postId)`

```javascript
post.comments.push({ author: FEED_ME.name, initials: FEED_ME.initials, color: FEED_ME.color, text });
post.reactions.comments += 1;  // incrementa o contador de comentários
_rerender();
```

Ao enviar comentário, o contador `reactions.comments` é incrementado e `_rerender()` reconstrói o DOM.

### `_rerender()`

```javascript
function _rerender() {
  const list = document.getElementById("fd-list");
  if (list) list.innerHTML = feedState.posts.map(renderPost).join("");
}
```

Re-renderização total do `#fd-list`. Toda a lista é reconstruída a cada ação. Os listeners em `feedInit()` (via event delegation) continuam funcionando porque estão no container, não nos elementos internos.

### Eventos

| Elemento | Evento | Ação |
|---|---|---|
| `#fd-text` | `input` | Auto-resize da textarea |
| `#fd-post-btn` | `click` | Valida, adiciona post, re-renderiza |
| `#fd-list` | `click` (delegado) | Redireciona para `_handleReaction` ou `_sendComment` |
| `#fd-list` | `keydown (Enter)` | Envia comentário se `target` é `.fd-comment-input` |

---

## Fluxo da Página

```
Usuário acessa #/feed
       ↓
feedScreen()
  ↓ feedState.posts.map(renderPost) → 11 posts
  ↓ renderRanking() → 5 usuários no ranking
  ↓ goalPct = Math.min(100, Math.round(79/120*100)) = 65%
       ↓
feedInit()
  ↓ registra auto-resize na textarea
  ↓ registra publicação no btn-post
  ↓ event delegation no fd-list
       ↓
Usuário clica "Neurônio de Ouro" em um post
  ↓ _handleReaction(btn)
  ↓ post.liked = true, neuronioOuro++
  ↓ _rerender() → fd-list.innerHTML reconstruído
  ↓ post agora tem classe .fd-post--gold, btn tem .fd-rxn-btn--gold
       ↓
Usuário abre comentários
  ↓ post.showComments = true
  ↓ _rerender() → seção .fd-comments aparece no post
  ↓ input e send button visíveis
       ↓
Usuário digita comentário + Enter
  ↓ _sendComment(postId)
  ↓ push no post.comments[], reactions.comments++
  ↓ _rerender()
```

---

## Dados do Usuário Atual

```javascript
const FEED_ME = { name: "Jimmy", initials: "JM", color: "#2b719c" };
```

Hardcoded. Todos os posts publicados pelo usuário atual usam esses dados. Para integrar com auth:
```javascript
import { getUser } from "../state/auth.js";
const FEED_ME = getUser();
```

---

## Como Modificar no Futuro

### Persistir posts no localStorage

```javascript
import { saveFeed, loadFeed } from "../state/feed.js";

let feedState = { posts: loadFeed() || FEED_POSTS_MOCK };

function _rerender() {
  saveFeed(feedState.posts);
  // ...
}
```

### Limitar o auto-resize da textarea

```javascript
textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
```

Sem limite, a textarea cresce indefinidamente com muito texto.

### Adicionar subject/hours ao composer

Os hints de "Matéria" e "Horas estudadas" são decorativos (sem `onclick`). Para funcionar como campos:
```html
<input id="fd-subject" placeholder="Matéria..." />
<input id="fd-hours" type="number" placeholder="Horas" />
```
E no evento de publicar, ler esses valores antes de `unshift`.

---

## Relação Entre Arquivos

```
assets/js/screens/feed.js
 └── FEED_POSTS_MOCK (local — 11 posts)
 └── FEED_RANKING (local — 5 usuários)
 └── feedState (memória de módulo — não persiste)
```

### Componentes globais

| Componente | Presente? |
|---|---|
| Topbar | **Sim** |
| Beluginha IA | **Sim** |
| `.button` (buttons.css) | **Não** — `.fd-post-btn` tem estilo próprio |
| `.input` (forms.css) | **Não** — `.fd-comment-input` tem estilo próprio |
