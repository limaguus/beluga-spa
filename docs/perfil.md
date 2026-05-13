# Tela: Perfil do Aluno

> **Rota:** `#/perfil`
> **Tipo:** Privada — requer autenticação
> **Arquivo principal:** `assets/js/screens/perfil.js`

---

## Estrutura da Tela

### Objetivo

Tela de perfil editável com 4 abas: Dados Pessoais, Dados Acadêmicos, Preferências e Desempenho. O usuário pode editar campos em modo de edição (inputs aparecem no lugar dos valores), cancelar (revertendo ao estado salvo) ou salvar (com toast de confirmação). Upload de avatar via FileReader.

### Organização visual

```
┌──────────────────────────────────────────────────────────────────────┐
│  TOPBAR                                                              │
├──────────────────────────────────────────────────────────────────────┤
│  "Perfil do Aluno"                                                   │
│  "Gerencie seus dados pessoais..."                                   │
│                                                                      │
│  PF-LAYOUT (grid: 230px + 1fr)                                      │
│  ┌──────────────────────┐  ┌─────────────────────────────────────┐  │
│  │  PF-SIDEBAR          │  │  PF-MAIN                            │  │
│  │  ┌────────────────┐  │  │  [Dados Pessoais][Acadêmicos][...] │  │
│  │  │  [foto] 📷     │  │  │  ─────────────────────────────────  │  │
│  │  │  JIMMY         │  │  │  Informações Pessoais              │  │
│  │  │  Eng. Software │  │  │                                     │  │
│  │  │  4º · Noturno  │  │  │  Nome completo  E-mail             │  │
│  │  │  Univ. Ev.     │  │  │  Jimmy          jimmy@...          │  │
│  │  └────────────────┘  │  │                                     │  │
│  │  [8] [24] [7.8]      │  │  Telefone  Data nasc.              │  │
│  │  Mat.  Quiz  Média   │  │  ...       ...                     │  │
│  └──────────────────────┘  │                          [Editar]  │  │
│                             └─────────────────────────────────────┘  │
│                                                                      │
│  (toast verde no canto inferior direito ao salvar)                  │
└──────────────────────────────────────────────────────────────────────┘
```

---

## HTML

### Hierarquia completa

```
div.pf-page
├── div.pf-page-header
│   ├── h1.pf-page-title  ← "Perfil do Aluno"
│   └── p.pf-page-desc
├── div.pf-layout
│   ├── aside.pf-sidebar
│   │   ├── div.pf-avatar-card
│   │   │   ├── div#pf-avatar-wrap.pf-avatar-wrap  ← clique abre file picker
│   │   │   │   ├── img#pf-avatar-img.pf-avatar-img
│   │   │   │   ├── div.pf-avatar-overlay  ← "Alterar foto" (hover)
│   │   │   │   └── input#pf-avatar-input[type=file][accept=image/*].hidden
│   │   │   ├── div#pf-sidebar-name.pf-sidebar-name  ← atualiza ao salvar
│   │   │   ├── div#pf-sidebar-course.pf-sidebar-course  ← atualiza ao salvar
│   │   │   ├── div.pf-sidebar-meta  ← "4º Período • Noturno"
│   │   │   └── div.pf-sidebar-institution
│   │   └── div.pf-sidebar-stats  ← grid 3 colunas
│   │       └── div.pf-sidebar-stat × 3  ← Matérias, Quizzes, Média
│   └── div.pf-main
│       ├── div#pf-tabs-bar.pf-tabs-bar  ← buildTabsHTML()
│       │   └── button.pf-tab[data-tab][.active?] × 4
│       ├── div#pf-panel.pf-panel.card  ← buildPanelHTML()
│       │   └── div.pf-section
│       │       ├── div.pf-section-title
│       │       └── div.pf-grid  ← ou .pf-stats-grid (aba desempenho)
│       │           └── div.pf-field × N  ← fieldRow() / selectRow()
│       │               ├── label.pf-label
│       │               └── (modo view: div.pf-value) ou (modo edit: input.input.pf-input)
│       └── div#pf-actions.pf-actions  ← buildActionsHTML()
│           └── (view: button#btn-pf-edit) ou (edit: btn-cancel + btn-save)
└── div#pf-toast.pf-toast  ← toast fixo, fora do layout
```

### Classes importantes

| Classe | Elemento | Função |
|---|---|---|
| `.pf-layout` | `<div>` | Grid `230px 1fr` |
| `.pf-avatar-wrap` | `<div>` | Container da foto com overlay hover |
| `.pf-avatar-overlay` | `<div>` | Overlay preto 65% com ícone de câmera |
| `.pf-tabs-bar` | `<div>` | Barra de abas com `border-bottom` |
| `.pf-tab` | `<button>` | Aba individual — `border-bottom: 2px solid transparent` |
| `.pf-tab.active` | `<button>` | Aba ativa — borda inferior azul (`var(--primary)`) |
| `.pf-panel.card` | `<div>` | Painel de conteúdo — usa a classe `.card` global |
| `.pf-grid` | `<div>` | Grid 2 colunas para os campos |
| `.pf-field` | `<div>` | Par label + valor/input |
| `.pf-value` | `<div>` | Valor em modo visualização — com borda inferior |
| `.pf-input` | `<input>` ou `<select>` | Campo em modo edição — usa `.input` global |
| `.pf-stats-grid` | `<div>` | Grid 4 colunas (aba Desempenho) |
| `.pf-stat-card` | `<div>` | Card com valor grande e label |
| `.pf-toast` | `<div>` | Toast fixo (`position: fixed; bottom: 32px; right: 32px`) |
| `.pf-toast.show` | `<div>` | Toast visível — `opacity: 1; transform: translateY(0)` |

---

## CSS

### Arquivos que estilizam esta tela

```
main.css
 └── base/variables.css
 └── components/forms.css    ← .input (base dos campos em edição)
 └── components/cards.css    ← .card (base do pf-panel)
 └── components/buttons.css  ← .button, .button-ghost (ações)
 └── pages/perfil.css        ← estilos exclusivos
```

### Tabs com sublinhado ativo

```css
.pf-tabs-bar {
  border-bottom: 1px solid var(--border);
}
.pf-tab {
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;  /* sobrepõe a borda do container */
}
.pf-tab.active {
  border-bottom-color: var(--primary);
}
```

`margin-bottom: -1px` faz a borda inferior do tab ativo sobrescrever a borda do `.pf-tabs-bar`, criando o efeito de aba conectada ao painel.

### Avatar com hover overlay

```css
.pf-avatar-overlay {
  position: absolute; inset: 0;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.pf-avatar-wrap:hover .pf-avatar-overlay { opacity: 1; }
```

### Campo em modo visualização

```css
.pf-value {
  font-size: 14px;
  padding: 9px 0;
  border-bottom: 1px solid var(--border);
  min-height: 38px;
}
```

`min-height: 38px` garante que campos com valor `"—"` não colapsem visualmente.

### Toast de confirmação

```css
.pf-toast {
  position: fixed;
  bottom: 32px; right: 32px;
  transform: translateY(16px);
  opacity: 0;
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.pf-toast.show {
  opacity: 1;
  transform: translateY(0);
}
```

O toast aparece deslizando de baixo para cima via `transform`. A transição é de `opacity` + `transform` simultaneamente.

### Responsividade

```css
/* ≤ 860px */
.pf-layout { grid-template-columns: 1fr; }
.pf-sidebar { flex-direction: row; }  /* avatar-card + stats lado a lado */

/* ≤ 600px */
.pf-sidebar { flex-direction: column; }
.pf-grid { grid-template-columns: 1fr; }         /* campos em coluna única */
.pf-stats-grid { grid-template-columns: repeat(2,1fr); }
.pf-tabs-bar { overflow-x: auto; }               /* tabs fazem scroll horizontal */
.pf-toast { left: 16px; right: 16px; bottom: 16px; }  /* full-width em mobile */
```

---

## JavaScript

### Estado do módulo

```javascript
let _activeTab = "pessoal";
let _isEditing = false;
let _formData = deepClone(PERFIL_DATA);   // dados em edição (pode ser descartado)
let _savedData = deepClone(PERFIL_DATA);  // dados confirmados
```

`_formData` e `_savedData` são cópias independentes. Ao editar sem salvar e cancelar, `_formData` é sobrescrito com `deepClone(_savedData)`.

### `deepClone(obj)` — via JSON

```javascript
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
```

Serializa para JSON e desserializa — cria um objeto completamente independente sem referências compartilhadas.

### `perfilScreen()` — reset de estado a cada renderização

```javascript
export function perfilScreen() {
  _isEditing = false;
  _activeTab = "pessoal";
  // ...
}
```

Toda vez que o router chama `perfilScreen()`, o estado volta para visualização na aba pessoal. Isso garante que ao navegar para outra tela e voltar, o perfil não fica em modo de edição aberto.

### `fieldRow()` / `selectRow()` — renderização condicional

```javascript
function fieldRow(label, value, key, section, type = "text") {
  if (_isEditing) {
    return `<input class="input pf-input" data-section="${section}" data-key="${key}" value="${value}" />`;
  }
  return `<div class="pf-value">${value || "—"}</div>`;
}
```

As funções verificam `_isEditing` no momento da renderização. Inputs têm `data-section` e `data-key` para `collectFormData()` saber onde salvar o valor.

### `collectFormData()` — leitura de todos os campos ativos

```javascript
function collectFormData() {
  document.querySelectorAll(".pf-input").forEach(inp => {
    const { section, key } = inp.dataset;
    if (section && key) _formData[section][key] = inp.value;
  });
}
```

Percorre todos os elementos `.pf-input` visíveis no painel atual e atualiza `_formData`. Chamada tanto em `onSave()` quanto ao trocar de aba em modo de edição (para não perder valores digitados).

### `onSave()` — fluxo de salvar

```javascript
function onSave() {
  collectFormData();               // lê todos os inputs atuais
  _savedData = deepClone(_formData);  // confirma como "salvo"
  _isEditing = false;
  updatePanel();                   // reconstrói painel sem inputs
  updateActions();                 // reconstrói botões (só "Editar")
  updateSidebarMeta();             // atualiza nome e curso na sidebar
  showToast();                     // toast por 3000ms
}
```

### `onCancel()` — revertendo com deepClone

```javascript
function onCancel() {
  _formData = deepClone(_savedData);  // descarta edições pendentes
  _isEditing = false;
  updatePanel();
  updateActions();
}
```

### Troca de aba com coleta de dados

```javascript
document.getElementById("pf-tabs-bar")?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-tab]");
  if (!btn || btn.dataset.tab === _activeTab) return;
  if (_isEditing) collectFormData();  // preserva dados digitados ao trocar aba
  _activeTab = btn.dataset.tab;
  updateTabs();
  updatePanel();
});
```

Se o usuário está editando e clica em outra aba, os valores já digitados são coletados antes de renderizar a nova aba.

### Upload de avatar via FileReader

```javascript
document.getElementById("pf-avatar-input")?.addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const img = document.getElementById("pf-avatar-img");
    if (img) img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
});
```

`readAsDataURL` converte a imagem para Base64 e atribui ao `src` da `<img>`. Não persiste — ao recarregar, volta para `fotorosto.jpeg`.

O file picker é ativado ao clicar no `.pf-avatar-wrap` (que é visível), não no `<input type="file">` (que tem classe `.hidden`):
```javascript
document.getElementById("pf-avatar-wrap")?.addEventListener("click", () => {
  document.getElementById("pf-avatar-input")?.click();
});
```

### `showToast()` — auto-dismiss 3 segundos

```javascript
function showToast() {
  const toast = document.getElementById("pf-toast");
  if (!toast) return;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
```

### Eventos

| Elemento | Evento | Ação |
|---|---|---|
| `#pf-tabs-bar` | `click` (delegado) | Troca aba ativa, coleta form se editando |
| `#btn-pf-edit` | `click` | `onEdit()` — ativa modo de edição |
| `#btn-pf-cancel` | `click` | `onCancel()` — reverte com `deepClone(_savedData)` |
| `#btn-pf-save` | `click` | `onSave()` — salva e mostra toast |
| `#pf-avatar-wrap` | `click` | Dispara click no `#pf-avatar-input` |
| `#pf-avatar-input` | `change` | FileReader → atualiza `src` do avatar |

---

## Fluxo da Página

```
Usuário acessa #/perfil
       ↓
perfilScreen()
  ↓ _isEditing = false, _activeTab = "pessoal"
  ↓ buildTabsHTML() → "Dados Pessoais" ativo
  ↓ buildPanelHTML() → valores em .pf-value (sem inputs)
  ↓ buildActionsHTML() → só botão "Editar perfil"
       ↓
perfilInit()
  ↓ event delegation nas tabs
  ↓ listener em btn-pf-edit
  ↓ listeners do avatar
       ↓
Usuário clica "Editar perfil"
  ↓ _isEditing = true
  ↓ updatePanel() → .pf-value → <input> com valores
  ↓ updateActions() → "Cancelar" + "Salvar alterações"
       ↓
Usuário edita o nome, troca para aba "Acadêmicos"
  ↓ collectFormData() → _formData.pessoal.nome = novo valor
  ↓ _activeTab = "academico"
  ↓ updatePanel() → campos acadêmicos em modo edição
       ↓
Usuário clica "Salvar alterações"
  ↓ collectFormData() → lê campos da aba atual
  ↓ _savedData = deepClone(_formData)
  ↓ _isEditing = false → updatePanel() + updateActions()
  ↓ updateSidebarMeta() → nome na sidebar atualiza
  ↓ showToast() → toast verde por 3s
```

---

## Como Modificar no Futuro

### Persistir dados no localStorage

```javascript
const KEY = "beluga_perfil";

// Ao iniciar:
const saved = localStorage.getItem(KEY);
let _formData = saved ? JSON.parse(saved) : deepClone(PERFIL_DATA);
let _savedData = deepClone(_formData);

// Em onSave():
localStorage.setItem(KEY, JSON.stringify(_savedData));
```

### Persistir o avatar

```javascript
reader.onload = (ev) => {
  img.src = ev.target.result;
  localStorage.setItem("beluga_avatar", ev.target.result);  // base64
};
```

### Adicionar validação de e-mail

Em `onSave()`, antes de confirmar:
```javascript
const emailInput = document.querySelector('[data-key="email"]');
if (emailInput && !emailInput.value.includes("@")) {
  emailInput.classList.add("input--error");
  return;
}
```

---

## Relação Entre Arquivos

```
assets/js/screens/perfil.js
 └── PERFIL_DATA (local — hardcoded)
 └── assets/images/fotorosto.jpeg  ← avatar padrão
 └── _formData / _savedData (memória de módulo)
     └── reset a cada perfilScreen() → não persiste entre navegações
```

### Componentes globais

| Componente | Presente? |
|---|---|
| Topbar | **Sim** |
| Beluginha IA | **Sim** |
| `.input` (forms.css) | **Sim** — base dos `.pf-input` em modo edição |
| `.card` (cards.css) | **Sim** — base do `.pf-panel` |
| `.button` (buttons.css) | **Sim** — ações Editar/Salvar |
| `.button-ghost` (buttons.css) | **Sim** — botão Cancelar |
