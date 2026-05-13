# Tela: Landing Page

> **Rota:** `#/landing` (rota padrão — carregada quando nenhum hash está presente)
> **Tipo:** Pública — acessível sem autenticação
> **Arquivo principal:** `assets/js/screens/landing.js`

---

## Estrutura da Tela

### Objetivo

A Landing Page é a **porta de entrada pública do BELUGA**. Seu objetivo é apresentar o produto para novos visitantes e convencê-los a criar uma conta ou fazer login. Ela é a única tela que um usuário não autenticado vê antes de interagir com o sistema.

### Organização visual

A tela é dividida em duas grandes áreas verticais:

```
┌──────────────────────────────────────────────────────┐
│  HEADER  [Logo + Nome]   [Nav links]                 │
├──────────────────────────────────────────────────────┤
│                                                      │
│  HERO                                                │
│  ┌──────────────────────┐  ┌──────────────────────┐  │
│  │  Textos + CTA button │  │  Mascote Beluga (img)│  │
│  └──────────────────────┘  └──────────────────────┘  │
│                                                      │
├──────────────────────────────────────────────────────┤
│  STRIP (linha de cards horizontal — scroll)          │
│  [Card Feature] [Card Pessoa] [Card Feature] ...     │
└──────────────────────────────────────────────────────┘
```

A tela ocupa exatamente `100vh` (altura total da janela), sem scroll vertical — tudo foi projetado para caber na tela sem rolar.

---

## HTML

### Ponto de entrada — `index.html`

O projeto BELUGA é uma **SPA (Single Page Application)**. Existe apenas um arquivo HTML:

```html
<!-- index.html -->
<body>
  <div class="layout">
    <main class="content">
      <div class="container" id="app"></div>
    </main>
  </div>
  <script type="module" src="assets/js/app.js"></script>
</body>
```

**O que isso significa na prática:**
- A div `#app` é o container dinâmico onde todas as telas são renderizadas.
- Nenhum HTML de tela vive no arquivo `index.html` — tudo é gerado via JavaScript.
- O `<link>` do CSS e o `<script>` do Chart.js ficam no `<head>` e são carregados uma única vez para todo o projeto.

---

### Estrutura HTML da Landing (`landing.js`)

O HTML da landing é gerado pela função `landingScreen()` que retorna uma string HTML. Essa string é injetada no `#app` pelo router. A hierarquia completa é:

```
div.public
├── header.public-header
│   ├── div.brand
│   │   ├── img.brand-logo         ← logof.png
│   │   └── span.brand-name        ← "BELUGA"
│   └── nav.public-nav
│       ├── a[data-scroll="funcionalidades"]  ← "Funcionalidades"
│       ├── a[data-scroll="preco"]            ← "Preço"
│       └── a[data-scroll="contato"]          ← "Contato"
│
└── main.public-main
    ├── section.hero#topo
    │   ├── div.hero-left
    │   │   ├── p.hero-eyebrow       ← "Assistente acadêmico com IA"
    │   │   ├── h1                   ← título principal + span.hero-highlight
    │   │   ├── p.hero-sub           ← subtítulo
    │   │   └── div.hero-actions
    │   │       └── button.hero-cta#cta-login  ← "COMECE AGORA"
    │   └── div.hero-right
    │       └── div.hero-image-wrap
    │           └── img.hero-image    ← BELUGA.png (mascote)
    │
    └── section.landing-strip#funcionalidades
        ├── p.strip-label             ← frase descritiva
        └── div.strip-track           ← container scroll horizontal
            ├── div.strip-card.strip-card--feature  (×5 cards de funcionalidade)
            └── div.strip-card.strip-card--person   (×2 cards de depoimento)
```

### Classes importantes e o que representam

| Classe | Elemento | Função |
|---|---|---|
| `.public` | `<div>` raiz | Wrapper base para as telas públicas (landing, login, cadastro) |
| `.public-header` | `<header>` | Barra de navegação pública no topo |
| `.brand` | `<div>` | Agrupa logo + nome BELUGA |
| `.public-nav` | `<nav>` | Links de navegação por ancoragem |
| `.public-main` | `<main>` | Área de conteúdo principal |
| `.hero` | `<section>` | Seção hero — ocupa a maior área vertical da tela |
| `.hero-left` | `<div>` | Coluna esquerda do hero (texto + botão) |
| `.hero-right` | `<div>` | Coluna direita do hero (imagem do mascote) |
| `.hero-image-wrap` | `<div>` | Wrapper com a animação de flutuação |
| `.hero-cta` | `<button>` | Botão principal de conversão |
| `.landing-strip` | `<section>` | Faixa inferior com cards horizontais |
| `.strip-track` | `<div>` | Trilho de scroll horizontal dos cards |
| `.strip-card--feature` | `<div>` | Card de funcionalidade (ícone + título + texto) |
| `.strip-card--person` | `<div>` | Card de depoimento (avatar + nome + texto) |

### Atributos de dados importantes

Os links do `<nav>` usam um atributo customizado `data-scroll`:

```html
<a href="javascript:void(0)" data-scroll="funcionalidades">Funcionalidades</a>
```

O `data-scroll` é lido pelo JavaScript para identificar qual seção ancorar na página via `scrollIntoView`. O valor deve corresponder ao `id` de um elemento HTML existente na mesma tela.

---

## CSS

### Arquivos que estilizam esta tela

A landing page é estilizada por uma **pilha de arquivos CSS**, todos importados em `assets/css/main.css`:

```
main.css
 └── base/variables.css    ← tokens globais (cores, espaçamento, tipografia)
 └── base/reset.css        ← zeragem de margens e box-sizing
 └── base/global.css       ← tipografia e utilitários globais
 └── layout/page-layout.css ← estrutura .layout / .content / .container
 └── pages/landing.css     ← estilos exclusivos da landing
```

O arquivo `assets/css/pages/landing.css` é o principal para esta tela.

---

### Classes de layout

#### `body.public-mode` — modo público

Quando a rota é landing, login ou cadastro, o router adiciona a classe `public-mode` no `<body>`. Isso ativa regras CSS que **anulam o layout padrão do app** (que tem topbar e sidebar):

```css
body.public-mode .content {
  padding: 0;
}

body.public-mode #app.container {
  max-width: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
```

Sem essa classe, o `#app` teria o `max-width: 1500px` e margens centradas que são usadas nas telas internas do app.

#### Travamento em `100vh` — somente landing

A landing usa um seletor específico para travar a altura em 100vh e desabilitar o scroll vertical:

```css
body.public-mode:has(.public:not(.auth)),
body.public-mode:has(.public:not(.auth)) .layout,
body.public-mode:has(.public:not(.auth)) .content {
  height: 100vh;
  overflow: hidden;
}
```

O seletor `:has(.public:not(.auth))` é inteligente: ele verifica se existe um `.public` que **não** tenha a classe `.auth`. Login e cadastro usam `.public.auth`, então eles ficam fora dessa regra e têm scroll livre.

#### `.hero` — layout principal

```css
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex: 1;        /* ocupa todo o espaço vertical disponível */
  min-height: 0;  /* necessário para flex funcionar dentro de container com altura definida */
}
```

O `flex: 1` faz o hero crescer e preencher o espaço entre o header e a strip de cards.

#### `.strip-track` — scroll horizontal

```css
.strip-track {
  display: flex;
  gap: 12px;
  overflow-x: auto;          /* habilita scroll horizontal */
  padding-bottom: 10px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.08) transparent;
}
```

Os cards ficam em linha com `flex` e o `overflow-x: auto` cria o comportamento de arrasto horizontal.

---

### Classes de cores

| Classe / Propriedade | Cor | Uso |
|---|---|---|
| `.hero-eyebrow` | `#3b9edd` | Texto "Assistente acadêmico com IA" |
| `.hero-highlight` | `#3b9edd` | Palavra "INTELIGENTE" em destaque |
| `.hero-sub` | `rgba(255,255,255,0.45)` | Subtítulo com opacidade reduzida |
| `.hero-cta` background | `linear-gradient(135deg, #1e5f8a, #3b9edd)` | Gradiente azul no botão principal |
| `.strip-label` | `rgba(255,255,255,0.32)` | Texto da frase acima dos cards (bem sutil) |
| `.strip-card` border | `rgba(59,158,221,0.13)` | Borda azul quase transparente nos cards |
| `.strip-card-title` | `#fff` | Título dos cards |
| `.strip-card-text` | `rgba(255,255,255,0.48)` | Texto dos cards (levemente apagado) |
| `.strip-person-role` | `#3b9edd` | Curso/estado do depoente |

A paleta da landing é quase exclusivamente **azul** (`#3b9edd`) sobre fundo escuro (`#030205`). As cores dos ícones SVG dos cards de funcionalidade são inline no HTML e variam por card: azul, vermelho, roxo, verde e laranja.

---

### Classes de animação

#### Float — mascote Beluga

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-18px); }
}

.hero-image-wrap {
  animation: float 5.5s ease-in-out infinite;
  will-change: transform;
}
```

O mascote sobe e desce **18px** em ciclos de **5,5 segundos**, com curva `ease-in-out` para movimento suave. O `will-change: transform` informa ao browser para otimizar essa animação usando a GPU.

#### Hover nos cards da strip

```css
.strip-card:hover {
  transform: translateY(-4px);
  border-color: rgba(59,158,221,0.35);
  box-shadow: 0 8px 24px rgba(59,158,221,0.1);
}
```

Ao passar o mouse sobre qualquer card, ele sobe 4px e ganha uma borda + sombra azul. Transição de `0.2s ease`.

#### Hover no botão CTA

```css
.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(59,158,221,0.5);
}
```

O botão principal sobe 2px e intensifica a sombra azul ao ser hovereado.

---

### Responsividade

#### `@media (max-width: 900px)` — tablets e telas médias

```css
.hero {
  flex-direction: column;    /* empilha hero-left e hero-right verticalmente */
  align-items: flex-start;
  gap: 16px;
}
.hero-image { width: 220px; }
.hero h1    { font-size: 30px; }
.hero-highlight { font-size: 26px; letter-spacing: 6px; }
```

O layout do hero muda de duas colunas para uma coluna empilhada.

#### `@media (max-width: 600px)` — mobile

```css
.pub-cta-header { display: none; }   /* esconde botão do header */
.public-nav     { gap: 20px; }       /* reduz espaço entre links do nav */
```

Em mobile, o botão CTA do header (caso existisse) desaparece e os links de navegação ficam mais próximos.

---

## JavaScript

### Arquivos que afetam esta tela

| Arquivo | Responsabilidade |
|---|---|
| `assets/js/app.js` | Registra a rota `"landing"` e vincula as funções |
| `assets/js/router.js` | Controla quando a landing é renderizada e as proteções de rota |
| `assets/js/screens/landing.js` | Contém `landingScreen()` e `landingInit()` |
| `assets/js/state/auth.js` | Verifica se o usuário está logado |

---

### Como a tela é carregada — fluxo do router

Quando o usuário acessa o projeto pela primeira vez (sem hash na URL), ou acessa `#/landing`:

```
1. window.location.hash = "" ou "#/landing"
2. router.js → renderRoute() é chamada
3. rawHash = "landing"
4. isLoggedIn() → false (usuário não logado)
5. PUBLIC_ROUTES.includes("landing") → true
6. document.body.classList.add("public-mode")   ← adiciona classe no body
7. removeTopbar()   ← remove a barra de navegação interna
8. removeBeluginha() ← remove o assistente de IA
9. route = routes["landing"] → { render: landingScreen, init: landingInit }
10. outlet.innerHTML = landingScreen()   ← injeta o HTML no #app
11. landingInit()   ← registra os event listeners
```

**Proteção de rota:** Se o usuário já estiver logado e tentar acessar `#/landing`, o router redireciona automaticamente para `#/dashboard`:

```javascript
if (logged && isPublic) {
  window.location.hash = "#/dashboard";
  return;
}
```

---

### `landingScreen()` — função de renderização

```javascript
export function landingScreen() {
  return `<div class="public"> ... </div>`;
}
```

Esta função simplesmente **retorna uma string de HTML**. Não recebe parâmetros, não consulta estado, não faz requisições. É uma função pura de apresentação. O HTML é literalmente escrito dentro de um template literal (`\`...\``).

---

### `landingInit()` — função de inicialização

```javascript
export function landingInit() {
  const goLogin = () => {
    window.location.hash = "#/login";
  };

  document.getElementById("cta-login")?.addEventListener("click", goLogin);
  document.getElementById("cta-header")?.addEventListener("click", goLogin);

  document.querySelectorAll(".public-nav [data-scroll]").forEach((link) => {
    link.addEventListener("click", () => {
      document
        .getElementById(link.dataset.scroll)
        ?.scrollIntoView({ behavior: "smooth" });
    });
  });
}
```

**O que ela faz:**

1. **Botão "COMECE AGORA" (`#cta-login`)** — redireciona para `#/login` ao ser clicado.
2. **Botão do header (`#cta-header`)** — também redireciona para `#/login`. Nota: este botão não existe no HTML atual da landing (não foi renderizado em `landingScreen()`), mas o listener é registrado preventivamente com `?.` (optional chaining) para não gerar erro.
3. **Links da nav (`[data-scroll]`)** — ativam scroll suave (`scrollIntoView`) até o elemento com o `id` correspondente ao valor do atributo `data-scroll`.

**Sobre o optional chaining (`?.`):**
O operador `?.` garante que se um elemento não existir no DOM, o código não quebre. Exemplo: `document.getElementById("cta-header")?.addEventListener(...)` não lança erro se `#cta-header` for `null`.

---

### Eventos da tela

| Elemento | Evento | Ação |
|---|---|---|
| `#cta-login` (botão hero) | `click` | Muda hash para `#/login` |
| `#cta-header` (botão nav) | `click` | Muda hash para `#/login` |
| `.public-nav [data-scroll]` (links nav) | `click` | Scroll suave até o `id` correspondente |
| `.strip-card` (cards) | `hover` (CSS) | Animação de elevação via CSS — sem JS |
| `.hero-image-wrap` (mascote) | — | Animação contínua via CSS — sem JS |

---

## Fluxo da Página

### Jornada do usuário

```
Usuário acessa a URL
       ↓
Router verifica auth
       ↓
Não logado → renderiza Landing
       ↓
Usuário vê: Header + Hero + Cards
       ↓
Pode clicar em:
  ├── "COMECE AGORA"    → vai para #/login
  ├── "Funcionalidades" → scroll suave até section#funcionalidades (strip de cards)
  ├── "Preço"           → scroll até section#preco (não implementado ainda)
  └── "Contato"         → scroll até section#contato (não implementado ainda)
```

### Seções com ancoragem

| Link nav | `data-scroll` | Elemento alvo (`id`) | Status |
|---|---|---|---|
| Funcionalidades | `funcionalidades` | `section.landing-strip#funcionalidades` | Funciona |
| Preço | `preco` | Nenhum `id="preco"` na tela | Não scrolleia (silencioso) |
| Contato | `contato` | Nenhum `id="contato"` na tela | Não scrolleia (silencioso) |

Os links de Preço e Contato **não causam erro** porque o `?.` no `scrollIntoView` é aplicado via optional chaining implícito: `document.getElementById(link.dataset.scroll)?.scrollIntoView(...)`.

---

## Componentes Importantes

### Header público (`.public-header`)

- Presente apenas nas telas públicas (landing, login, cadastro).
- Não é o mesmo que o `topbar` das telas internas.
- Contém: logo `logof.png` + nome "BELUGA" + links de navegação.
- Sem funcionalidade de login/logout aqui — isso fica no `topbar`.

### Mascote Beluga (`img.hero-image`)

- Imagem: `assets/images/BELUGA.png`
- Invertida horizontalmente com `transform: scaleX(-1)` para olhar para o texto.
- Sombra azul sutil com `filter: drop-shadow(...)`.
- Animação CSS `float` de 5,5 segundos, infinita.
- Largura fixa de 300px no desktop, 220px em tablet.

### Cards da Strip

**Card de funcionalidade (`.strip-card--feature`):**
```
┌─────────────────┐
│  [Ícone SVG]    │
│  Título         │
│  Texto desc.    │
└─────────────────┘
```
Largura: 180px fixos. Contém ícone SVG com cor temática, título e descrição.

**Card de depoimento (`.strip-card--person`):**
```
┌──────────────────────┐
│  [Avatar circular]   │
│  Nome do estudante   │
│  Curso · Estado      │
│  "Depoimento..."     │
└──────────────────────┘
```
Largura: 210px (um pouco maior). Imagens dos avatares vêm do serviço `i.pravatar.cc`.

### Botão CTA Principal (`.hero-cta`)

O elemento de conversão mais importante da tela:

```css
background: linear-gradient(135deg, #1e5f8a, #3b9edd);
box-shadow: 0 4px 22px rgba(59,158,221,0.35);
padding: 12px 32px;
border-radius: 10px;
```

Tem `id="cta-login"` para ser selecionado pelo JavaScript.

---

## Como Modificar no Futuro

### Alterar textos

| O que alterar | Onde no código | Linha aprox. |
|---|---|---|
| Título principal do hero | `landing.js` → dentro do `<h1>` | linha 23 |
| Palavra em destaque ("INTELIGENTE") | `landing.js` → `<span class="hero-highlight">` | linha 23 |
| Subtítulo do hero | `landing.js` → `<p class="hero-sub">` | linha 24 |
| Label do eyebrow | `landing.js` → `<p class="hero-eyebrow">` | linha 22 |
| Texto dos cards | `landing.js` → `<p class="strip-card-text">` de cada card | linhas 46–93 |
| Depoimentos (nomes e textos) | `landing.js` → `.strip-card--person` | linhas 49–55, 72–77 |
| Texto do botão CTA | `landing.js` → `button.hero-cta` | linha 26 |

### Alterar cores

| O que alterar | Onde no CSS | O que modificar |
|---|---|---|
| Cor primária da landing | `landing.css` | Todas as ocorrências de `#3b9edd` |
| Gradiente do botão CTA | `landing.css` → `.hero-cta` | `background: linear-gradient(...)` |
| Cor do eyebrow e highlight | `landing.css` → `.hero-eyebrow` e `.hero-highlight` | `color:` |
| Fundo do projeto inteiro | `variables.css` | `--bg: #030205` |

### Alterar layout

| O que alterar | Onde | O que modificar |
|---|---|---|
| Proporção das colunas do hero | `landing.css` → `.hero-left` | `max-width: 520px` |
| Tamanho do mascote | `landing.css` → `.hero-image` | `width: 300px` |
| Altura da strip de cards | `landing.css` → `.landing-strip` | `padding`, `margin-top` |
| Largura dos cards feature | `landing.css` → `.strip-card` | `width: 180px` |
| Largura dos cards de depoimento | `landing.css` → `.strip-card--person` | `width: 210px` |

### Alterar animações

| O que alterar | Onde | O que modificar |
|---|---|---|
| Velocidade da flutuação do mascote | `landing.css` → `.hero-image-wrap` | `animation: float 5.5s` |
| Amplitude da flutuação | `landing.css` → `@keyframes float` | `translateY(-18px)` |
| Efeito hover dos cards | `landing.css` → `.strip-card:hover` | `transform`, `box-shadow` |

### Adicionar novos links no nav

Adicionar no HTML (`landing.js`) dentro de `nav.public-nav`:
```html
<a href="javascript:void(0)" data-scroll="id-da-secao">Nome do Link</a>
```

E criar no HTML uma section com o id correspondente:
```html
<section id="id-da-secao"> ... </section>
```

O JavaScript já está preparado para processar qualquer link com `data-scroll` automaticamente.

### Adicionar novos cards na strip

Dentro de `div.strip-track` em `landing.js`, adicionar:

```html
<!-- Card de funcionalidade -->
<div class="strip-card strip-card--feature">
  <div class="strip-feature-img" style="background:rgba(R,G,B,0.1)">
    <!-- SVG icon aqui -->
  </div>
  <h3 class="strip-card-title">Título</h3>
  <p class="strip-card-text">Descrição curta.</p>
</div>
```

---

## Relação Entre Arquivos

```
index.html
├── <link> assets/css/main.css
│   └── @import pages/landing.css   ← estilos da landing
│   └── @import base/variables.css  ← tokens de cor e espaçamento
│   └── @import layout/page-layout.css ← .layout, .content, .container
│
└── <script> assets/js/app.js
    ├── import router.js → startRouter() ← controla quando renderizar
    └── import landing.js → registerRoute("landing", { render, init })
        ├── landingScreen() → retorna HTML como string
        └── landingInit()   → registra eventos no DOM
```

### Componentes globais presentes nesta tela

| Componente | Presente na Landing? | Motivo |
|---|---|---|
| Topbar (`#topbar`) | **Não** | Removida pelo router para rotas públicas |
| Beluginha IA | **Não** | Removida pelo router para rotas públicas |
| `.layout` / `.content` | **Sim** | Estrutura base do `index.html` |
| `body.public-mode` | **Sim** | Classe adicionada pelo router |

---

## Observações Técnicas

**Por que não existe `<html>` com rotas?**
O projeto é uma SPA. O browser carrega `index.html` uma única vez. Toda "navegação" é feita alterando o `window.location.hash`, que aciona o `hashchange` event listener no router.

**Por que o HTML das telas fica em arquivos `.js`?**
Porque o JavaScript gera e injeta o HTML dinamicamente. Isso permite que cada tela seja um módulo independente, carregado sob demanda. A desvantagem é que o HTML não é diretamente legível no browser sem JavaScript.

**Por que `javascript:void(0)` nos links do nav?**
Os links da nav não têm um destino real de URL — eles disparam comportamento via JavaScript (scroll ou navegação por hash). O `href="javascript:void(0)"` previne que o browser tente navegar e adiciona cursor pointer.
