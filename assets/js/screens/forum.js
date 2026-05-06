/* =========================================================
   BELUGA – forum.js
   Fórum de dúvidas acadêmicas
   ========================================================= */

const FORUM_QUESTIONS_MOCK = [
  {
    id: "q1",
    author: { name: "Ana Lima", initials: "AL", color: "#3b9edd" },
    title: "Qual a lógica por trás do algoritmo de busca binária?",
    content:
      "Estou tentando entender como funciona a busca binária, principalmente a parte em que o algoritmo descarta metade dos dados. Consigo fazer funcionar no código, mas ainda não entendi bem o porquê dessa lógica ser tão eficiente. Alguém pode explicar de forma simples ou com algum exemplo prático?",
    subject: "Algoritmos",
    timeLabel: "2 min atrás",
    status: "Aguardando",
    answerCount: 0,
    hasReminder: false,
    shared: false,
    showReply: false,
    answers: [],
  },
  {
    id: "q2",
    author: { name: "Marcos Vidal", initials: "MV", color: "#a855f7" },
    title: "Como os semáforos evitam condições de corrida?",
    content:
      "Na matéria de SO, o professor explicou sobre semáforos, mas fiquei confuso sobre como eles realmente impedem que duas threads acessem um recurso ao mesmo tempo. Alguém consegue explicar com um exemplo mais didático? Pode ser até usando analogia com a vida real!",
    subject: "Sistemas Operacionais",
    timeLabel: "2 dias atrás",
    status: "Respondida",
    answerCount: 3,
    hasReminder: false,
    shared: false,
    showReply: false,
    answers: [
      {
        id: "a2a",
        author: { name: "Rafaela Silva", initials: "PR", color: "#10b981" },
        text: "Pensa no semáforo como uma chave de banheiro: só um entra por vez. O lock() decrementa o contador e, se já for 0, a thread bloqueia. Quando a que está dentro termina, chama unlock() e acorda a próxima.",
        isMonitor: true,
      },
    ],
  },
  {
    id: "q3",
    author: { name: "Jerferson Alves", initials: "JA", color: "#f97316" },
    title: "Quando usar chave composta em vez de chave primária simples?",
    content:
      "Na aula de banco de dados, o professor falou sobre chaves compostas, mas fiquei confuso sobre quando realmente é necessário usá-las. Alguém tem um exemplo prático onde uma chave composta faz mais sentido do que uma chave primária simples?",
    subject: "Banco de Dados",
    timeLabel: "1 semana atrás",
    status: "Em análise",
    answerCount: 1,
    hasReminder: true,
    shared: false,
    showReply: false,
    answers: [],
  },
  {
    id: "q4",
    author: { name: "Beatriz Santos", initials: "BS", color: "#ec4899" },
    title: "Como interpretar uma derivada em um gráfico?",
    content:
      "Sei calcular derivadas, mas na prova caiu uma questão pedindo para interpretar geometricamente. Fiquei travado: derivada = taxa de variação, ok, mas como isso aparece visualmente no gráfico de uma função? Qual a relação com a reta tangente?",
    subject: "Cálculo",
    timeLabel: "3 dias atrás",
    status: "Respondida",
    answerCount: 4,
    hasReminder: false,
    shared: true,
    showReply: false,
    answers: [
      {
        id: "a4a",
        author: { name: "Lucas Melo", initials: "LM", color: "#3b9edd" },
        text: "A derivada em um ponto é o coeficiente angular da reta tangente à curva naquele ponto. Se f'(x) > 0, a função sobe; se f'(x) < 0, desce; se f'(x) = 0, pode ser máximo, mínimo ou inflexão.",
        isMonitor: true,
      },
    ],
  },
  {
    id: "q5",
    author: { name: "Caio Fernandes", initials: "CF", color: "#10b981" },
    title: "Qual a diferença entre UX e UI no Design de Interfaces?",
    content:
      "Sempre confundo os dois conceitos. Sei que UX é experiência do usuário e UI é interface, mas na prática o que cada área faz? Um designer precisa dominar os dois ou pode se especializar em apenas um?",
    subject: "Design de Interfaces",
    timeLabel: "5 dias atrás",
    status: "Aguardando",
    answerCount: 0,
    hasReminder: false,
    shared: false,
    showReply: false,
    answers: [],
  },
  {
    id: "q6",
    author: { name: "Vitória Rocha", initials: "VR", color: "#f59e0b" },
    title: "Como normalizar uma tabela no banco de dados?",
    content:
      "Estou na terceira forma normal e já entendi as duas primeiras, mas a 3FN ainda está confusa. A regra diz que não pode existir dependência transitiva, mas não consigo identificar quando isso está acontecendo em uma tabela. Alguém pode dar um exemplo concreto?",
    subject: "Banco de Dados",
    timeLabel: "4 dias atrás",
    status: "Em análise",
    answerCount: 2,
    hasReminder: false,
    shared: false,
    showReply: false,
    answers: [],
  },
];

const FORUM_STATS = {
  answeredThisWeek: 18,
  activeMonitors: 7,
  avgResponseTime: "4h",
  topSubject: "Banco de Dados",
};

const FORUM_CATEGORIES = [
  { name: "Banco de Dados", count: 12, color: "#3b9edd" },
  { name: "Algoritmos", count: 9, color: "#a855f7" },
  { name: "Cálculo", count: 8, color: "#f59e0b" },
  { name: "Sistemas Operacionais", count: 6, color: "#10b981" },
  { name: "Design de Interfaces", count: 4, color: "#ec4899" },
];

const SUBJECT_COLORS = {
  Algoritmos: "#3b9edd",
  "Sistemas Operacionais": "#10b981",
  "Banco de Dados": "#a855f7",
  Cálculo: "#f59e0b",
  "Design de Interfaces": "#ec4899",
  "Inovação e Tecnologia": "#f97316",
  Geral: "#6b7280",
};

/* ── Module state ── */
let forumState = {
  questions: FORUM_QUESTIONS_MOCK.map((q) => ({
    ...q,
    answers: q.answers.map((a) => ({ ...a })),
  })),
  candidated: false,
};

/* ── Helpers ── */
function frAvatar(initials, color, size = "md") {
  return `<div class="fr-avatar fr-avatar--${size}" style="background:${color}1a;border:2px solid ${color}55;color:${color}">${initials}</div>`;
}

function frSubjectTag(subject) {
  const color = SUBJECT_COLORS[subject] || "#3b9edd";
  return `<span class="fr-subject-tag" style="background:${color}18;color:${color};border-color:${color}33">${subject}</span>`;
}

function frStatusBadge(status) {
  const map = {
    Respondida: {
      cls: "fr-badge--answered",
      icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="10" height="10"><polyline points="2 8 6 12 14 4"/></svg>`,
    },
    "Em análise": {
      cls: "fr-badge--analysis",
      icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="10" height="10"><circle cx="8" cy="8" r="6"/><line x1="8" y1="5" x2="8" y2="8"/><line x1="8" y1="11" x2="8.01" y2="11"/></svg>`,
    },
    Aguardando: {
      cls: "fr-badge--waiting",
      icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="10" height="10"><circle cx="8" cy="8" r="6"/><polyline points="8 5 8 8 10 10"/></svg>`,
    },
  };
  const { cls, icon } = map[status] || map["Aguardando"];
  return `<span class="fr-badge ${cls}">${icon}${status}</span>`;
}

/* ── Question card ── */
function renderQuestion(q) {
  const answersHTML = q.answers.length
    ? `<div class="fr-answers">
        ${q.answers
          .map(
            (a) => `
          <div class="fr-answer">
            ${frAvatar(a.author.initials, a.author.color, "sm")}
            <div class="fr-answer-body">
              <div class="fr-answer-meta">
                <span class="fr-answer-name">${a.author.name}</span>
                ${a.isMonitor ? `<span class="fr-monitor-badge">Monitor</span>` : ""}
              </div>
              <p class="fr-answer-text">${a.text}</p>
            </div>
          </div>`,
          )
          .join("")}
       </div>`
    : "";

  const replyHTML = q.showReply
    ? `<div class="fr-reply-compose">
        <input class="fr-reply-input" data-id="${q.id}" placeholder="Escreva sua resposta como monitor..." />
        <button class="fr-reply-send" data-action="send-reply" data-id="${q.id}" title="Enviar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
       </div>`
    : "";

  return `
    <article class="fr-question${q.status === "Respondida" ? " fr-question--answered" : q.status === "Em análise" ? " fr-question--analysis" : ""}" data-id="${q.id}">
      <div class="fr-q-header">
        ${frAvatar(q.author.initials, q.author.color, "md")}
        <div class="fr-q-meta">
          <span class="fr-q-author">${q.author.name}</span>
          <span class="fr-q-time">${q.timeLabel}</span>
        </div>
        <div class="fr-q-tags">
          ${frSubjectTag(q.subject)}
          ${frStatusBadge(q.status)}
        </div>
      </div>

      <h3 class="fr-q-title">${q.title}</h3>
      <p class="fr-q-content">${q.content}</p>

      ${answersHTML}
      ${replyHTML}

      <div class="fr-q-footer">
        <span class="fr-answer-count">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          ${q.answerCount} resposta${q.answerCount !== 1 ? "s" : ""}
        </span>
        <div class="fr-q-actions">
          <button class="fr-action-btn${q.showReply ? " fr-action-btn--active" : ""}" data-action="reply" data-id="${q.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M3 10h10a8 8 0 0 1 8 8v2M3 10l6 6M3 10l6-6"/></svg>
            Responder
          </button>
          <button class="fr-action-btn${q.hasReminder ? " fr-action-btn--reminder" : ""}" data-action="reminder" data-id="${q.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            ${q.hasReminder ? "Lembrete ativo" : "Lembrete"}
          </button>
          <button class="fr-action-btn${q.shared ? " fr-action-btn--shared" : ""}" data-action="share" data-id="${q.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            ${q.shared ? "Compartilhado" : "Compartilhar"}
          </button>
        </div>
      </div>
    </article>`;
}

/* ── Sidebar (static HTML) ── */
function renderSidebar() {
  const cats = FORUM_CATEGORIES.map(
    (c) => `
    <div class="fr-cat-item">
      <span class="fr-cat-dot" style="background:${c.color}"></span>
      <span class="fr-cat-name">${c.name}</span>
      <span class="fr-cat-count">${c.count}</span>
    </div>`,
  ).join("");

  return `
    <aside class="fr-sidebar">
      <div class="fr-sidebar-card fr-monitor-card">
        <div class="fr-monitor-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <h4 class="fr-monitor-title">Seja um Monitor</h4>
        <p class="fr-monitor-desc">Monitores são alunos com alto desempenho em quizzes, horas de estudo e participação ativa. Ajude colegas respondendo dúvidas e fortaleça a comunidade BELUGA.</p>
        <ul class="fr-monitor-reqs">
          <li>
            <svg viewBox="0 0 16 16" fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="10" height="10"><polyline points="2 8 6 12 14 4"/></svg>
            Média ≥ 75% nos quizzes
          </li>
          <li>
            <svg viewBox="0 0 16 16" fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="10" height="10"><polyline points="2 8 6 12 14 4"/></svg>
            30+ horas estudadas
          </li>
          <li>
            <svg viewBox="0 0 16 16" fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="10" height="10"><polyline points="2 8 6 12 14 4"/></svg>
            Perfil completo no BELUGA
          </li>
        </ul>
        <button class="fr-candidate-btn" id="fr-candidate-btn" data-action="candidate">
          Candidatar-se a Monitor
        </button>
      </div>

      <div class="fr-sidebar-card">
        <p class="fr-card-label">Estatísticas do Fórum</p>
        <div class="fr-stats-grid">
          <div class="fr-stat-item">
            <span class="fr-stat-value fr-stat--blue">${FORUM_STATS.answeredThisWeek}</span>
            <span class="fr-stat-desc">respondidas<br>esta semana</span>
          </div>
          <div class="fr-stat-item">
            <span class="fr-stat-value fr-stat--green">${FORUM_STATS.activeMonitors}</span>
            <span class="fr-stat-desc">monitores<br>ativos</span>
          </div>
          <div class="fr-stat-item">
            <span class="fr-stat-value fr-stat--amber">${FORUM_STATS.avgResponseTime}</span>
            <span class="fr-stat-desc">tempo médio<br>de resposta</span>
          </div>
          <div class="fr-stat-item">
            <span class="fr-stat-value fr-stat--icon">📚</span>
            <span class="fr-stat-desc">${FORUM_STATS.topSubject}</span>
          </div>
        </div>
      </div>

      <div class="fr-sidebar-card">
        <p class="fr-card-label">Mais Perguntadas</p>
        <div class="fr-categories">${cats}</div>
      </div>
    </aside>`;
}

/* ── Render ── */
export function forumScreen() {
  const questionsHTML = forumState.questions.map(renderQuestion).join("");

  return `
    <div class="fr-page">
      <div class="fr-heading-area">
        <h1 class="fr-title">Fórum</h1>
        <p class="fr-subtitle">Interaja, compartilhe conhecimento e tire dúvidas.</p>
      </div>

      <div class="fr-layout">
        <div class="fr-main">
          <div class="fr-composer">
            <textarea class="fr-composer-textarea" id="fr-question-input"
              placeholder="Escreva sua pergunta ou dúvida acadêmica..."
              rows="1"></textarea>
            <div class="fr-composer-footer">
              <span class="fr-composer-hint">Seja claro e específico — perguntas detalhadas recebem respostas mais rápido.</span>
              <button class="fr-post-btn button button-primary" id="fr-post-btn">Postar</button>
            </div>
          </div>

          <div class="fr-list" id="fr-list">
            ${questionsHTML}
          </div>
        </div>

        ${renderSidebar()}
      </div>
    </div>`;
}

/* ── Private helpers ── */
function _rerender() {
  const list = document.getElementById("fr-list");
  if (list) list.innerHTML = forumState.questions.map(renderQuestion).join("");
}

function _handleReply(id) {
  const q = forumState.questions.find((q) => q.id === id);
  if (!q) return;
  q.showReply = !q.showReply;
  _rerender();
  if (q.showReply) {
    const input = document.querySelector(`.fr-reply-input[data-id="${id}"]`);
    if (input) input.focus();
  }
}

function _handleReminder(id) {
  const q = forumState.questions.find((q) => q.id === id);
  if (!q) return;
  q.hasReminder = !q.hasReminder;
  _rerender();
}

function _handleShare(id) {
  const q = forumState.questions.find((q) => q.id === id);
  if (!q || q.shared) return;
  q.shared = true;
  _rerender();
}

function _sendReply(id) {
  const input = document.querySelector(`.fr-reply-input[data-id="${id}"]`);
  const q = forumState.questions.find((q) => q.id === id);
  if (!input || !q) return;
  const text = input.value.trim();
  if (!text) return;
  q.answers.push({
    id: `a-${Date.now()}`,
    author: { name: "Você (Monitor)", initials: "VO", color: "#3b9edd" },
    text,
    isMonitor: true,
  });
  q.answerCount = q.answers.length;
  q.status = "Respondida";
  q.showReply = false;
  _rerender();
}

function _handleCandidate() {
  if (forumState.candidated) return;
  forumState.candidated = true;
  const btn = document.getElementById("fr-candidate-btn");
  if (btn) {
    btn.textContent = "Candidatura enviada!";
    btn.classList.add("fr-candidate-btn--done");
    btn.disabled = true;
  }
}

function _postNewQuestion(text) {
  const colors = [
    "#3b9edd",
    "#a855f7",
    "#f97316",
    "#10b981",
    "#f59e0b",
    "#ec4899",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  forumState.questions.unshift({
    id: `q-${Date.now()}`,
    author: { name: "Você", initials: "VO", color },
    title: text.length > 90 ? text.slice(0, 90) + "…" : text,
    content: text,
    subject: "Geral",
    timeLabel: "agora",
    status: "Aguardando",
    answerCount: 0,
    hasReminder: false,
    shared: false,
    showReply: false,
    answers: [],
  });
  _rerender();
}

/* ── Init ── */
export function forumInit() {
  const textarea = document.getElementById("fr-question-input");
  if (textarea) {
    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    });
  }

  document.getElementById("fr-post-btn")?.addEventListener("click", () => {
    const text = textarea?.value.trim();
    if (!text) {
      textarea?.classList.add("fr-shake");
      setTimeout(() => textarea?.classList.remove("fr-shake"), 400);
      return;
    }
    _postNewQuestion(text);
    if (textarea) {
      textarea.value = "";
      textarea.style.height = "auto";
    }
  });

  const candidateBtn = document.getElementById("fr-candidate-btn");
  if (candidateBtn) {
    candidateBtn.addEventListener("click", _handleCandidate);
    if (forumState.candidated) {
      candidateBtn.textContent = "Candidatura enviada!";
      candidateBtn.classList.add("fr-candidate-btn--done");
      candidateBtn.disabled = true;
    }
  }

  const list = document.getElementById("fr-list");
  if (!list) return;

  list.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const { action, id } = btn.dataset;
    if (action === "reply") _handleReply(id);
    else if (action === "reminder") _handleReminder(id);
    else if (action === "share") _handleShare(id);
    else if (action === "send-reply") _sendReply(id);
  });

  list.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.classList.contains("fr-reply-input")) {
      _sendReply(e.target.dataset.id);
    }
  });
}
