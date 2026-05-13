# Tela: Matriz Curricular

> **Rota:** `#/matriz`
> **Tipo:** Privada — requer autenticação
> **Arquivo principal:** `assets/js/screens/matriz.js`

---

## Estrutura da Tela

### Objetivo

A Matriz Curricular é onde o usuário cadastra as disciplinas do semestre atual. Esses dados são salvos no `localStorage` e usados por outras telas: o Quiz usa as disciplinas para montar as perguntas, e o Plano de Estudos usa para gerar a tabela semanal.

### Organização visual

```
┌──────────────────────────────────────────────────────────┐
│  TOPBAR                                                  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  MATRIZ-GRID (duas colunas)                              │
│  ┌──────────────────────────┐  ┌────────────────────┐    │
│  │  MATRIZ-LEFT             │  │  MATRIZ-RIGHT      │    │
│  │  "Cadastrar Matriz       │  │  Mascote Beluga    │    │
│  │   Curricular"            │  │  (flutuando com    │    │
│  │                          │  │   sombra azul)     │    │
│  │  Disciplinas             │  │                    │    │
│  │  [input........] [+]     │  │                    │    │
│  │                          │  │                    │    │
│  │  [chip x] [chip x] ...   │  │                    │    │
│  │                          │  │                    │    │
│  │  [Responder Quiz]        │  │                    │    │
│  └──────────────────────────┘  └────────────────────┘    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

A tela é centralizada verticalmente via `min-height: calc(100vh - 60px)` e `align-items: center`.

---

## HTML

### Hierarquia completa

```
main.matriz
└── div.matriz-grid
    ├── div.matriz-left
    │   ├── div.matriz-header
    │   │   ├── h1.matriz-title    ← "Cadastrar Matriz Curricular"
    │   │   └── p.matriz-subtitle  ← instrução sobre quiz
    │   └── div.matriz-form
    │       ├── span.matriz-label  ← "Disciplinas"
    │       ├── div.matriz-input-row
    │       │   ├── input#discipline-input.input.matriz-input
    │       │   └── button#btn-add-discipline.btn-add  ← ícone "+"
    │       ├── div#discipline-chips.chips-area  ← chips dinâmicos
    │       ├── p#matriz-error.matriz-error.hidden  ← mensagem de erro
    │       └── button#btn-go-quiz.button.matriz-quiz-btn
    └── div.matriz-right
        └── img.matriz-beluga  ← BELUGA.png
```

### Classes importantes

| Classe | Elemento | Função |
|---|---|---|
| `.matriz` | `<main>` | Wrapper com padding e centralização |
| `.matriz-grid` | `<div>` | Grid de 2 colunas iguais |
| `.matriz-input-row` | `<div>` | Input + botão `+` lado a lado |
| `.chips-area` | `<div>` | Área onde os chips aparecem (flex wrap) |
| `.chip` | `<span>` | Badge de uma disciplina adicionada |
| `.chip-remove` | `<button>` | Botão `×` dentro do chip |
| `.matriz-error` | `<p>` | Mensagem de erro — toggled via `.hidden` |
| `.btn-add` | `<button>` | Botão quadrado azul com ícone SVG `+` |
| `.matriz-quiz-btn` | `<button>` | Botão principal de conversão |

### A classe `.hidden`

```html
<p id="matriz-error" class="matriz-error hidden">
```

A classe `.hidden` provavelmente vem do `reset.css` ou `global.css` como `display: none`. O JS a adiciona e remove via `classList.add/remove("hidden")` para mostrar/ocultar o erro de validação.

---

## CSS

### Arquivos que estilizam esta tela

```
main.css
 └── base/variables.css
 └── components/forms.css    ← .input (base dos campos)
 └── components/buttons.css  ← .button (base do botão quiz)
 └── pages/matriz.css        ← estilos exclusivos
```

### Layout

```css
.matriz {
  padding: 32px 40px;
  min-height: calc(100vh - 60px);   /* 60px = altura da topbar */
  display: flex;
  align-items: center;              /* centraliza verticalmente */
}

.matriz-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}
```

### Input estilizado

```css
.matriz-input {
  background: rgba(43,113,156,0.12);   /* fundo azul semi-transparente */
  border: 1px solid rgba(43,113,156,0.55);
}
.matriz-input:focus {
  border-color: rgba(59,158,221,0.8);
}
```

O input da matriz tem um fundo azulado diferente dos outros inputs do sistema (que usam `#0f172a` ou fundo transparente).

### Animação dos chips

```css
@keyframes chipIn {
  from { opacity: 0; transform: scale(0.88); }
  to   { opacity: 1; transform: scale(1); }
}
.chip { animation: chipIn 0.15s ease; }
```

Cada chip entra com micro-animação de escala ao ser criado. Duração de 0,15s — rápida o suficiente para não atrapalhar o fluxo.

### Botão `+` (`.btn-add`)

```css
.btn-add:hover {
  background: #3b9edd;
  transform: scale(1.06);
}
```

O botão cresce 6% e clareia ao ser hovereado.

### Mascote — animação própria

```css
@keyframes floatBeluga {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}
.matriz-beluga {
  animation: floatBeluga 4s ease-in-out infinite;
  filter: drop-shadow(0 0 48px rgba(43,113,156,0.4));
}
```

Esta tela define `@keyframes floatBeluga` — diferente do `@keyframes float` das telas públicas. Amplitude menor (-12px vs -18/20px) e duração menor (4s vs 5.5s) — o mascote flutua mais rápido e com menos altura.

---

## JavaScript

### Arquivos que afetam esta tela

| Arquivo | Responsabilidade |
|---|---|
| `assets/js/screens/matriz.js` | Toda a lógica da tela |
| `assets/js/state/matriz.js` | Persistência em localStorage |

### `state/matriz.js` — o estado persistente

```javascript
const KEY = "beluga_disciplines";

export function getDisciplines() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch { return []; }
}
export function saveDisciplines(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}
export function clearDisciplines() {
  localStorage.removeItem(KEY);
}
```

Os dados são um **array de strings** serializado como JSON. O `try/catch` em `getDisciplines` previne erro se o valor no localStorage estiver corrompido.

### `matrizInit()` — fluxo detalhado

```javascript
let disciplines = getDisciplines();   // carrega do localStorage na abertura
```

**`addDiscipline()`:**
1. Lê o `input.value.trim()`
2. Se vazio → não faz nada
3. Verifica duplicata com `some()` + `toLowerCase()` (case-insensitive)
4. Se duplicata → limpa o input e retorna (sem adicionar)
5. Push no array, `saveDisciplines()`, limpa input, esconde erro, chama `renderChips()`

**`renderChips()`:**
1. Se array vazio → limpa o `chipsArea`
2. Para cada disciplina, gera `<span class="chip">` com botão de remoção
3. Atribui `data-index` no botão de remoção
4. Registra `onclick` em cada botão: `splice(index, 1)`, `saveDisciplines()`, `renderChips()`

**Botão quiz:**
1. Se `disciplines.length === 0` → mostra `#matriz-error`, foca o input, retorna
2. Se tem disciplinas → navega para `#/quiz`

### Eventos

| Elemento | Evento | Ação |
|---|---|---|
| `#btn-add-discipline` | `click` | Chama `addDiscipline()` |
| `#discipline-input` | `keydown (Enter)` | `e.preventDefault()` + `addDiscipline()` |
| `.chip-remove` (dinâmico) | `click` (via `onclick`) | Remove disciplina, salva, re-renderiza |
| `#btn-go-quiz` | `click` | Valida e navega para `#/quiz` |

---

## Fluxo da Página

```
Usuário acessa #/matriz
       ↓
matrizInit() → getDisciplines() carrega do localStorage
       ↓
renderChips() → mostra disciplinas já cadastradas (persiste entre sessões)
       ↓
input.focus() → cursor já posicionado no campo
       ↓
Usuário digita disciplina + Enter (ou clica +)
       ↓
addDiscipline() → push + save + renderChips()
       ↓
Chip aparece com animação chipIn
       ↓
Usuário clica "Responder Quiz de Diagnóstico"
       ↓
Se sem disciplinas → mensagem de erro laranja aparece
Se com disciplinas → hash = "#/quiz"
```

---

## Como Modificar no Futuro

### Alterar textos

| O que | Onde | Linha |
|---|---|---|
| Título "Cadastrar Matriz..." | `matriz.js` → `h1.matriz-title` | linha 13 |
| Subtítulo instrução | `matriz.js` → `p.matriz-subtitle` | linhas 14–17 |
| Texto do botão quiz | `matriz.js` → `button#btn-go-quiz` | linha 42 |
| Mensagem de erro | `matriz.js` → `p#matriz-error` | linha 38 |
| Label "Disciplinas" | `matriz.js` → `span.matriz-label` | linha 21 |

### Adicionar limite máximo de disciplinas

Em `addDiscipline()`, antes do `push`:
```javascript
if (disciplines.length >= 10) { /* mostrar aviso */ return; }
```

### Alterar a persistência

Toda a lógica de save/load está em `state/matriz.js`. Para migrar para uma API:
```javascript
export async function saveDisciplines(list) {
  await fetch("/api/disciplines", { method: "POST", body: JSON.stringify(list) });
}
```

---

## Relação Entre Arquivos

```
assets/js/screens/matriz.js
 └── import state/matriz.js
     └── localStorage["beluga_disciplines"]
         └── lido por: quiz.js e planoEstudo.js
```

### Componentes globais

| Componente | Presente? |
|---|---|
| Topbar | **Sim** |
| Beluginha IA | **Sim** |
| `.input` (forms.css) | **Sim** — base do campo |
| `.button` (buttons.css) | **Sim** — base do botão quiz |
