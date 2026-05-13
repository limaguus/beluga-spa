# Tela: Cadastro

> **Rota:** `#/cadastro`
> **Tipo:** Pública — acessível sem autenticação
> **Arquivo principal:** `assets/js/screens/cadastro.js`

---

## Estrutura da Tela

### Objetivo

A tela de cadastro é onde um novo usuário cria sua conta no BELUGA. Atualmente o formulário é **mock** — ao submeter, apenas redireciona para o login sem salvar nenhum dado. O objetivo visual é apresentar o produto de forma positiva enquanto coleta os dados básicos do usuário.

### Organização visual

```
┌──────────────────────────────────────────────────────────┐
│  HEADER  [Logo + "BELUGA"]              [Botão Voltar]   │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  CADASTRO-GRID (centralizado verticalmente)              │
│  ┌────────────────────────┐  ┌────────────────────────┐  │
│  │  CADASTRO-LEFT         │  │  CADASTRO-RIGHT        │  │
│  │  Mascote Beluga        │  │  Card de cadastro      │  │
│  │  (flutuando)           │  │  ┌──────────────────┐  │  │
│  │                        │  │  │ CADASTRO         │  │  │
│  │  ┌──────────────────┐  │  │  │ [nome]           │  │  │
│  │  │ Você sabia o que │  │  │  │ [cpf]            │  │  │
│  │  │ inspira o nome   │  │  │  │ [email]          │  │  │
│  │  │ BELUGA? ...      │  │  │  │ [confirm. email] │  │  │
│  │  └──────────────────┘  │  │  │ [senha]          │  │  │
│  └────────────────────────┘  │  │ [confirm. senha] │  │  │
│                              │  │ [Comece agora]   │  │  │
│                              │  └──────────────────┘  │  │
│                              └────────────────────────┘  │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  ONDAS SVG (posição absoluta no fundo da tela)           │
│  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~     │
└──────────────────────────────────────────────────────────┘
```

A tela ocupa exatamente `100vh` sem scroll (em desktop). O grid é **centralizado verticalmente** dentro do espaço disponível. As ondas SVG ficam fixas no fundo via `position: absolute`, fora do fluxo do documento.

---

## HTML

### Diferença fundamental em relação a login e landing

Esta tela usa um wrapper raiz completamente diferente das outras telas públicas:

| Tela | Classe raiz | Mecanismo de scroll |
|---|---|---|
| Landing | `div.public` | Trava 100vh via `:has(.public:not(.auth))` |
| Login | `div.public.auth` | Scroll livre |
| **Cadastro** | **`div.auth-page`** | **Trava 100vh via `:has(.auth-page)`** |

O cadastro não herda nada da classe `.public` — é uma estrutura totalmente própria.

### Header exclusivo — sem nav, com botão Voltar

O header do cadastro é diferente do header da landing e do login:

- **Landing/Login:** header com logo + links de navegação (`Funcionalidades`, `Preço`, `Contato`)
- **Cadastro:** header com logo + **botão "Voltar"** (que leva ao login)

```html
<header class="topbar-auth">
  <div class="brand-wrap">
    <img src="./assets/images/logoF.png" class="brand-logo" alt="Logo Beluga" />
    <div class="brand">BELUGA</div>
  </div>
  <button id="btn-voltar" class="back-button" type="button">Voltar</button>
</header>
```

### Hierarquia completa do HTML

```
div.auth-page
├── header.topbar-auth
│   ├── div.brand-wrap
│   │   ├── img.brand-logo           ← logoF.png (36×36px)
│   │   └── div.brand                ← texto "BELUGA"
│   └── button.back-button#btn-voltar ← "Voltar"
│
├── main.auth-content
│   └── section.cadastro-grid
│       ├── div.cadastro-left
│       │   ├── img.cadastro-beluga      ← BELUGA.png (mascote flutuante)
│       │   └── div.cadastro-text
│       │       ├── h2                   ← "Você sabia o que inspira o nome BELUGA?"
│       │       └── p                    ← texto sobre a baleia beluga
│       │
│       └── div.cadastro-right
│           └── form.cadastro-card#cadastro-form
│               ├── h1.cadastro-title        ← "CADASTRO"
│               ├── input.auth-input#cadastro-nome   [type=text]
│               ├── input.auth-input#cadastro-cpf    [type=text]
│               ├── input.auth-input#cadastro-email  [type=email]
│               ├── input.auth-input#cadastro-email2 [type=email]
│               ├── input.auth-input#cadastro-senha  [type=password]
│               ├── input.auth-input#cadastro-senha2 [type=password]
│               └── button.auth-button#btn-finalizar-cadastro [type=submit]
│
└── section.quote-wave [aria-hidden="true"]
    └── svg.quote-svg
        ├── defs
        │   └── radialGradient#glowGradC
        ├── ellipse                    ← brilho de fundo
        ├── path (onda 1) + animateTransform  ← 9s
        ├── path (onda 2) + animateTransform  ← 13s
        └── path (onda 3) + animateTransform  ← 7s
```

### Classes importantes e o que representam

| Classe | Elemento | Função |
|---|---|---|
| `.auth-page` | `<div>` raiz | Wrapper único do cadastro — 100vh, flex coluna |
| `.topbar-auth` | `<header>` | Barra superior com logo e botão Voltar |
| `.back-button` | `<button>` | Botão "Voltar" com borda sutil |
| `.auth-content` | `<main>` | Área central — flex com `justify-content: center` |
| `.cadastro-grid` | `<section>` | Grid de duas colunas: esquerda (info) + direita (form) |
| `.cadastro-left` | `<div>` | Coluna com mascote + bloco "Você sabia?" |
| `.cadastro-right` | `<div>` | Coluna com o card de cadastro |
| `.cadastro-beluga` | `<img>` | Mascote com animação float |
| `.cadastro-text` | `<div>` | Card informativo sobre a origem do nome "Beluga" |
| `.cadastro-card` | `<form>` | Card visual do formulário (glassmorphism) |
| `.cadastro-title` | `<h1>` | Título "CADASTRO" centralizado |
| `.auth-input` | `<input>` | Campo de entrada estilizado |
| `.auth-button` | `<button>` | Botão de submit com gradiente |
| `.quote-wave` | `<section>` | Container das ondas SVG (decorativo) |

### Inputs com `id` — diferença em relação ao login

No login, os inputs **não tinham `id`**, o que causava um bug silencioso no JavaScript. No cadastro, todos os inputs têm `id` corretos:

```html
<input class="auth-input" type="text"     id="cadastro-nome"   placeholder="Nome" />
<input class="auth-input" type="text"     id="cadastro-cpf"    placeholder="CPF" />
<input class="auth-input" type="email"    id="cadastro-email"  placeholder="Email" />
<input class="auth-input" type="email"    id="cadastro-email2" placeholder="Confirmação de Email" />
<input class="auth-input" type="password" id="cadastro-senha"  placeholder="Senha" />
<input class="auth-input" type="password" id="cadastro-senha2" placeholder="Confirmação de Senha" />
```

Isso significa que quando a lógica real for implementada, `getElementById("cadastro-email")` funcionará corretamente.

### `aria-hidden="true"` nas ondas

```html
<section class="quote-wave" aria-hidden="true">
```

O atributo `aria-hidden="true"` informa aos leitores de tela que esta seção é puramente decorativa e deve ser ignorada. Diferente do login, onde as ondas carregam o texto da citação de Paulo Freire, no cadastro as ondas são apenas visuais — por isso o uso correto do `aria-hidden`.

---

## CSS

### Arquivos que estilizam esta tela

```
main.css
 └── base/variables.css       ← --primary, --text, --muted, --surface
 └── base/reset.css
 └── base/global.css          ← tipografia Manrope
 └── layout/page-layout.css   ← .layout, .content, .container
 └── pages/login.css          ← @keyframes float (reutilizado aqui)
 └── pages/cadastro.css       ← estilos exclusivos do cadastro
```

> **Importante:** `cadastro.css` reutiliza o `@keyframes float` definido em `login.css`. O comentário no código confirma isso: `/* @keyframes float vem de login.css, carregado antes pelo main.css */`. Isso funciona porque `main.css` importa `login.css` antes de `cadastro.css`.

### Diferença entre `.auth-input` do login e do cadastro

A classe `.auth-input` existe em **dois arquivos diferentes** com estilos diferentes:

**Em `login.css`:**
```css
.auth-input {
  height: 44px;    /* mais alto */
}
```
Complementa o `.input` de `forms.css` (background `#0f172a`, borda branca).

**Em `cadastro.css`:**
```css
.auth-input {
  height: 40px;
  border-radius: 9px;
  border: 1px solid rgba(255,255,255,0.09);
  background: rgba(255,255,255,0.04);    /* fundo semi-transparente */
  color: rgba(255,255,255,0.92);
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
}

.auth-input:focus {
  border-color: rgba(59,158,221,0.5);
  background: rgba(59,158,221,0.04);     /* fundo azul ao focar */
  box-shadow: 0 0 0 3px rgba(59,158,221,0.09);  /* glow ao redor */
}
```

O cadastro redefine a classe completamente — os inputs aqui têm fundo quase transparente (glassmorphism) com glow azul ao focar, em contraste com o fundo sólido `#0f172a` do login.

Como `cadastro.css` é importado depois de `login.css` no `main.css`, as regras do cadastro **sobrescrevem** as do login em cascata. Isso funciona porque cada tela é renderizada isoladamente no `#app`.

---

### Classes de layout

#### `.auth-page` — wrapper raiz

```css
.auth-page {
  position: relative;   /* contexto para position: absolute das ondas */
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
```

O `position: relative` é fundamental: é o **contexto de posicionamento** que permite às ondas SVG ficarem ancoradas com `position: absolute; bottom: 0`.

#### `.auth-content` — centralização vertical

```css
.auth-content {
  flex: 1;
  min-height: 0;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;   /* centraliza o grid verticalmente */
}
```

`flex: 1` faz essa área crescer e preencher todo o espaço entre o header e o fundo. `justify-content: center` centraliza o `.cadastro-grid` verticalmente nesse espaço.

#### `.cadastro-grid` — grid de duas colunas

```css
.cadastro-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 32px;
  align-items: center;     /* alinha as colunas pelo centro vertical */
  max-width: 1280px;
  margin: 0 auto;
}
```

`align-items: center` (diferente do login que usa `align-items: start`) faz as duas colunas se alinharem pelo **meio vertical** entre si — o mascote e o formulário ficam na mesma linha de centro.

#### `.cadastro-card` — glassmorphism

```css
.cadastro-card {
  width: min(400px, 100%);
  border: 1px solid rgba(59,158,221,0.2);
  border-radius: 16px;
  padding: 22px 20px;
  display: grid;
  gap: 9px;
  background: rgba(8,14,34,0.8);
  backdrop-filter: blur(18px);
  box-shadow:
    0 0 0 1px rgba(59,158,221,0.06),
    0 20px 40px rgba(0,0,0,0.45),
    0 0 60px rgba(59,158,221,0.05);
}
```

Este é o estilo mais sofisticado das telas públicas. Três técnicas combinadas:

1. **`backdrop-filter: blur(18px)`** — efeito de vidro fosco (glassmorphism): o conteúdo atrás do card fica desfocado
2. **`background: rgba(8,14,34,0.8)`** — fundo escuro semitransparente, deixa passar um pouco do que está atrás
3. **`box-shadow` com 3 camadas:**
   - Borda interna sutil azul (`0 0 0 1px`)
   - Sombra escura profunda (`0 20px 40px rgba(0,0,0,0.45)`)
   - Brilho externo azul suave (`0 0 60px rgba(59,158,221,0.05)`)

#### `.auth-page .quote-wave` — ondas no fundo absoluto

```css
.auth-page .quote-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  pointer-events: none;   /* não captura cliques */
}
```

As ondas ficam **fora do fluxo do documento** (`position: absolute`), ancoradas no rodapé da tela. O `pointer-events: none` garante que o SVG decorativo não intercepte cliques em elementos acima dele. O contexto de posicionamento é o `.auth-page` (que tem `position: relative`).

---

### Classes de cores

| Classe / Propriedade | Valor | Uso |
|---|---|---|
| `.cadastro-title` color | `#3b9edd` | Título "CADASTRO" em azul |
| `.cadastro-text h2` color | `#3b9edd` | Título do bloco informativo |
| `.cadastro-text p` color | `rgba(255,255,255,0.58)` | Texto do bloco informativo (suave) |
| `.cadastro-text` border | `rgba(59,158,221,0.13)` | Borda azul sutil no card informativo |
| `.cadastro-text` background | `rgba(59,158,221,0.04)` | Fundo azul quase invisível |
| `.auth-input` background | `rgba(255,255,255,0.04)` | Fundo translúcido dos inputs |
| `.auth-input:focus` background | `rgba(59,158,221,0.04)` | Fundo azul ao focar |
| `.auth-input:focus` box-shadow | `rgba(59,158,221,0.09)` | Glow ao redor do campo focado |
| `.auth-button` background | `linear-gradient(135deg, #1e5f8a, #3b9edd)` | Gradiente azul no botão |
| `.back-button:hover` border | `rgba(59,158,221,0.5)` | Borda azul ao passar o mouse |

---

### Classes de animação

#### Float — mascote (reutiliza `login.css`)

```css
/* login.css define o @keyframes float */
.cadastro-beluga {
  animation: float 5.5s ease-in-out infinite;
  will-change: transform;
}
```

O `@keyframes float` não é redefinido em `cadastro.css` — ele é herdado de `login.css` que é importado antes. Mesmos parâmetros: 5,5 segundos, ease-in-out, infinito.

#### Hover no botão "Comece agora"

```css
.auth-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(59,158,221,0.44);
}
```

O botão sobe 2px e intensifica o glow azul ao ser hovereado. Transição de `0.2s`.

#### Hover no botão Voltar

```css
.back-button:hover {
  border-color: rgba(59,158,221,0.5);
  color: #fff;
}
```

A borda muda para azul e o texto fica branco puro. Transição de `0.2s`.

---

### Responsividade

#### `@media (max-width: 900px)`

```css
/* Destravar o 100vh em mobile */
body.public-mode:has(.auth-page),
body.public-mode:has(.auth-page) .layout,
body.public-mode:has(.auth-page) .content,
.auth-page {
  height: auto;
  min-height: 100vh;
  overflow: visible;
}

.auth-content {
  padding: 0 20px 160px; /* 160px de padding-bottom para não sobrepor as ondas */
  justify-content: flex-start;
}

.cadastro-grid {
  grid-template-columns: 1fr;   /* empilha as colunas */
  gap: 20px;
  padding-top: 12px;
}

.cadastro-right {
  justify-content: flex-start;
}
```

Em mobile, a estratégia muda completamente:

1. O travamento de `100vh` é desfeito — a tela passa a ter scroll livre com `height: auto`
2. O grid de duas colunas vira uma coluna só
3. O `padding-bottom: 160px` reserva espaço para as ondas absolutas no fundo (que ainda ficam em `position: absolute; bottom: 0`) não cobrirem o botão

---

## JavaScript

### Arquivos que afetam esta tela

| Arquivo | Responsabilidade |
|---|---|
| `assets/js/app.js` | Registra a rota `"cadastro"` e vincula as funções |
| `assets/js/router.js` | Controla quando renderizar, adiciona `public-mode` no body |
| `assets/js/screens/cadastro.js` | Contém `cadastroScreen()` e `cadastroInit()` |

> O cadastro **não importa** `auth.js`. Ao submeter o formulário, ele apenas redireciona para o login sem criar sessão — a autenticação após cadastro ainda não foi implementada.

---

### `cadastroScreen()` — função de renderização

Retorna o HTML completo como string template literal. Não consulta estado, não faz requisições. Função pura de apresentação.

---

### `cadastroInit()` — função de inicialização

```javascript
export function cadastroInit() {
  const voltar = document.getElementById("btn-voltar");
  if (voltar) {
    voltar.addEventListener("click", () => {
      window.location.hash = "#/login";
    });
  }

  const form = document.getElementById("cadastro-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.hash = "#/login";
  });
}
```

**O que ela faz:**

1. **Botão "Voltar" (`#btn-voltar`)** — ao clicar, navega para `#/login`.
2. **Submit do formulário (`#cadastro-form`)** — ao submeter, `e.preventDefault()` cancela o comportamento padrão do browser e redireciona para `#/login`.

**O que ela não faz (ainda):**
- Não lê os valores dos campos
- Não valida email, CPF ou confirmação de senha
- Não faz requisição para criar conta
- Não chama `login()` — o usuário não fica logado após cadastro

---

### Eventos da tela

| Elemento | Evento | Ação |
|---|---|---|
| `button#btn-voltar` | `click` | Redireciona para `#/login` |
| `form#cadastro-form` | `submit` | Previne reload, redireciona para `#/login` |
| `button#btn-finalizar-cadastro` | `click` (ativa o submit do form) | Dispara o evento `submit` do formulário |
| `.cadastro-beluga` | — | Animação CSS float — sem JS |
| Ondas SVG | — | Animação SVG nativa — sem JS |

---

## Fluxo da Página

### Jornada do usuário

```
Usuário acessa #/cadastro
       ↓
Router: não logado + rota pública → OK, renderiza
       ↓
cadastroScreen() → HTML injetado no #app
       ↓
cadastroInit() → event listeners registrados
       ↓
Usuário preenche os 6 campos do formulário
       ↓
Clica "Comece agora" → form dispara "submit"
       ↓
e.preventDefault() → sem reload
       ↓
window.location.hash = "#/login"   ← cadastro mock, sem salvar dados
       ↓
Router detecta hashchange → renderiza Login
```

### Outros caminhos

| Ação do usuário | O que acontece |
|---|---|
| Clica "Voltar" | Redireciona para `#/login` via hash |
| Já está logado e acessa `#/cadastro` | Router redireciona automaticamente para `#/dashboard` |
| Submete formulário com campos vazios | Sem atributo `required`, o HTML **não** bloqueia o submit — o JS redireciona mesmo assim |

> **Atenção:** Os inputs do cadastro **não têm** o atributo `required`. No login, os campos tinham `required`. No cadastro, isso foi omitido, então o formulário pode ser submetido completamente vazio.

---

## Componentes Importantes

### Card informativo `.cadastro-text`

```
┌──────────────────────────────────────────┐
│ Você sabia o que inspira o nome BELUGA?  │  ← h2 em azul
│                                          │
│ A baleia beluga é conhecida por sua      │  ← p em branco suave
│ empatia e inteligência...                │
└──────────────────────────────────────────┘
```

É um elemento de **onboarding emocional** — apresenta a filosofia por trás do produto enquanto o usuário preenche o cadastro. Usa background e borda azul semitransparentes para criar um card visualmente separado mas integrado ao fundo escuro.

### Card do formulário `.cadastro-card` (glassmorphism)

O formulário usa a técnica de glassmorphism: fundo semitransparente + blur do conteúdo por trás. No contexto do projeto (fundo escuro sólido), o efeito é mais sutil — principalmente visível pelas bordas e sombras em camadas.

### Ondas SVG (decorativas)

Mesma estrutura das três ondas do login, mas com diferenças:

| Característica | Login | Cadastro |
|---|---|---|
| `viewBox` | `0 0 1200 320` | `0 0 1200 160` |
| Altura renderizada | `auto` (proporcional) | `130px` (fixo) |
| Posição | `position: static` (fluxo normal) | `position: absolute; bottom: 0` |
| Texto sobre a onda | Sim (Paulo Freire) | **Não** (`aria-hidden="true"`) |
| Gradiente `id` | `#glowGrad` | `#glowGradC` |

O `id` diferente do gradiente (`glowGradC` vs `glowGrad`) é necessário porque os dois SVGs coexistem no mesmo documento durante a transição de rotas — um `id` duplicado causaria conflito.

### Botão Voltar (`.back-button`)

```css
.back-button {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.22);
  color: rgba(255,255,255,0.85);
  padding: 6px 14px;
  border-radius: 8px;
}
```

Botão "ghost" — completamente transparente com borda sutil. Ao hovear, a borda vira azul e o texto fica branco puro. Padrão visual de ação secundária (o botão principal é o submit do formulário).

---

## Como Modificar no Futuro

### Alterar textos

| O que alterar | Onde no código | Linha aprox. |
|---|---|---|
| Título "CADASTRO" | `cadastro.js` → `h1.cadastro-title` | linha 34 |
| Texto do botão "Comece agora" | `cadastro.js` → `button.auth-button` | linha 43 |
| Título do bloco informativo | `cadastro.js` → `div.cadastro-text > h2` | linha 21 |
| Texto sobre a baleia beluga | `cadastro.js` → `div.cadastro-text > p` | linhas 22–29 |
| Placeholders dos inputs | `cadastro.js` → atributo `placeholder` de cada `<input>` | linhas 36–41 |

### Adicionar validação real ao formulário

Os três pontos a implementar em `cadastroInit()`:

```javascript
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // 1. Ler os campos
  const nome   = document.getElementById("cadastro-nome").value.trim();
  const email  = document.getElementById("cadastro-email").value.trim();
  const email2 = document.getElementById("cadastro-email2").value.trim();
  const senha  = document.getElementById("cadastro-senha").value;
  const senha2 = document.getElementById("cadastro-senha2").value;

  // 2. Validar
  if (email !== email2) { /* mostrar erro */ return; }
  if (senha !== senha2)  { /* mostrar erro */ return; }

  // 3. Enviar para API e depois redirecionar
  // await fetch("/api/auth/cadastro", { method: "POST", body: ... })
  window.location.hash = "#/login";
});
```

### Adicionar `required` nos inputs

Para ativar a validação nativa do browser (que bloqueia o submit se campos estiverem vazios), adicionar `required` em cada input em `cadastro.js`:

```html
<input class="auth-input" type="text" id="cadastro-nome" placeholder="Nome" required />
```

### Alterar layout

| O que alterar | Onde | O que modificar |
|---|---|---|
| Largura do card de formulário | `cadastro.css` → `.cadastro-card` | `width: min(400px, 100%)` |
| Proporção das colunas | `cadastro.css` → `.cadastro-grid` | `grid-template-columns: 1.1fr 0.9fr` |
| Altura das ondas decorativas | `cadastro.css` → `.auth-page .quote-wave .quote-svg` | `height: 130px` |
| Espaço interno do card | `cadastro.css` → `.cadastro-card` | `padding: 22px 20px` e `gap: 9px` |

### Alterar o efeito glassmorphism

```css
/* Em cadastro.css → .cadastro-card */
backdrop-filter: blur(18px);          /* aumentar = mais desfoque */
background: rgba(8,14,34,0.8);        /* aumentar opacidade = menos transparente */
border: 1px solid rgba(59,158,221,0.2); /* aumentar = borda mais visível */
```

---

## Relação Entre Arquivos

```
index.html
└── <script> assets/js/app.js
    ├── import router.js → startRouter()
    │   ├── body.classList.add("public-mode")
    │   ├── removeTopbar()
    │   └── removeBeluginha()
    └── import cadastro.js → registerRoute("cadastro", { render, init })
        ├── cadastroScreen() → HTML injetado em #app
        └── cadastroInit()
            ├── btn-voltar → hash = "#/login"
            └── form submit → hash = "#/login"

assets/css/main.css
 └── pages/login.css     → @keyframes float (reutilizado pelo cadastro)
 └── pages/cadastro.css  → .auth-page, .cadastro-grid, .cadastro-card,
                           .auth-input (redefinido), .auth-button (redefinido)
```

### Componentes globais presentes nesta tela

| Componente | Presente? | Observação |
|---|---|---|
| Topbar (`#topbar`) | **Não** | Removida pelo router (rota pública) |
| Beluginha IA | **Não** | Removida pelo router (rota pública) |
| `.input` (forms.css) | **Não** | Não é usado — `.auth-input` é definido em `cadastro.css` |
| `.button` (buttons.css) | **Não** | Não é usado — `.auth-button` é definido em `cadastro.css` |
| `@keyframes float` (login.css) | **Sim** | Herdado por ordem de importação no `main.css` |
| `body.public-mode` | **Sim** | Adicionada pelo router |

---

## Observações Técnicas

**Por que o cadastro usa `.auth-page` e não `.public.auth`?**
São estruturas de layout diferentes. O login usa `.public` (que tem a cadeia de estilos da landing) e adiciona `.auth` para evitar o travamento de 100vh. O cadastro foi construído de forma independente com `.auth-page`, que tem seu próprio travamento de 100vh via `:has(.auth-page)` no CSS. As duas abordagens chegam ao mesmo resultado visual, mas por caminhos diferentes.

**Por que as ondas SVG usam `id` diferente no gradiente (`glowGradC` vs `glowGrad`)?**
IDs devem ser únicos dentro de um documento HTML. Como a SPA renderiza telas dinamicamente no mesmo `#app`, durante uma transição rápida de rota dois SVGs podem coexistir momentaneamente no DOM. Usar `glowGradC` no cadastro evita que o browser tente referenciar o gradiente errado.

**Por que `backdrop-filter` tem prefixo `-webkit-`?**
```css
-webkit-backdrop-filter: blur(18px);
backdrop-filter: blur(18px);
```
O `-webkit-backdrop-filter` garante suporte a versões mais antigas do Safari (que por muito tempo suportou apenas a versão prefixada). A versão sem prefixo cobre Chrome, Firefox e Edge modernos.

**Por que o formulário não chama `login()` após o cadastro?**
O fluxo esperado em um sistema real seria: cadastrar → logar automaticamente → ir ao dashboard. No BELUGA atual, o cadastro apenas redireciona para o login e o usuário precisa fazer login manualmente. Isso é uma lacuna intencional do MVP que será preenchida quando o backend for integrado.
