/* =========================================================
   BELUGA – dashboard.js
   Hub central do aluno: progresso, missões, ranking e alertas
   ========================================================= */

const DB_USER = {
  name: "Jimmy",
  avatar: "assets/images/fotorosto.jpeg",
  level: 7,
  levelTitle: "Estudante Ninja",
  xp: 3240,
  xpNext: 4000,
};

const SUBJECTS = [
  {
    name: "Algoritmos e Programação",
    id: "algoritmos",
    progress: 55,
    color: "#3b9edd",
  },
  { name: "Limite e Derivada", id: "calculo", progress: 50, color: "#3b9edd" },
  {
    name: "Sistemas Operacionais",
    id: "sistemas-operacionais",
    progress: 60,
    color: "#3b9edd",
  },
  {
    name: "Inovação e Tecnologia",
    id: "inovacao",
    progress: 30,
    color: "#f97316",
    critical: true,
  },
  {
    name: "Design de Interfaces",
    id: "design-interfaces",
    progress: 45,
    color: "#3b9edd",
  },
  {
    name: "Metodologia Científica",
    id: "metodologia",
    progress: 90,
    color: "#a855f7",
  },
];

const ACTIVE_MISSIONS = [
  { title: "Registros no Feed", xp: 80, progress: 2, total: 3 },
  { title: "Maratona semanal", xp: 100, progress: 3.5, total: 5, unit: "h" },
  { title: "Interaja no Fórum", xp: 80, progress: 0, total: 1 },
];

const RANKING = [
  { pos: 1, name: "Maria Cláudia", pts: 752, isMe: false },
  { pos: 2, name: "José Antônio", pts: 722, isMe: false },
  { pos: 3, name: "Jimmy", pts: 720, isMe: true },
];

const QUICK_ACTIONS = [
  {
    title: "Configure sua Matriz Curricular",
    desc: "Adicione as disciplinas do seu curso para personalizar toda a sua experiência no BELUGA.",
    link: "#/matriz",
    color: "#10b981",
    colorRgb: "16, 185, 129",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  },
  {
    title: "Plano Semanal de Estudos",
    desc: "Visualize e ajuste sua agenda baseada em prioridades e nível de dificuldade de cada matéria.",
    link: "#/plano",
    color: "#a855f7",
    colorRgb: "168, 85, 247",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  },
  {
    title: "Comunidade Acadêmica",
    desc: "Compartilhe conquistas, tire dúvidas e conecte-se com outros estudantes no Feed e no Fórum.",
    link: "#/feed",
    color: "#f59e0b",
    colorRgb: "245, 158, 11",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  },
];

/* ── Derivados ── */
const XP_PCT = Math.round((DB_USER.xp / DB_USER.xpNext) * 100);
const criticalSubject = SUBJECTS.find((s) => s.critical);
const avgProgress = Math.round(
  SUBJECTS.reduce((a, s) => a + s.progress, 0) / SUBJECTS.length,
);
const myRank = RANKING.find((r) => r.isMe);

/* ── Helpers ── */
function quickActionCard(qa) {
  return `
    <a class="db-qa-card" href="${qa.link}" style="border-left-color:${qa.color}">
      <div class="db-qa-icon" style="background:rgba(${qa.colorRgb},0.12);color:${qa.color}">
        ${qa.icon}
      </div>
      <div class="db-qa-body">
        <h3 class="db-qa-title">${qa.title}</h3>
        <p class="db-qa-desc">${qa.desc}</p>
      </div>
      <svg class="db-qa-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
      </svg>
    </a>`;
}

function subjectRow(s) {
  return `
    <a class="db-subject-row" href="#/aulas?materia=${s.id}">
      <span class="db-subject-name">${s.name}</span>
      <div class="db-subject-track">
        <div class="db-subject-fill" data-width="${s.progress}" style="width:0%;background:${s.color}"></div>
      </div>
      <span class="db-subject-pct" style="color:${s.color}">${s.progress}%</span>
    </a>`;
}

function missionItem(m) {
  const pct = Math.round((m.progress / m.total) * 100);
  const label = m.unit
    ? `${m.progress}${m.unit} / ${m.total}${m.unit}`
    : `${m.progress} / ${m.total}`;
  return `
    <div class="db-mission">
      <div class="db-mission-head">
        <span class="db-mission-title">${m.title}</span>
        <span class="db-mission-xp">+${m.xp} XP</span>
      </div>
      <div class="db-mission-track">
        <div class="db-mission-fill" data-width="${pct}" style="width:0%"></div>
      </div>
      <span class="db-mission-label">${label}</span>
    </div>`;
}

function rankRow(r) {
  const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };
  return `
    <div class="db-rank-row${r.isMe ? " db-rank-row--me" : ""}">
      <span class="db-rank-pos">${medals[r.pos] ?? r.pos}</span>
      <span class="db-rank-name">${r.name}${r.isMe ? ' <span class="db-rank-you">(você)</span>' : ""}</span>
      <span class="db-rank-pts">${r.pts} pts</span>
    </div>`;
}

/* ── Render ── */
export function dashboardScreen() {
  return `
    <main class="dashboard">

      <!-- HEADER PERSONALIZADO -->
      <header class="db-header">
        <div class="db-header-left">
          <div class="db-user-row">
            <div class="db-avatar-wrap">
              <img src="${DB_USER.avatar}" class="db-avatar" alt="${DB_USER.name}" />
              <span class="db-avatar-badge">${DB_USER.level}</span>
            </div>
            <div class="db-user-info">
              <p class="db-eyebrow">Nível ${DB_USER.level} &mdash; ${DB_USER.levelTitle}</p>
              <h1 class="db-welcome">Bem-vindo de volta, ${DB_USER.name}</h1>
            </div>
          </div>
          <div class="db-xp-wrap">
            <div class="db-xp-bar">
              <div class="db-xp-fill" data-width="${XP_PCT}" style="width:0%"></div>
            </div>
            <span class="db-xp-label">${DB_USER.xp.toLocaleString("pt-BR")} / ${DB_USER.xpNext.toLocaleString("pt-BR")} XP</span>
          </div>
        </div>
        <div class="db-header-stats">
          <div class="db-stat">
            <span class="db-stat-val">${avgProgress}%</span>
            <span class="db-stat-key">Progresso médio</span>
          </div>
          <div class="db-stat db-stat--divider">
            <span class="db-stat-val">#${myRank?.pos ?? "–"}</span>
            <span class="db-stat-key">Ranking semanal</span>
          </div>
          <div class="db-stat db-stat--divider">
            <span class="db-stat-val">${DB_USER.xp.toLocaleString("pt-BR")}</span>
            <span class="db-stat-key">XP total</span>
          </div>
        </div>
      </header>

      <!-- CORPO: 2 COLUNAS -->
      <div class="db-layout">

        <!-- COLUNA PRINCIPAL -->
        <div class="db-main">

          <!-- Progresso das matérias -->
          <section class="db-card">
            <h2 class="db-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                   stroke-linecap="round" stroke-linejoin="round" width="15" height="15">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              Progresso do semestre
            </h2>
            <div class="db-subjects">
              ${SUBJECTS.map(subjectRow).join("")}
            </div>
          </section>

          <!-- Alerta: matéria crítica -->
          ${
            criticalSubject
              ? `
          <section class="db-alert-card">
            <div class="db-alert-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div class="db-alert-body">
              <p class="db-alert-tag">Atenção necessária</p>
              <h3 class="db-alert-title">${criticalSubject.name}</h3>
              <p class="db-alert-desc">
                Apenas <strong>${criticalSubject.progress}%</strong> concluído nesta matéria.
                Recomendamos revisar o conteúdo e realizar o quiz diagnóstico para identificar lacunas.
              </p>
              <div class="db-alert-actions">
                <a href="#/aulas?materia=${criticalSubject.id}" class="db-btn-primary">Ver aulas</a>
                <a href="#/quiz" class="db-btn-ghost">Fazer quiz</a>
              </div>
            </div>
          </section>`
              : ""
          }

        </div>

        <!-- SIDEBAR -->
        <aside class="db-sidebar">

          <!-- Missões ativas -->
          <section class="db-card">
            <h2 class="db-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                   stroke-linecap="round" stroke-linejoin="round" width="15" height="15">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              Missões ativas
            </h2>
            <div class="db-missions">
              ${ACTIVE_MISSIONS.map(missionItem).join("")}
            </div>
            <a href="#/conquistas" class="db-link-more">Ver todas as missões →</a>
          </section>

          <!-- Ranking semanal -->
          <section class="db-card">
            <h2 class="db-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                   stroke-linecap="round" stroke-linejoin="round" width="15" height="15">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
              Ranking semanal
            </h2>
            <div class="db-ranking">
              ${RANKING.map(rankRow).join("")}
            </div>
            <a href="#/conquistas" class="db-link-more">Ver ranking completo →</a>
          </section>

        </aside>
      </div>

      <!-- AÇÕES RÁPIDAS -->
      <section class="db-section">
        <h2 class="db-section-title">Explore o BELUGA</h2>
        <div class="db-quick-actions">
          ${QUICK_ACTIONS.map(quickActionCard).join("")}
        </div>
      </section>

    </main>`;
}

/* ── Init: anima barras na entrada ── */
export function dashboardInit() {
  requestAnimationFrame(() => {
    document.querySelectorAll("[data-width]").forEach((el) => {
      const target = el.dataset.width + "%";
      requestAnimationFrame(() => {
        el.style.transition = "width 0.7s cubic-bezier(0.4, 0, 0.2, 1)";
        el.style.width = target;
      });
    });
  });
}
