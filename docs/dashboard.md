# Tela: Dashboard

> **Rota:** `#/dashboard`
> **Tipo:** Privada — requer autenticação
> **Arquivo principal:** `assets/js/screens/dashboard.js`

---

## Estrutura da Tela

### Objetivo

O dashboard é a **tela central do app** — a primeira que o usuário vê após o login. Apresenta informações únicas e acionáveis: progresso real das matérias, missões ativas, posição no ranking e alerta de matéria crítica. Não duplica o menu de navegação da topbar.

### Organização visual

```
┌──────────────────────────────────────────────────────────────┐
│  TOPBAR (sticky)                                             │
│  [Logo] BELUGA  Dashboard Matriz Quiz Plano ...   [Sair]     │
├──────────────────────────────────────────────────────────────┤
│  HEADER PERSONALIZADO                                        │
│  [foto] Nível 7 — Estudante Ninja                            │
│         Bem-vindo, Jimmy        │ 53% │ #3 │ 3.240 XP        │
│  ████████░░░░░░  3.240 / 4.000 XP                           │
├────────────────────────────────┬─────────────────────────────┤
│  COLUNA PRINCIPAL              │  SIDEBAR                    │
│                                │                             │
│  PROGRESSO DO SEMESTRE         │  MISSÕES ATIVAS             │
│  Algoritmos     ████░░  55%    │  • Registros no Feed 2/3   │
│  Limite         ███░░░  50%    │  • Maratona semanal  3.5h  │
│  S. Operacionais████░░  60%    │  • Fórum             0/1   │
│  Inovação       ██░░░░  30%    │                             │
│  Design         ███░░░  45%    │  RANKING SEMANAL            │
│  Metodologia    █████░  90%    │  🥇 Maria Cláudia  752pts  │
│                                │  🥈 José Antônio   722pts  │
│  ⚠ ATENÇÃO: Inovação 30%      │  🥉 Jimmy (você)   720pts  │
│  [Ver aulas] [Fazer quiz]      │                             │
├────────────────────────────────┴─────────────────────────────┤
│  EXPLORE O BELUGA                                            │
│  ┌──── Configure Matriz ────┐ ┌── Plano Semanal ──┐ ┌─────┐  │
│  │ [▣] Adicione disciplinas │ │ [📅] Sua agenda  │ │ [👥] │  │
│  │     do seu curso →       │ │     de estudos → │ │Feed→ │  │
│  └──────────────────────────┘ └──────────────────┘ └─────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## HTML

### Hierarquia completa do HTML

```
main.dashboard
├── header.db-header
│   ├── div.db-header-left
│   │   ├── div.db-user-row
│   │   │   ├── div.db-avatar-wrap
│   │   │   │   ├── img.db-avatar         ← foto do aluno
│   │   │   │   └── span.db-avatar-badge  ← nível (badge numérico)
│   │   │   └── div.db-user-info
│   │   │       ├── p.db-eyebrow    ← "Nível 7 — Estudante Ninja"
│   │   │       └── h1.db-welcome   ← "Bem-vindo, Jimmy"
│   │   └── div.db-xp-wrap
│   │       ├── div.db-xp-bar
│   │       │   └── div.db-xp-fill  ← barra de XP animada
│   │       └── span.db-xp-label    ← "3.240 / 4.000 XP"
│   └── div.db-header-stats
│       ├── div.db-stat          ← "53% / Progresso médio"
│       ├── div.db-stat--divider ← "#3 / Ranking semanal"
│       └── div.db-stat--divider ← "3.240 / XP total"
│
├── div.db-layout (grid 2 colunas)
    ├── div.db-main
    │   ├── section.db-card  ← Progresso do semestre
    │   │   ├── h2.db-card-title
    │   │   └── div.db-subjects
    │   │       └── a.db-subject-row × 6  ← cada matéria
    │   │           ├── span.db-subject-name
    │   │           ├── div.db-subject-track
    │   │           │   └── div.db-subject-fill  ← barra animada
    │   │           └── span.db-subject-pct
    │   └── section.db-alert-card  ← matéria crítica
    │       ├── div.db-alert-icon
    │       └── div.db-alert-body
    │           ├── p.db-alert-tag     ← "Atenção necessária"
    │           ├── h3.db-alert-title  ← nome da matéria
    │           ├── p.db-alert-desc
    │           └── div.db-alert-actions
    │               ├── a.db-btn-primary  ← "Ver aulas"
    │               └── a.db-btn-ghost    ← "Fazer quiz"
    └── aside.db-sidebar
        ├── section.db-card  ← Missões ativas
        │   ├── h2.db-card-title
        │   ├── div.db-missions
        │   │   └── div.db-mission × N
        │   │       ├── div.db-mission-head
        │   │       ├── div.db-mission-track
        │   │       │   └── div.db-mission-fill  ← barra animada
        │   │       └── span.db-mission-label
        │   └── a.db-link-more  ← "Ver todas as missões →"
        └── section.db-card  ← Ranking semanal
            ├── h2.db-card-title
            ├── div.db-ranking
            │   └── div.db-rank-row × N  (.db-rank-row--me para o usuário)
            └── a.db-link-more  ← "Ver ranking completo →"
│
└── section.db-section  ← "Explore o BELUGA"
    ├── h2.db-section-title
    └── div.db-quick-actions (grid 3 colunas)
        └── a.db-qa-card × 3
            ├── div.db-qa-icon      ← ícone SVG com fundo colorido
            ├── div.db-qa-body
            │   ├── h3.db-qa-title
            │   └── p.db-qa-desc
            └── svg.db-qa-arrow     ← seta → animada no hover
```

---

## Dados Mock

### `DB_USER`

Perfil do aluno exibido no header:

```javascript
const DB_USER = {
  name: "Jimmy",
  avatar: "assets/images/fotorosto.jpeg",
  level: 7,
  levelTitle: "Estudante Ninja",
  xp: 3240,
  xpNext: 4000,
};
```

### `SUBJECTS` — 6 matérias do semestre

| name                     | id                      | progress | color     | critical |
| ------------------------ | ----------------------- | -------- | --------- | -------- |
| Algoritmos e Programação | `algoritmos`            | 55%      | `#3b9edd` | —        |
| Limite e Derivada        | `calculo`               | 50%      | `#3b9edd` | —        |
| Sistemas Operacionais    | `sistemas-operacionais` | 60%      | `#3b9edd` | —        |
| Inovação e Tecnologia    | `inovacao`              | 30%      | `#f97316` | `true`   |
| Design de Interfaces     | `design-interfaces`     | 45%      | `#3b9edd` | —        |
| Metodologia Científica   | `metodologia`           | 90%      | `#a855f7` | —        |

A matéria com `critical: true` é destacada no card de alerta laranja.

### `ACTIVE_MISSIONS` — missões em andamento

Subconjunto das missões de `conquistas.js` filtrando status `"active"`.

### `RANKING` — top 3 da semana

Exibe os 3 primeiros colocados. A linha com `isMe: true` recebe destaque azul (`.db-rank-row--me`).

### `QUICK_ACTIONS` — cards de descoberta

Array de 3 objetos que geram os cards da seção "Explore o BELUGA":

| title                           | link       | color             |
| ------------------------------- | ---------- | ----------------- |
| Configure sua Matriz Curricular | `#/matriz` | `#10b981` (verde) |
| Plano Semanal de Estudos        | `#/plano`  | `#a855f7` (roxo)  |
| Comunidade Acadêmica            | `#/feed`   | `#f59e0b` (âmbar) |

Cada objeto tem `color` (hex para borda esquerda e ícone) e `colorRgb` (RGB para `rgba()` no fundo do ícone).

---

## JavaScript

### Derivados calculados

```javascript
const XP_PCT = Math.round((DB_USER.xp / DB_USER.xpNext) * 100);
const criticalSubject = SUBJECTS.find((s) => s.critical);
const avgProgress = Math.round(
  SUBJECTS.reduce((a, s) => a + s.progress, 0) / SUBJECTS.length,
);
const myRank = RANKING.find((r) => r.isMe);
```

### Funções de renderização

| Função                | Retorna                                                   |
| --------------------- | --------------------------------------------------------- |
| `quickActionCard(qa)` | `<a class="db-qa-card">` com ícone colorido, corpo e seta |
| `subjectRow(s)`       | `<a class="db-subject-row">` com mini progress bar        |
| `missionItem(m)`      | `<div class="db-mission">` com barra e label de progresso |
| `rankRow(r)`          | `<div class="db-rank-row">` com medalha, nome e pontos    |
| `dashboardScreen()`   | HTML completo da tela                                     |
| `dashboardInit()`     | Anima todas as barras de progresso na entrada             |

### Animação de entrada (`dashboardInit`)

```javascript
export function dashboardInit() {
  requestAnimationFrame(() => {
    document.querySelectorAll("[data-width]").forEach((el) => {
      const target = el.dataset.width + "%";
      requestAnimationFrame(() => {
        el.style.transition = "width 0.7s cubic-bezier(0.4, 0, 0.2, 1)";
        el.style.width = target;
      });
    });
  });
}
```

Todas as barras (`db-subject-fill`, `db-mission-fill`, `db-xp-fill`) começam em `width: 0%` no HTML e animam para o valor real usando `data-width`. O duplo `requestAnimationFrame` garante que a transição CSS seja registrada antes do valor final ser aplicado.

### Eventos da tela

| Elemento                     | Evento           | Ação                                                  |
| ---------------------------- | ---------------- | ----------------------------------------------------- |
| `a.db-subject-row`           | `click` (nativo) | Navega para `#/aulas?materia={id}`                    |
| `a.db-btn-primary`           | `click` (nativo) | Navega para `#/aulas?materia={id}` da matéria crítica |
| `a.db-btn-ghost`             | `click` (nativo) | Navega para `#/quiz`                                  |
| `a.db-qa-card`               | `click` (nativo) | Navega para a rota do card (matriz, plano ou feed)    |
| `a.db-link-more`             | `click` (nativo) | Navega para `#/conquistas`                            |
| `button#btn-logout` (topbar) | `click`          | Chama `logout()` → `#/landing`                        |

---

## CSS

### Classes principais

| Classe                       | Elemento    | Função                                                |
| ---------------------------- | ----------- | ----------------------------------------------------- |
| `.dashboard`                 | `<main>`    | Container com padding                                 |
| `.db-header`                 | `<header>`  | Card de boas-vindas com XP e stats                    |
| `.db-eyebrow`                | `<p>`       | Nível e título do aluno em azul uppercase             |
| `.db-welcome`                | `<h1>`      | Saudação personalizada                                |
| `.db-xp-bar` / `.db-xp-fill` | `<div>`     | Barra de XP com gradiente azul→roxo                   |
| `.db-header-stats`           | `<div>`     | Flex row com 3 stats numéricos                        |
| `.db-stat--divider`          | `<div>`     | Stat com borda esquerda separadora                    |
| `.db-layout`                 | `<div>`     | Grid `1fr 320px` (coluna + sidebar)                   |
| `.db-card`                   | `<section>` | Card base: surface + border + radius                  |
| `.db-card-title`             | `<h2>`      | Label uppercase pequeno com ícone SVG                 |
| `.db-subject-row`            | `<a>`       | Grid `210px 1fr 46px` por matéria                     |
| `.db-subject-fill`           | `<div>`     | Barra colorida de progresso                           |
| `.db-alert-card`             | `<section>` | Card laranja de atenção                               |
| `.db-btn-primary`            | `<a>`       | Botão laranja sólido                                  |
| `.db-btn-ghost`              | `<a>`       | Botão transparente com borda laranja                  |
| `.db-mission`                | `<div>`     | Item de missão com barra de progresso                 |
| `.db-mission-xp`             | `<span>`    | XP em âmbar "+80 XP"                                  |
| `.db-rank-row`               | `<div>`     | Linha do ranking                                      |
| `.db-rank-row--me`           | `<div>`     | Variante azul para o usuário logado                   |
| `.db-link-more`              | `<a>`       | Link "ver mais" em azul                               |
| `.db-user-row`               | `<div>`     | Flex row com avatar + informações do usuário          |
| `.db-avatar-wrap`            | `<div>`     | Container relativo para avatar + badge de nível       |
| `.db-avatar`                 | `<img>`     | Foto circular 52px com borda gradiente azul→roxo      |
| `.db-avatar-badge`           | `<span>`    | Badge numérico no canto inferior-direito do avatar    |
| `.db-user-info`              | `<div>`     | Contém `.db-eyebrow` e `.db-welcome`                  |
| `.db-section`                | `<section>` | Wrapper da seção de ações rápidas com título          |
| `.db-section-title`          | `<h2>`      | Label uppercase 11px da seção                         |
| `.db-quick-actions`          | `<div>`     | Grid 3 colunas dos cards de descoberta                |
| `.db-qa-card`                | `<a>`       | Card horizontal com borda esquerda 3px colorida       |
| `.db-qa-icon`                | `<div>`     | Container 42px com ícone e fundo colorido translúcido |
| `.db-qa-body`                | `<div>`     | Contém título e descrição                             |
| `.db-qa-title`               | `<h3>`      | Título do card (14px, bold)                           |
| `.db-qa-desc`                | `<p>`       | Descrição (12px, muted); oculta abaixo de 640px       |
| `.db-qa-arrow`               | `<svg>`     | Seta → que desliza 3px para direita no hover          |

### Breakpoints responsivos

| Ponto      | Mudança                                                                          |
| ---------- | -------------------------------------------------------------------------------- |
| `≤ 1100px` | Layout vira 1 coluna; sidebar vira grid 2 colunas                                |
| `≤ 900px`  | Quick actions vira 2 colunas                                                     |
| `≤ 820px`  | Header vira coluna; sidebar vira 1 coluna                                        |
| `≤ 640px`  | Padding reduzido; quick actions vira 1 coluna; `.db-qa-desc` oculta; avatar 44px |

---

## Fluxo da Página

```
Usuário faz login → hash = "#/dashboard"
       ↓
Router: logado + rota privada → OK
       ↓
injectTopbar() + injectBeluginha()
       ↓
dashboardScreen() → HTML inserido no #app (barras começam em 0%)
       ↓
Link "dashboard" na topnav recebe classe "active"
       ↓
dashboardInit() → barras animam para os valores reais (0.7s ease)
       ↓
Usuário vê: header com XP + progresso das matérias + alerta + missões + ranking
```

---

## Como Modificar no Futuro

### Alterar o usuário

Editar `DB_USER` no topo de `dashboard.js`. Quando houver backend, esse objeto virá de uma chamada à API.

### Alterar progresso de uma matéria

```javascript
// Em SUBJECTS, mudar o valor de progress:
{ name: "Algoritmos...", progress: 75, ... }
```

A barra animará automaticamente para o novo valor.

### Marcar outra matéria como crítica

```javascript
{ name: "Design...", id: "design-interfaces", progress: 20, color: "#f97316", critical: true }
```

Remova `critical: true` da matéria antiga. Apenas a primeira com `critical: true` é exibida no card de alerta.

### Atualizar missões ativas

Editar o array `ACTIVE_MISSIONS`. Os valores de `progress` e `total` alimentam automaticamente a barra e o label.

### Atualizar ranking

Editar o array `RANKING`. Marcar `isMe: true` no item do usuário logado para aplicar destaque azul.

### Trocar a foto do avatar

Atualizar `DB_USER.avatar` com o novo caminho de imagem. A foto é circular com borda gradiente — qualquer imagem quadrada funciona bem.

### Adicionar ou alterar um quick action card

Editar o array `QUICK_ACTIONS`. Cada objeto requer `title`, `desc`, `link`, `color` (hex), `colorRgb` (RGB em string `"r, g, b"` para usar em `rgba()`) e `icon` (SVG inline string). A borda esquerda e o ícone usam `color`; o fundo do ícone usa `colorRgb` com opacidade 0.12.
