/* =========================================================
   BELUGA – conquistas.js
   Tela de gamificação e conquistas
   ========================================================= */

const CQ_USER = {
  name: "JIMMY",
  avatar: "assets/images/fotorosto.jpeg",
  level: 7,
  levelTitle: "Estudante Ninja",
  xp: 3240,
  xpNext: 4000,
};

const CQ_BADGE = {
  name: "Quiz Mestre",
  image: "assets/images/trofeu.png",
  desc: "Respondeu 10 quizzes com média acima de 80%. Um verdadeiro mestre do conhecimento!",
  xpEarned: 350,
  unlockedAt: "há 2 dias",
};

const CQ_MISSIONS = [
  {
    id: "m1",
    title: "Compartilhe suas conquistas",
    desc: "Compartilhe uma conquista nas redes sociais",
    xp: 50,
    status: "done",
    progress: 1,
    total: 1,
  },
  {
    id: "m2",
    title: "Estude com foco total",
    desc: "25 minutos sem distrações em uma sessão",
    xp: 50,
    status: "done",
    progress: 1,
    total: 1,
  },
  {
    id: "m3",
    title: "Registros no Feed",
    desc: "Complete 3 registros no feed do BELUGA",
    xp: 80,
    status: "active",
    progress: 2,
    total: 3,
  },
  {
    id: "m4",
    title: "Maratona semanal",
    desc: "Estude 5 horas ao longo da semana",
    xp: 100,
    status: "active",
    progress: 3.5,
    total: 5,
    unit: "h",
  },
  {
    id: "m5",
    title: "Quiz de revisão",
    desc: "Responda 1 quiz de revisão",
    xp: 50,
    status: "done",
    progress: 1,
    total: 1,
  },
  {
    id: "m6",
    title: "Interaja no Fórum",
    desc: "Responda ou comente uma dúvida no fórum",
    xp: 80,
    status: "active",
    progress: 0,
    total: 1,
  },
  {
    id: "m7",
    title: "Plano de estudos",
    desc: "Acesse e revise seu plano de estudos",
    xp: 30,
    status: "done",
    progress: 1,
    total: 1,
  },
];

const CQ_RANKING = [
  { pos: 1, name: "Maria Cláudia", pts: 752, isMe: false },
  { pos: 2, name: "José Antônio", pts: 722, isMe: false },
  { pos: 3, name: "Jimmy", pts: 720, isMe: true },
  { pos: 4, name: "André Sanches", pts: 710, isMe: false },
  { pos: 5, name: "Juliana Vieria", pts: 700, isMe: false },
  { pos: 6, name: "Joaquim Luiz", pts: 699, isMe: false },
];

const SHARE_TEXT = `Acabei de alcançar o Nível ${CQ_USER.level} — ${CQ_USER.levelTitle} no BELUGA e conquistei o selo ${CQ_BADGE.name}! 🐋`;

/* ── State ── */
let cqState = { shareOpen: false, copied: false };

/* ── Helpers ── */
const XP_PCT = Math.round((CQ_USER.xp / CQ_USER.xpNext) * 100);

function renderMission(m) {
  const isDone = m.status === "done";
  const pct = Math.round((m.progress / m.total) * 100);
  const label = m.unit
    ? `${m.progress}${m.unit} / ${m.total}${m.unit}`
    : `${m.progress} / ${m.total}`;

  const checkIcon = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="12" height="12"><polyline points="2 8 6 12 14 4"/></svg>`;
  const clockIcon = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="12" height="12"><circle cx="8" cy="8" r="6"/><polyline points="8 5 8 8 10 10"/></svg>`;

  return `
    <div class="cq-mission${isDone ? " cq-mission--done" : ""}">
      <div class="cq-mission-top">
        <span class="cq-mission-status-icon ${isDone ? "cq-si--done" : "cq-si--active"}">${isDone ? checkIcon : clockIcon}</span>
        <span class="cq-mission-title">${m.title}</span>
        <span class="cq-mission-xp">+${m.xp} XP</span>
      </div>
      <p class="cq-mission-desc">${m.desc}</p>
      ${
        isDone
          ? `<span class="cq-mission-done-label">${checkIcon} Missão concluída</span>`
          : `<div class="cq-mbar-wrap">
             <div class="cq-mbar"><div class="cq-mbar-fill" style="width:${pct}%"></div></div>
             <span class="cq-mbar-label">${label}</span>
           </div>`
      }
    </div>`;
}

function posIcon(pos) {
  if (pos === 1) return "🥇";
  if (pos === 2) return "🥈";
  if (pos === 3) return "🥉";
  return `<span class="cq-rank-num">${pos}</span>`;
}

function renderRankItem(r) {
  return `
    <div class="cq-rank-item${r.isMe ? " cq-rank-item--me" : ""}">
      <span class="cq-rank-pos">${posIcon(r.pos)}</span>
      <span class="cq-rank-name">${r.name}${r.isMe ? ` <span class="cq-rank-you">(você)</span>` : ""}</span>
      <span class="cq-rank-pts">${r.pts}<span class="cq-rank-unit">pts</span></span>
    </div>`;
}

function renderModal() {
  if (!cqState.shareOpen) return "";
  return `
    <div class="cq-overlay" id="cq-overlay">
      <div class="cq-modal" role="dialog" aria-modal="true" aria-label="Compartilhar conquista">
        <div class="cq-modal-head">
          <span class="cq-modal-title">Compartilhar conquista</span>
          <button class="cq-modal-close" id="cq-modal-close" aria-label="Fechar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="cq-modal-preview">
          <img src="assets/images/trofeu.png" class="cq-modal-trophy" alt="Troféu" />
          <p class="cq-modal-text">${SHARE_TEXT}</p>
        </div>
        <div class="cq-modal-actions">
          <button class="cq-mbtn" id="cq-copy-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            ${cqState.copied ? "Copiado!" : "Copiar texto"}
          </button>
          <button class="cq-mbtn" id="cq-feed-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            Compartilhar no Feed
          </button>
          <button class="cq-mbtn cq-mbtn--x" id="cq-x-btn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.255 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Postar no X
          </button>
        </div>
      </div>
    </div>`;
}

/* ── Render ── */
export function conquistasScreen() {
  return `
    <div class="cq-page">
      <h1 class="cq-title">Conquistas</h1>

      <!-- Profile / XP card -->
      <div class="cq-profile-card">
        <img src="${CQ_USER.avatar}" class="cq-avatar" alt="${CQ_USER.name}" />
        <div class="cq-profile-body">
          <div class="cq-profile-top">
            <span class="cq-profile-name">${CQ_USER.name}</span>
            <span class="cq-profile-level">Nível ${CQ_USER.level} &mdash; ${CQ_USER.levelTitle}</span>
          </div>
          <div class="cq-xp-track">
            <div class="cq-xp-fill" style="width:${XP_PCT}%">
              <span class="cq-xp-glow"></span>
            </div>
          </div>
          <div class="cq-xp-meta">
            <span class="cq-xp-val">${CQ_USER.xp.toLocaleString("pt-BR")} XP</span>
            <span class="cq-xp-pct">${XP_PCT}% para o nível ${CQ_USER.level + 1}</span>
            <span class="cq-xp-next">${CQ_USER.xpNext.toLocaleString("pt-BR")} XP</span>
          </div>
        </div>
        <button class="cq-share-hero button button-primary" id="cq-share-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          Compartilhar
        </button>
      </div>

      <!-- 3-column layout -->
      <div class="cq-layout">

        <!-- Missions column -->
        <section class="cq-missions-col">
          <header class="cq-col-head">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Missões
          </header>
          <div class="cq-missions-list">
            ${CQ_MISSIONS.map(renderMission).join("")}
          </div>
          <button class="cq-more-btn">+ Mais missões</button>
        </section>

        <!-- Badge showcase -->
        <section class="cq-center-col">
          <div class="cq-showcase">
            <div class="cq-showcase-bg" style="background-image:url('assets/images/fotodefundo.png')"></div>
            <div class="cq-showcase-veil"></div>
            <div class="cq-badge-card">
              <span class="cq-badge-eyebrow">Conquista em destaque</span>
              <img src="${CQ_BADGE.image}" class="cq-badge-trophy" alt="Troféu ${CQ_BADGE.name}" />
              <div class="cq-badge-name">Selo &ldquo;${CQ_BADGE.name}&rdquo;</div>
              <p class="cq-badge-desc">${CQ_BADGE.desc}</p>
              <div class="cq-badge-footer">
                <span class="cq-badge-xp">+${CQ_BADGE.xpEarned} XP</span>
                <span class="cq-badge-when">Desbloqueado ${CQ_BADGE.unlockedAt}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Ranking column -->
        <section class="cq-ranking-col">
          <header class="cq-col-head">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            Ranking
          </header>
          <span class="cq-rank-period">Esta semana</span>
          <div class="cq-rank-list">
            ${CQ_RANKING.map(renderRankItem).join("")}
          </div>
        </section>
      </div>

      ${renderModal()}
    </div>`;
}

/* ── Private ── */
function _rerenderModal() {
  document.getElementById("cq-overlay")?.remove();
  if (cqState.shareOpen) {
    document
      .querySelector(".cq-page")
      ?.insertAdjacentHTML("beforeend", renderModal());
    _bindModal();
  }
}

function _bindModal() {
  document.getElementById("cq-modal-close")?.addEventListener("click", () => {
    cqState.shareOpen = false;
    cqState.copied = false;
    _rerenderModal();
  });

  document.getElementById("cq-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "cq-overlay") {
      cqState.shareOpen = false;
      cqState.copied = false;
      _rerenderModal();
    }
  });

  document.getElementById("cq-copy-btn")?.addEventListener("click", () => {
    navigator.clipboard?.writeText(SHARE_TEXT).catch(() => {});
    cqState.copied = true;
    _rerenderModal();
    setTimeout(() => {
      cqState.copied = false;
      _rerenderModal();
    }, 2200);
  });

  document.getElementById("cq-feed-btn")?.addEventListener("click", () => {
    cqState.shareOpen = false;
    _rerenderModal();
    window.location.hash = "#/feed";
  });

  document.getElementById("cq-x-btn")?.addEventListener("click", () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}`,
      "_blank",
      "noopener,noreferrer",
    );
  });
}

function _escHandler(e) {
  if (e.key === "Escape" && cqState.shareOpen) {
    cqState.shareOpen = false;
    _rerenderModal();
  }
}

/* ── Init ── */
export function conquistasInit() {
  document.getElementById("cq-share-btn")?.addEventListener("click", () => {
    cqState.shareOpen = true;
    cqState.copied = false;
    _rerenderModal();
  });

  document.addEventListener("keydown", _escHandler);
}
