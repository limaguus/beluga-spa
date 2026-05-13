# Tela: Plano de Estudos

> **Rota:** `#/plano`
> **Tipo:** Privada — requer autenticação
> **Arquivo principal:** `assets/js/screens/planoEstudo.js`

---

## Estrutura da Tela

### Objetivo

O Plano de Estudos gera uma tabela semanal distribuindo as disciplinas cadastradas na Matriz ao longo dos dias da semana. A distribuição usa um algoritmo de prioridade por dificuldade (high → medium → low), rotacionando as matérias por índice. O plano é puramente visual — não persiste nenhum estado próprio.

### Organização visual

```
┌──────────────────────────────────────────────────────────────────┐
│  TOPBAR                                                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PLANO-HEADER-ROW                                                │
│  "Plano de Estudos"         [↺ Refazer o Plano de Estudos]      │
│  "Personalizado com base no seu diagnóstico"                     │
│                                                                  │
│  PLANO-BODY (grid: 220px + 1fr)                                  │
│  ┌────────────────────┐  ┌──────────────────────────────────┐    │
│  │  PLANO-SIDEBAR     │  │  PLANO-TABLE-WRAP                │    │
│  │  [avatar + nome]   │  │  ▔▔▔▔ (linha decorativa topo)   │    │
│  │  [legenda cores]   │  │  ┌──────────────────────────┐   │    │
│  │  [grupos por nível]│  │  │ thead                    │   │    │
│  └────────────────────┘  │  │ Dia | 1ª mat | 2ª mat | cor│   │    │
│                           │  ├──────────────────────────┤   │    │
│                           │  │ Segunda | X | Y | ● ●    │   │    │
│                           │  │ Terça   | X | Y | ● ●    │   │    │
│                           │  │ ...     | ...             │   │    │
│                           │  │ Sábado  | X | Livre| ● opcional│  │
│                           │  │ Domingo | Revisão| Livre | ● descanso│
│                           │  └──────────────────────────┘   │    │
│                           │  [ℹ Este plano é gerado...]      │    │
│                           └──────────────────────────────────┘    │
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
│   │   ├── h1.plano-title          ← "Plano de Estudos"
│   │   └── p.plano-subtitle        ← "Personalizado com base..."
│   └── button#btn-refazer.plano-refazer-btn
│       ├── svg.plano-refazer-icon  ← ícone de reload
│       └── texto "Refazer o Plano de Estudos"
└── div.plano-body
    ├── aside.plano-sidebar
    │   ├── div.plano-profile-card
    │   │   ├── div.plano-avatar-ring
    │   │   │   └── img.plano-avatar-img  ← fotorosto.jpeg
    │   │   └── div.plano-profile-info
    │   │       ├── span#plano-user-name.plano-profile-name  ← "JIMMY" (hardcoded)
    │   │       └── span.plano-profile-role  ← "ENG. SOFTWARE" (hardcoded)
    │   ├── div.plano-legend
    │   │   ├── p.plano-legend-title  ← "LEGENDA"
    │   │   └── div.plano-legend-item × 3  ← dot + label por nível
    │   └── div#plano-groups           ← pills por nível (dinâmico)
    └── div.plano-table-wrap
        ├── (::before — linha decorativa no topo via CSS)
        ├── table.plano-table
        │   ├── thead > tr
        │   │   └── th × 4  ← Dia, 1ª matéria, 2ª matéria, Nível
        │   └── tbody#plano-tbody  ← 7 linhas dinâmicas (uma por dia)
        └── p.plano-note  ← aviso de que o plano será personalizado com IA
```

### Classes importantes

| Classe | Elemento | Função |
|---|---|---|
| `.plano-header-row` | `<div>` | Flex row com título + botão Refazer, `flex-wrap: wrap` |
| `.plano-title` | `<h1>` | Gradient text branco→azul claro |
| `.plano-body` | `<div>` | Grid `220px 1fr` — sidebar fixa + tabela |
| `.plano-profile-card` | `<div>` | Card azul com avatar, nome e cargo |
| `.plano-avatar-ring` | `<div>` | Ring de gradiente ao redor do avatar |
| `.plano-legend` | `<div>` | Card com os três dots e seus labels |
| `.plano-dot` | `<span>` | Bolinha colorida com glow — inline-block 10×10px |
| `.plano-group` | `<div>` | Card de grupo de disciplinas por nível |
| `.plano-pill` | `<span>` | Badge de uma disciplina (display: block) |
| `.plano-table-wrap` | `<div>` | Container da tabela com gradiente e sombra |
| `.plano-table` | `<table>` | Tabela semanal (border-collapse: collapse) |
| `.plano-row` | `<tr>` | Linha de um dia — hover azul translúcido |
| `.plano-subject` | `<span>` | Nome da disciplina em azul `#3b9edd` |
| `.plano-cell-rest` | classe em `.plano-subject` | Estilo itálico + opaco para "Livre/descanso" |
| `.plano-cell-optional` | classe em `.plano-subject` | Estilo itálico + opaco para Sábado opcional |
| `.plano-opt-tag` | `<span>` | Badge amarelo "opcional" (Sábado) |
| `.plano-rest-tag` | `<span>` | Badge verde "descanso" (Domingo) |
| `.plano-note` | `<p>` | Rodapé com ícone SVG e aviso de IA futura |

---

## CSS

### Arquivos que estilizam esta tela

```
main.css
 └── base/variables.css
 └── pages/plano.css  ← todos os estilos exclusivos
```

### Layout principal

```css
.plano-body {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 20px;
  align-items: start;
}
```

A sidebar tem `220px` fixo. `align-items: start` evita que ela estique até a altura da tabela.

### Título com gradient text

```css
.plano-title {
  background: linear-gradient(135deg, #fff 20%, #a8d8f0 55%, rgba(59,158,221,0.75));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Técnica de gradient text: `-webkit-text-fill-color: transparent` torna o texto transparente para o background aparecer. `background-clip: text` (com prefixo webkit) recorta o gradiente no contorno das letras.

### Linha decorativa no topo da tabela

```css
.plano-table-wrap::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(59,158,221,0.55) 35%,
    rgba(123,200,240,0.8) 50%,
    rgba(59,158,221,0.55) 65%,
    transparent 100%
  );
}
```

Pseudo-elemento que cria uma linha de 2px no topo do card, com gradiente simétrico que some nas bordas (transparent → azul → branco no centro → azul → transparent). O `.plano-table-wrap` precisa de `position: relative` para o `absolute` funcionar.

### Dot colorido com glow

```javascript
// gerado no JS:
`<span class="plano-dot" style="background:${color};box-shadow:0 0 6px ${color}88"></span>`
```

```css
.plano-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
```

O glow é aplicado via `style` inline no JS. `${color}88` adiciona `88` em hex após a cor — equivale a ~53% de opacidade no canal alpha (0x88 = 136/255 ≈ 0.53).

### Estados das células secundárias

```css
.plano-subject.plano-cell-rest     { color: rgba(255,255,255,0.3); font-style: italic; }
.plano-subject.plano-cell-optional { color: rgba(255,255,255,0.35); font-style: italic; }
```

Células de "Livre ou descanso" e "Livre ou revisão" ficam em itálico e quase transparentes para indicar que não são matérias obrigatórias.

### Tags de sábado e domingo

```css
.plano-opt-tag  { background: rgba(245,158,11,0.12);  color: #f59e0b; }  /* amarelo */
.plano-rest-tag { background: rgba(34,197,94,0.1);    color: #22c55e; }  /* verde */
```

Sábado = "opcional" em amarelo. Domingo = "descanso" em verde.

### Responsividade

```css
@media (max-width: 768px) {
  .plano-body {
    grid-template-columns: 1fr;  /* sidebar vai para cima da tabela */
  }
  .plano-sidebar {
    display: grid;
    grid-template-columns: 1fr 1fr;  /* sidebar vira 2 colunas */
    gap: 12px;
  }
  .plano-profile-card {
    grid-column: 1 / -1;         /* profile ocupa a linha inteira */
    flex-direction: row;          /* avatar + texto lado a lado */
    text-align: left;
  }
}
```

Em mobile: a sidebar vai acima da tabela (grid 1 coluna), a sidebar interna vira 2 colunas e o card de perfil ocupa a linha inteira em modo horizontal.

---

## JavaScript

### Constantes

```javascript
const DAYS = ["Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"];

const LEVEL_COLORS = { high: "#ef4444", medium: "#f59e0b", low: "#22c55e" };
const LEVEL_LABELS = { high: "Maior dificuldade", medium: "Em progresso", low: "Consolidado" };
```

Três níveis com cores semânticas: vermelho (dificuldade), amarelo (progresso), verde (consolidado).

### `buildPlan(disciplines)` — algoritmo de distribuição

```javascript
const levelOf = (i) => ["high", "medium", "low"][i % 3];
```

O nível de cada disciplina é determinado pelo seu índice na lista: índice 0 = high, 1 = medium, 2 = low, 3 = high novamente, etc. **Isso é uma simulação estática** — quando a IA for integrada, o nível virá das respostas do quiz.

```javascript
const byLevel = { high: [], medium: [], low: [] };
disciplines.forEach((d, i) => byLevel[levelOf(i)].push(d));

const sorted = [...byLevel.high, ...byLevel.medium, ...byLevel.low];
```

As disciplinas são agrupadas por nível e reorganizadas com as de maior dificuldade primeiro (prioridade).

```javascript
const rows = DAYS.map((day, i) => {
  if (day === "Sábado") {
    return { day, primary: sorted[i % sorted.length], optional: true, ... };
  }
  if (day === "Domingo") {
    return { day, primary: "Revisão geral", primaryLevel: "low", rest: true, ... };
  }
  const pri = sorted[i % sorted.length];
  const sec = sorted[(i + 1) % sorted.length];
  return { day, primary: pri, secondary: sec, ... };
});
```

- Segunda a Sexta: dois estudos por dia — índice `i` e `i+1` no array `sorted` (com módulo para rotacionar)
- Sábado: uma matéria opcional + "Livre ou revisão"
- Domingo: "Revisão geral" (low) + "Livre ou descanso" (hardcoded)

### `dotHTML(level)` e `pillsHTML(list, level)`

```javascript
function dotHTML(level) {
  if (!level) return "";
  return `<span class="plano-dot" style="background:${LEVEL_COLORS[level]};box-shadow:0 0 6px ${LEVEL_COLORS[level]}88"></span>`;
}
```

```javascript
function pillsHTML(list, level) {
  const color = LEVEL_COLORS[level];
  return `
    <div class="plano-group">
      <p class="plano-group-label" style="color:${color}">${LEVEL_LABELS[level]}</p>
      <div class="plano-pills-row">
        ${list.map(d => `<span class="plano-pill" style="border-color:${color}55;color:${color}">${d}</span>`).join("")}
      </div>
    </div>`;
}
```

`${color}55` é a cor com `55` hex ao final → ~33% de opacidade para a borda.

### `planoEstudoInit()` — renderização

```javascript
// Sidebar: grupos por nível
groupsEl.innerHTML = Object.entries(byLevel)
  .filter(([, list]) => list.length)          // ignora níveis sem disciplinas
  .map(([level, list]) => pillsHTML(list, level))
  .join("");

// Tabela
tbody.innerHTML = rows.map(row => {
  const secClass = row.rest ? "plano-cell-rest" : row.optional ? "plano-cell-optional" : "";
  return `<tr class="plano-row">
    <td class="plano-td-day">${row.day}</td>
    <td><span class="plano-subject">${row.primary}</span></td>
    <td><span class="plano-subject ${secClass}">${row.secondary}</span></td>
    <td class="plano-td-dots">${dotHTML(row.primaryLevel)}${dotHTML(row.secondaryLevel)}
      ${row.optional ? '<span class="plano-opt-tag">opcional</span>' : ""}
      ${row.rest ? '<span class="plano-rest-tag">descanso</span>' : ""}
    </td>
  </tr>`;
}).join("");
```

### Eventos

| Elemento | Evento | Ação |
|---|---|---|
| `#btn-refazer` | `click` | `window.location.hash = "#/quiz"` |

---

## Fluxo da Página

```
Usuário acessa #/plano (vindo do quiz)
       ↓
planoEstudoInit() → getDisciplines() carrega do localStorage
       ↓
buildPlan(disciplines)
  ↓ levelOf(i) → ["high","medium","low"][i % 3]
  ↓ byLevel{} → agrupa por dificuldade
  ↓ sorted[] → high primeiro, depois medium, depois low
  ↓ rows[] → 7 linhas (Segunda a Domingo)
       ↓
Sidebar: pillsHTML() por nível → #plano-groups.innerHTML
       ↓
Tabela: map(rows) → #plano-tbody.innerHTML
       ↓
[opcional] Usuário clica "Refazer" → hash = "#/quiz"
```

---

## Dados Hardcoded

Dois campos na sidebar são hardcoded no HTML e nunca atualizados pelo JS:

```html
<span class="plano-profile-name" id="plano-user-name">JIMMY</span>
<span class="plano-profile-role">ENG. SOFTWARE</span>
```

O `id="plano-user-name"` existe (sugere intenção de atualizar via JS), mas `planoEstudoInit()` nunca lê nem escreve nesse elemento.

---

## Como Modificar no Futuro

### Integrar com resultado do quiz

Em `buildPlan()`, substituir `levelOf(i)` por dado vindo do estado:
```javascript
import { getQuizResult } from "../state/quiz.js";
const result = getQuizResult();  // { disciplina: "high" | "medium" | "low" }
const levelOf = (disc) => result[disc] ?? "medium";
```

### Atualizar nome/cargo na sidebar

Em `planoEstudoInit()`:
```javascript
import { getUser } from "../state/auth.js";
const user = getUser();
document.getElementById("plano-user-name").textContent = user.name.toUpperCase();
```

### Adicionar persistência de conclusão de dias

Cada linha poderia ter um checkbox:
```html
<input type="checkbox" data-day="${row.day}" class="plano-day-check">
```
```javascript
document.querySelectorAll(".plano-day-check").forEach(cb => {
  cb.addEventListener("change", () => savePlanProgress(cb.dataset.day, cb.checked));
});
```

---

## Relação Entre Arquivos

```
assets/js/screens/planoEstudo.js
 └── import getDisciplines from state/matriz.js
     └── localStorage["beluga_disciplines"]
         └── fornece as disciplinas para buildPlan()
 └── navega para: #/quiz (botão Refazer)
 └── acessado de: #/quiz (botão Finalizar)
```

### Componentes globais

| Componente | Presente? |
|---|---|
| Topbar | **Sim** |
| Beluginha IA | **Sim** |
| `.button` (buttons.css) | **Não** — botão Refazer tem estilo próprio |
| `.input` (forms.css) | **Não** |
