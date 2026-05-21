# Tela: Landing Page

> **Rota:** `#/landing` (rota padrão — carregada quando nenhum hash está presente)
> **Tipo:** Pública — acessível sem autenticação
> **Arquivo principal:** `assets/js/screens/landing.js`
> **CSS:** `assets/css/pages/landing.css`

---

## Estrutura da Tela

### Objetivo

A Landing Page é a **porta de entrada pública do BELUGA**. Seu objetivo é apresentar o produto para novos visitantes — incluindo investidores, parceiros e futuros alunos — e convencê-los a criar uma conta. É a única tela que um usuário não autenticado vê antes de interagir com o sistema.

### Organização visual

A tela é composta por **9 seções empilhadas verticalmente**, com scroll normal de página (sem travamento em `100vh`):

```
┌──────────────────────────────────────────────────────────┐
│  HEADER sticky (logo + nav + botão "Entrar")             │
├──────────────────────────────────────────────────────────┤
│  HERO (~92vh)                                            │
│  ┌────────────────────────┐  ┌────────────────────────┐  │
│  │  Eyebrow               │  │  [Glow radial]         │  │
│  │  H1 com "entende" HL   │  │  Beluga flutuando      │  │
│  │  Subtítulo             │  │  (scaleX invertida)    │  │
│  │  [Começar grátis]      │  │                        │  │
│  │  [Ver como funciona]   │  │                        │  │
│  │  ★ 4,8 · 5k+ · 87 uni │  │                        │  │
│  └────────────────────────┘  └────────────────────────┘  │
├──────────────────────────────────────────────────────────┤
│  STATS BAR  (5.000+ · 87 universidades · 2,1M · 4,8★)   │
├──────────────────────────────────────────────────────────┤
│  FUNCIONALIDADES (grid 2×2 — Beluginha IA em destaque)   │
├──────────────────────────────────────────────────────────┤
│  PREVIEW (3 mockups de janela — Dashboard, IA, Quiz)     │
├──────────────────────────────────────────────────────────┤
│  COMO FUNCIONA  (3 passos numerados com conectores)      │
├──────────────────────────────────────────────────────────┤
│  PLANOS  (Gratuito · Pro (destaque) · Anual)             │
├──────────────────────────────────────────────────────────┤
│  DEPOIMENTOS  (3 cards com avatares CSS)                 │
├──────────────────────────────────────────────────────────┤
│  FINAL CTA  (Beluga flutuando + botão)                   │
├──────────────────────────────────────────────────────────┤
│  FOOTER  (logo + 3 colunas de links + copyright)         │
└──────────────────────────────────────────────────────────┘
```

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

O `#app` é o container dinâmico onde todas as telas são injetadas via JavaScript.

---

### Estrutura HTML da Landing (`landing.js`)

```
div.public#landing-root
├── header.public-header#pub-hd                   ← sticky
│   ├── div.brand
│   │   ├── img.brand-logo
│   │   └── span.brand-name
│   ├── nav.public-nav
│   │   ├── a[data-scroll="funcionalidades"]
│   │   ├── a[data-scroll="preco"]
│   │   └── a[data-scroll="contato"]
│   └── button.pub-cta-header#cta-header
│
└── main.public-main
    ├── section.ld-hero#topo
    │   ├── div.ld-hero-left
    │   │   ├── p.ld-eyebrow
    │   │   ├── h1.ld-hero-h1 (com em.ld-hl em gradiente)
    │   │   ├── p.ld-hero-sub
    │   │   ├── div.ld-hero-actions
    │   │   │   ├── button.ld-btn-primary#cta-login
    │   │   │   └── button.ld-btn-ghost#cta-how
    │   │   └── div.ld-hero-trust
    │   └── div.ld-hero-right
    │       ├── div.ld-hero-glow             ← glow radial azul
    │       └── div.hero-image-wrap          ← animação float
    │           └── img.hero-image (BELUGA.png)
    │
    ├── section.ld-stats
    │   └── div.ld-stats-inner
    │       └── (4× div.ld-stat + div.ld-sdiv separadores)
    │
    ├── section.ld-features#funcionalidades
    │   ├── div.ld-sec-head (eyebrow + h2 + sub)
    │   └── div.ld-feat-grid
    │       ├── div.ld-fcard.ld-fcard--hero  ← Beluginha IA (largura total)
    │       ├── div.ld-fcard                 ← Plano dinâmico
    │       ├── div.ld-fcard                 ← Gamificação
    │       └── div.ld-fcard                 ← Comunidade
    │
    ├── section.ld-preview#como-funciona
    │   ├── div.ld-sec-head
    │   └── div.ld-preview-row
    │       ├── div.ld-mwin          ← mockup Dashboard
    │       ├── div.ld-mwin.ld-mwin--center  ← mockup Beluginha IA (elevado)
    │       └── div.ld-mwin          ← mockup Quiz
    │
    ├── section.ld-how
    │   ├── div.ld-sec-head
    │   └── div.ld-how-row
    │       ├── div.ld-how-step (01)
    │       ├── div.ld-how-line      ← conector horizontal
    │       ├── div.ld-how-step (02)
    │       ├── div.ld-how-line
    │       └── div.ld-how-step (03)
    │
    ├── section.ld-pricing#preco
    │   ├── div.ld-sec-head
    │   └── div.ld-plan-row
    │       ├── div.ld-plan          ← Gratuito
    │       ├── div.ld-plan.ld-plan--feat ← Pro (badge "Mais popular")
    │       └── div.ld-plan          ← Anual
    │
    ├── section.ld-testi
    │   ├── div.ld-sec-head
    │   └── div.ld-tcard-row
    │       └── (3× div.ld-tcard com avatar CSS de iniciais)
    │
    ├── section.ld-final
    │   └── div.ld-final-inner
    │       ├── div.hero-image-wrap.ld-final-beluga ← Beluga flutuando
    │       ├── h2.ld-final-h2
    │       ├── p.ld-final-sub
    │       └── button.ld-btn-primary#cta-final
    │
    └── footer.ld-footer#contato
        ├── div.ld-footer-top
        │   ├── div.ld-footer-brand (logo + tagline)
        │   └── div.ld-footer-cols
        │       ├── div.ld-footer-col "Produto"
        │       ├── div.ld-footer-col "Empresa"
        │       └── div.ld-footer-col "Suporte"
        └── div.ld-footer-bot (copyright)
```

---

### Classes principais e seus propósitos

| Classe | Elemento | Função |
|---|---|---|
| `.public` | `<div>` raiz | Wrapper das telas públicas (landing, login, cadastro) |
| `.public-header` | `<header>` | Header sticky com backdrop-blur |
| `.public-nav` | `<nav>` | Links de navegação por ancoragem |
| `.pub-cta-header` | `<button>` | Botão "Entrar" no header |
| `.public-main` | `<main>` | Área de conteúdo principal — sem overflow constraint |
| `.ld-hero` | `<section>` | Hero — `min-height: calc(92vh - 64px)`, layout 2 colunas |
| `.ld-hero-glow` | `<div>` | Gradiente radial azul atrás do mascote |
| `.hero-image-wrap` | `<div>` | Wrapper com animação `float` 5,5s infinita |
| `.ld-btn-primary` | `<button>` | CTA com gradiente azul e box-shadow |
| `.ld-btn-ghost` | `<button>` | CTA secundário com borda sutil |
| `.ld-stats` | `<section>` | Barra de prova social com 4 números |
| `.ld-features` | `<section>` | Grid 2×2 de funcionalidades |
| `.ld-fcard--hero` | `<div>` | Card de destaque que ocupa as 2 colunas |
| `.ld-preview` | `<section>` | 3 mockups de janela da plataforma |
| `.ld-mwin` | `<div>` | Janela mockup com chrome bar e body |
| `.ld-mwin--center` | `<div>` | Janela central elevada (Beluginha IA) |
| `.ld-how` | `<section>` | 3 passos horizontais com conectores |
| `.ld-pricing` | `<section>` | 3 cards de plano (Free, Pro, Anual) |
| `.ld-plan--feat` | `<div>` | Card Pro elevado com badge e cor de destaque |
| `.ld-testi` | `<section>` | 3 depoimentos com avatares CSS |
| `.ld-final` | `<section>` | CTA final com Beluga flutuando |
| `.ld-footer` | `<footer>` | Rodapé com links, contato e copyright |

### Atributos de dados

Os links de ancoragem usam `data-scroll` para identificar o `id` da seção destino:

```html
<a href="javascript:void(0)" data-scroll="funcionalidades">Funcionalidades</a>
```

O JavaScript lê `el.dataset.scroll` e chama `getElementById(value)?.scrollIntoView({ behavior: 'smooth' })`.

---

## CSS

### Arquivos que estilizam esta tela

```
main.css
 └── base/variables.css      ← tokens globais (cores, fontes)
 └── base/reset.css          ← zeragem de margens
 └── base/global.css         ← tipografia e utilitários
 └── layout/page-layout.css  ← .layout / .content / .container
 └── pages/landing.css       ← estilos exclusivos da landing
```

---

### Modo público — `body.public-mode`

O router adiciona `public-mode` no `<body>` para todas as rotas públicas. Isso anula o layout padrão do app:

```css
body.public-mode .content       { padding: 0; }
body.public-mode #app.container { max-width: none; margin: 0; padding: 0; width: 100%; }
```

Sem essa classe, o `#app` teria `max-width: 1500px` e margens centradas das telas internas.

---

### Scroll liberado

A versão anterior travava a landing em `100vh` com `overflow: hidden`. Isso foi removido. A regra atual **libera scroll normal**:

```css
body.public-mode:has(.public:not(.auth)),
body.public-mode:has(.public:not(.auth)) .layout,
body.public-mode:has(.public:not(.auth)) .content {
  height: auto;
  min-height: 100vh;
  overflow: visible;
}
```

O seletor `:has(.public:not(.auth))` exclui login e cadastro (que usam `.public.auth`) — eles continuam sem restrição própria.

---

### Header sticky

```css
.public-header {
  position: sticky;
  top: 0;
  z-index: 200;
  background: rgba(6, 11, 28, 0.78);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease, background 0.3s ease;
}

.public-header.pub-hd--scrolled {
  background: rgba(6, 11, 28, 0.96);
  border-bottom-color: rgba(255, 255, 255, 0.07);
}
```

A classe `.pub-hd--scrolled` é adicionada via JavaScript quando `window.scrollY > 40`. Ao rolar, o header fica mais opaco e ganha uma linha inferior sutil.

---

### Hero

```css
.ld-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  min-height: calc(92vh - 64px);   /* quase tela cheia, descontando o header */
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 56px;
}
```

O highlight `em.ld-hl` usa gradient text:

```css
.ld-hl {
  font-style: normal;
  background: linear-gradient(90deg, #3b9edd, #7bc8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

O glow atrás do mascote:

```css
.ld-hero-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 420px; height: 420px;
  background: radial-gradient(circle, rgba(59, 158, 221, 0.14) 0%, transparent 68%);
  border-radius: 50%;
  pointer-events: none;
}
```

---

### Animação float (mascote)

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

O mascote sobe **18px** em ciclos de **5,5 segundos**. Presente no hero e no CTA final (`.ld-final-beluga`). O `will-change: transform` promove a camada para GPU.

---

### Grid de funcionalidades

```css
.ld-feat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* Beluginha IA ocupa as 2 colunas */
.ld-fcard--hero {
  grid-column: 1 / -1;
  display: flex;
  gap: 28px;
  background: rgba(59, 158, 221, 0.04);
  border-color: rgba(59, 158, 221, 0.18);
}
```

---

### Mockups de janela (preview)

Cada janela tem 2 partes: chrome (barra de topo com dots) e body (mini-UI):

```css
.ld-mchrome {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.ld-mdot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
```

A janela central (Beluginha IA) é elevada:

```css
.ld-mwin--center {
  transform: translateY(-16px);
  border-color: rgba(59, 158, 221, 0.22);
  box-shadow: 0 24px 72px rgba(59, 158, 221, 0.12);
}
```

Os elementos dentro do body são "blocos mudos" (`.ld-mb`) que simulam texto/conteúdo:

```css
.ld-mb       { display: block; border-radius: 4px; background: rgba(255, 255, 255, 0.1); }
.ld-mb--sm   { height: 7px; }
.ld-mb--md   { height: 9px; }
.ld-mb--lg   { height: 14px; }
```

---

### Cards de plano

```css
.ld-plan--feat {
  border-color: rgba(59, 158, 221, 0.35);
  background: rgba(59, 158, 221, 0.05);
  transform: translateY(-12px);     /* elevado em relação aos outros */
  box-shadow: 0 20px 60px rgba(59, 158, 221, 0.14);
}

.ld-plan-badge {
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #1e5f8a, #3b9edd);
  border-radius: 99px;
  padding: 4px 14px;
}
```

---

### Avatares de depoimento (CSS-only)

Os avatares são gerados puramente com CSS — sem imagens externas:

```html
<div class="ld-tcard-av" style="background: linear-gradient(135deg,#3b9edd,#1e5f8a)">MC</div>
```

```css
.ld-tcard-av {
  width: 38px; height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
  color: #fff;
}
```

Cada depoente tem um gradiente único (azul, roxo, verde).

---

### Responsividade

| Breakpoint | Principais ajustes |
|---|---|
| `≤ 1024px` | Padding lateral reduzido para 32px. Preview mostra apenas 2 janelas (terceira oculta). |
| `≤ 768px` | Hero vira coluna reversa (Beluga aparece acima). Grid de features passa para 1 coluna. How-it-works vira vertical. Pricing passa para 1 coluna. Footer empilha verticalmente. |

Em mobile, `.ld-plan--feat` e `.ld-mwin--center` perdem a elevação (`transform: none`) para evitar espaços desnecessários.

---

## JavaScript

### Arquivos que afetam esta tela

| Arquivo | Responsabilidade |
|---|---|
| `assets/js/app.js` | Registra a rota e vincula as funções |
| `assets/js/router.js` | Controla quando renderizar e proteção de rota |
| `assets/js/screens/landing.js` | `landingScreen()` e `landingInit()` |
| `assets/js/state/auth.js` | Verifica se o usuário está logado |

---

### Funções auxiliares (privadas)

O arquivo define 4 funções de apoio antes de `landingScreen()`:

```javascript
// Renderiza item de feature na lista de plano (check ou X)
function _feat(ok, label) { ... }

// Renderiza card de depoimento completo
function _testi(initials, color, name, role, text) { ... }

// Renderiza uma linha de matéria no mockup do dashboard
function _mockRow(color, width, pct) { ... }

// Renderiza uma opção de quiz no mockup
function _mockOpt(bg, bc, w) { ... }
```

Essas funções são usadas dentro de template literals com `${}` para evitar repetição de código no HTML gerado.

---

### `landingScreen()` — renderização

```javascript
export function landingScreen() {
  return `<div class="public" id="landing-root"> ... </div>`;
}
```

Função pura que retorna HTML como string. Usa as 4 funções auxiliares para gerar as listas de features dos planos, os cards de depoimento e os mockups.

---

### `landingInit()` — inicialização

```javascript
export function landingInit() {
  const goLogin = () => { window.location.hash = "#/login"; };

  // Todos os botões de conversão apontam para login
  ["cta-login", "cta-header", "cta-free", "cta-pro", "cta-anual", "cta-final"].forEach((id) => {
    document.getElementById(id)?.addEventListener("click", goLogin);
  });

  // CTA "Ver como funciona" ancora na seção de preview
  document.getElementById("cta-how")?.addEventListener("click", () => {
    document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" });
  });

  // Todos os links com data-scroll fazem scroll suave para o id correspondente
  document.querySelectorAll("[data-scroll]").forEach((el) => {
    el.addEventListener("click", () => {
      document.getElementById(el.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Scroll do window adiciona classe de estado no header
  const hd = document.getElementById("pub-hd");
  window.addEventListener("scroll", () => {
    hd?.classList.toggle("pub-hd--scrolled", window.scrollY > 40);
  }, { passive: true });
}
```

**Detalhes do scroll listener:**
- `{ passive: true }` — informa ao browser que o listener não chama `preventDefault()`, permitindo otimizações de performance no scroll.
- O listener persiste após a navegação para outra tela (sem cleanup), mas como `hd` referencia o elemento já removido do DOM, as chamadas são silenciosamente ignoradas.

---

### Eventos da tela

| Elemento | Evento | Ação |
|---|---|---|
| `#cta-login` | `click` | → `#/login` |
| `#cta-header` | `click` | → `#/login` |
| `#cta-free` | `click` | → `#/login` |
| `#cta-pro` | `click` | → `#/login` |
| `#cta-anual` | `click` | → `#/login` |
| `#cta-final` | `click` | → `#/login` |
| `#cta-how` | `click` | scroll suave → `#como-funciona` |
| `[data-scroll]` (nav + footer) | `click` | scroll suave → id correspondente |
| `window` | `scroll` | toggle `.pub-hd--scrolled` se `scrollY > 40` |
| `.hero-image-wrap` | — | float animation CSS — sem JS |
| `.ld-fcard`, `.ld-tcard`, `.ld-mwin` | hover | elevação CSS — sem JS |

---

### Seções com ancoragem — status

| Link nav | `data-scroll` | Seção alvo | Status |
|---|---|---|---|
| Funcionalidades | `funcionalidades` | `section.ld-features#funcionalidades` | Funciona |
| Preço | `preco` | `section.ld-pricing#preco` | Funciona |
| Contato | `contato` | `footer.ld-footer#contato` | Funciona |
| — | `como-funciona` | `section.ld-preview#como-funciona` | Funciona (via botão CTA e footer) |

Todos os 3 links do nav agora têm seções correspondentes. Os links do footer também usam `data-scroll` e são capturados pelo mesmo `querySelectorAll("[data-scroll]")`.

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
Vê: Header + Hero (Beluga flutuando)
       ↓
Pode interagir com:
  ├── "Começar grátis" / "Criar conta grátis" / "Assinar Pro" etc.
  │        → vai para #/login
  ├── "Ver como funciona"
  │        → scroll suave até #como-funciona (Preview)
  ├── Nav "Funcionalidades" → scroll até #funcionalidades
  ├── Nav "Preço"           → scroll até #preco
  └── Nav "Contato"         → scroll até #contato (footer)
```

### Proteção de rota

Se o usuário já estiver logado e tentar acessar `#/landing`, o router redireciona para o dashboard:

```javascript
if (logged && isPublic) {
  window.location.hash = "#/dashboard";
  return;
}
```

---

## Componentes Importantes

### Header sticky (`.public-header`)

- Usa `position: sticky; top: 0; z-index: 200`
- Tem backdrop-blur (`blur(16px)`) para efeito de vidro fosco
- Muda de opacidade ao rolar (`pub-hd--scrolled`)
- Presente somente em telas públicas — diferente do `topbar` das telas internas

### Mascote Beluga

- Imagem: `assets/images/BELUGA.png`
- Invertida horizontalmente: `transform: scaleX(-1)` (olha para o texto)
- Sombra: `filter: drop-shadow(0 24px 56px rgba(59,158,221,0.28))`
- Animação: `float 5.5s ease-in-out infinite` (+18px amplitude)
- Aparece **duas vezes**: no hero (340px) e no CTA final (120px)

### Mockups de preview (`.ld-mwin`)

Janelas com chrome bar colorida que simulam as telas reais do app:

| Janela | Conteúdo simulado |
|---|---|
| Dashboard | Avatar, barra XP, 3 stat cards, 3 barras de matéria |
| Beluginha IA | 4 mensagens alternadas user/AI com bubbles |
| Quiz | Barra de progresso, enunciado, 4 opções (1 selecionada) |

Os elementos internos são `div.ld-mb` (blocos de altura fixa e background sutil) sem texto real — apenas representações visuais.

### Planos (`.ld-plan`)

Três cards com feature lists geradas por `_feat(ok, label)`:
- `ok = true` → ícone check verde + texto normal
- `ok = false` → ícone X + texto com 25% de opacidade

O plano Pro fica `12px` acima dos outros (`transform: translateY(-12px)`) e tem badge "Mais popular" posicionado no topo.

### Depoimentos (`.ld-tcard`)

Avatares gerados com CSS (iniciais + gradiente de cor) — sem dependência de serviços externos como `pravatar.cc`.

---

## Como Modificar

### Alterar textos

| O que alterar | Onde | Função/linha |
|---|---|---|
| Tagline do hero | `landing.js` → `h1.ld-hero-h1` | `landingScreen()` |
| Palavra em destaque ("entende") | `landing.js` → `em.ld-hl` | `landingScreen()` |
| Subtítulo do hero | `landing.js` → `p.ld-hero-sub` | `landingScreen()` |
| Stats bar (números) | `landing.js` → `section.ld-stats` | `landingScreen()` |
| Títulos de funcionalidade | `landing.js` → `ld-fcard-h3` de cada card | `landingScreen()` |
| Preços dos planos | `landing.js` → `.ld-pamt` + `.ld-pcts` | `landingScreen()` |
| Features de cada plano | `landing.js` → `_feat(ok, label)` calls | `landingScreen()` |
| Depoimentos | `landing.js` → `_testi(...)` calls | `landingScreen()` |

### Alterar cores principais

| O que alterar | Onde | O que modificar |
|---|---|---|
| Cor primária (azul) | `landing.css` | Todas as ocorrências de `#3b9edd` |
| Gradiente do botão | `landing.css` → `.ld-btn-primary` | `background: linear-gradient(...)` |
| Highlight do h1 | `landing.css` → `.ld-hl` | `background: linear-gradient(...)` |
| Glow do hero | `landing.css` → `.ld-hero-glow` | `background: radial-gradient(...)` |
| Cor do fundo geral | `variables.css` | `--bg:` |

### Adicionar nova seção

1. Adicionar a `<section id="nome-da-secao">` no HTML de `landingScreen()` entre as seções existentes
2. Adicionar link no nav com `data-scroll="nome-da-secao"` — o JS captura automaticamente via `querySelectorAll("[data-scroll]")`
3. Adicionar estilos em `landing.css`

### Alterar animações

| O que alterar | Onde | O que modificar |
|---|---|---|
| Velocidade da flutuação | `landing.css` → `.hero-image-wrap` | `animation: float Xs` |
| Amplitude da flutuação | `landing.css` → `@keyframes float` | `translateY(-18px)` |
| Transição do header | `landing.css` → `.public-header` | `transition:` |
| Threshold do scroll | `landing.js` → `landingInit()` | `window.scrollY > 40` |

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
    ├── import router.js → startRouter()
    └── import landing.js
        ├── landingScreen()  → retorna HTML como string
        └── landingInit()    → registra eventos no DOM
```

### Componentes globais nesta tela

| Componente | Presente na Landing? | Motivo |
|---|---|---|
| Topbar (`#topbar`) | Não | Removida pelo router para rotas públicas |
| Beluginha IA (chat) | Não | Removida pelo router para rotas públicas |
| `.layout` / `.content` | Sim | Estrutura base do `index.html` |
| `body.public-mode` | Sim | Classe adicionada pelo router |

---

## Observações Técnicas

**Scroll no body, não em container filho:** O layout não tem `overflow: hidden` em nenhum ancestral da landing, então o scroll é no `window`. Por isso o scroll listener está em `window` e o header usa `position: sticky` (que sticks relativo ao viewport).

**Sem cleanup do scroll listener:** O `window.addEventListener('scroll', ...)` persiste após navegação. Como `hd` captura o elemento antes da navegação, as chamadas após o desmonte são silenciosas (`hd?.classList` não lança erro para elemento não conectado ao DOM).

**Template literals com funções:** O HTML gerado por `_feat()`, `_testi()`, `_mockRow()` e `_mockOpt()` é interpolado dentro do template literal principal com `${}`. Isso mantém o HTML limpo e evita repetição, mas significa que todo o HTML é regenerado a cada render da tela.

**Avatares sem dependência externa:** A versão anterior usava `pravatar.cc` (serviço externo de avatares aleatórios). A versão atual usa divs com iniciais e gradiente CSS — sem chamada de rede adicional, sem dependência de terceiros.
