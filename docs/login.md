# Tela: Login

> **Rota:** `#/login`
> **Tipo:** Pública — acessível sem autenticação
> **Arquivo principal:** `assets/js/screens/login.js`

---

## Estrutura da Tela

### Objetivo

A tela de login é o **ponto de entrada autenticado** do BELUGA. Seu objetivo é receber as credenciais do usuário e redirecioná-lo para o dashboard. Atualmente a autenticação é **simulada** (mock) — qualquer email/senha válidos no formulário executam o login com sucesso.

### Organização visual

```
┌──────────────────────────────────────────────────────────┐
│  HEADER  [Logo + "BELUGA"]   [Nav: Funcionalidades ...]  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  AUTH-HERO                                               │
│  ┌────────────────────────┐  ┌────────────────────────┐  │
│  │  AUTH-LEFT             │  │  AUTH-RIGHT            │  │
│  │  "Bem-Vindo de Volta!" │  │  Mascote Beluga        │  │
│  │                        │  │  (flutuando)           │  │
│  │  [Form]                │  │                        │  │
│  │   email input          │  │                        │  │
│  │   senha input          │  │                        │  │
│  │   "Esqueceu a senha?"  │  │                        │  │
│  │   [Botão Entrar]       │  │                        │  │
│  │   "Não possui conta?"  │  │                        │  │
│  └────────────────────────┘  └────────────────────────┘  │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  QUOTE-WAVE (SVG animado)                                │
│  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~         │
│  "Educação não transforma o mundo..." — Paulo Freire     │
│  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~       │
└──────────────────────────────────────────────────────────┘
```

A tela tem **scroll vertical livre** (diferente da landing, que trava em `100vh`). É dividida em três blocos: header público, seção hero com formulário, e seção de citação com ondas SVG animadas.

---

## HTML

### Diferença fundamental em relação à landing

A landing usa `<div class="public">`. A tela de login usa `<div class="public auth">` — a classe `.auth` é adicionada ao wrapper raiz. Isso é importante porque o CSS usa `:not(.auth)` para distinguir landing de login/cadastro no travamento de altura.

```html
<!-- Landing: trava em 100vh -->
<div class="public">

<!-- Login e Cadastro: scroll livre -->
<div class="public auth">
```

### Hierarquia completa do HTML

```
div.public.auth
├── header.public-header
│   ├── div.brand-wrap
│   │   ├── img.brand-logo          ← logof.png (90px)
│   │   └── div.brand               ← texto "BELUGA"
│   └── nav.public-nav
│       ├── a[href="#/landing#funcionalidades"]  ← "Funcionalidades"
│       ├── a[href="#/landing#preco"]            ← "Preço"
│       └── a[href="#/landing#contato"]          ← "Contato"
│
└── main.public-main
    ├── section.auth-hero
    │   ├── div.auth-left
    │   │   ├── h1.auth-title         ← "Bem-Vindo de Volta!"
    │   │   └── form.auth-card#login-form
    │   │       ├── input.input.auth-input [type=email, name=email]
    │   │       ├── input.input.auth-input [type=password, name=senha]
    │   │       ├── div.auth-row
    │   │       │   └── a.auth-link[href="#/recuperar"]  ← "Esqueceu a senha?"
    │   │       ├── button.button.auth-button [type=submit]  ← "Entrar"
    │   │       └── p.auth-footer
    │   │           └── a.auth-link[href="#/cadastro"]  ← "Cadastre-se aqui"
    │   └── div.auth-right
    │       └── img.auth-beluga     ← BELUGA.png (mascote flutuante)
    │
    └── section.quote-wave
        └── svg.quote-svg
            ├── defs
            │   ├── path#wavePath   ← curva guia do texto (invisível)
            │   └── radialGradient#glowGrad  ← brilho de fundo
            ├── ellipse             ← reflexo brilhante no "mar"
            ├── path (onda 1)       ← stroke azul animado, 9s
            ├── path (onda 2)       ← stroke azul animado, 13s
            ├── path (onda 3)       ← stroke azul animado, 7s
            └── text.quote-text
                └── textPath[href="#wavePath"]  ← texto segue a curva
```

### Classes importantes e o que representam

| Classe | Elemento | Função |
|---|---|---|
| `.public.auth` | `<div>` raiz | Wrapper das telas de autenticação (login e cadastro) |
| `.brand-wrap` | `<div>` | Agrupa logo + nome no header |
| `.auth-hero` | `<section>` | Grid de duas colunas: formulário + mascote |
| `.auth-left` | `<div>` | Coluna com título e formulário |
| `.auth-right` | `<div>` | Coluna com o mascote flutuante |
| `.auth-card` | `<form>` | O próprio formulário estilizado como card |
| `.auth-input` | `<input>` | Campo de entrada com altura 44px |
| `.auth-button` | `<button>` | Botão de submit com largura 100% |
| `.auth-row` | `<div>` | Linha para alinhar o link "Esqueceu a senha?" à direita |
| `.auth-footer` | `<p>` | Rodapé do form com link para cadastro |
| `.auth-link` | `<a>` | Links secundários (esqueceu senha, cadastro) |
| `.quote-wave` | `<section>` | Container da área de ondas + citação |
| `.quote-svg` | `<svg>` | SVG completo com ondas e texto curvado |
| `.quote-text` | `<text>` SVG | Texto SVG da citação de Paulo Freire |

### `id` nos inputs

Os campos do formulário agora têm tanto `name` quanto `id` (corrigido no code review — **C1**):

```html
<!-- id adicionados para que getElementById funcione corretamente -->
<input class="input auth-input" id="email" type="email" name="email" placeholder="Email" required />
<input class="input auth-input" id="senha" type="password" name="senha" placeholder="Senha" required />
```

O JavaScript os lê via:

```javascript
const email = document.getElementById("email")?.value?.trim();
const senha  = document.getElementById("senha")?.value?.trim();
```

---

## CSS

### Arquivos que estilizam esta tela

```
main.css
 └── base/variables.css       ← --primary, --muted, --text, --surface
 └── base/reset.css           ← zeragem de margem/padding
 └── base/global.css          ← tipografia Manrope
 └── layout/page-layout.css   ← .layout, .content, .container
 └── components/forms.css     ← .input (campos de entrada)
 └── components/buttons.css   ← .button (botão Entrar)
 └── pages/landing.css        ← .public, .public-header, .public-nav, .public-main
 └── pages/login.css          ← estilos exclusivos da tela de login
```

Os estilos do header público (`.public-header`, `.public-nav`, `.brand-name`) vêm de `landing.css` e são **reutilizados** aqui — a tela de login não redefine o header do zero.

Os estilos do formulário usam componentes globais (`.input`, `.button`) complementados pelas classes específicas (`.auth-input`, `.auth-button`).

---

### Classes de layout

#### `.auth-hero` — grid de duas colunas

```css
.auth-hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: start;
  gap: 40px;
  min-height: calc(100vh - 220px);
  margin-top: 40px;
}
```

- Coluna esquerda (`1.1fr`) é ligeiramente maior que a direita (`0.9fr`).
- `min-height: calc(100vh - 220px)` garante que o hero ocupe quase toda a altura da janela, deixando espaço para o header e para a seção de ondas abaixo.
- `align-items: start` faz as colunas se alinharem pelo topo, não pelo centro.

#### `.auth-card` — o formulário

```css
.auth-card {
  width: 360px;
  max-width: 100%;
  display: grid;
  gap: 12px;
}
```

O `form` é um **grid de uma coluna** com `gap: 12px` entre cada elemento filho (inputs, botões, links). A largura máxima de 360px mantém o formulário compacto mesmo em telas largas.

#### `.auth-right` — coluna do mascote

```css
.auth-right {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scaleX(-1);   /* espelha horizontalmente */
  margin-top: -90px;
}
```

O `transform: scaleX(-1)` inverte a coluna inteira horizontalmente, fazendo o mascote olhar para a esquerda (em direção ao formulário). O `margin-top: -90px` sobe a coluna para criar sobreposição visual com o header.

#### `.quote-wave` — seção das ondas

```css
.quote-wave {
  width: 100%;
  margin-top: -160px;   /* sobrepõe a seção acima */
  position: relative;
  overflow: visible;    /* permite que o SVG extrapole o container */
}
```

O `margin-top: -160px` faz a seção de ondas subir e se sobrepor visualmente ao `.auth-hero`, criando efeito de profundidade — as ondas "surgem" de baixo do mascote.

---

### Classes de cores

| Classe / Propriedade | Valor | Uso |
|---|---|---|
| `.auth-title` color | `var(--primary)` = `#2b719c` | Cor do título "Bem-Vindo de Volta!" |
| `.auth-link` color | `var(--muted)` = `#cbd5e1` | Links secundários em cinza suave |
| `.auth-link:hover` | `var(--text)` = `#ffffff` | Branco puro ao hovear links |
| `.input` background | `#0f172a` | Fundo escuro dos campos de entrada |
| `.input` border | `rgba(255,255,255,0.15)` | Borda translúcida sutil |
| `.input:focus` border | `var(--primary)` = `#2b719c` | Borda azul ao focar o campo |
| `.button` background | `var(--primary)` = `#2b719c` | Cor do botão "Entrar" |
| `.button:hover` | `var(--primary-hover)` = `#102253` | Azul mais escuro ao hover |
| `.quote-text` fill | `rgba(255,255,255,0.78)` | Cor do texto SVG da citação |

---

### Classes de animação

#### Float — mascote

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-20px); }
}

.auth-beluga {
  animation: float 5.5s ease-in-out infinite;
  will-change: transform;
}
```

Mesma animação da landing, mas aplicada diretamente no `<img>` (na landing era no wrapper). A amplitude aqui é **-20px** (na landing era -18px — diferença mínima).

#### Ondas SVG — `<animateTransform>`

As três ondas são caminhos SVG (`<path>`) animados com `<animateTransform>`. Cada onda se move horizontalmente para a esquerda em velocidades diferentes, criando paralaxe:

| Onda | Velocidade | Opacidade | Stroke | Efeito |
|---|---|---|---|---|
| Onda 1 (primária) | 9 segundos | 0.42 | 1.4px | Mais visível, velocidade média |
| Onda 2 (secundária) | 13 segundos | 0.22 | 0.9px | Mais suave, mais lenta |
| Onda 3 (terciária) | 7 segundos | 0.14 | 0.6px | Quase invisível, mais rápida |

O mecanismo de animação:

```xml
<animateTransform
  attributeName="transform"
  type="translate"
  from="0 0"
  to="-300 0"
  dur="9s"
  repeatCount="indefinite" />
```

Cada onda é desenhada de `-300` a `+1500` no eixo X (muito mais larga que a tela), e vai sendo transladada para a esquerda em loop. Quando a onda chega em `-300`, ela "reinicia" em `0` invisivelmente, criando o efeito de onda contínua.

#### Texto curvado sobre a onda (`<textPath>`)

```xml
<defs>
  <path id="wavePath"
    d="M 60 170 C 200 100, 420 90, 600 132 C 780 174, 1000 178, 1140 125" />
</defs>

<text class="quote-text">
  <textPath href="#wavePath" startOffset="50%" text-anchor="middle">
    Educação não transforma o mundo...
  </textPath>
</text>
```

O `<path id="wavePath">` define uma curva de Bezier cúbica invisível. O `<textPath>` "cola" o texto nessa curva. O `startOffset="50%"` centraliza o texto no meio da curva, e `text-anchor="middle"` alinha a âncora do texto no centro.

---

### Responsividade

#### `@media (max-width: 900px)` — tablets

```css
.auth-hero {
  grid-template-columns: 1fr;    /* uma coluna só */
  min-height: auto;
  padding-bottom: 18px;
}
.auth-card  { width: 100%; }
.auth-right { order: -1; }       /* mascote vai para cima do formulário */
.auth-title { font-size: 40px; }
```

Em telas menores que 900px, as colunas se empilham. O `order: -1` faz o mascote aparecer **acima** do formulário (mesmo estando depois no HTML), garantindo que o usuário veja o mascote antes do form ao rolar.

---

## JavaScript

### Arquivos que afetam esta tela

| Arquivo | Responsabilidade |
|---|---|
| `assets/js/app.js` | Registra a rota `"login"` e vincula as funções |
| `assets/js/router.js` | Decide quando renderizar o login, adiciona `public-mode` no body |
| `assets/js/screens/login.js` | Contém `loginScreen()` e `loginInit()` |
| `assets/js/state/auth.js` | Executa o login real (salva no localStorage) |

---

### `loginScreen()` — função de renderização

Retorna o HTML completo como string template literal. Não consulta estado, não faz requisições. Pura função de apresentação.

---

### `loginInit()` — função de inicialização

```javascript
export function loginInit() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email")?.value?.trim();
    const senha  = document.getElementById("senha")?.value?.trim();

    login({ email });

    window.location.hash = "#/dashboard";
  });

  const goCadastro = document.getElementById("go-cadastro");
  if (goCadastro) {
    goCadastro.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = "#/cadastro";
    });
  }
}
```

**Passo a passo do que acontece:**

1. Busca o formulário pelo `id="login-form"`.
2. Escuta o evento `submit` do formulário.
3. `e.preventDefault()` impede o comportamento padrão do browser (recarregar a página).
4. Tenta ler `email` e `senha` por `getElementById` — mas os inputs **não têm `id`**, então ambos ficam `undefined` (o login ainda funciona por ser mock).
5. Chama `login({ email })` — que salva `"1"` no localStorage sob a chave `"beluga_logged"`.
6. Redireciona para `#/dashboard`.
7. Tenta registrar listener em `#go-cadastro` — este elemento **não existe** no HTML atual (o link de cadastro usa `href="#/cadastro"` diretamente, não tem `id="go-cadastro"`). O `if (goCadastro)` previne o erro.

---

### `login()` em `auth.js` — o que acontece internamente

```javascript
export function login() {
  localStorage.setItem("beluga_logged", "1");
}
```

A função ignora os parâmetros recebidos (`{ email }`) e simplesmente escreve `"1"` no localStorage. Não há validação de senha, consulta a banco de dados, ou geração de token. É uma **flag booleana simulada**.

A partir desse momento, `isLoggedIn()` retorna `true` e o router protege as rotas privadas.

---

### Eventos da tela

| Elemento | Evento | Ação |
|---|---|---|
| `form#login-form` | `submit` | Chama `login()` e redireciona para `#/dashboard` |
| `a[href="#/cadastro"]` | `click` (nativo do browser) | Navega para a rota de cadastro via hash |
| `a[href="#/recuperar"]` | `click` (nativo) | Navega para `#/recuperar` — tela "Recuperar Senha" (rota registrada, **C6**) |
| `.auth-beluga` | — | Animação CSS contínua — sem JS |
| Ondas SVG | — | Animação SVG nativa (`<animateTransform>`) — sem JS |

---

## Fluxo da Página

### Jornada do usuário

```
Usuário acessa #/login
       ↓
Router verifica: não logado + rota pública → OK, renderiza
       ↓
loginScreen() → HTML injetado no #app
       ↓
loginInit() → event listeners registrados
       ↓
Usuário preenche email e senha
       ↓
Clica "Entrar" → form dispara "submit"
       ↓
e.preventDefault() → sem reload
       ↓
login() → localStorage.setItem("beluga_logged", "1")
       ↓
window.location.hash = "#/dashboard"
       ↓
Router detecta hashchange
       ↓
isLoggedIn() → true, rota privada → renderiza dashboard
```

### Outros caminhos possíveis

| Ação do usuário | O que acontece |
|---|---|
| Clica "Cadastre-se aqui" | Browser navega para `#/cadastro` via `href` nativo |
| Clica "Esqueceu a senha?" | Navega para `#/recuperar` — rota registrada como pública (**C6**), exibe tela de recuperação de senha |
| Já está logado e acessa `#/login` | Router redireciona automaticamente para `#/dashboard` |
| Submete formulário sem preencher campos | Atributo `required` no HTML impede o submit; `loginInit()` também valida e foca o campo vazio (**C2**) |

---

## Componentes Importantes

### Formulário de Login (`form.auth-card#login-form`)

O `<form>` desempenha duplo papel: é **estrutura semântica HTML** (com `type="submit"` no botão para capturar o evento `submit`) e **card visual** (com `display: grid` e `gap: 12px` para organizar os filhos).

Campos presentes:
- `input[type=email, name=email]` — campo de email com validação nativa de formato
- `input[type=password, name=senha]` — campo de senha com caracteres mascarados
- `button[type=submit]` — ativa o evento `submit` do formulário ao ser clicado

### Mascote Beluga (`.auth-beluga`)

```css
.auth-beluga {
  width: min(320px, 90%);
}
```

O `min(320px, 90%)` é uma função CSS que escolhe o **menor valor** entre 320px e 90% da largura do container. Em telas menores, o mascote fica responsivo automaticamente sem breakpoints.

A inversão horizontal é aplicada no `.auth-right` (container), não na `<img>` diretamente, o que inverte tudo na coluna sem precisar modificar o `<img>`.

### Seção de ondas SVG (`.quote-wave`)

É uma composição de três técnicas SVG combinadas:

1. **`<path>` com `<animateTransform>`** — ondas animadas por translação horizontal
2. **`<path id="wavePath">`** — curva invisível que serve de trilho para o texto
3. **`<textPath>`** — texto que segue a curvatura do caminho

O gradiente radial (`#glowGrad`) cria um brilho sutil abaixo das ondas, como um reflexo de luz na água.

### Componentes globais reutilizados

| Componente | Classe | Origem | Uso na tela |
|---|---|---|---|
| Campo de entrada | `.input` | `components/forms.css` | Campos de email e senha |
| Botão primário | `.button` | `components/buttons.css` | Botão "Entrar" |
| Header público | `.public-header`, `.public-nav` | `pages/landing.css` | Header com logo e links nav |

---

## Como Modificar no Futuro

### Alterar textos

| O que alterar | Onde no código | Linha aprox. |
|---|---|---|
| Título "Bem-Vindo de Volta!" | `login.js` → `h1.auth-title` | linha 22–24 |
| Placeholder do campo de email | `login.js` → `input[name=email]` | linha 28 |
| Placeholder do campo de senha | `login.js` → `input[name=senha]` | linha 29 |
| Texto do botão "Entrar" | `login.js` → `button.auth-button` | linha 35 |
| Link "Esqueceu a senha?" | `login.js` → `a.auth-link[href="#/recuperar"]` | linha 33 |
| Citação de Paulo Freire | `login.js` → `<textPath>` no SVG | linha 139 |
| Texto do link de cadastro | `login.js` → `a.auth-link[href="#/cadastro"]` | linha 39 |

### Alterar cores

| O que alterar | Onde no CSS | O que modificar |
|---|---|---|
| Cor do título | `login.css` → `.auth-title` | `color: var(--primary)` |
| Cor dos links secundários | `login.css` → `.auth-link` | `color: var(--muted)` |
| Fundo dos inputs | `forms.css` → `.input` | `background: #0f172a` |
| Borda dos inputs em foco | `forms.css` → `.input:focus` | `border-color: var(--primary)` |
| Cor do botão | `buttons.css` → `.button` | `background: var(--primary)` |
| Cor das ondas | `login.js` → `stroke="#3b9edd"` nos `<path>` SVG | inline no HTML |

### Implementar autenticação real

O fluxo de login real exigiria modificações em três lugares:

**1. `loginInit()` em `login.js`** — enviar os dados para uma API:
```javascript
// Substituir:
login({ email });
window.location.hash = "#/dashboard";

// Por:
const response = await fetch("/api/auth/login", {
  method: "POST",
  body: JSON.stringify({ email, senha })
});
if (response.ok) {
  login({ email });
  window.location.hash = "#/dashboard";
} else {
  // exibir mensagem de erro
}
```

**2. Corrigir os `id` nos inputs em `login.js`** — adicionar `id` para que o JS consiga ler:
```html
<!-- Adicionar id= -->
<input id="email" class="input auth-input" type="email" ... />
<input id="senha" class="input auth-input" type="password" ... />
```

**3. `auth.js`** — guardar token em vez de flag booleana:
```javascript
export function login({ token }) {
  localStorage.setItem("beluga_token", token);
}
export function isLoggedIn() {
  return !!localStorage.getItem("beluga_token");
}
```

### Alterar layout do formulário

| O que alterar | Onde | O que modificar |
|---|---|---|
| Largura do formulário | `login.css` → `.auth-card` | `width: 360px` |
| Proporção das colunas | `login.css` → `.auth-hero` | `grid-template-columns: 1.1fr 0.9fr` |
| Posição vertical do mascote | `login.css` → `.auth-right` | `margin-top: -90px` |
| Sobreposição das ondas | `login.css` → `.quote-wave` | `margin-top: -160px` |

### Alterar animações

| O que alterar | Onde | O que modificar |
|---|---|---|
| Velocidade da flutuação | `login.css` → `.auth-beluga` | `animation: float 5.5s` |
| Amplitude da flutuação | `login.css` → `@keyframes float` | `translateY(-20px)` |
| Velocidade das ondas SVG | `login.js` → `dur="9s"` em cada `<animateTransform>` | inline no HTML |
| Opacidade das ondas | `login.js` → `opacity="0.42"` nos `<path>` | inline no HTML |
| Curvatura do texto | `login.js` → `d="M 60 170 C ..."` no `#wavePath` | inline no HTML |

---

## Correções de Qualidade (Etapa 4)

### Posição do `import` (**Q4**)

O `import { login } from "../state/auth.js"` estava na linha 150, entre `loginScreen()` e `loginInit()`. Imports ES6 devem ficar no topo do módulo — abaixo eles ainda são içados pelo motor JS (hoisting), mas reduzem a legibilidade e violam a convenção padrão.

Corrigido: o import foi movido para a primeira linha do arquivo:

```javascript
// Q4: import movido para o topo — imports ES6 devem estar no início do módulo
import { login } from "../state/auth.js";

export function loginScreen() { ... }
export function loginInit() { ... }
```

---

## Correções de Segurança (Etapa 3)

### `auth.js` — limitação do localStorage (**S2**)

```javascript
// S2: autenticação via localStorage é apenas um flag de UI — não oferece segurança real.
// Qualquer script pode definir beluga_logged="1" pelo console do navegador.
// Para produção, substitua por JWT validado no servidor ou sessão via HttpOnly cookie.
export function isLoggedIn() {
  return localStorage.getItem("beluga_logged") === "1";
}
```

Comentário adicionado em `auth.js` para documentar a limitação do mecanismo atual. A função `login()` não valida credenciais — apenas escreve `"1"` no localStorage.

### Validação mínima de senha (**S3**)

```javascript
// S3: senha com menos de 6 caracteres é rejeitada — reduz risco de senhas triviais
if (senha.length < 6) {
  document.getElementById("senha")?.focus();
  return;
}
```

Adicionado em `loginInit()` após a validação C2 (campos vazios). O submit é bloqueado se `senha.length < 6`, e o campo de senha recebe foco. Para produção, o servidor deve validar comprimento e complexidade de forma independente.

---

## Relação Entre Arquivos

```
index.html
└── <script> assets/js/app.js
    ├── import router.js
    │   └── startRouter() → renderRoute()
    │       ├── body.classList.add("public-mode")
    │       ├── removeTopbar()
    │       └── removeBeluginha()
    └── import login.js → registerRoute("login", { render, init })
        ├── loginScreen()   → HTML injetado em #app
        └── loginInit()
            └── import auth.js → login()
                └── localStorage.setItem("beluga_logged", "1")

assets/css/main.css
 └── pages/landing.css   → .public, .public-header, .public-nav, .public-main
 └── pages/login.css     → .auth-hero, .auth-card, .auth-beluga, .quote-wave
 └── components/forms.css   → .input
 └── components/buttons.css → .button
```

### Componentes globais presentes nesta tela

| Componente | Presente? | Observação |
|---|---|---|
| Topbar (`#topbar`) | **Não** | Removida pelo router (rota pública) |
| Beluginha IA | **Não** | Removida pelo router (rota pública) |
| `.input` (forms.css) | **Sim** | Campos de email e senha |
| `.button` (buttons.css) | **Sim** | Botão "Entrar" |
| Header público (landing.css) | **Sim** | Reutilizado de `landing.css` |
| `body.public-mode` | **Sim** | Adicionada pelo router |

---

## Observações Técnicas

**Por que o login funciona sem validar senha?**
O sistema de autenticação é 100% mock. A função `login()` em `auth.js` não recebe nem verifica a senha — ela apenas escreve uma flag no localStorage. Isso é intencional para o estágio atual de desenvolvimento (MVP de interface). Quando um backend for integrado, `auth.js` é o único arquivo a ser modificado.

**Por que os inputs agora têm `id`?**
Correção do code review (**C1**): os campos tinham `name="email"` e `name="senha"`, mas o `loginInit()` os buscava por `getElementById`. Sem `id`, `getElementById` retornava `null`. Os atributos `id="email"` e `id="senha"` foram adicionados e uma validação básica de campos vazios foi incluída no submit (**C2**).

**Por que as ondas SVG não usam CSS `animation`?**
As ondas usam `<animateTransform>` — a API de animação nativa do SVG (SMIL). Diferente de `@keyframes` do CSS, o SMIL é declarado diretamente dentro do SVG e funciona mesmo sem CSS externo. A desvantagem é que a sintaxe é mais verbosa e menos familiar para quem conhece só CSS.

**Por que a classe `topbar-auth` existe no CSS mas não no HTML?**
O `login.css` contém regras para `.topbar-auth` e `.back-button` que não são usadas em nenhum elemento do HTML atual da tela. São resíduos de uma versão anterior do layout.
