# Tela: Conquistas

> **Rota:** `#/conquistas`
> **Tipo:** Privada — requer autenticação
> **Arquivo principal:** `assets/js/screens/conquistas.js`

---

## Estrutura da Tela

### Objetivo

Tela de gamificação. Exibe o perfil do usuário com barra de XP, missões ativas/concluídas, um badge de conquista em destaque com imagem de fundo e glassmorphism, e ranking semanal de pontos. O modal de compartilhamento permite copiar texto, postar no Feed ou no X (Twitter).

### Organização visual

```
┌──────────────────────────────────────────────────────────────────────┐
│  TOPBAR                                                              │
├──────────────────────────────────────────────────────────────────────┤
│  "Conquistas"                                                        │
│                                                                      │
│  CQ-PROFILE-CARD (flex row)                                          │
│  [foto] JIMMY  Nível 7 — Estudante Ninja  [████████░░ 81%]  [Share] │
│                3.240 XP      81% para nível 8      4.000 XP         │
│                                                                      │
│  CQ-LAYOUT (3 colunas: 230px + 1fr + 210px)                        │
│  ┌──────────────────┐  ┌─────────────────────────┐  ┌────────────┐  │
│  │  MISSÕES         │  │  BADGE DESTAQUE         │  │  RANKING   │  │
│  │  ✓ Compartilhe   │  │  [foto de fundo]        │  │  🥇 Maria  │  │
│  │  ✓ Foco total    │  │  [glassmorphism card]   │  │  🥈 José   │  │
│  │  ⏱ Registros 2/3│  │  🏆 (flutuando)         │  │  🥉 Jimmy← │  │
│  │  ⏱ Maratona 3.5h │  │  Selo "Quiz Mestre"     │  │     (você) │  │
│  │  ✓ Quiz rev.     │  │  +350 XP                │  │  4 André   │  │
│  │  ⏱ Fórum 0/1    │  │                         │  │  5 Juliana │  │
│  │  ✓ Plano         │  │                         │  │  6 Joaquim │  │
│  │  [+ Mais missões] │  └─────────────────────────┘  └────────────┘  │
│  └──────────────────┘                                                │
└──────────────────────────────────────────────────────────────────────┘
```

---

## HTML

### Hierarquia completa

```
div.cq-page
├── h1.cq-title  ← "Conquistas"
├── div.cq-profile-card
│   ├── img.cq-avatar  ← fotorosto.jpeg
│   ├── div.cq-profile-body
│   │   ├── div.cq-profile-top
│   │   │   ├── span.cq-profile-name   ← "JIMMY"
│   │   │   └── span.cq-profile-level  ← "Nível 7 — Estudante Ninja"
│   │   ├── div.cq-xp-track
│   │   │   └── div.cq-xp-fill[style=width:81%]
│   │   │       └── span.cq-xp-glow  ← bolinha roxa brilhante no fim da barra
│   │   └── div.cq-xp-meta
│   │       ├── span.cq-xp-val   ← "3.240 XP"
│   │       ├── span.cq-xp-pct   ← "81% para o nível 8"
│   │       └── span.cq-xp-next  ← "4.000 XP"
│   └── button#cq-share-btn.cq-share-hero.button.button-primary
└── div.cq-layout
    ├── section.cq-missions-col
    │   ├── header.cq-col-head  ← "MISSÕES" + ícone estrela
    │   ├── div.cq-missions-list
    │   │   └── div.cq-mission[.cq-mission--done?] × 7  ← renderMission()
    │   │       ├── div.cq-mission-top
    │   │       │   ├── span.cq-mission-status-icon  ← checkmark ou clock
    │   │       │   ├── span.cq-mission-title
    │   │       │   └── span.cq-mission-xp  ← "+80 XP"
    │   │       ├── p.cq-mission-desc
    │   │       └── (done: span.cq-mission-done-label) ou (active: div.cq-mbar-wrap)
    │   └── button.cq-more-btn  ← "+ Mais missões" (decorativo)
    ├── section.cq-center-col
    │   └── div.cq-showcase
    │       ├── div.cq-showcase-bg[style=background-image:fotodefundo.png]
    │       ├── div.cq-showcase-veil  ← gradiente escuro por cima da foto
    │       └── div.cq-badge-card  ← glassmorphism
    │           ├── span.cq-badge-eyebrow  ← "CONQUISTA EM DESTAQUE"
    │           ├── img.cq-badge-trophy[src=trofeu.png]  ← com animação cq-float
    │           ├── div.cq-badge-name  ← gradient text azul→roxo
    │           ├── p.cq-badge-desc
    │           └── div.cq-badge-footer
    │               ├── span.cq-badge-xp   ← "+350 XP"
    │               └── span.cq-badge-when ← "Desbloqueado há 2 dias"
    └── section.cq-ranking-col  ← sticky
        ├── header.cq-col-head  ← "RANKING"
        ├── span.cq-rank-period ← "Esta semana"
        └── div.cq-rank-list
            └── div.cq-rank-item[.cq-rank-item--me?] × 6  ← renderRankItem()
```

### Classes importantes

| Classe | Elemento | Função |
|---|---|---|
| `.cq-profile-card` | `<div>` | Card horizontal com avatar, XP e botão Share |
| `.cq-xp-track` | `<div>` | Trilha da barra de XP (8px altura) |
| `.cq-xp-fill` | `<div>` | Preenchimento — gradient azul→roxo + transição 0.9s |
| `.cq-xp-glow` | `<span>` | Bolinha roxa com glow no fim da barra |
| `.cq-layout` | `<div>` | Grid `230px 1fr 210px` |
| `.cq-missions-list` | `<div>` | Flex coluna com `max-height` e scroll |
| `.cq-mission` | `<div>` | Card de missão individual |
| `.cq-mission--done` | `<div>` | Missão concluída — borda/fundo verde |
| `.cq-si--done` | `<span>` | Ícone de status verde (checkmark) |
| `.cq-si--active` | `<span>` | Ícone de status neutro (clock) |
| `.cq-mbar-fill` | `<div>` | Barra de progresso da missão ativa |
| `.cq-showcase` | `<div>` | Container da badge com imagem de fundo |
| `.cq-showcase-bg` | `<div>` | `position: absolute` com a foto de fundo |
| `.cq-showcase-veil` | `<div>` | Gradiente escuro sobre a foto |
| `.cq-badge-card` | `<div>` | Glassmorphism — `backdrop-filter: blur(12px)` |
| `.cq-badge-trophy` | `<img>` | Troféu flutuante com `animation: cq-float` |
| `.cq-badge-name` | `<div>` | Gradient text azul→roxo |
| `.cq-ranking-col` | `<section>` | Sticky `top: 20px` |
| `.cq-rank-item--me` | `<div>` | Linha do usuário atual — fundo azul destacado |

---

## CSS

### Arquivos que estilizam esta tela

```
main.css
 └── base/variables.css
 └── components/buttons.css  ← .button.button-primary (share btn)
 └── pages/conquistas.css    ← todos os estilos exclusivos
```

### Barra de XP

```css
.cq-xp-fill {
  background: linear-gradient(90deg, #2b719c, #3b9edd, #a855f7);
  transition: width 0.9s ease;
}
.cq-xp-glow {
  position: absolute;
  right: 0;
  transform: translate(50%, -50%);
  width: 10px; height: 10px;
  background: #a855f7;
  box-shadow: 0 0 8px 3px rgba(168,85,247,0.6);
}
```

A bolinha `.cq-xp-glow` fica posicionada no extremo direito do fill via `right: 0; transform: translate(50%, -50%)`. Ela acompanha automaticamente a largura da barra.

### Showcase da badge

```css
.cq-showcase-bg {
  position: absolute; inset: 0;
  background-size: cover;
  filter: brightness(0.55) saturate(1.1);
}
.cq-showcase-veil {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(10,18,30,0.35) 0%, rgba(10,18,30,0.15) 40%, rgba(10,18,30,0.55) 100%);
}
.cq-badge-card {
  position: relative; z-index: 2;
  backdrop-filter: blur(12px);
  background: rgba(10,18,30,0.55);
}
```

Três camadas empilhadas: foto de fundo (escurecida), veil (gradiente), badge card (glassmorphism). O `z-index: 2` no card garante que fica acima das duas camadas absolutas.

### Animação do troféu

```css
@keyframes cq-float {
  0%, 100% { transform: translateY(0);    filter: drop-shadow(... azul); }
  50%       { transform: translateY(-8px); filter: drop-shadow(... roxo); }
}
.cq-badge-trophy { animation: cq-float 3.5s ease-in-out infinite; }
```

O troféu flutua 8px e alterna o glow entre azul (base) e roxo (topo). A cor do glow também anima — no ponto mais alto fica roxa, voltando à azul na posição de repouso.

### Responsividade

```css
/* ≤ 820px */
.cq-layout { grid-template-columns: 1fr 1fr; grid-template-rows: auto auto; }
.cq-center-col { grid-column: 1 / -1; order: -1; }  /* showcase vai para o topo */

/* ≤ 560px */
.cq-layout { grid-template-columns: 1fr; }
.cq-missions-list { max-height: none; overflow-y: visible; }
```

---

## JavaScript

### `XP_PCT` — calculado fora das funções

```javascript
const XP_PCT = Math.round((CQ_USER.xp / CQ_USER.xpNext) * 100);
// = Math.round(3240 / 4000 * 100) = 81
```

Constante calculada no nível de módulo, reutilizada em `conquistasScreen()` e `SHARE_TEXT`.

### `SHARE_TEXT` — texto gerado com dados do usuário

```javascript
const SHARE_TEXT = `Acabei de alcançar o Nível ${CQ_USER.level} — ${CQ_USER.levelTitle} no BELUGA e conquistei o selo ${CQ_BADGE.name}! 🐋`;
```

Usado tanto no preview do modal quanto no `navigator.clipboard.writeText()` e na URL do Twitter intent.

### `renderMission(m)` — missões com barra de progresso

```javascript
const pct = Math.round((m.progress / m.total) * 100);
const label = m.unit
  ? `${m.progress}${m.unit} / ${m.total}${m.unit}`  // "3.5h / 5h"
  : `${m.progress} / ${m.total}`;                    // "2 / 3"
```

Missões com `status: "done"` mostram label verde. Missões `"active"` mostram barra de progresso com percentual.

### `posIcon(pos)` — medalhas e números

```javascript
function posIcon(pos) {
  if (pos === 1) return "🥇";
  if (pos === 2) return "🥈";
  if (pos === 3) return "🥉";
  return `<span class="cq-rank-num">${pos}</span>`;
}
```

Posições 4+ são mostradas como número estilizado. O usuário atual tem `.cq-rank-item--me` que aplica fundo azul.

### `_rerenderModal()` — rerender do modal com estado

```javascript
function _rerenderModal() {
  document.getElementById("cq-overlay")?.remove();
  if (cqState.shareOpen) {
    document.querySelector(".cq-page")?.insertAdjacentHTML("beforeend", renderModal());
    _bindModal();
  }
}
```

`renderModal()` verifica `cqState.shareOpen` — se falso, retorna string vazia. O rerender é chamado para mudar o estado "Copiar texto" → "Copiado!" sem fechar o modal.

### Copiar texto — feedback visual

```javascript
document.getElementById("cq-copy-btn")?.addEventListener("click", () => {
  navigator.clipboard?.writeText(SHARE_TEXT).catch(() => {});
  cqState.copied = true;
  _rerenderModal();                    // botão vira "Copiado!"
  setTimeout(() => {
    cqState.copied = false;
    _rerenderModal();                  // volta para "Copiar texto"
  }, 2200);
});
```

`.catch(() => {})` silencia erros silenciosamente (ex: sem permissão de clipboard). O feedback visual dura 2.2 segundos independentemente do sucesso da cópia.

### Bug: navegação para o feed sem `#`

```javascript
document.getElementById("cq-feed-btn")?.addEventListener("click", () => {
  cqState.shareOpen = false;
  _rerenderModal();
  window.location.hash = "/feed";  // ← BUG: falta o "#"
});
```

`window.location.hash = "/feed"` define o hash como `"/feed"` (sem `#`), resultando em `http://...#/feed` — mas o router espera `#/feed`. Na prática, o hash fica `/feed` e o router não reconhece a rota. O correto seria `"#/feed"`.

### `_escHandler` — corrigido (**C5**)

```javascript
function _escHandler(e) {
  if (e.key === "Escape" && cqState.shareOpen) {
    cqState.shareOpen = false;
    _rerenderModal();
  }
}
export function conquistasInit() {
  // Remove antes de adicionar — garante apenas um handler ativo ao revisitar a tela
  document.removeEventListener("keydown", _escHandler);
  document.addEventListener("keydown", _escHandler);
}
```

Como `_escHandler` é uma referência de função fixa (escopo de módulo), `addEventListener` com a mesma referência não duplica. Mesmo assim, o `removeEventListener` preventivo foi adicionado para garantir comportamento correto em todos os cenários e alinhar com o padrão adotado em `notificacoes.js`.

### Eventos

| Elemento | Evento | Ação |
|---|---|---|
| `#cq-share-btn` | `click` | `cqState.shareOpen = true`, `_rerenderModal()` |
| `#cq-modal-close` | `click` | `cqState.shareOpen = false`, `_rerenderModal()` |
| `#cq-overlay` | `click` (no backdrop) | Fecha se `e.target.id === "cq-overlay"` |
| `#cq-copy-btn` | `click` | Copia texto, feedback 2.2s |
| `#cq-feed-btn` | `click` | Fecha modal, `window.location.hash = "/feed"` (bug) |
| `#cq-x-btn` | `click` | `window.open(twitter.com/intent/tweet...)` |
| `document` | `keydown (Escape)` | Fecha modal se `cqState.shareOpen` — handler único via remove+add (**C5**) |

---

## Fluxo da Página

```
Usuário acessa #/conquistas
       ↓
conquistasScreen()
  ↓ XP_PCT = 81%
  ↓ cq-profile-card com barra e glow
  ↓ CQ_MISSIONS.map(renderMission) → 7 missões (4 done, 3 active)
  ↓ cq-showcase com fotodefundo + glassmorphism + trofeu animado
  ↓ CQ_RANKING.map(renderRankItem) → 6 itens, Jimmy com .cq-rank-item--me
  ↓ renderModal() → "" (shareOpen = false)
       ↓
conquistasInit()
  ↓ cq-share-btn listener
  ↓ document.addEventListener("keydown", _escHandler)
       ↓
Usuário clica "Compartilhar"
  ↓ cqState.shareOpen = true
  ↓ _rerenderModal() → insere modal no DOM
  ↓ _bindModal() → registra listeners dos botões do modal
       ↓
Usuário clica "Copiar texto"
  ↓ navigator.clipboard.writeText(SHARE_TEXT)
  ↓ cqState.copied = true → "Copiado!" por 2.2s
  ↓ setTimeout: cqState.copied = false → volta para "Copiar texto"
       ↓
Usuário pressiona Escape
  ↓ _escHandler → shareOpen = false, _rerenderModal()
  ↓ modal removido do DOM
```

---

## Como Modificar no Futuro

### Corrigir o bug de navegação para o Feed

```javascript
window.location.hash = "#/feed";  // adicionar o "#"
```

### Remover o listener de Escape ao sair

```javascript
// No router, ao sair da tela de conquistas:
document.removeEventListener("keydown", _escHandler);
```

### Integrar XP real do usuário

```javascript
import { getUserXP } from "../state/gamification.js";
const { xp, xpNext, level, levelTitle } = getUserXP();
```

---

## Relação Entre Arquivos

```
assets/js/screens/conquistas.js
 └── CQ_USER, CQ_BADGE, CQ_MISSIONS, CQ_RANKING (local — hardcoded)
 └── assets/images/fotorosto.jpeg  ← avatar
 └── assets/images/trofeu.png      ← troféu da badge e do modal
 └── assets/images/fotodefundo.png ← foto de fundo do showcase
 └── SHARE_TEXT → navigator.clipboard + Twitter intent URL
```

### Componentes globais

| Componente | Presente? |
|---|---|
| Topbar | **Sim** |
| Beluginha IA | **Sim** |
| `.button.button-primary` (buttons.css) | **Sim** — botão Compartilhar |
| `.input` (forms.css) | **Não** |
