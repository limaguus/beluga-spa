# Tela: Quiz de Diagnóstico

> **Rota:** `#/quiz`
> **Tipo:** Privada — requer autenticação
> **Arquivo principal:** `assets/js/screens/quiz.js`

---

## Estrutura da Tela

### Objetivo

O Quiz recebe as disciplinas cadastradas na Matriz e gera perguntas aleatórias para diagnosticar o nível do estudante. As respostas não são corrigidas nem salvas — o quiz serve apenas como ponto de passagem para o Plano de Estudos. O botão "Finalizar" leva diretamente para `#/plano`.

### Organização visual

```
┌──────────────────────────────────────────────────────────┐
│  TOPBAR                                                  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  QUIZ-LAYOUT (duas colunas: 1fr + 120px)                 │
│  ┌────────────────────────────────────┐  ┌────────────┐  │
│  │  QUIZ-MAIN                         │  │  SIDEBAR   │  │
│  │  [título Quiz]    [beluginha]       │  │  Progresso │  │
│  │                                    │  │  [tile]    │  │
│  │  [caixa intro / boas-vindas]        │  │  [tile]    │  │
│  │                                    │  │  [tile]    │  │
│  │  PERGUNTA 1/N                      │  │  ...       │  │
│  │  ┌──────────────────────────────┐  │  │            │  │
│  │  │  texto da pergunta           │  │  └────────────┘  │
│  │  └──────────────────────────────┘  │                  │
│  │  [A] opção 1                       │                  │
│  │  [B] opção 2                       │                  │
│  │  [C] opção 3                       │                  │
│  │  [D] opção 4                       │                  │
│  │                                    │                  │
│  │  [← Anterior]    [Próxima →]        │                  │
│  │  [Finalizar e Acessar Meu Plano]   │                  │
│  │   ↑ só na última pergunta          │                  │
│  └────────────────────────────────────┘                  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

A sidebar de progresso tem `position: sticky; top: 24px` — acompanha o scroll sem se mover.

---

## HTML

### Hierarquia completa

```
main.quiz
└── div.quiz-layout
    ├── div.quiz-main
    │   ├── div.quiz-top
    │   │   ├── h1.quiz-title         ← "Quiz"
    │   │   └── img.quiz-beluga       ← BELUGA.png (decorativo)
    │   ├── div.quiz-intro-box
    │   │   └── p                     ← texto de boas-vindas fixo
    │   ├── p#quiz-counter.quiz-counter  ← "PERGUNTA 1/N"
    │   ├── div.quiz-question-card
    │   │   └── p#quiz-question-text  ← texto da pergunta atual
    │   ├── div#quiz-options.quiz-options  ← botões de opção (dinâmicos)
    │   └── div.quiz-nav
    │       ├── div.quiz-nav-row
    │       │   ├── button#btn-prev.quiz-prev-btn    ← "← Anterior"
    │       │   └── button#btn-next.quiz-next-btn    ← "Próxima →" (oculto na última)
    │       └── button#btn-finish.button.quiz-finish-btn  ← só visível na última
    └── aside.quiz-sidebar
        ├── p.quiz-sidebar-label  ← "Progresso"
        └── div#quiz-progress-bar.quiz-progress-bar  ← tiles dinâmicos
```

### Classes importantes

| Classe                    | Elemento   | Função                                                          |
| ------------------------- | ---------- | --------------------------------------------------------------- |
| `.quiz-layout`            | `<div>`    | Grid 2 colunas: `1fr 120px`                                     |
| `.quiz-main`              | `<div>`    | Coluna principal — flex column, gap 18px                        |
| `.quiz-intro-box`         | `<div>`    | Caixa azulada com texto fixo de boas-vindas                     |
| `.quiz-question-card`     | `<div>`    | Card com fundo semi-transparente para o texto da pergunta       |
| `.quiz-options`           | `<div>`    | Flex column com os botões de alternativa                        |
| `.quiz-option`            | `<button>` | Alternativa individual (A/B/C/D)                                |
| `.quiz-option.selected`   | `<button>` | Estado após seleção — borda azul mais intensa                   |
| `.option-letter`          | `<span>`   | Letra da alternativa (A, B, C, D) em azul                       |
| `.quiz-nav`               | `<div>`    | Flex column: linha prev/next acima + botão finalizar abaixo     |
| `.quiz-nav-row`           | `<div>`    | Flex row com `space-between`: prev à esquerda, next à direita   |
| `.quiz-prev-btn`          | `<button>` | Botão "← Anterior" — transparente com borda sutil               |
| `.quiz-next-btn`          | `<button>` | Botão "Próxima →" — borda azul, oculto na última pergunta       |
| `.quiz-finish-btn`        | `<button>` | Botão de finalização — gradiente azul, full width, só na última |
| `.quiz-sidebar`           | `<aside>`  | Coluna lateral sticky com tiles de progresso                    |
| `.quiz-progress-bar`      | `<div>`    | Container dos tiles — flex column, gap 3px                      |
| `.progress-tile`          | `<button>` | Tile retangular de 11px de altura por pergunta                  |
| `.progress-tile.current`  | `<button>` | Pergunta atual — azul translúcido com outline                   |
| `.progress-tile.answered` | `<button>` | Pergunta respondida — azul sólido (`#3b9edd`)                   |

---

## CSS

### Arquivos que estilizam esta tela

```
main.css
 └── base/variables.css
 └── components/buttons.css  ← .button (base do btn-finish)
 └── pages/quiz.css          ← todos os estilos exclusivos
```

### Layout

```css
.quiz-layout {
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 36px;
  align-items: start; /* sidebar se alinha ao topo, não estica */
}
```

A segunda coluna tem largura fixa de 120px para a sidebar de progresso. `align-items: start` é essencial — sem isso, a sidebar esticaria até a altura da coluna principal.

### Opções de resposta

```css
.quiz-option {
  transition:
    background 0.18s,
    border-color 0.18s,
    color 0.18s;
}
.quiz-option:hover {
  background: rgba(43, 113, 156, 0.14);
  border-color: rgba(43, 113, 156, 0.42);
}
.quiz-option.selected {
  background: rgba(43, 113, 156, 0.22);
  border-color: rgba(59, 158, 221, 0.75);
}
```

Hover e estado `.selected` usam o mesmo esquema azul com intensidades diferentes — hover é mais sutil, selecionado é mais forte.

### Tiles de progresso

```css
.progress-tile {
  background: rgba(255, 255, 255, 0.07);
} /* neutro */
.progress-tile.current {
  background: rgba(59, 158, 221, 0.38);
  outline: 1px solid...;
}
.progress-tile.answered {
  background: #3b9edd;
} /* sólido */
```

Os três estados de um tile: neutro (não visitado), atual (em andamento) e respondido (concluído). Apenas `.answered` tem cor sólida — comunica claramente o que foi feito.

### Botão Finalizar

```css
.quiz-finish-btn {
  width: 100%;
  height: 50px;
  background: linear-gradient(
    90deg,
    rgba(43, 113, 156, 0.95),
    rgba(59, 158, 221, 0.72)
  );
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.quiz-finish-btn:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}
```

Mesmo padrão do botão principal do sistema: gradiente horizontal azul escuro→claro, hover com leve elevação.

### Linha de navegação (prev + next)

```css
.quiz-nav-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quiz-prev-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.18);
  /* visibility: hidden via JS na primeira pergunta */
}

.quiz-next-btn {
  border: 1px solid rgba(59, 158, 221, 0.38);
  color: #7bc8f0;
  font-weight: 600;
  /* display: none via JS na última pergunta */
}
```

`space-between` garante prev à esquerda e next à direita sem necessidade de `margin-left: auto`. O botão de finalizar fica em linha própria abaixo (full width), controlado via `display: none / ""`.

### Beluginha no quiz

```css
.quiz-beluga {
  width: 88px;
  filter: drop-shadow(0 0 18px rgba(43, 113, 156, 0.45));
}
```

Imagem estática nesta tela — sem animação de flutuação. Só o drop-shadow azul de 18px.

---

## JavaScript

### Banco de questões (`BANK`)

```javascript
const BANK = {
  algoritmos: [
    /* 4 questões */
  ],
  sistemas: [
    /* 4 questões */
  ],
  design: [
    /* 4 questões */
  ],
  inovacao: [
    /* 4 questões */
  ],
  limite: [
    /* 4 questões */
  ],
  trabalho: [
    /* 4 questões */
  ],
};
```

Cada questão tem a estrutura:

```javascript
{ q: "texto da pergunta", opts: ["A", "B", "C", "D"], a: 2 }
//                                                       ↑ índice da resposta correta
```

O índice `a` existe no banco mas **não é usado no runtime** — o quiz não corrige as respostas.

### `matchKey(discipline)` — mapeamento fuzzy

```javascript
function matchKey(discipline) {
  const d = discipline.toLowerCase();
  if (d.includes("algoritmo") || d.includes("programa")) return "algoritmos";
  if (d.includes("sistema") && (d.includes("operac") || d.includes("so")))
    return "sistemas";
  if (d.includes("design") || d.includes("interface")) return "design";
  if (d.includes("inova")) return "inovacao";
  if (d.includes("limite") || d.includes("derivada")) return "limite";
  if (d.includes("trabalho") || d.includes("cient") || d.includes("mtc"))
    return "trabalho";
  return null; // disciplina não reconhecida → usa genericQuestions()
}
```

A comparação é case-insensitive via `.toLowerCase()`. O matching é por `includes()`, não por igualdade exata — "Algoritmos e Estruturas de Dados" encontra "algoritmo".

### `genericQuestions(discipline)` — fallback para disciplinas desconhecidas

```javascript
function genericQuestions(discipline) {
  return [
    { q: `Qual alternativa melhor descreve o objetivo central do estudo de ${discipline}?`, ... },
    { q: `Em ${discipline}, qual postura favorece um aprendizado mais eficaz?`, ... },
    { q: `Qual desafio é comum no aprendizado de ${discipline}?`, ... },
  ];
}
```

Retorna **3 perguntas genéricas** (vs 4 do banco específico) usando o nome da disciplina como interpolação. A resposta correta é sempre o índice `1` ("B") em todas as três — estudar regularmente, aplicar na prática, conectar teoria e prática.

### `shuffle(arr)` — Fisher-Yates

```javascript
function shuffle(arr) {
  const a = [...arr]; // cópia para não mutar o original
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
```

Implementação padrão Fisher-Yates. Chamada uma vez por `buildQuestions()` para embaralhar todas as questões juntas.

### `buildQuestions(disciplines)`

```javascript
function buildQuestions(disciplines) {
  const all = [];
  for (const disc of disciplines) {
    const key = matchKey(disc);
    const pool = key ? BANK[key] : genericQuestions(disc);
    pool.forEach((item) => all.push({ discipline: disc, ...item }));
  }
  return shuffle(all);
}
```

Para cada disciplina: busca no banco ou gera genéricas. Adiciona a propriedade `discipline` em cada questão (indica qual matéria originou a pergunta). Embaralha todo o conjunto no final.

### `quizInit()` — estado e renderização

```javascript
const disciplines = getDisciplines();
const questions = buildQuestions(
  disciplines.length ? disciplines : ["Conhecimentos Gerais"],
);

let current = 0;
const answers = new Array(questions.length).fill(null);
```

- `current`: índice da pergunta visível no momento
- `answers`: array de tamanho igual ao total de questões, inicializado com `null`; ao responder, armazena o índice da opção selecionada
- Fallback: se a Matriz estiver vazia, usa `"Conhecimentos Gerais"` como disciplina padrão (cai nas `genericQuestions`)

### `renderQuestion()`

```javascript
btnPrev.style.visibility = current === 0 ? "hidden" : "visible";
```

O botão anterior usa `visibility: hidden` (não `display: none`) — ocupa espaço no layout mas fica invisível na primeira pergunta. Isso evita que o botão "Finalizar" se desloque para cima ao aparecer/desaparecer.

Controle de visibilidade dos botões de navegação (chamado ao fim de cada `renderQuestion()`):

```javascript
const isLast = current === questions.length - 1;
btnPrev.style.visibility = current === 0 ? "hidden" : "visible";
btnNext.style.display = isLast ? "none" : "";
btnFinish.style.display = isLast ? "" : "none";
```

Após selecionar uma opção (sem auto-avanço):

```javascript
btn.addEventListener("click", () => {
  answers[current] = Number(btn.dataset.idx);
  optionsEl
    .querySelectorAll(".quiz-option")
    .forEach((b) => b.classList.remove("selected"));
  btn.classList.add("selected");
  renderProgress();
  // o aluno avança manualmente pelo botão "Próxima →"
});
```

A seleção atualiza apenas as classes visuais e o tile de progresso — sem re-render da pergunta e sem navegação automática.

### `renderProgress()`

```javascript
progressEl.innerHTML = questions
  .map(
    (_, i) => `
  <button class="progress-tile ${i === current ? "current" : answers[i] !== null ? "answered" : ""}"
          data-q="${i}" title="Pergunta ${i + 1}"></button>
`,
  )
  .join("");
```

Os tiles são clicáveis — o usuário pode voltar a qualquer pergunta diretamente clicando no tile. Ao clicar, `current` é atualizado e `render()` é chamado.

### Eventos

| Elemento                    | Evento  | Ação                                                                                       |
| --------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| `#quiz-options` (delegação) | `click` | Captura clique em `.quiz-option` via `closest()`, salva resposta, atualiza `.selected`, re-renderiza progresso |
| `#btn-prev`                 | `click` | `current--`, chama `render()`                                                              |
| `#btn-next`                 | `click` | `current++`, chama `render()` — visível em todas exceto a última                           |
| `#btn-finish`               | `click` | `window.location.hash = "#/plano"` — visível apenas na última pergunta                     |
| `.progress-tile` (dinâmico) | `click` | Define `current = tile.dataset.q`, chama `render()`                                        |

---

## Fluxo da Página

```
Usuário acessa #/quiz
       ↓
quizInit() → getDisciplines() carrega do localStorage
       ↓
buildQuestions() → matchKey() para cada disciplina
                  → BANK[key] ou genericQuestions(disc)
                  → spread { discipline, q, opts, a }
                  → shuffle() embaralha tudo
       ↓
render() → renderQuestion() + renderProgress()
       ↓
Usuário clica em uma opção
       ↓
answers[current] = índice selecionado
opção ganha .selected, renderProgress() → tile vira .answered
(sem avanço automático)
       ↓
Usuário clica "Próxima →" (btn-next)
       ↓
current++ → render() → próxima pergunta
       ↓
Última pergunta: btn-next some, btn-finish aparece
       ↓
Usuário clica "Finalizar e Acessar Meu Plano de Estudos"
       ↓
window.location.hash = "#/plano"
```

---

## Detalhes Técnicos

### O campo `a` (resposta correta) não é usado

O banco tem `a: 2` (índice da resposta certa) em cada questão, mas nenhuma parte do código lê esse campo após `buildQuestions()`. O quiz não exibe "certo/errado" nem calcula pontuação — é puramente diagnóstico de percepção do aluno.

### Tiles clicáveis como navegação alternativa

Além do botão "← Pergunta Anterior", o usuário pode clicar diretamente em qualquer tile na sidebar para pular para aquela pergunta. Isso permite revisitar respostas antes de finalizar.

### Listeners das opções — delegação de evento (**Q**)

Antes da Etapa 4, `renderQuestion()` registrava um `addEventListener("click", ...)` em cada botão `.quiz-option` após reconstruir o `innerHTML`. Embora o `innerHTML = ...` destrua os elementos anteriores (evitando acúmulo real), o padrão é inconsistente com o tratamento já adotado para os tiles de progresso (C3).

Corrigido na Etapa 4: o `forEach + addEventListener` foi removido de `renderQuestion()`. Um único listener de delegação foi adicionado em `quizInit()`, no container `#quiz-options`:

```javascript
// Q: delegação única no container de opções — consistente com o padrão C3 das tiles de progresso
optionsEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".quiz-option");
  if (!btn) return;
  answers[current] = Number(btn.dataset.idx);
  optionsEl.querySelectorAll(".quiz-option").forEach((b) => b.classList.remove("selected"));
  btn.classList.add("selected");
  renderProgress();
});
```

O `e.target.closest(".quiz-option")` captura cliques em qualquer filho do botão (como `<span class="option-letter">`), garantindo que o hit-area funcione corretamente.

---

### `renderProgress()` — corrigida (**C3** + **C7**)

Dois problemas corrigidos no code review:

- **C7**: variável `cls` era construída mas nunca usada (código morto) — removida.
- **C3**: listeners de clique nos tiles eram registrados a cada chamada de `renderProgress()`, acumulando dezenas de handlers. Corrigido usando **delegação de evento** no container `progressEl`, configurada uma única vez em `quizInit()`.

```javascript
// renderProgress() — apenas atualiza o HTML, sem listeners
function renderProgress() {
  progressEl.innerHTML = questions
    .map((_, i) =>
      `<button class="progress-tile ${i === current ? "current" : answers[i] !== null ? "answered" : ""}" data-q="${i}" ...></button>`
    )
    .join("");
}

// quizInit() — delegação única, registrada uma vez
progressEl.addEventListener("click", (e) => {
  const tile = e.target.closest(".progress-tile");
  if (!tile) return;
  current = Number(tile.dataset.q);
  render();
});
```

---

## Como Modificar no Futuro

### Adicionar nova disciplina ao banco

Em `BANK`, adicionar uma nova chave:

```javascript
const BANK = {
  ...
  calculo: [
    { q: "...", opts: ["A","B","C","D"], a: 0 },
    // mínimo 1 questão, ideal 4
  ],
};
```

E em `matchKey()`, adicionar a regra de match:

```javascript
if (d.includes("calculo") || d.includes("cálculo")) return "calculo";
```

### Mostrar feedback de certo/errado

Em `renderQuestion()`, após `answers[current] = Number(btn.dataset.idx)`:

```javascript
const correct = questions[current].a;
if (answers[current] === correct) {
  /* acerto */
} else {
  /* erro */
}
```

### Salvar resultado do quiz

Antes de navegar para `#/plano`, em `btnFinish.addEventListener`:

```javascript
import { saveQuizResult } from "../state/quiz.js";
saveQuizResult({ questions, answers });
window.location.hash = "#/plano";
```

O Plano de Estudos poderia então usar esses dados para calibrar as prioridades.

### Limitar uma resposta por opção (desabilitar após selecionar)

Em `renderQuestion()`, ao renderizar as opções:

```javascript
const isAnswered = answers[current] !== null;
// adicionar disabled="${isAnswered}" nos botões não selecionados
```

---

## Relação Entre Arquivos

```
assets/js/screens/quiz.js
 └── import getDisciplines from state/matriz.js
     └── localStorage["beluga_disciplines"]
         └── fornece as disciplinas que geram as perguntas
 └── buildQuestions() → BANK (local) ou genericQuestions() (local)
 └── navega para: #/plano
```

### Componentes globais

| Componente              | Presente?                    |
| ----------------------- | ---------------------------- |
| Topbar                  | **Sim**                      |
| Beluginha IA            | **Sim**                      |
| `.button` (buttons.css) | **Sim** — base do btn-finish |
| `.input` (forms.css)    | **Não**                      |
