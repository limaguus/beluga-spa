/* =========================================================
   BELUGA – beluginha.js
   Só injetado em páginas privadas (após login).
   Exporta injectBeluginha() e removeBeluginha() para o router.
   ========================================================= */

const MOCK_RESPONSES = [
  "Posso montar uma revisão rápida com videoaulas, exercícios e um quiz curto. Quer que eu faça isso?",
  "Vi que você tem uma entrega chegando. Quer transformar isso em uma sessão no seu plano de estudos?",
  "Seu desempenho em quizzes melhorou esta semana. Continue nesse ritmo!",
  "Encontrei uma dúvida parecida no Fórum. Posso te direcionar para ela.",
  "Recomendo revisar esse assunto por 25 minutos hoje. Vou montar um resumo para você.",
  "Quer que eu crie um quiz rápido sobre esse tema? Leva menos de 5 minutos.",
  "Baseado no seu histórico, você aprende melhor com exemplos práticos. Posso buscar exercícios.",
  "Estou analisando seu desempenho... você foi melhor em Algoritmos do que esperado essa semana!",
];

const BELUGINHA_HTML = `
<button
  type="button"
  class="blg-fab"
  id="blg-fab"
  title="Belugin-IA"
  aria-label="Abrir assistente Belugin-IA"
>
  <img src="assets/images/BELUGA.png" alt="Beluginha" class="blg-fab-img" />
  <span class="blg-badge" id="blg-badge" aria-hidden="true"></span>
</button>

<div
  class="blg-chat"
  id="blg-chat"
  hidden
  aria-hidden="true"
  role="dialog"
  aria-label="Beluginha IA"
>
  <div class="blg-chat-window">
    <div class="blg-head">
      <div class="blg-head-left">
        <img src="assets/images/BELUGA.png" class="blg-head-avatar" alt="Beluginha" />
        <div class="blg-head-info">
          <span class="blg-head-name">Belugin - IA</span>
          <span class="blg-head-sub">Assistente acadêmico</span>
        </div>
      </div>
      <div class="blg-head-right">
        <span class="blg-online-dot" aria-hidden="true"></span>
        <span class="blg-online-label">Online</span>
        <button type="button" class="blg-close-btn" id="blg-close" aria-label="Fechar chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
               stroke-linecap="round" stroke-linejoin="round" width="15" height="15">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>

    <div class="blg-messages" id="blg-messages">
      <div class="blg-msg blg-msg--bot">
        <span class="blg-bubble">Percebi que você está com dificuldade em Cálculo I. Quer uma revisão rápida?</span>
      </div>
    </div>

    <div class="blg-compose">
      <input
        class="blg-input"
        id="blg-input"
        placeholder="Escreva algo…"
        autocomplete="off"
        aria-label="Mensagem para Beluginha IA"
      />
      <button type="button" class="blg-send" id="blg-send" aria-label="Enviar mensagem">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round" width="15" height="15">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  </div>
</div>
`;

/* ── State ── */
let chatOpen = false;
let badgeVisible = true;

function el(id) {
  return document.getElementById(id);
}

function scrollMessages() {
  const msgs = el("blg-messages");
  if (msgs) msgs.scrollTop = msgs.scrollHeight;
}

function addMessage(from, text) {
  const msgs = el("blg-messages");
  if (!msgs) return;
  const wrap = document.createElement("div");
  wrap.className = `blg-msg blg-msg--${from}`;
  const bubble = document.createElement("span");
  bubble.className = "blg-bubble";
  bubble.textContent = text;
  wrap.appendChild(bubble);
  msgs.appendChild(wrap);
  scrollMessages();
}

function showTyping() {
  const msgs = el("blg-messages");
  if (!msgs) return;
  const wrap = document.createElement("div");
  wrap.className = "blg-msg blg-msg--bot";
  wrap.id = "blg-typing";
  wrap.innerHTML = `<span class="blg-bubble blg-bubble--typing"><span class="blg-dots"><span></span><span></span><span></span></span></span>`;
  msgs.appendChild(wrap);
  scrollMessages();
}

function hideTyping() {
  el("blg-typing")?.remove();
}

function _fetchAIResponse(_msg, callback) {
  const delay = 900 + Math.random() * 700;
  setTimeout(
    () => callback(MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]),
    delay,
  );
}

function openChat() {
  chatOpen = true;
  const chat = el("blg-chat");
  if (!chat) return;
  chat.classList.add("blg-open");
  chat.removeAttribute("aria-hidden");
  if (badgeVisible) {
    badgeVisible = false;
    const badge = el("blg-badge");
    if (badge) badge.style.display = "none";
  }
  el("blg-input")?.focus();
  scrollMessages();
}

function closeChat() {
  chatOpen = false;
  const chat = el("blg-chat");
  if (!chat) return;
  chat.classList.remove("blg-open");
  chat.setAttribute("aria-hidden", "true");
}

function sendMessage() {
  const input = el("blg-input");
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  addMessage("user", text);
  input.value = "";
  showTyping();
  _fetchAIResponse(text, (reply) => {
    hideTyping();
    addMessage("bot", reply);
  });
}

function _attachListeners() {
  el("blg-fab")?.addEventListener("click", () => (chatOpen ? closeChat() : openChat()));
  el("blg-close")?.addEventListener("click", closeChat);
  el("blg-send")?.addEventListener("click", sendMessage);
  el("blg-input")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatOpen) closeChat();
  });
}

/* ── API pública ── */

export function injectBeluginha() {
  if (document.getElementById("blg-fab")) return;
  chatOpen = false;
  badgeVisible = true;
  document.body.insertAdjacentHTML("beforeend", BELUGINHA_HTML);
  _attachListeners();
}

export function removeBeluginha() {
  el("blg-fab")?.remove();
  el("blg-chat")?.remove();
}
