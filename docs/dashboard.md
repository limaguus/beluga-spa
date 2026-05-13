# Tela: Dashboard

> **Rota:** `#/dashboard`
> **Tipo:** Privada — requer autenticação
> **Arquivo principal:** `assets/js/screens/dashboard.js`

---

## Estrutura da Tela

### Objetivo

O dashboard é a **tela central do app** — a primeira que o usuário vê após o login. Seu objetivo é dar uma visão geral do progresso acadêmico do semestre e servir como hub de navegação para todas as funcionalidades do BELUGA.

### Organização visual

```
┌──────────────────────────────────────────────────────────────┐
│  TOPBAR (sticky)                                             │
│  [Logo] BELUGA  Dashboard Matriz Quiz Plano ...   [Sair]     │
├──────────────────────────────────────────────────────────────┤
│  DASHBOARD                                                   │
│                                                              │
│  "Bem-vindo de volta, Jimmy!"                                │
│  "Suas matérias nesse semestre:"                             │
│                                                              │
│  SUBJECTS (6 cards em grid)                                  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     │
│  │ Alg. │ │Lim.  │ │ S.O. │ │Inov.*│ │Design│ │M.T.C.│     │
│  │  ○   │ │  ○   │ │  ○   │ │  ○   │ │  ○   │ │  ○   │     │
│  │ 55%  │ │ 50%  │ │ 60%  │ │ 30%  │ │ 45%  │ │ 90%  │     │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘     │
│           * destaque laranja                                 │
│                                                              │
│  CHART-AREA (gráfico de barras Chart.js)                     │
│  ┌────────────────────────────────────────┐                  │
│  │  █   █   █   █   ▂   ███              │                  │
│  │  L.D S.O Des Alg Ino MTC              │                  │
│  └────────────────────────────────────────┘                  │
│                                                              │
│  ACTIONS (8 cards em grid)                                   │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ...          │
│  │Matriz│ │Quiz  │ │Plano │ │Feed  │ │Forum │               │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘               │
└──────────────────────────────────────────────────────────────┘
```

---

## HTML

### Primeira tela privada — o que muda estruturalmente

A partir do dashboard, todas as telas têm:
- **Topbar** injetada pelo router (acima do `#app`)
- **Beluginha IA** injetada (flutuando no canto inferior direito)
- **`body.public-mode`** removida do `<body>`

```
index.html
├── div.layout
│   ├── header#topbar          ← injetado pelo router.js
│   └── main.content
│       └── div#app.container  ← aqui o dashboard é renderizado
│
└── beluginha (fora do layout, injetada separadamente)
```

### Hierarquia completa do HTML

```
main.dashboard
├── h1.dashboard-title     ← "Bem- vindo de volta, Jimmy!"
├── h2.dashboard-subtitle  ← "Suas matérias nesse semestre:"
│
├── section.subjects
│   ├── a.subject-card[href="#/aulas?materia=algoritmos"]
│   │   ├── h3             ← "Algoritmos e<br>Programação"
│   │   └── div.progress-ring-wrap
│   │       ├── svg.progress-ring
│   │       │   ├── circle.ring-bg    ← trilha cinza de fundo
│   │       │   └── circle.ring-fill  ← arco colorido de progresso
│   │       └── span.ring-label       ← "55%"
│   ├── a.subject-card [calculo]
│   ├── a.subject-card [sistemas-operacionais]
│   ├── a.subject-card.highlight [inovacao]   ← borda e título laranja
│   ├── a.subject-card [design-interfaces]
│   └── a.subject-card [metodologia]
│
├── section.chart-area
│   └── canvas#dashboard-chart   ← Chart.js renderiza aqui
│
└── section.dashboard-actions
    ├── a.action-card[href="#/matriz"]
    │   ├── svg (ícone)
    │   └── span ← "Cadastro de Matriz"
    ├── a.action-card[href="#/quiz"]
    ├── a.action-card[href="#/plano"]
    ├── a.action-card[href="#/feed"]
    ├── a.action-card[href="#/forum"]
    ├── a.action-card[href="#/notificacoes"]
    ├── a.action-card[href="#/aulas"]
    └── a.action-card[href="#/conquistas"]
```

### Classes importantes e o que representam

| Classe | Elemento | Função |
|---|---|---|
| `.dashboard` | `<main>` | Container principal com padding |
| `.dashboard-title` | `<h1>` | Saudação personalizada ao usuário |
| `.dashboard-subtitle` | `<h2>` | Subtítulo da seção de matérias |
| `.subjects` | `<section>` | Grid de 6 colunas com os cards de matérias |
| `.subject-card` | `<a>` | Card de matéria — é um link clicável |
| `.subject-card.highlight` | `<a>` | Variante laranja para matéria em destaque |
| `.progress-ring-wrap` | `<div>` | Container relativo para o SVG + label sobrepostos |
| `.progress-ring` | `<svg>` | SVG com os dois círculos do anel de progresso |
| `.ring-bg` | `<circle>` | Círculo de fundo (trilha cinza) |
| `.ring-fill` | `<circle>` | Círculo colorido que representa o progresso |
| `.ring-label` | `<span>` | Percentual centralizado sobre o anel (absolute) |
| `.chart-area` | `<section>` | Container do gráfico Chart.js |
| `#dashboard-chart` | `<canvas>` | Elemento alvo do Chart.js |
| `.dashboard-actions` | `<section>` | Grid de 8 colunas com os cards de atalho |
| `.action-card` | `<a>` | Card de ação — link para outra tela |

### Os dados mock — arrays `SUBJECTS` e `ACTIONS`

Todo o conteúdo do dashboard é gerado a partir de dois arrays definidos no topo de `dashboard.js`:

**`SUBJECTS` — 6 matérias do semestre:**

| name | id | progress | color | highlight |
|---|---|---|---|---|
| Algoritmos e Programação | `algoritmos` | 55% | `#3b9edd` | — |
| Limite e Derivada | `calculo` | 50% | `#3b9edd` | — |
| Sistemas Operacionais | `sistemas-operacionais` | 60% | `#3b9edd` | — |
| Inovação e Tecnologia | `inovacao` | 30% | `#f97316` | `true` |
| Design de Interfaces | `design-interfaces` | 45% | `#3b9edd` | — |
| M. Trabalho Científico | `metodologia` | 90% | `#a855f7` | — |

**`ACTIONS` — 8 atalhos de navegação:**

| label | rota |
|---|---|
| Cadastro de Matriz | `#/matriz` |
| Quiz Diagnóstico | `#/quiz` |
| Plano de Estudos | `#/plano` |
| Beluga Feed | `#/feed` |
| Fórum comunidade | `#/forum` |
| Notificações | `#/notificacoes` |
| Minhas aulas | `#/aulas` |
| Conquistas | `#/conquistas` |

### Como os cards são gerados — função `ringHTML()`

```javascript
function ringHTML(subject) {
  const gap = 100 - subject.progress;
  const cls = subject.highlight ? " highlight" : "";
  return `
    <a class="subject-card${cls}" href="#/aulas?materia=${subject.id}">
      <h3>${subject.name}</h3>
      <div class="progress-ring-wrap">
        <svg viewBox="0 0 36 36" class="progress-ring">
          <circle class="ring-bg" cx="18" cy="18" r="15.9" .../>
          <circle class="ring-fill" cx="18" cy="18" r="15.9"
            stroke="${subject.color}"
            stroke-dasharray="${subject.progress} ${gap}"
            transform="rotate(-90 18 18)"/>
        </svg>
        <span class="ring-label">${subject.progress}%</span>
      </div>
    </a>`;
}
```

Esta função recebe um objeto de `SUBJECTS` e retorna o HTML de um card. É chamada via `SUBJECTS.map(ringHTML).join("")` — gera todos os 6 cards de uma vez.

### Navegação por query string nos cards de matéria

```html
<a class="subject-card" href="#/aulas?materia=algoritmos">
```

Os cards de matéria não navegam para `#/aulas` simplesmente — eles passam o `id` da matéria como query string (`?materia=algoritmos`). Isso permite que a tela de Aulas saiba qual matéria foi selecionada ao ser carregada.

### `&shy;` em "Notificações"

```javascript
label: "Notifi&shy;cações",
```

O `&shy;` é a entidade HTML para **soft hyphen** (hífen condicional). O browser só insere o hífen e quebra a palavra se necessário para caber no espaço. É uma técnica de tipografia para evitar overflow em containers estreitos.

---

## CSS

### Arquivos que estilizam esta tela

```
main.css
 └── base/variables.css        ← --muted, --text, --primary, --container
 └── base/reset.css
 └── base/global.css
 └── layout/page-layout.css    ← .layout, .content, .container
 └── layout/topbar.css         ← .topbar, .topnav, .topbar-logout
 └── pages/dashboard.css       ← estilos exclusivos do dashboard
```

### Classes de layout

#### `.dashboard` — container principal

```css
.dashboard {
  padding: 32px 40px;
}
```

Padding generoso (32px vertical, 40px horizontal) para dar espaço ao conteúdo. A largura máxima é herdada do `.container` (`max-width: 1500px`) definido em `page-layout.css`.

#### `.subjects` — grid de matérias

```css
.subjects {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 14px;
  margin-bottom: 32px;
}
```

`repeat(6, 1fr)` cria exatamente 6 colunas de igual largura — uma por matéria. Se a tela for estreita, os cards não se adaptam automaticamente (sem responsividade definida neste grid).

#### `.subject-card` — cada card de matéria

```css
.subject-card {
  background: #080e22;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 18px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  color: inherit;   /* herda a cor do pai — não fica azul como link padrão */
}
```

O card é um `<a>` (link), mas `text-decoration: none` e `color: inherit` removem o visual padrão de link. Ele parece um card comum mas é clicável e navegável.

#### `.subject-card.highlight` — matéria em atenção

```css
.subject-card.highlight {
  border-color: #f97316;   /* borda laranja */
}
.subject-card.highlight h3 {
  color: #f97316;          /* título laranja */
}
```

Inovação e Tecnologia (30% de progresso) recebe esta classe. A borda e o título ficam laranja como alerta visual de que é a matéria mais atrasada.

#### `.dashboard-actions` — grid de ações

```css
.dashboard-actions {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 12px;
}
```

8 colunas iguais, uma por atalho. Assim como o grid de matérias, sem responsividade explícita.

#### `.chart-area` — área do gráfico

```css
.chart-area {
  max-width: 780px;
  margin: 0 auto 32px;
}
```

O gráfico é centralizado e tem largura máxima de 780px — não ocupa a largura total da tela para manter legibilidade.

---

### Como funciona o anel de progresso (SVG)

O anel circular é uma técnica pura de SVG sem biblioteca externa:

```html
<svg viewBox="0 0 36 36" class="progress-ring">
  <!-- Trilha de fundo (círculo completo cinza) -->
  <circle class="ring-bg" cx="18" cy="18" r="15.9"
    fill="none" stroke-width="3"/>

  <!-- Arco de progresso (parte colorida) -->
  <circle class="ring-fill" cx="18" cy="18" r="15.9"
    fill="none" stroke="#3b9edd" stroke-width="3"
    stroke-dasharray="55 45"
    transform="rotate(-90 18 18)"/>
</svg>
```

**Como `stroke-dasharray` desenha o arco:**

O círculo tem raio `15.9`. A circunferência total é `2 × π × 15.9 ≈ 99.9` — praticamente 100 unidades. Isso é intencional: permite usar diretamente o valor de progresso em porcentagem como comprimento do traço.

- `stroke-dasharray="55 45"` → traço de 55 unidades (preenchido) + espaço de 45 (vazio)
- Para 90%: `stroke-dasharray="90 10"`
- Para 30%: `stroke-dasharray="30 70"`

O cálculo em JavaScript: `const gap = 100 - subject.progress`.

**Por que `transform="rotate(-90 18 18)"`:**

Por padrão, o SVG começa o traço no ponto da direita (3 horas). O `rotate(-90 18 18)` gira o ponto de início para o topo (12 horas), que é o comportamento esperado para um indicador de progresso.

**O label centralizado:**

```css
.ring-label {
  position: absolute;
  inset: 0;         /* equivale a top:0; right:0; bottom:0; left:0 */
  display: flex;
  align-items: center;
  justify-content: center;
}
```

O `position: absolute` funciona porque `.progress-ring-wrap` tem `position: relative`. `inset: 0` estica o span para ocupar todo o container, e o `flex` centraliza o texto.

---

### Classes de cores

| Classe / Propriedade | Valor | Uso |
|---|---|---|
| `.dashboard-title` color | `#7c6ef8` | Roxo/lilás na saudação |
| `.dashboard-subtitle` color | `var(--muted)` = `#cbd5e1` | Cinza claro no subtítulo |
| `.subject-card` background | `#080e22` | Fundo escuro dos cards |
| `.subject-card.highlight` border | `#f97316` | Borda laranja na matéria em alerta |
| `.ring-bg` stroke | `rgba(255,255,255,0.08)` | Trilha cinza quase invisível |
| `.ring-fill` stroke | `subject.color` (inline) | Cor do arco — azul, laranja ou roxo |
| `.action-card svg` color | `var(--primary)` = `#2b719c` | Ícones azuis nos cards de ação |
| `.topbar` background | `rgba(8,14,26,0.97)` | Fundo escuro semitransparente |
| `.topnav a.active` color | `#7bc8f0` | Azul claro no link ativo da topbar |
| `.topbar-logout:hover` color | `#ef4444` | Vermelho ao hovear o botão Sair |

---

### Classes de animação

#### Hover nos cards de matéria

```css
.subject-card:hover {
  transform: translateY(-3px);
  border-color: rgba(59,158,221,0.5);
  box-shadow: 0 6px 20px rgba(59,158,221,0.13);
}
```

#### Hover nos cards de ação

```css
.action-card:hover {
  transform: translateY(-3px);
  border-color: rgba(59,158,221,0.45);
  box-shadow: 0 6px 18px rgba(59,158,221,0.12);
}
```

Ambos sobem 3px com borda e sombra azuis. Transição de `0.2s ease`.

---

### A Topbar — componente global das telas privadas

A topbar não é renderizada por `dashboard.js`. É injetada pelo `router.js` antes de renderizar qualquer tela privada:

```javascript
// router.js
function injectTopbar() {
  if (document.getElementById("topbar")) return;  // não duplica
  const layout = document.querySelector(".layout");
  layout.insertAdjacentHTML("afterbegin", TOPBAR_HTML);
  document.getElementById("btn-logout").onclick = () => {
    logout();
    window.location.hash = "#/landing";
  };
}
```

**Comportamento `sticky`:**

```css
.topbar {
  position: sticky;
  top: 0;
  z-index: 500;
  height: 62px;
  backdrop-filter: blur(14px);
}
```

A topbar fica fixada no topo ao rolar a página (`position: sticky`). O `backdrop-filter: blur(14px)` aplica desfoque no conteúdo que passa por baixo dela. `z-index: 500` garante que fique acima de qualquer conteúdo.

**Link ativo na topbar:**

```javascript
// router.js — após renderizar cada tela
document.querySelectorAll("[data-route]").forEach((link) => {
  link.classList.toggle("active", link.dataset.route === routeName);
});
```

O router compara o `data-route` de cada link com a rota atual e adiciona a classe `active`. O CSS aplica fundo e cor azul ao link ativo.

---

## JavaScript

### Arquivos que afetam esta tela

| Arquivo | Responsabilidade |
|---|---|
| `assets/js/app.js` | Registra a rota `"dashboard"` |
| `assets/js/router.js` | Injeta topbar e Beluginha, renderiza a tela |
| `assets/js/screens/dashboard.js` | `SUBJECTS`, `ACTIONS`, `ringHTML()`, `dashboardScreen()`, `dashboardInit()` |
| `assets/js/screens/beluginha.js` | Injetado pelo router — flutua sobre o dashboard |
| CDN: `chart.js` | Carregado via `<script>` no `index.html` |

---

### `dashboardScreen()` — função de renderização

```javascript
export function dashboardScreen() {
  const subjectCards = SUBJECTS.map(ringHTML).join("");
  const actionCards = ACTIONS.map(
    (a) => `<a class="action-card" href="${a.route}">${a.icon}<span>${a.label}</span></a>`
  ).join("");

  return `
    <main class="dashboard">
      <h1 class="dashboard-title">Bem- vindo de volta, Jimmy!</h1>
      <h2 class="dashboard-subtitle">Suas matérias nesse semestre:</h2>
      <section class="subjects">${subjectCards}</section>
      <section class="chart-area"><canvas id="dashboard-chart"></canvas></section>
      <section class="dashboard-actions">${actionCards}</section>
    </main>`;
}
```

Usa `Array.map()` para iterar os arrays de dados e gerar HTML. O `join("")` concatena os resultados sem separador.

### `dashboardInit()` — inicialização do Chart.js

```javascript
export function dashboardInit() {
  const ctx = document.getElementById("dashboard-chart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["L. Derivada", "S. Operacionais", "Design", "Algoritmos", "Inovação", "M.T.C."],
      datasets: [{
        label: "Progresso",
        data: [50, 60, 45, 55, 30, 90],
        backgroundColor: ["#3b9edd","#3b9edd","#3b9edd","#3b9edd","#f97316","#a855f7"],
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (c) => `${c.parsed.y}%` } },
      },
      scales: {
        y: {
          min: 0, max: 100,
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "rgba(255,255,255,0.45)", callback: (v) => v + "%" },
        },
        x: {
          grid: { display: false },
          ticks: { color: "rgba(255,255,255,0.45)" },
        },
      },
    },
  });
}
```

**Decisões de configuração:**

| Opção | Valor | Efeito |
|---|---|---|
| `type: "bar"` | — | Gráfico de barras verticais |
| `legend: { display: false }` | — | Remove a legenda (não precisa, cores já explicam) |
| `tooltip callback` | `c.parsed.y + "%"` | Tooltip mostra "55%" em vez de "55" |
| `borderRadius: 6` | — | Barras com cantos arredondados |
| `borderSkipped: false` | — | Arredonda todos os cantos (não só o topo) |
| `y.min/max: 0/100` | — | Escala sempre de 0 a 100% |
| `y.grid.color` | `rgba(255,255,255,0.05)` | Linhas de grade quase invisíveis |
| `ticks.color` | `rgba(255,255,255,0.45)` | Rótulos dos eixos em branco apagado |

**Cores das barras espelham o array SUBJECTS:**

```javascript
backgroundColor: ["#3b9edd","#3b9edd","#3b9edd","#3b9edd","#f97316","#a855f7"]
//                L.Derivada  S.O.     Design    Algoritmos  Inovação  M.T.C.
```

Inovação fica laranja (baixo progresso = alerta) e M.T.C. fica roxo (alto progresso = destaque) — mesmas cores dos anéis de progresso.

**Dependência externa:**

O Chart.js é carregado via CDN no `index.html`:
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

Isso significa que `Chart` é uma variável global disponível em todo o projeto. Se o CDN falhar (sem internet), o gráfico não renderiza mas o restante do dashboard funciona.

---

### Eventos da tela

| Elemento | Evento | Ação |
|---|---|---|
| `a.subject-card` | `click` (nativo) | Navega para `#/aulas?materia={id}` |
| `a.action-card` | `click` (nativo) | Navega para a rota do atalho |
| `button#btn-logout` (topbar) | `click` | Chama `logout()` → navega para `#/landing` |
| `canvas#dashboard-chart` | `hover` | Chart.js exibe tooltip com o percentual |
| `.subject-card`, `.action-card` | `hover` | Animação CSS de elevação |

Nenhum `addEventListener` é registrado manualmente para os cards — eles usam `href` nativo no `<a>`, que funciona sem JavaScript.

---

## Fluxo da Página

### Jornada do usuário

```
Usuário faz login → hash = "#/dashboard"
       ↓
Router: logado + rota privada → OK, renderiza
       ↓
removeTopbar() → mas só se já havia uma (não duplica)
injectTopbar() → insere header#topbar no .layout
injectBeluginha() → insere o assistente IA
       ↓
dashboardScreen() → HTML injetado no #app
       ↓
Link "dashboard" na topnav recebe classe "active"
       ↓
dashboardInit() → Chart.js instanciado no canvas
       ↓
Usuário vê: saudação + 6 cards de matéria + gráfico + 8 atalhos
```

### Outros caminhos

| Ação do usuário | O que acontece |
|---|---|
| Clica em card de matéria | Navega para `#/aulas?materia={id}` |
| Clica em card de ação | Navega para a rota correspondente |
| Clica "Sair" na topbar | `logout()` → localStorage limpo → `#/landing` |
| Não logado acessa `#/dashboard` | Router redireciona para `#/landing` |
| Hover no gráfico de barras | Tooltip do Chart.js mostra "Progresso: 55%" |

---

## Componentes Importantes

### Anéis de Progresso (SVG puro)

Não usam biblioteca — são SVGs inline com `stroke-dasharray`. O truque do raio `15.9` faz a circunferência ser ~100, permitindo mapear porcentagem diretamente para comprimento de traço. É uma técnica elegante e performática.

### Gráfico de Barras (Chart.js)

Biblioteca externa carregada via CDN. Os dados do gráfico são hardcodados em `dashboardInit()` e **não são lidos do array `SUBJECTS`** — estão duplicados manualmente. Isso significa que se `SUBJECTS` for atualizado, o gráfico precisará ser atualizado separadamente.

### Topbar (componente global)

Injetada pelo router, não por `dashboard.js`. Presente em todas as telas privadas. Contém:
- Brand (logo + "BELUGA")
- Nav com 10 links (Dashboard até Perfil)
- Botão "Sair" com hover vermelho

### Beluginha IA

Também injetada pelo router. Flutua no canto inferior direito sobre o dashboard. Seu comportamento está em `assets/js/screens/beluginha.js`.

---

## Como Modificar no Futuro

### Alterar a saudação do usuário

Em `dashboard.js`, linha 90 — atualmente hardcodado:
```javascript
<h1 class="dashboard-title">Bem- vindo de volta, Jimmy!</h1>
```
Quando houver autenticação real, o nome viria do estado do usuário:
```javascript
<h1 class="dashboard-title">Bem-vindo de volta, ${user.nome}!</h1>
```

### Adicionar ou remover matérias

Editar o array `SUBJECTS` em `dashboard.js` (linhas 1–14) e atualizar manualmente os `data` e `backgroundColor` no Chart.js em `dashboardInit()` (linhas 112–130). Ambos precisam estar sincronizados.

### Alterar o progresso de uma matéria

```javascript
// Em SUBJECTS, mudar o valor de progress:
{ name: "Algoritmos...", id: "algoritmos", progress: 75, color: "#3b9edd" },
// E em dashboardInit(), atualizar o data correspondente:
data: [50, 60, 45, 75, 30, 90],  // ← posição 3 (Algoritmos)
```

### Marcar outra matéria como destaque

```javascript
// Adicionar highlight: true ao objeto em SUBJECTS:
{ name: "Design...", id: "design-interfaces", progress: 45, color: "#f97316", highlight: true },
```
E mudar `color` para `#f97316` (laranja) para manter consistência com o anel.

### Adicionar um novo atalho de navegação

```javascript
// Em ACTIONS, adicionar objeto:
{
  label: "Nova<br>Tela",
  route: "#/nova-tela",
  icon: `<svg ...>...</svg>`,
},
```
E ajustar o CSS: `grid-template-columns: repeat(9, 1fr)` se quiser 9 colunas.

### Alterar cores do gráfico

Em `dashboardInit()`, array `backgroundColor` — uma cor por barra na mesma ordem dos `labels`.

### Alterar cores da topbar

Em `assets/css/layout/topbar.css`:
- Fundo: `.topbar` → `background`
- Link ativo: `.topnav a.active` → `color` e `background`
- Botão Sair: `.topbar-logout:hover` → `color` e `border-color`

---

## Relação Entre Arquivos

```
index.html
├── <script src="cdn/chart.js">  ← disponível globalmente como "Chart"
└── <script> assets/js/app.js
    ├── import router.js → startRouter()
    │   ├── injectTopbar()     ← HTML da topbar definido em router.js
    │   │   └── btn-logout → logout() + hash "#/landing"
    │   └── injectBeluginha()  ← definido em beluginha.js
    └── import dashboard.js → registerRoute("dashboard", { render, init })
        ├── dashboardScreen()
        │   ├── SUBJECTS.map(ringHTML) → 6 cards SVG
        │   └── ACTIONS.map(...)       → 8 cards de ação
        └── dashboardInit()
            └── new Chart(canvas, config) → gráfico de barras

assets/css/main.css
 └── layout/topbar.css     → .topbar, .topnav, .topbar-logout
 └── layout/page-layout.css → .layout, .content, .container
 └── pages/dashboard.css   → .dashboard, .subjects, .subject-card,
                              .progress-ring-wrap, .chart-area, .dashboard-actions
```

### Componentes globais presentes nesta tela

| Componente | Presente? | Observação |
|---|---|---|
| Topbar (`#topbar`) | **Sim** | Injetada pelo router, sticky no topo |
| Beluginha IA | **Sim** | Injetada pelo router, flutuante |
| `body.public-mode` | **Não** | Removida pelo router (tela privada) |
| Chart.js | **Sim** | Global via CDN no `index.html` |

---

## Observações Técnicas

**Por que o nome está hardcodado como "Jimmy"?**
Não há sistema de perfil conectado ao estado de autenticação ainda. O `auth.js` salva apenas uma flag booleana no localStorage — não armazena o nome do usuário. Quando um backend for integrado, o nome virá de uma resposta de API ou de um objeto de usuário no estado local.

**Por que os dados do SUBJECTS e do gráfico são duplicados?**
O Chart.js é inicializado em `dashboardInit()`, que roda depois que o HTML já foi inserido. Para manter o código mais simples, os dados foram escritos diretamente na configuração do Chart. A consequência é que qualquer alteração em `SUBJECTS` precisa ser replicada manualmente em `dashboardInit()`. Uma melhoria futura seria: `data: SUBJECTS.map(s => s.progress)`.

**Por que `borderSkipped: false` no Chart.js?**
Por padrão, Chart.js não arredonda a base das barras (a borda que encosta no eixo X), para evitar que o arredondamento crie um espaço visual entre a barra e o eixo. Com `borderSkipped: false`, todas as bordas são arredondadas, dando um visual mais moderno. O resultado é que as barras pequenas (como 30%) ficam com formato de pílula.

**Por que `injectTopbar()` verifica `document.getElementById("topbar")`?**
Para evitar duplicação. O router chama `injectTopbar()` em toda troca de rota privada. Sem essa verificação, a topbar seria inserida múltiplas vezes no DOM, empilhando headers.
