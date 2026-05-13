# Tela: Notificações

> **Rota:** `#/notificacoes`
> **Tipo:** Privada — requer autenticação
> **Arquivo principal:** `assets/js/screens/notificacoes.js`

---

## Estrutura da Tela

### Objetivo

Central de avisos, lembretes e recomendações acadêmicas. O usuário pode filtrar por tipo (Lembretes, Quizzes, Fórum etc.), buscar por texto, marcar como lida e adicionar novos lembretes via modal. Dois modais são usados: um de detalhes (leitura) e um de criação (formulário).

### Organização visual

```
┌──────────────────────────────────────────────────────────────────────┐
│  TOPBAR                                                              │
├──────────────────────────────────────────────────────────────────────┤
│  "Notificações"              [+ Novo lembrete]                       │
│  "Organize seus avisos..."                                           │
│                                                                      │
│  NT-TOOLBAR                                                          │
│  [🔍 Buscar por título, descrição ou matéria...]                     │
│  [Todas][Lembretes][Avisos][Quizzes][Fórum][Recomendações][Tarefas] │
│                                                                      │
│  NT-LIST                                                             │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ ●  [🔔]  Lembrete  Alta prioridade  Hoje, 23:59         •   │   │
│  │         Entrega de trabalho de Algoritmos                     │   │
│  │         "Entrega de trabalho de Algoritmos até sexta..."      │   │
│  │         [Algoritmos]                                          │   │
│  │         [Ver detalhes]  [✓ Marcar como lida]                 │   │
│  └──────────────────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ (lida — opacity 0.75)  [↻]  Atualização  Ontem, 14:00         │ │
│  │         Novo conteúdo de Programação em C                      │ │
│  │         [Ver detalhes]                                         │ │
│  └────────────────────────────────────────────────────────────────┘ │
│  ...                                                                 │
└──────────────────────────────────────────────────────────────────────┘
```

---

## HTML

### Hierarquia completa

```
div.nt-page
├── div.nt-heading
│   ├── div
│   │   ├── h1.nt-title        ← "Notificações"
│   │   └── p.nt-subtitle
│   └── button#nt-add-btn.nt-add-btn.button.button-primary
│       ├── svg (ícone +)
│       └── "Novo lembrete"
├── div.nt-toolbar
│   ├── div.nt-search-wrap
│   │   ├── svg.nt-search-icon  ← lupa (pointer-events: none)
│   │   └── input#nt-search.nt-search
│   └── div#nt-filters.nt-filters
│       └── button.nt-filter-btn[data-filter] × 7  ← renderFilters()
│           └── (.nt-filter-btn--active no filtro atual)
└── div#nt-list.nt-list
    └── article.nt-card[data-id] × N  ← renderCard() por notificação
        ├── span.nt-unread-dot  ← só se !n.read (bolinha azul no canto)
        ├── div.nt-card-icon[style=color]  ← ícone SVG do tipo
        └── div.nt-card-body
            ├── div.nt-card-meta
            │   ├── span.nt-type-badge  ← cor dinâmica por tipo
            │   ├── span.nt-prio-badge  ← só se priority = "alta" ou "media"
            │   └── span.nt-card-date  ← data, margin-left: auto
            ├── h3.nt-card-title
            ├── p.nt-card-desc
            ├── span.nt-card-subject  ← só se n.subject existe
            └── div.nt-card-actions
                ├── button.nt-btn-detail[data-action="detail"][data-id]
                └── button.nt-btn-read[data-action="read"][data-id]  ← só se !n.read
```

### Classes importantes

| Classe | Elemento | Função |
|---|---|---|
| `.nt-page` | `<div>` | Container principal, `max-width: 820px`, centralizado |
| `.nt-toolbar` | `<div>` | Busca + filtros em coluna |
| `.nt-search-wrap` | `<div>` | Wrapper relative para posicionar a lupa |
| `.nt-search-icon` | `<svg>` | Lupa posicionada via `absolute left: 13px`, `pointer-events: none` |
| `.nt-search` | `<input>` | Campo de busca com `padding-left: 38px` para dar espaço à lupa |
| `.nt-filter-btn` | `<button>` | Pill de filtro — border-radius: 99px |
| `.nt-filter-btn--active` | `<button>` | Filtro selecionado — azul |
| `.nt-card` | `<article>` | Card de notificação — `border-left: 3px solid` azul |
| `.nt-card--read` | `<article>` | Notificação lida — `opacity: 0.75`, borda esquerda neutra |
| `.nt-unread-dot` | `<span>` | Bolinha azul no canto superior direito |
| `.nt-card-icon` | `<div>` | Container quadrado 42×42px do ícone SVG |
| `.nt-type-badge` | `<span>` | Badge de tipo com cor dinâmica |
| `.nt-prio--alta` | `<span>` | Badge vermelho "Alta prioridade" |
| `.nt-prio--media` | `<span>` | Badge amarelo "Média prioridade" |
| `.nt-btn-detail` | `<button>` | "Ver detalhes" — abre modal |
| `.nt-btn-read` | `<button>` | "Marcar como lida" — desaparece após marcar |
| `.nt-empty` | `<div>` | Estado vazio — ícone + texto centralizados |

---

## CSS

### Arquivos que estilizam esta tela

```
main.css
 └── base/variables.css
 └── components/buttons.css  ← .button.button-primary (btn-add + btn-save)
 └── pages/notificacoes.css  ← todos os estilos exclusivos
```

### Card com borda esquerda colorida

```css
.nt-card {
  border-left: 3px solid rgba(59,158,221,0.5);   /* azul padrão */
}
.nt-card--read {
  border-left-color: rgba(255,255,255,0.1);        /* neutro quando lida */
  opacity: 0.75;
}
```

A borda esquerda de 3px é o indicador visual primário de notificação não lida.

### Input de busca com ícone embutido

```css
.nt-search-icon {
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;  /* cliques passam pela lupa para o input */
}
.nt-search { padding: 0 14px 0 38px; }  /* espaço para a lupa */
```

### Modais com animação

```css
.nt-overlay { animation: nt-fade 0.18s ease; }     /* backdrop fade */
.nt-modal   { animation: nt-slide 0.2s ease; }      /* modal slide up */

@keyframes nt-fade  { from { opacity: 0; } }
@keyframes nt-slide { from { transform: translateY(14px); opacity: 0; } }
```

Dois layers: o overlay (backdrop blur) aparece com fade, o modal desliza levemente para cima.

### Modal responsivo

```css
.nt-modal { width: min(480px, 92vw); }
.nt-modal--add { width: min(540px, 92vw); }
```

`min()` limita a `480px` no desktop, mas cede para `92vw` em telas menores.

### Formulário do modal de adicionar

```css
.nt-form-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
/* mobile: */
@media (max-width: 620px) { .nt-form-2col { grid-template-columns: 1fr; } }
```

Dois campos lado a lado (Matéria + Categoria, Data + Prioridade) em desktop; um por linha em mobile.

---

## JavaScript

### `NT_TYPE` — 7 tipos com cor, label e ícone SVG

| Tipo | Cor | Label |
|---|---|---|
| `lembrete` | `#f59e0b` (amarelo) | "Lembrete" |
| `aviso` | `#ef4444` (vermelho) | "Aviso" |
| `atualizacao` | `#3b9edd` (azul) | "Atualização" |
| `quiz` | `#a855f7` (roxo) | "Quiz" |
| `forum` | `#10b981` (verde) | "Fórum" |
| `recomendacao` | `#f97316` (laranja) | "Recomendação" |
| `tarefa` | `#6366f1` (índigo) | "Tarefa" |

### `_filtered()` — lógica de filtro + busca

```javascript
function _filtered() {
  return ntState.notifications.filter(n => {
    let ok = false;
    if (ntState.filter === "todas")         ok = true;
    else if (ntState.filter === "aviso")    ok = n.type === "aviso" || n.type === "atualizacao";
    else                                    ok = n.type === ntState.filter;
    if (!ok) return false;
    const term = ntState.search.toLowerCase();
    if (!term) return true;
    return n.title.toLowerCase().includes(term)
        || n.desc.toLowerCase().includes(term)
        || (n.subject || "").toLowerCase().includes(term);
  });
}
```

O filtro "Avisos" captura tanto `type === "aviso"` quanto `type === "atualizacao"` — os dois são agrupados visualmente. A busca textual filtra em título, descrição e matéria simultaneamente.

### `_openDetail(id)` e `_openAdd()` — injeção de modal

```javascript
document.querySelector(".nt-page")?.insertAdjacentHTML("beforeend", html);
```

O modal é inserido como último filho de `.nt-page` (não do `<body>`). Quando fechado:
```javascript
document.getElementById("nt-overlay")?.remove();
```

O elemento é removido completamente do DOM — não é `display:none`.

### Escuta de Escape no `document`

```javascript
document.addEventListener("keydown", function escNt(e) {
  if (e.key === "Escape") document.getElementById("nt-overlay")?.remove();
});
```

O listener é adicionado ao `document` (não ao modal) em `notificacoesInit()`. Ele nunca é removido, mas usa `getElementById("nt-overlay")?.remove()` — se não houver overlay aberto, é um no-op.

### Formatação de data no formulário

```javascript
const dateLabel = date
  ? new Date(date + "T00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
  : "agora";
```

`date + "T00:00"` force o parse como horário local (evita offset de timezone que `new Date("YYYY-MM-DD")` causaria interpretando como UTC). `toLocaleDateString("pt-BR")` com `day/month` produz `"dd/mm"`.

### `_markRead(id)`

```javascript
function _markRead(id) {
  const n = ntState.notifications.find(n => n.id === id);
  if (n) n.read = true;
  _rerenderList();
}
```

Modifica o objeto em `ntState.notifications` diretamente. `_rerenderList()` re-gera todo o `#nt-list`. O botão "Marcar como lida" desaparece do card porque `renderCard` não inclui `.nt-btn-read` quando `n.read === true`.

### Dois `_rerender` separados

```javascript
function _rerenderList()    { /* reconstrói #nt-list */ }
function _rerenderFilters() { /* reconstrói #nt-filters */ }
```

Quando o filtro muda: ambos são chamados. Quando a busca muda: apenas `_rerenderList()`. Quando `_markRead`: apenas `_rerenderList()`. Separação garante eficiência — não reconstrói os botões de filtro quando não é necessário.

### Eventos

| Elemento | Evento | Ação |
|---|---|---|
| `#nt-add-btn` | `click` | `_openAdd()` — injecta modal de criação |
| `#nt-search` | `input` | Atualiza `ntState.search`, `_rerenderList()` |
| `#nt-filters` | `click` (delegado) | Atualiza `ntState.filter`, `_rerenderFilters()` + `_rerenderList()` |
| `#nt-list` | `click` (delegado) | `detail` → `_openDetail(id)`, `read` → `_markRead(id)` |
| `document` | `keydown (Escape)` | Remove `#nt-overlay` se existir |

---

## Fluxo da Página

```
Usuário acessa #/notificacoes
       ↓
notificacoesScreen()
  ↓ _filtered() → todas as notificações (filtro = "todas", search = "")
  ↓ _filtered().map(renderCard) → 7 cards
  ↓ renderFilters() → 7 botões, "Todas" ativo
       ↓
notificacoesInit()
  ↓ listeners em add-btn, search, filters, list, document(Escape)
       ↓
Usuário filtra por "Lembretes"
  ↓ ntState.filter = "lembrete"
  ↓ _rerenderFilters() → "Lembretes" fica .active
  ↓ _rerenderList() → mostra só n.type === "lembrete"
       ↓
Usuário clica "Ver detalhes" em n1
  ↓ _openDetail("n1")
  ↓ insertAdjacentHTML(".nt-page", modal HTML)
  ↓ _bindDetailModal("n1") → registra listeners do modal
       ↓
Usuário clica "Marcar como lida" no modal
  ↓ _markRead("n1") → n1.read = true, _rerenderList()
  ↓ modal fecha, card n1 agora tem .nt-card--read
       ↓
Usuário pressiona Escape
  ↓ document keydown → nt-overlay?.remove()
```

---

## Como Modificar no Futuro

### Persistir notificações no localStorage

```javascript
const KEY = "beluga_notifications";

function saveNotifications() {
  localStorage.setItem(KEY, JSON.stringify(ntState.notifications));
}
// Chamar saveNotifications() após _markRead() e após criação
```

### Remover o listener de Escape ao sair da tela

O listener atual nunca é removido. Para evitar memory leak em SPAs:
```javascript
const escHandler = (e) => { if (e.key === "Escape") document.getElementById("nt-overlay")?.remove(); };
document.addEventListener("keydown", escHandler);
// No cleanup da rota:
document.removeEventListener("keydown", escHandler);
```

### Adicionar contagem de não lidas no topbar

```javascript
const unread = ntState.notifications.filter(n => !n.read).length;
document.querySelector(".topbar-notif-badge")?.textContent = unread;
```

---

## Relação Entre Arquivos

```
assets/js/screens/notificacoes.js
 └── NT_MOCK (local — 7 notificações)
 └── NT_TYPE (local — 7 configurações de tipo)
 └── ntState (memória de módulo — não persiste)
```

### Componentes globais

| Componente | Presente? |
|---|---|
| Topbar | **Sim** |
| Beluginha IA | **Sim** |
| `.button.button-primary` (buttons.css) | **Sim** — btn-add + btn-save |
| `.input` (forms.css) | **Não** — `.nt-input` tem estilo próprio |
