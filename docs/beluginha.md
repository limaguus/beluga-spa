# Componente: Beluginha IA

> **Tipo:** Componente global — presente em todas as páginas privadas
> **Arquivo JS:** `assets/js/screens/beluginha.js`
> **Arquivo CSS:** `assets/css/components/beluginha-ia.css`

---

## Estrutura do Componente

### Objetivo

Chat flutuante de assistente acadêmico (Belugin-IA). Injetado dinamicamente no `<body>` após login, removido ao sair. O botão flutuante (FAB) fica fixo no canto inferior direito; ao clicar, abre um modal de chat centralizado com backdrop blur. Respostas são simuladas com mock data.

### Organização visual

```
[PÁGINA PRIVADA]
                            ┌─────────────────────────────────┐
                            │  HEADER                          │
                            │  ● Belugin - IA  Assistente...  │
                            │             [Online ●]   [✕]   │
                            ├─────────────────────────────────┤
                            │  MESSAGES                        │
                            │  ┌─────────────────────────┐   │
                            │  │ Percebi que você está    │   │  ← bot
                            │  │ com dificuldade em...    │   │
                            │  └─────────────────────────┘   │
                            │            ┌──────────────────┐ │
                            │            │ mensagem do user │ │  ← user
                            │            └──────────────────┘ │
                            │  ┌───────────────────────────┐  │
                            │  │ ● ● ●  (typing...)        │  │  ← typing
                            │  └───────────────────────────┘  │
                            ├─────────────────────────────────┤
                            │  [Escreva algo…]          [▶]   │
                            └─────────────────────────────────┘

[▼ canto inferior direito: FAB com badge vermelho]
```

---

## HTML

### Hierarquia completa

```
body
├── ... (conteúdo da página)
│
├── button#blg-fab.blg-fab          ← FAB (floating action button)
│   ├── img.blg-fab-img             ← BELUGA.png espelhado (scaleX(-1))
│   └── span#blg-badge.blg-badge   ← badge vermelho (notificação)
│
└── div#blg-chat.blg-chat[hidden]   ← overlay + modal
    └── div.blg-chat-window         ← janela do chat
        ├── div.blg-head            ← cabeçalho
        │   ├── div.blg-head-left
        │   │   ├── img.blg-head-avatar
        │   │   └── div.blg-head-info
        │   │       ├── span.blg-head-name    ← "Belugin - IA"
        │   │       └── span.blg-head-sub     ← "Assistente acadêmico"
        │   └── div.blg-head-right
        │       ├── span.blg-online-dot       ← bolinha verde pulsante
        │       ├── span.blg-online-label     ← "Online"
        │       └── button#blg-close.blg-close-btn  ← X para fechar
        ├── div#blg-messages.blg-messages     ← área scrollável
        │   └── div.blg-msg.blg-msg--bot      ← mensagem inicial (hardcoded no HTML)
        │       └── span.blg-bubble
        └── div.blg-compose                   ← área de digitação
            ├── input#blg-input.blg-input
            └── button#blg-send.blg-send      ← ícone de envio
```

### Classes importantes

| Classe                | Elemento   | Função                                                            |
| --------------------- | ---------- | ----------------------------------------------------------------- |
| `.blg-fab`            | `<button>` | FAB fixo `bottom: 28px; right: 28px`, z-index 700, animação pulse |
| `.blg-fab-img`        | `<img>`    | Imagem do beluga `38×38px`, `scaleX(-1)` (espelhada)              |
| `.blg-badge`          | `<span>`   | Bolinha vermelha `13×13px` no canto superior direito do FAB       |
| `.blg-chat`           | `<div>`    | Overlay fullscreen, `display: none` por padrão                    |
| `.blg-chat.blg-open`  | `<div>`    | `display: flex` + animação `blg-overlay-in`                       |
| `.blg-chat-window`    | `<div>`    | Modal `580×680px`, flex coluna, centralizado                      |
| `.blg-head`           | `<div>`    | Header do chat, fundo `rgba(59,158,221,0.08)`                     |
| `.blg-online-dot`     | `<span>`   | Círculo verde `#10b981` com glow                                  |
| `.blg-messages`       | `<div>`    | Área scrollável, `flex: 1`, `gap: 10px`                           |
| `.blg-msg--bot`       | `<div>`    | Alinhado à esquerda (`align-self: flex-start`)                    |
| `.blg-msg--user`      | `<div>`    | Alinhado à direita (`align-self: flex-end`)                       |
| `.blg-bubble--typing` | `<span>`   | Bubble dos pontos de digitação                                    |
| `.blg-dots span`      | `<span>`   | Pontos animados com `blg-dot` e delays escalonados                |
| `.blg-compose`        | `<div>`    | Rodapé com input + botão, `flex-shrink: 0`                        |
| `.blg-send`           | `<button>` | Botão de envio `36×36px`, azul                                    |

---

## CSS

### Arquivos que estilizam este componente

```
main.css
 └── components/beluginha-ia.css  ← todos os estilos exclusivos (prefixo blg-)
```

### FAB com animação pulse

```css
.blg-fab {
  animation: blg-pulse 3s ease-in-out infinite;
}

@keyframes blg-pulse {
  0%,
  100% {
    box-shadow:
      0 4px 20px rgba(0, 0, 0, 0.4),
      0 0 0 0 rgba(59, 158, 221, 0.3);
  }
  50% {
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.5),
      0 0 0 8px rgba(59, 158, 221, 0);
  }
}

.blg-fab:hover {
  animation: none;
} /* para o pulse no hover */
```

O segundo `box-shadow` cria um anel azul que cresce de `0` para `8px` e depois volta — efeito de "batimento". Hover desativa a animação para não competir com o scale.

### Modal com spring animation

```css
@keyframes blg-modal-in {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(24px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.blg-chat-window {
  animation: blg-modal-in 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

`cubic-bezier(0.34, 1.56, 0.64, 1)` é uma curva spring — ultrapassa levemente o valor final antes de estabilizar, dando sensação de elasticidade.

### Typing dots com delays escalonados

```css
.blg-dots span {
  animation: blg-dot 1.2s ease-in-out infinite;
}
.blg-dots span:nth-child(2) {
  animation-delay: 0.2s;
}
.blg-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blg-dot {
  0%,
  80%,
  100% {
    transform: scale(0.7);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
```

Três pontos com atraso de 0.2s entre si criam o efeito de onda progressiva.

### Distinção visual bot vs user

```css
.blg-msg--bot .blg-bubble {
  background: rgba(59, 158, 221, 0.12);
  border: 1px solid rgba(59, 158, 221, 0.2);
  border-bottom-left-radius: 4px; /* "cauda" no lado esquerdo */
}
.blg-msg--user .blg-bubble {
  background: rgba(59, 158, 221, 0.25);
  border: 1px solid rgba(59, 158, 221, 0.35);
  border-bottom-right-radius: 4px; /* "cauda" no lado direito */
}
```

O bubble do bot tem fundo mais escuro; o do usuário tem fundo mais opaco. A "cauda" é o raio reduzido no canto oposto ao alinhamento.

### Ocultar em páginas públicas

```css
body.public-mode .blg-fab,
body.public-mode .blg-chat {
  display: none !important;
}
```

O router adiciona `body.public-mode` em páginas públicas como login/landing. O componente não é injetado nelas (ver `injectBeluginha`), mas essa regra serve como proteção extra.

### Responsive

```css
@media (max-width: 640px) {
  .blg-chat-window {
    width: 90vw;
    height: 85vh;
  }
  .blg-fab {
    right: 16px;
    bottom: 16px;
  }
}
```

Em mobile a janela ocupa quase toda a tela e o FAB se aproxima das bordas.

---

## JavaScript

### Estado do módulo

```javascript
let chatOpen = false;
let badgeVisible = true;
```

Ambas as variáveis são de módulo — persistem entre aberturas do chat mas são **resetadas** em `injectBeluginha()` a cada injeção (nova visita a página privada).

### `MOCK_RESPONSES` — 8 respostas hardcoded

Array com respostas simuladas do assistente. `_fetchAIResponse()` escolhe uma aleatoriamente com delay de 900–1600ms.

```javascript
function _fetchAIResponse(_msg, callback) {
  const delay = 900 + Math.random() * 700;
  setTimeout(
    () =>
      callback(
        MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)],
      ),
    delay,
  );
}
```

O parâmetro `_msg` é recebido mas **não utilizado** — a resposta é sempre aleatória independente do input. Prefixo `_` indica que foi reservado para futura integração real.

### `addMessage(from, text)`

```javascript
function addMessage(from, text) {
  const wrap = document.createElement("div");
  wrap.className = `blg-msg blg-msg--${from}`; // "bot" ou "user"
  const bubble = document.createElement("span");
  bubble.className = "blg-bubble";
  bubble.textContent = text; // textContent (seguro contra XSS)
  wrap.appendChild(bubble);
  msgs.appendChild(wrap);
  scrollMessages();
}
```

Usa `textContent` (não `innerHTML`) — seguro contra XSS no input do usuário.

### `showTyping()` / `hideTyping()`

```javascript
function showTyping() {
  wrap.id = "blg-typing";
  wrap.innerHTML = `<span class="blg-bubble blg-bubble--typing">
    <span class="blg-dots"><span/><span/><span/></span>
  </span>`;
  msgs.appendChild(wrap);
  scrollMessages();
}

function hideTyping() {
  el("blg-typing")?.remove();
}
```

O elemento de typing recebe `id="blg-typing"` para poder ser encontrado e removido. Usa `innerHTML` porque o conteúdo é HTML estático, não input do usuário.

### Fluxo de envio

```
sendMessage()
  ↓ addMessage("user", text)        → exibe mensagem do usuário
  ↓ input.value = ""                → limpa o campo
  ↓ showTyping()                    → mostra pontos animados
  ↓ _fetchAIResponse(text, reply => {
      hideTyping()                  → remove os pontos
      addMessage("bot", reply)      → exibe resposta
    })
```

### `openChat()` — comportamento do badge

```javascript
function openChat() {
  chatOpen = true;
  chat.classList.add("blg-open");
  chat.removeAttribute("aria-hidden");
  if (badgeVisible) {
    badgeVisible = false;
    badge.style.display = "none"; // badge some permanentemente após abrir
  }
  el("blg-input")?.focus();
  scrollMessages();
}
```

O badge vermelho some na **primeira** abertura do chat e nunca mais volta (`badgeVisible = false` é permanente enquanto o componente estiver injetado).

### `injectBeluginha()` — ponto de entrada

```javascript
export function injectBeluginha() {
  if (document.getElementById("blg-fab")) return; // idempotente
  chatOpen = false;
  badgeVisible = true;
  document.body.insertAdjacentHTML("beforeend", BELUGINHA_HTML);
  _attachListeners();
}
```

A verificação `getElementById("blg-fab")` garante que não injeta duas vezes. Reseta o estado a cada injeção.

### `removeBeluginha()` — limpeza

```javascript
export function removeBeluginha() {
  el("blg-fab")?.remove();
  el("blg-chat")?.remove();
}
```

Remove os dois elementos do DOM. Chamado pelo router ao sair de páginas privadas.

### Eventos

| Elemento     | Evento           | Ação                                          |
| ------------ | ---------------- | --------------------------------------------- |
| `#blg-fab`   | `click`          | Toggle: `chatOpen ? closeChat() : openChat()` |
| `#blg-close` | `click`          | `closeChat()`                                 |
| `#blg-send`  | `click`          | `sendMessage()`                               |
| `#blg-input` | `keydown Enter`  | `sendMessage()` (com `e.preventDefault()`)    |
| `document`   | `keydown Escape` | `closeChat()` se `chatOpen`                   |

O listener de Escape no `document` **nunca é removido** — mesma questão do notificacoes.js. Como o componente é reinjetado a cada login, os listeners se acumulam entre sessões. Na prática não causa problemas porque o `if (chatOpen)` filtra os disparos.

---

## Fluxo do Componente

```
Router entra em página privada
  ↓ injectBeluginha()
  ↓ BELUGINHA_HTML inserido no <body>
  ↓ badge vermelho visível no FAB
       ↓
Usuário clica FAB
  ↓ openChat() → .blg-open, badge some, foco no input
       ↓
Usuário digita e pressiona Enter (ou clica enviar)
  ↓ sendMessage()
  ↓ addMessage("user", ...) → mensagem aparece à direita
  ↓ showTyping() → pontos animados aparecem
  ↓ (900–1600ms depois)
  ↓ hideTyping() → pontos somem
  ↓ addMessage("bot", ...) → resposta aleatória à esquerda
       ↓
Usuário pressiona Escape ou clica X
  ↓ closeChat() → remove .blg-open, aria-hidden restaurado
       ↓
Router sai da página privada
  ↓ removeBeluginha() → FAB e overlay removidos do DOM
```

---

## Como Modificar no Futuro

### Integrar com API real

```javascript
async function _fetchAIResponse(msg, callback) {
  const res = await fetch("/api/ai/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg }),
  });
  const data = await res.json();
  callback(data.reply);
}
```

Substitui o `setTimeout` por `fetch`. O parâmetro `_msg` (atualmente ignorado) passa a ser usado.

### Remover o listener de Escape ao desmontar

```javascript
const escHandler = (e) => {
  if (e.key === "Escape" && chatOpen) closeChat();
};

export function injectBeluginha() {
  document.addEventListener("keydown", escHandler);
  // ...
}

export function removeBeluginha() {
  document.removeEventListener("keydown", escHandler);
  // ...
}
```

### Persistir histórico de mensagens

```javascript
const KEY = "beluga_chat_history";

function saveHistory() {
  const msgs = [...document.querySelectorAll(".blg-msg")].map((m) => ({
    from: m.classList.contains("blg-msg--bot") ? "bot" : "user",
    text: m.querySelector(".blg-bubble").textContent,
  }));
  localStorage.setItem(KEY, JSON.stringify(msgs));
}
```

---

## Relação Entre Arquivos

```
assets/js/screens/beluginha.js
 └── MOCK_RESPONSES (local — 8 strings)
 └── BELUGINHA_HTML (template string — injetado no body)
 └── chatOpen, badgeVisible (estado de módulo)
 └── exporta: injectBeluginha(), removeBeluginha()
```

### Quem chama este componente

| Arquivo                   | Como usa                                                           |
| ------------------------- | ------------------------------------------------------------------ |
| `router.js`               | `injectBeluginha()` em rotas privadas, `removeBeluginha()` ao sair |
| Todas as páginas privadas | Componente presente via injeção do router                          |

### Componentes globais

| Componente                      | Presente?                                |
| ------------------------------- | ---------------------------------------- |
| Topbar                          | Não (componente independente)            |
| `body.public-mode` (CSS guard)  | **Sim** — CSS oculta em páginas públicas |
| `aria-hidden` / `role="dialog"` | **Sim** — acessibilidade implementada    |
