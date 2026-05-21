# Tela: Fórum

> **Rota:** `#/forum`
> **Tipo:** Privada — requer autenticação
> **Arquivo principal:** `assets/js/screens/forum.js`

---

## Estrutura da Tela

### Objetivo

O Fórum é o espaço de dúvidas acadêmicas do BELUGA. Estudantes postam perguntas e monitores (alunos de alto desempenho) respondem. Cada pergunta tem status (Aguardando / Em análise / Respondida), ações de lembrete e compartilhamento, e o usuário pode se candidatar a monitor pela sidebar. Clicar no avatar ou nome de qualquer autor (pergunta ou resposta) abre o **modal de perfil de usuário** (componente reutilizável `userProfileModal`).

### Organização visual

```
┌──────────────────────────────────────────────────────────────────────┐
│  TOPBAR                                                              │
├──────────────────────────────────────────────────────────────────────┤
│  "Fórum"                                                             │
│  "Interaja, compartilhe conhecimento..."                             │
│                                                                      │
│  FR-LAYOUT (grid: 1fr + 280px)                                      │
│  ┌────────────────────────────────────┐  ┌──────────────────────┐   │
│  │  FR-MAIN                           │  │  FR-SIDEBAR (sticky) │   │
│  │  ┌──────────────────────────────┐  │  │  [Ser Monitor]       │   │
│  │  │  COMPOSITOR                  │  │  │  Média ≥ 75%         │   │
│  │  │  [textarea pergunta]         │  │  │  30+ horas           │   │
│  │  │  [hint]          [Postar]    │  │  │  [Candidatar-se]     │   │
│  │  └──────────────────────────────┘  │  │                      │   │
│  │                                    │  │  [Estatísticas]      │   │
│  │  FR-LIST (scroll)                  │  │  18 respondidas      │   │
│  │  ┌──────────────────────────────┐  │  │  7 monitores         │   │
│  │  │ Ana Lima | Algoritmos | Ag.  │  │  │  4h resp.médio       │   │
│  │  │ "Qual a lógica da busca..."  │  │  │                      │   │
│  │  │ [Responder][Lembrete][Share] │  │  │  [Mais Perguntadas]  │   │
│  │  └──────────────────────────────┘  │  │  ● BD 12             │   │
│  │  ┌──────────────────────────────┐  │  │  ● Algoritmos 9      │   │
│  │  │ Marcos Vidal | SO | Resp.    │  │  └──────────────────────┘   │
│  │  │ "Como semáforos evitam..."   │  │                             │
│  │  │ [resposta de monitor]        │  │                             │
│  │  └──────────────────────────────┘  │                             │
│  └────────────────────────────────────┘                             │
└──────────────────────────────────────────────────────────────────────┘
```

---

## HTML

### Hierarquia completa

```
div.fr-page
├── div.fr-heading-area
│   ├── h1.fr-title       ← "Fórum"
│   └── p.fr-subtitle
└── div.fr-layout
    ├── div.fr-main
    │   ├── div.fr-composer
    │   │   ├── textarea#fr-question-input.fr-composer-textarea
    │   │   └── div.fr-composer-footer
    │   │       ├── span.fr-composer-hint  ← texto de orientação (não clicável)
    │   │       └── button#fr-post-btn.fr-post-btn.button.button-primary
    │   └── div#fr-list.fr-list
    │       └── article.fr-question[data-id]  ← renderQuestion() por pergunta
    │           ├── div.fr-q-header
    │           │   ├── div.fr-avatar[data-profile-trigger][data-user-*]  ← abre modal
    │           │   ├── div.fr-q-meta
    │           │   │   ├── span.fr-q-author[data-profile-trigger][data-user-*]  ← abre modal
    │           │   │   └── span.fr-q-time
    │           │   └── div.fr-q-tags  ← tag de matéria + badge de status
    │           ├── h3.fr-q-title
    │           ├── p.fr-q-content
    │           ├── div.fr-answers  ← só se q.answers.length > 0
    │           │   └── div.fr-answer
    │           │       ├── div.fr-avatar[data-profile-trigger][data-user-*]  ← abre modal
    │           │       └── div.fr-answer-body
    │           │           ├── div.fr-answer-meta
    │           │           │   ├── span.fr-answer-name[data-profile-trigger][data-user-*]  ← abre modal
    │           │           │   └── span.fr-monitor-badge (se aplicável)
    │           │           └── p.fr-answer-text
    │           ├── div.fr-reply-compose  ← só se q.showReply = true
    │           │   ├── input.fr-reply-input[data-id]
    │           │   └── button.fr-reply-send[data-action="send-reply"][data-id]
    │           └── div.fr-q-footer
    │               ├── span.fr-answer-count
    │               └── div.fr-q-actions
    │                   ├── button[data-action="reply"][data-id]
    │                   ├── button[data-action="reminder"][data-id]
    │                   └── button[data-action="share"][data-id]
    └── aside.fr-sidebar  ← renderSidebar()
        ├── div.fr-sidebar-card.fr-monitor-card
        │   ├── div.fr-monitor-icon
        │   ├── h4.fr-monitor-title
        │   ├── p.fr-monitor-desc
        │   ├── ul.fr-monitor-reqs × 3
        │   └── button#fr-candidate-btn.fr-candidate-btn[data-action="candidate"]
        ├── div.fr-sidebar-card  ← estatísticas
        │   ├── p.fr-card-label
        │   └── div.fr-stats-grid  ← grid 2×2 com valores numéricos
        └── div.fr-sidebar-card  ← categorias mais perguntadas
            ├── p.fr-card-label
            └── div.fr-categories
                └── div.fr-cat-item × 5  ← dot + nome + contagem
```

### Classes importantes

| Classe | Elemento | Função |
|---|---|---|
| `.fr-layout` | `<div>` | Grid `1fr 280px`, `align-items: start` |
| `.fr-list` | `<div>` | Lista de perguntas com `max-height` e scroll |
| `.fr-question` | `<article>` | Card de uma pergunta |
| `.fr-question--answered` | `<article>` | Borda verde — status "Respondida" |
| `.fr-question--analysis` | `<article>` | Borda amarela — status "Em análise" |
| `.fr-badge--answered` | `<span>` | Badge verde com ✓ |
| `.fr-badge--analysis` | `<span>` | Badge amarelo com ℹ |
| `.fr-badge--waiting` | `<span>` | Badge neutro com ⏱ |
| `.fr-action-btn` | `<button>` | Botão de ação (Responder / Lembrete / Compartilhar) |
| `.fr-action-btn--active` | `<button>` | Responder ativo — azul |
| `.fr-action-btn--reminder` | `<button>` | Lembrete ativo — amarelo |
| `.fr-action-btn--shared` | `<button>` | Compartilhado — verde |
| `.fr-reply-compose` | `<div>` | Campo de resposta de monitor (visível ao clicar Responder) |
| `.fr-monitor-badge` | `<span>` | Badge verde "MONITOR" ao lado do nome do respondente |
| `.fr-monitor-card` | `<div>` | Card azul de candidatura a monitor |
| `.fr-candidate-btn` | `<button>` | Botão "Candidatar-se" |
| `.fr-candidate-btn--done` | `<button>` | Estado após candidatura — verde, desabilitado |
| `.fr-stats-grid` | `<div>` | Grid 2×2 com as 4 estatísticas do fórum |
| `.fr-subject-tag` | `<span>` | Tag de matéria com cor dinâmica |
| `[data-profile-trigger]` | `div/span` | Presente nos avatares e nomes de autores — aciona o modal de perfil |

---

## CSS

### Arquivos que estilizam esta tela

```
main.css
 └── base/variables.css
 └── components/buttons.css  ← .button.button-primary (botão Postar)
 └── pages/forum.css         ← todos os estilos exclusivos
```

### Layout e scroll

```css
.fr-layout { display: grid; grid-template-columns: 1fr 280px; }
.fr-list { max-height: calc(100vh - 320px); overflow-y: auto; }
```

Mesmo padrão do feed: coluna principal scrollável, sidebar sticky.

### Estados visuais das perguntas

```css
.fr-question--answered { border-color: rgba(16,185,129,0.22); background: rgba(16,185,129,0.03); }
.fr-question--analysis { border-color: rgba(245,158,11,0.22); background: rgba(245,158,11,0.03); }
```

O card inteiro tem borda e fundo coloridos de acordo com o status.

### Shake na textarea

```css
@keyframes fr-shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-5px); }
  40%       { transform: translateX(5px); }
  60%       { transform: translateX(-4px); }
  80%       { transform: translateX(4px); }
}
.fr-shake {
  animation: fr-shake 0.35s ease;
  border-color: rgba(239,68,68,0.5) !important;
}
```

Diferente do `.fd-composer-input--shake` do Feed (2 keyframes), o fórum usa 5 keyframes para movimento mais errático. A borda fica vermelha durante o shake.

### Candidatura com estado permanente

```css
.fr-candidate-btn--done {
  background: rgba(16,185,129,0.15) !important;
  color: #10b981 !important;
  cursor: default;
}
```

Após candidatura, o botão vira verde e fica desabilitado. A classe `.fr-candidate-btn--done` usa `!important` para sobrescrever hover e outros modificadores.

### Responsividade

```css
/* ≤ 1100px */
.fr-layout { grid-template-columns: 1fr 240px; }

/* ≤ 820px */
.fr-layout { grid-template-columns: 1fr; }
.fr-sidebar { position: static; display: grid; grid-template-columns: repeat(2,1fr); }
.fr-list { max-height: none; overflow-y: visible; }

/* ≤ 560px */
.fr-sidebar { grid-template-columns: 1fr; }
.fr-q-tags { margin-left: 0; }
.fr-q-footer { flex-direction: column; align-items: flex-start; }
```

---

## JavaScript

### Estado do módulo

```javascript
let forumState = {
  questions: FORUM_QUESTIONS_MOCK.map(q => ({ ...q, answers: q.answers.map(a => ({ ...a })) })),
  candidated: false,
};
```

`forumState.candidated` persiste enquanto a instância de módulo existir — navegar para outra tela e voltar ao fórum preserva o estado "Candidatura enviada!". Isso acontece porque módulos ES6 são singletons no browser.

### `frSubjectTag(subject)` — cores dinâmicas

```javascript
const color = SUBJECT_COLORS[subject] || "#3b9edd";
return `<span class="fr-subject-tag" style="background:${color}18;color:${color};border-color:${color}33">${subject}</span>`;
```

`${color}18` → ~9.4% opacidade (fundo). `${color}33` → ~20% (borda). Perguntas da categoria "Geral" (novas perguntas postadas) usam `#6b7280` (cinza).

### `frStatusBadge(status)` — badge com ícone SVG

```javascript
const map = {
  "Respondida": { cls: "fr-badge--answered", icon: `<svg>...(checkmark)</svg>` },
  "Em análise": { cls: "fr-badge--analysis", icon: `<svg>...(info)</svg>` },
  "Aguardando": { cls: "fr-badge--waiting",  icon: `<svg>...(clock)</svg>` },
};
```

Cada status tem um ícone SVG embutido inline (não arquivo externo).

### `_sendReply(id)` — envio de resposta como monitor

```javascript
function _sendReply(id) {
  q.answers.push({
    id: `a-${Date.now()}`,
    author: { name: "Você (Monitor)", initials: "VO", color: "#3b9edd" },
    text,
    isMonitor: true,    // badge Monitor aparece na resposta
  });
  q.answerCount = q.answers.length;
  q.status = "Respondida";   // status muda automaticamente
  q.showReply = false;
  _rerender();
}
```

Qualquer usuário pode responder como "Monitor" — não há verificação de permissão. O status da pergunta muda para "Respondida" automaticamente ao enviar a primeira resposta.

### `_handleShare(id)` — compartilhamento irreversível

```javascript
function _handleShare(id) {
  const q = forumState.questions.find(q => q.id === id);
  if (!q || q.shared) return;  // não faz nada se já compartilhou
  q.shared = true;
  _rerender();
}
```

Diferente de like/repost (toggles), compartilhar é uma ação de mão única — `q.shared` nunca volta para `false`.

### `_postNewQuestion(text)` — cor aleatória

```javascript
const colors = ["#3b9edd","#a855f7","#f97316","#10b981","#f59e0b","#ec4899"];
const color = colors[Math.floor(Math.random() * colors.length)];
forumState.questions.unshift({
  title: text.length > 90 ? text.slice(0, 90) + "…" : text,
  content: text,
  subject: "Geral",
  status: "Aguardando",
  // ...
});
```

O avatar do novo post recebe cor aleatória da paleta. O `title` é truncado em 90 caracteres com "…" se o texto for longo.

### `_handleCandidate()` — estado persistente

```javascript
function _handleCandidate() {
  if (forumState.candidated) return;
  forumState.candidated = true;
  btn.textContent = "Candidatura enviada!";
  btn.classList.add("fr-candidate-btn--done");
  btn.disabled = true;
}
```

`forumState.candidated` persiste no módulo. Em `forumInit()`, se `forumState.candidated` for `true` ao montar a tela, o botão já aparece no estado "enviado" sem precisar de nova candidatura.

### Event delegation no `#fr-list`

```javascript
list.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const { action, id } = btn.dataset;
  if (action === "reply")      _handleReply(id);
  else if (action === "reminder") _handleReminder(id);
  else if (action === "share")    _handleShare(id);
  else if (action === "send-reply") _sendReply(id);
});
```

Um único listener no container. Quatro ações possíveis via `data-action`. O `send-reply` está no botão de envio do compose de resposta, não no rodapé do card.

### Eventos

| Elemento | Evento | Ação |
|---|---|---|
| `#fr-question-input` | `input` | Auto-resize da textarea |
| `#fr-post-btn` | `click` | Valida + `_postNewQuestion()` |
| `#fr-candidate-btn` | `click` | `_handleCandidate()` |
| `#fr-list` | `click` (delegado) | Direciona para ação pelo `data-action` |
| `#fr-list` | `keydown (Enter)` em `.fr-reply-input` | `_sendReply(id)` |
| `document` | `click` (delegado global) | `[data-profile-trigger]` → `openUserProfileModal()` — registrado por `initUserProfileModal()` |

---

## Fluxo da Página

```
Usuário acessa #/forum
       ↓
forumScreen()
  ↓ forumState.questions.map(renderQuestion) → 6 perguntas
  ↓ renderSidebar() → card monitor + stats + categorias
       ↓
forumInit()
  ↓ textarea auto-resize
  ↓ fr-post-btn: valida + postNewQuestion
  ↓ fr-candidate-btn: candidatura (ou restaura estado)
  ↓ event delegation no fr-list
       ↓
Usuário clica "Responder" em uma pergunta
  ↓ data-action="reply" → _handleReply(id)
  ↓ q.showReply = true → _rerender()
  ↓ .fr-reply-compose aparece, input.focus()
       ↓
Usuário digita resposta + Enter
  ↓ _sendReply(id)
  ↓ push em q.answers[], q.status = "Respondida"
  ↓ _rerender() → card agora tem .fr-question--answered
       ↓
Usuário clica "Candidatar-se a Monitor"
  ↓ _handleCandidate()
  ↓ forumState.candidated = true
  ↓ botão muda para "Candidatura enviada!" + verde + disabled
  (estado persiste se o usuário navegar e voltar)
```

---

## Como Modificar no Futuro

### Adicionar filtro por status

```javascript
// No forumScreen(), adicionar dropdown/tabs
// No _rerender(), filtrar:
const filtered = forumState.questions.filter(q => q.status === activeFilter || !activeFilter);
```

### Usar dados reais do usuário para monitor

```javascript
import { getUser, getUserStats } from "../state/auth.js";
const user = getUser();
const stats = getUserStats();
const isEligible = stats.quizAvg >= 75 && stats.studyHours >= 30;
```

### Persistir candidatura no localStorage

```javascript
forumState.candidated = localStorage.getItem("beluga_candidated") === "1";
// após candidatura:
localStorage.setItem("beluga_candidated", "1");
```

---

## Relação Entre Arquivos

```
assets/js/screens/forum.js
 └── import initUserProfileModal from components/userProfileModal.js
     └── cria o overlay do modal UMA vez (idempotente)
     └── registra listener global em document para [data-profile-trigger]
     └── triggers em: avatar do autor da pergunta, nome do autor, avatar do respondente, nome do respondente
 └── FORUM_QUESTIONS_MOCK (local — 6 perguntas)
 └── FORUM_STATS, FORUM_CATEGORIES, SUBJECT_COLORS (local)
 └── forumState (memória de módulo — persiste entre navegações)
```

### Componentes globais

| Componente | Presente? |
|---|---|
| Topbar | **Sim** |
| Beluginha IA | **Sim** |
| Modal de perfil (`userProfileModal`) | **Sim** — iniciado em `forumInit()` |
| `.button.button-primary` (buttons.css) | **Sim** — botão Postar |
| `.input` (forms.css) | **Não** — `.fr-reply-input` tem estilo próprio |
