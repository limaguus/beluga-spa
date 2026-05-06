/* =========================================================
   BELUGA – beluginha.js
   Assistente IA global — injeta automaticamente em qualquer página
   Integração futura: substituir _fetchAIResponse() por chamada à API
   ========================================================= */
(function () {
  "use strict";

  const INITIAL_MSG =
    "Percebi que você está com dificuldade em Cálculo I. Quer uma revisão rápida?";

  const MOCK_RESPONSES = [
    "Posso montar uma revisão rápida com videoaulas, exercícios e um quiz curto. Quer que eu faça isso?",
    "Vi que você tem uma entrega chegando. Quer transformar isso em uma sessão no seu plano de estudos?",
    "Seu desempenho em quizzes melhorou esta semana. Continue nesse ritmo! 📈",
    "Encontrei uma dúvida parecida no Fórum. Posso te direcionar para ela.",
    "Recomendo revisar esse assunto por 25 minutos hoje. Vou montar um resumo para você.",
    "Quer que eu crie um quiz rápido sobre esse tema? Leva menos de 5 minutos.",
    "Baseado no seu histórico, você aprende melhor com exemplos práticos. Posso buscar exercícios.",
    "Estou analisando seu desempenho... você foi melhor em Algoritmos do que esperado essa semana!",
  ];

  /* ── State ── */
  let chatOpen = false;
  let badgeVisible = true;

  /* ── Helpers ── */
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

  /* ── API hook (substituir em integração futura) ── */
  function _fetchAIResponse(userMessage, callback) {
    /* TODO: replace with real API call
       fetch('/api/ai/chat', {
         method: 'POST',
         body: JSON.stringify({ message: userMessage }),
         headers: { 'Content-Type': 'application/json' }
       }).then(r => r.json()).then(d => callback(d.reply));
    */
    const delay = 900 + Math.random() * 700;
    setTimeout(() => {
      callback(
        MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)],
      );
    }, delay);
  }

  /* ── Chat actions ── */
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

  /* ── Init ── */
  function init() {
    const fab = el("blg-fab");
    const close = el("blg-close");
    const send = el("blg-send");
    const input = el("blg-input");

    fab?.addEventListener("click", () => (chatOpen ? closeChat() : openChat()));
    close?.addEventListener("click", closeChat);
    send?.addEventListener("click", sendMessage);
    input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && chatOpen) closeChat();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
