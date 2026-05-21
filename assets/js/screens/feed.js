import { initUserProfileModal } from "../components/userProfileModal.js";

/* =========================================================
   BELUGA – feed.js  |  Comunidade Acadêmica
   ========================================================= */

// ─── Current User ─────────────────────────────────────────
const FEED_ME = { name: "Jimmy", initials: "JM", color: "#2b719c" };

// ─── Mock Posts ──────────────────────────────────────────
const FEED_POSTS_MOCK = [
  {
    id: 1,
    author: { name: "Maria Cláudia", initials: "MC", color: "#7c6ef8" },
    timeLabel: "2h atrás",
    content:
      "Estudei 2 horas de derivada hoje, tô começando a entender melhor! A regra da cadeia finalmente fez sentido depois de uns 10 exemplos.",
    subject: "Cálculo",
    studyHours: 2,
    reactions: { neuronioOuro: 14, repost: 4, comments: 6 },
    liked: false,
    reposted: false,
    showComments: false,
    comments: [
      {
        author: "André Sanches",
        initials: "AS",
        color: "#f97316",
        text: "Boa! Derivada é complicada no início mesmo, continue assim.",
      },
      {
        author: "Laura Silva",
        initials: "LS",
        color: "#22c55e",
        text: "Bora que bora! 🧠",
      },
    ],
  },
  {
    id: 2,
    author: { name: "José Antônio", initials: "JA", color: "#3b9edd" },
    timeLabel: "3h atrás",
    content:
      "Revisei os conteúdos de Sistemas Operacionais e finalmente entendi escalonamento de processos. Valeu muito a pena rever as aulas antes da prova!",
    subject: "Sistemas Operacionais",
    studyHours: 1.5,
    reactions: { neuronioOuro: 8, repost: 2, comments: 3 },
    liked: false,
    reposted: false,
    showComments: false,
    comments: [
      {
        author: "Maria Cláudia",
        initials: "MC",
        color: "#7c6ef8",
        text: "Escalonamento é um dos meus tópicos favoritos!",
      },
    ],
  },
  {
    id: 3,
    author: { name: "André Sanches", initials: "AS", color: "#f97316" },
    timeLabel: "4h atrás",
    content:
      "Bati meu recorde pessoal: 3 horas de Design de Interfaces hoje! Começou a fazer muito sentido depois da aula sobre heurísticas de Nielsen. Semana produtiva.",
    subject: "Design de Interfaces",
    studyHours: 3,
    reactions: { neuronioOuro: 22, repost: 7, comments: 9 },
    liked: false,
    reposted: false,
    showComments: false,
    comments: [],
  },
  {
    id: 4,
    author: { name: "Laura Silva", initials: "LS", color: "#22c55e" },
    timeLabel: "5h atrás",
    content:
      "Fiz o quiz de Algoritmos e acertei 8/10! Errei as questões de complexidade de tempo, mas já sei exatamente onde estudar mais. Progresso é progresso.",
    subject: "Algoritmos",
    studyHours: null,
    reactions: { neuronioOuro: 17, repost: 5, comments: 4 },
    liked: false,
    reposted: false,
    showComments: false,
    comments: [],
  },
  {
    id: 5,
    author: { name: "Mariana Assis", initials: "MA", color: "#a78bfa" },
    timeLabel: "6h atrás",
    content:
      "Banco de Dados me venceu hoje... mas amanhã eu volto com tudo. Normalização de tabelas ainda me confunde um pouco, mas não vou desistir.",
    subject: "Banco de Dados",
    studyHours: 1,
    reactions: { neuronioOuro: 31, repost: 12, comments: 14 },
    liked: false,
    reposted: false,
    showComments: false,
    comments: [
      {
        author: "José Antônio",
        initials: "JA",
        color: "#3b9edd",
        text: "Normalização é complicada mesmo, vai com calma! 💪",
      },
      {
        author: "André Sanches",
        initials: "AS",
        color: "#f97316",
        text: "Amanhã você arrasa. Conta comigo!",
      },
    ],
  },
  {
    id: 6,
    author: { name: "Carlos Eduardo", initials: "CE", color: "#06b6d4" },
    timeLabel: "8h atrás",
    content:
      "Terminei meu plano de estudos da semana! Foram 11 horas no total, distribuídas em 5 disciplinas. Organização faz toda a diferença.",
    subject: null,
    studyHours: 11,
    reactions: { neuronioOuro: 45, repost: 18, comments: 11 },
    liked: false,
    reposted: false,
    showComments: false,
    comments: [],
  },
  {
    id: 7,
    author: { name: "Fernanda Lima", initials: "FL", color: "#f59e0b" },
    timeLabel: "10h atrás",
    content:
      "Assisti duas aulas de Inovação e Tecnologia e fiquei inspirada com o conteúdo sobre startups universitárias. Quero muito aplicar isso no TCC!",
    subject: "Inovação e Tecnologia",
    studyHours: 1.5,
    reactions: { neuronioOuro: 19, repost: 6, comments: 7 },
    liked: false,
    reposted: false,
    showComments: false,
    comments: [],
  },
  {
    id: 8,
    author: { name: "Rafael Torres", initials: "RT", color: "#ec4899" },
    timeLabel: "12h atrás",
    content:
      "Pratiquei exercícios de lógica por 40 minutos hoje. Parece pouco, mas consistência bate intensidade. Faz 21 dias seguidos estudando!",
    subject: "Lógica de Programação",
    studyHours: 0.7,
    reactions: { neuronioOuro: 28, repost: 9, comments: 5 },
    liked: false,
    reposted: false,
    showComments: false,
    comments: [],
  },
  {
    id: 9,
    author: { name: "Ana Beatriz", initials: "AB", color: "#84cc16" },
    timeLabel: "1d atrás",
    content:
      "Semana pesada de provas, mas consegui manter a sequência de estudos. Às vezes é sobre resistir, não sobre ser perfeito. Sigamos.",
    subject: null,
    studyHours: 8,
    reactions: { neuronioOuro: 52, repost: 23, comments: 17 },
    liked: false,
    reposted: false,
    showComments: false,
    comments: [
      {
        author: "Fernanda Lima",
        initials: "FL",
        color: "#f59e0b",
        text: "Isso! Consistência é tudo 🔥",
      },
    ],
  },
  {
    id: 10,
    author: { name: "Lucas Mendes", initials: "LM", color: "#14b8a6" },
    timeLabel: "1d atrás",
    content:
      "Hoje entrei no Beluga pela primeira vez e já organizei toda minha grade no Plano de Estudos. A plataforma é incrível, recomendo demais!",
    subject: null,
    studyHours: null,
    reactions: { neuronioOuro: 11, repost: 3, comments: 8 },
    liked: false,
    reposted: false,
    showComments: false,
    comments: [],
  },
  {
    id: 11,
    author: { name: "Isabela Rocha", initials: "IR", color: "#8b5cf6" },
    timeLabel: "2d atrás",
    content:
      "Revisão completa de Redes de Computadores concluída! Protocolo TCP/IP nunca mais vai me dar trabalho. Camada por camada, foi indo.",
    subject: "Redes de Computadores",
    studyHours: 2.5,
    reactions: { neuronioOuro: 16, repost: 4, comments: 3 },
    liked: false,
    reposted: false,
    showComments: false,
    comments: [],
  },
];

// ─── Mock Ranking ─────────────────────────────────────────
const FEED_RANKING = [
  { name: "André Sanches", initials: "AS", color: "#f97316", hours: 18 },
  { name: "Laura Silva", initials: "LS", color: "#22c55e", hours: 15 },
  { name: "Mariana Assis", initials: "MA", color: "#a78bfa", hours: 13 },
  { name: "Carlos Eduardo", initials: "CE", color: "#06b6d4", hours: 11 },
  { name: "Fernanda Lima", initials: "FL", color: "#f59e0b", hours: 9 },
];

const COMMUNITY_TOTAL = 79;
const COMMUNITY_GOAL = 120;
const COMMUNITY_STREAK = 7;
const TOP_SUBJECT = "Cálculo";

// ─── State ────────────────────────────────────────────────
let feedState = {
  posts: FEED_POSTS_MOCK.map((p) => ({
    ...p,
    reactions: { ...p.reactions },
    comments: p.comments.map((c) => ({ ...c })),
  })),
};

// ─── Helpers ─────────────────────────────────────────────
function avatar(initials, color, size = "md") {
  return `<div class="fd-avatar fd-avatar--${size}" style="background:${color}1a;border:2px solid ${color}55;color:${color}">${initials}</div>`;
}

function subjectTag(s) {
  return s ? `<span class="fd-tag fd-tag--subject">${s}</span>` : "";
}

function hoursTag(h) {
  if (!h) return "";
  const label = h < 1 ? `${Math.round(h * 60)}min` : `${h}h`;
  return `<span class="fd-tag fd-tag--hours">⏱ ${label} estudadas</span>`;
}

// ─── Post HTML ────────────────────────────────────────────
function renderPost(post) {
  const commentsSection = post.showComments
    ? `
    <div class="fd-comments">
      ${post.comments
        .map(
          (c) => `
        <div class="fd-comment">
          ${avatar(c.initials, c.color, "sm")}
          <div class="fd-comment-body">
            <span class="fd-comment-author">${c.author}</span>
            <p class="fd-comment-text">${c.text}</p>
          </div>
        </div>
      `,
        )
        .join("")}
      <div class="fd-comment-compose">
        ${avatar(FEED_ME.initials, FEED_ME.color, "sm")}
        <input
          class="fd-comment-input"
          data-post-id="${post.id}"
          placeholder="Escreva um comentário..."
        />
        <button class="fd-comment-send" data-post-id="${post.id}" aria-label="Enviar">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  `
    : "";

  return `
    <article class="fd-post${post.liked ? " fd-post--gold" : ""}" data-id="${post.id}">
      <div class="fd-post-header">
        <div class="fd-avatar fd-avatar--md" data-profile-trigger data-user-name="${post.author.name}" data-user-initials="${post.author.initials}" data-user-color="${post.author.color}" style="background:${post.author.color}1a;border:2px solid ${post.author.color}55;color:${post.author.color}">${post.author.initials}</div>
        <div class="fd-post-meta">
          <span class="fd-post-author" data-profile-trigger data-user-name="${post.author.name}" data-user-initials="${post.author.initials}" data-user-color="${post.author.color}">${post.author.name}</span>
          <span class="fd-post-time">${post.timeLabel}</span>
        </div>
      </div>
      <div class="fd-post-body">
        <p class="fd-post-content">${post.content}</p>
        ${post.subject || post.studyHours ? `<div class="fd-post-tags">${subjectTag(post.subject)}${hoursTag(post.studyHours)}</div>` : ""}
      </div>
      <div class="fd-reactions">
        <button class="fd-rxn-btn${post.liked ? " fd-rxn-btn--gold" : ""}" data-action="like" data-post-id="${post.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="${post.liked ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
          <span>Neurônio de Ouro</span>
          <span class="fd-rxn-count">${post.reactions.neuronioOuro}</span>
        </button>
        <button class="fd-rxn-btn${post.reposted ? " fd-rxn-btn--green" : ""}" data-action="repost" data-post-id="${post.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
          <span>Repostar</span>
          <span class="fd-rxn-count">${post.reactions.repost}</span>
        </button>
        <button class="fd-rxn-btn${post.showComments ? " fd-rxn-btn--blue" : ""}" data-action="comments" data-post-id="${post.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          <span>Comentários</span>
          <span class="fd-rxn-count">${post.reactions.comments}</span>
        </button>
      </div>
      ${commentsSection}
    </article>
  `;
}

// ─── Sidebar HTML ─────────────────────────────────────────
function renderRanking() {
  const medals = ["🥇", "🥈", "🥉"];
  return FEED_RANKING.map(
    (u, i) => `
    <div class="fd-rank-item">
      <span class="fd-rank-pos">${medals[i] ?? i + 1}</span>
      ${avatar(u.initials, u.color, "sm")}
      <div class="fd-rank-info">
        <span class="fd-rank-name">${u.name}</span>
        <span class="fd-rank-hours">${u.hours}h esta semana</span>
      </div>
    </div>
  `,
  ).join("");
}

// ─── Screen ──────────────────────────────────────────────
export function feedScreen() {
  const goalPct = Math.min(
    100,
    Math.round((COMMUNITY_TOTAL / COMMUNITY_GOAL) * 100),
  );

  return `
    <section class="fd-page">
      <div class="fd-page-header">
        <div>
          <h1 class="fd-page-title">Beluga Feed</h1>
          <p class="fd-page-desc">Compartilhe seu progresso, inspire e seja inspirado pela comunidade.</p>
        </div>
      </div>

      <div class="fd-layout">

        <!-- ── Coluna Principal ─────────────────── -->
        <div class="fd-main">

          <!-- Composer -->
          <div class="fd-composer" id="fd-composer">
            <div class="fd-composer-row">
              ${avatar(FEED_ME.initials, FEED_ME.color)}
              <textarea
                id="fd-text"
                class="fd-composer-input"
                placeholder="No que você está pensando? Compartilhe seu progresso de estudo..."
                rows="3"
              ></textarea>
            </div>
            <div class="fd-composer-footer">
              <div class="fd-composer-hints">
                <span class="fd-composer-hint">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
                  Matéria
                </span>
                <span class="fd-composer-hint">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Horas estudadas
                </span>
              </div>
              <button class="fd-post-btn" id="fd-post-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Publicar
              </button>
            </div>
          </div>

          <!-- Feed List -->
          <div class="fd-list" id="fd-list">
            ${feedState.posts.map(renderPost).join("")}
          </div>
        </div>

        <!-- ── Sidebar ─────────────────────────── -->
        <aside class="fd-sidebar">

          <!-- Ranking -->
          <div class="fd-sidebar-card">
            <div class="fd-sidebar-card-header">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Top Estudantes da Semana
            </div>
            <div class="fd-ranking">
              ${renderRanking()}
            </div>
          </div>

          <!-- Total Geral -->
          <div class="fd-sidebar-card fd-card--stats">
            <p class="fd-card-label">Horas estudadas — geral</p>
            <p class="fd-card-big fd-card-big--blue">${COMMUNITY_TOTAL}h</p>
            <div class="fd-progress-track">
              <div class="fd-progress-fill" style="width:${goalPct}%"></div>
            </div>
            <p class="fd-card-sub">Meta: ${COMMUNITY_GOAL}h &nbsp;·&nbsp; ${goalPct}% alcançada</p>
          </div>

          <!-- Matéria mais estudada -->
          <div class="fd-sidebar-card fd-card--center">
            <p class="fd-card-label">Matéria mais estudada</p>
            <p class="fd-card-big fd-card-big--amber">${TOP_SUBJECT}</p>
            <p class="fd-card-sub">nos últimos 7 dias</p>
          </div>

          <!-- Sequência coletiva -->
          <div class="fd-sidebar-card">
            <p class="fd-card-label">Sequência coletiva</p>
            <div class="fd-streak-row">
              <span class="fd-streak-icon">🔥</span>
              <span class="fd-streak-count">${COMMUNITY_STREAK} dias</span>
            </div>
            <p class="fd-card-sub">Toda a comunidade estudando seguido</p>
          </div>

        </aside>
      </div>
    </section>
  `;
}

// ─── Init ─────────────────────────────────────────────────
export function feedInit() {
  initUserProfileModal();
  const textarea = document.getElementById("fd-text");
  const postBtn = document.getElementById("fd-post-btn");
  const list = document.getElementById("fd-list");

  // Auto-resize textarea
  textarea?.addEventListener("input", () => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  });

  // Publish post
  postBtn?.addEventListener("click", () => {
    const text = textarea?.value?.trim();
    if (!text) {
      textarea?.classList.add("fd-composer-input--shake");
      setTimeout(
        () => textarea?.classList.remove("fd-composer-input--shake"),
        500,
      );
      return;
    }
    feedState.posts.unshift({
      id: Date.now(),
      author: { ...FEED_ME },
      timeLabel: "agora",
      content: text,
      subject: null,
      studyHours: null,
      reactions: { neuronioOuro: 0, repost: 0, comments: 0 },
      liked: false,
      reposted: false,
      showComments: false,
      comments: [],
    });
    textarea.value = "";
    textarea.style.height = "";
    _rerender();
  });

  // Event delegation – reactions
  list?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (btn) {
      _handleReaction(btn);
      return;
    }

    const send = e.target.closest(".fd-comment-send");
    if (send) _sendComment(Number(send.dataset.postId));
  });

  // Send on Enter
  list?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.matches(".fd-comment-input")) {
      _sendComment(Number(e.target.dataset.postId));
    }
  });
}

function _handleReaction(btn) {
  const id = Number(btn.dataset.postId);
  const post = feedState.posts.find((p) => p.id === id);
  if (!post) return;

  switch (btn.dataset.action) {
    case "like":
      post.liked = !post.liked;
      post.reactions.neuronioOuro += post.liked ? 1 : -1;
      break;
    case "repost":
      post.reposted = !post.reposted;
      post.reactions.repost += post.reposted ? 1 : -1;
      break;
    case "comments":
      post.showComments = !post.showComments;
      break;
  }
  _rerender();
}

function _sendComment(postId) {
  const list = document.getElementById("fd-list");
  const input = list?.querySelector(
    `.fd-comment-input[data-post-id="${postId}"]`,
  );
  const text = input?.value?.trim();
  if (!text) return;

  const post = feedState.posts.find((p) => p.id === postId);
  if (!post) return;

  post.comments.push({
    author: FEED_ME.name,
    initials: FEED_ME.initials,
    color: FEED_ME.color,
    text,
  });
  post.reactions.comments += 1;
  _rerender();
}

function _rerender() {
  const list = document.getElementById("fd-list");
  if (list) list.innerHTML = feedState.posts.map(renderPost).join("");
}
