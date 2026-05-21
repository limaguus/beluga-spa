/* =========================================================
   BELUGA – planoEstudo.js
   Plano de estudos com navegação por dia e trilhas de
   conhecimento detalhadas por matéria
   ========================================================= */

import { getDisciplines } from "../state/matriz.js";

/* ─────────────────────────────────────────────────────────
   METADADOS DE NÍVEL
   ───────────────────────────────────────────────────────── */
const LEVEL_META = {
  high:   { label: "Atenção",       color: "#ef4444", hours: "3–4h por semana" },
  medium: { label: "Em progresso",  color: "#f59e0b", hours: "2h por semana"   },
  low:    { label: "Consolidado",   color: "#22c55e", hours: "1h por semana"   },
};

/* ─────────────────────────────────────────────────────────
   TRILHAS POR MATÉRIA
   Em produção: substituir por resposta da Belugin IA.
   ───────────────────────────────────────────────────────── */
const PLAN_SUBJECTS = [
  {
    id: "calculo",
    name: "Limite e Derivada",
    progress: 15,
    level: "high",
    topicos: [
      { titulo: "Conceito de Limite",          dur: "25 min", done: false, rec: true  },
      { titulo: "Continuidade de Funções",     dur: "20 min", done: false, rec: true  },
      { titulo: "Derivada: Conceito e Regras", dur: "32 min", done: false, rec: false },
      { titulo: "Regra da Cadeia",             dur: "18 min", done: false, rec: true  },
    ],
  },
  {
    id: "sistemas-operacionais",
    name: "Sistemas Operacionais",
    progress: 20,
    level: "high",
    topicos: [
      { titulo: "Gerenciamento de Processos", dur: "40 min", done: false, rec: true  },
      { titulo: "Gerenciamento de Memória",   dur: "38 min", done: false, rec: true  },
      { titulo: "Sistemas de Arquivos",       dur: "30 min", done: false, rec: false },
      { titulo: "Linux Básico para Devs",     dur: "45 min", done: false, rec: true  },
    ],
  },
  {
    id: "inovacao",
    name: "Inovação e Tecnologia",
    progress: 30,
    level: "high",
    topicos: [
      { titulo: "Tecnologias Emergentes",  dur: "22 min", done: false, rec: true  },
      { titulo: "Startups e Inovação",     dur: "18 min", done: false, rec: true  },
      { titulo: "Futuro do Trabalho",      dur: "15 min", done: true,  rec: false },
      { titulo: "Laboratório de IA",       dur: "30 min", done: false, rec: true  },
      { titulo: "Sociedade em Rede",       dur: "20 min", done: false, rec: false },
      { titulo: "Biotecnologia",           dur: "25 min", done: false, rec: true  },
    ],
  },
  {
    id: "design-interfaces",
    name: "Design de Interfaces",
    progress: 45,
    level: "medium",
    topicos: [
      { titulo: "Princípios de UX",               dur: "25 min", done: false, rec: true  },
      { titulo: "Design Systems na Prática",      dur: "32 min", done: false, rec: true  },
      { titulo: "Prototipagem com Figma",         dur: "28 min", done: true,  rec: false },
      { titulo: "Acessibilidade Digital",         dur: "20 min", done: false, rec: true  },
      { titulo: "Tipografia e Hierarquia Visual", dur: "16 min", done: false, rec: false },
    ],
  },
  {
    id: "algoritmos",
    name: "Algoritmos e Programação",
    progress: 55,
    level: "medium",
    topicos: [
      { titulo: "Complexidade de Algoritmos",     dur: "28 min", done: true,  rec: true  },
      { titulo: "Estruturas de Dados Essenciais", dur: "35 min", done: false, rec: true  },
      { titulo: "Algoritmos de Ordenação",        dur: "22 min", done: true,  rec: false },
      { titulo: "Recursão e Backtracking",        dur: "30 min", done: false, rec: true  },
    ],
  },
  {
    id: "metodologia",
    name: "Metodologia Científica",
    progress: 90,
    level: "low",
    topicos: [
      { titulo: "Métodos de Pesquisa Científica", dur: "35 min", done: true,  rec: false },
      { titulo: "Normas ABNT na Prática",         dur: "20 min", done: true,  rec: true  },
      { titulo: "Redação Acadêmica",              dur: "18 min", done: false, rec: true  },
      { titulo: "Revisão de Literatura",          dur: "22 min", done: false, rec: false },
    ],
  },
];

/* Distribuição semanal */
const WEEK_PLAN = [
  { day: "Seg", subjects: ["calculo",                "sistemas-operacionais"] },
  { day: "Ter", subjects: ["inovacao",               "design-interfaces"]     },
  { day: "Qua", subjects: ["algoritmos",             "calculo"]               },
  { day: "Qui", subjects: ["sistemas-operacionais",  "inovacao"]              },
  { day: "Sex", subjects: ["design-interfaces",      "algoritmos"]            },
  { day: "Sáb", subjects: [],  optional: true },
  { day: "Dom", subjects: [],  rest:     true },
];

/* ─────────────────────────────────────────────────────────
   HELPERS DE DADOS
   ───────────────────────────────────────────────────────── */
const DAY_JS_MAP = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function getTodayDay() {
  return DAY_JS_MAP[new Date().getDay()];
}

function parseDur(dur) {
  return parseInt(dur, 10) || 0;
}

function subjectPendingMin(subject) {
  return subject.topicos
    .filter((t) => !t.done)
    .reduce((sum, t) => sum + parseDur(t.dur), 0);
}

function formatTime(min) {
  if (min >= 60) {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return m ? `${h}h ${m}min` : `${h}h`;
  }
  return `${min} min`;
}

/* ─────────────────────────────────────────────────────────
   SVG ASSETS
   ───────────────────────────────────────────────────────── */
const CHECK_SVG = `<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5"
  stroke-linecap="round" stroke-linejoin="round" width="9" height="9">
  <polyline points="1 6 4 9 11 2"/></svg>`;

const ARROW_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
  stroke-linecap="round" stroke-linejoin="round" width="10" height="10">
  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;

/* ─────────────────────────────────────────────────────────
   HELPERS DE RENDER — TRILHAS
   ───────────────────────────────────────────────────────── */
function progressRing(progress, color) {
  const gap = 100 - progress;
  return `
    <div class="pt-ring-wrap">
      <svg viewBox="0 0 36 36" class="pt-ring">
        <circle class="pt-ring-bg" cx="18" cy="18" r="15.9" fill="none" stroke-width="2.8"/>
        <circle cx="18" cy="18" r="15.9" fill="none"
          stroke="${color}" stroke-width="2.8" stroke-linecap="round"
          stroke-dasharray="${progress} ${gap}"
          transform="rotate(-90 18 18)"/>
      </svg>
      <span class="pt-ring-label">${progress}%</span>
    </div>`;
}

function topicRow(topic, subjectId) {
  const done = topic.done;
  const rec  = topic.rec && !done;
  return `
    <a class="pt-topic${done ? " pt-topic--done" : ""}${rec ? " pt-topic--rec" : ""}"
       href="#/aulas?materia=${subjectId}">
      <span class="pt-status pt-status--${done ? "done" : "open"}">${done ? CHECK_SVG : ""}</span>
      <span class="pt-topic-name">
        ${topic.titulo}
        ${rec ? `<span class="pt-ia-tag">IA</span>` : ""}
      </span>
      <span class="pt-topic-dur">${topic.dur}</span>
      <span class="pt-topic-cta${done ? " pt-topic-cta--done" : ""}">
        ${done ? "Revisar" : "Estudar"} ${ARROW_SVG}
      </span>
    </a>`;
}

function trailCard(subject, order = 0) {
  const meta       = LEVEL_META[subject.level];
  const done       = subject.topicos.filter((t) => t.done).length;
  const total      = subject.topicos.length;
  const pendingMin = subjectPendingMin(subject);
  const allDone    = pendingMin === 0;

  return `
    <div class="pt-trail" style="--tc:${meta.color}">
      <div class="pt-trail-head">
        ${order ? `<span class="pt-trail-order">${order}º</span>` : ""}
        ${progressRing(subject.progress, meta.color)}
        <div class="pt-trail-meta">
          <h2 class="pt-trail-name">${subject.name}</h2>
          <div class="pt-trail-tags">
            <span class="pt-badge pt-badge--${subject.level}">${meta.label}</span>
            <span class="pt-ia-hint">IA recomenda · ${meta.hours}</span>
          </div>
        </div>
        <div class="pt-trail-count">
          <span class="pt-count-num">${done}/${total}</span>
          <span class="pt-count-label">concluídos</span>
          <span class="pt-count-time${allDone ? " pt-count-time--done" : ""}">
            ${allDone ? "Tudo concluído!" : `~${formatTime(pendingMin)} restantes`}
          </span>
        </div>
      </div>
      <div class="pt-topics">
        ${subject.topicos.map((t) => topicRow(t, subject.id)).join("")}
      </div>
    </div>`;
}

/* ─────────────────────────────────────────────────────────
   CARTÕES ESPECIAIS — DESCANSO / REVISÃO LIVRE
   ───────────────────────────────────────────────────────── */
function restDayCard() {
  return `
    <div class="plano-special-day">
      <div class="plano-special-day-icon plano-special-day-icon--rest">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
             stroke-linecap="round" stroke-linejoin="round" width="28" height="28">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </div>
      <div>
        <p class="plano-special-day-title">Dia de Descanso</p>
        <p class="plano-special-day-desc">
          Recuperação é parte do aprendizado. Seu cérebro consolida memórias
          durante o repouso — aproveite para descansar e estar pronto para
          a próxima semana.
        </p>
      </div>
    </div>`;
}

function optionalDayCard() {
  return `
    <div class="plano-special-day">
      <div class="plano-special-day-icon plano-special-day-icon--opt">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
             stroke-linecap="round" stroke-linejoin="round" width="28" height="28">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </div>
      <div class="plano-special-day-body">
        <p class="plano-special-day-title">Revisão Livre</p>
        <p class="plano-special-day-desc">
          Dia opcional. Revise qualquer tópico que queira reforçar ou explore
          conteúdo extra. Escolha a matéria:
        </p>
        <div class="plano-opt-subjects">
          ${PLAN_SUBJECTS.map(
            (s) => `
            <a class="plano-opt-link" href="#/aulas?materia=${s.id}"
               style="color:${LEVEL_META[s.level].color};
                      border-color:${LEVEL_META[s.level].color}33;
                      background:${LEVEL_META[s.level].color}0e">
              <span class="plano-opt-dot" style="background:${LEVEL_META[s.level].color}"></span>
              ${s.name}
            </a>`,
          ).join("")}
        </div>
      </div>
    </div>`;
}

/* ─────────────────────────────────────────────────────────
   BARRA DE RESUMO DO DIA
   ───────────────────────────────────────────────────────── */
function daySummaryBar(subjects, isToday) {
  const totalMin   = subjects.reduce((sum, s) => sum + subjectPendingMin(s), 0);
  const count      = subjects.length;
  const totalDone  = subjects.reduce(
    (sum, s) => sum + s.topicos.filter((t) => t.done).length, 0,
  );
  const totalTopics = subjects.reduce((sum, s) => sum + s.topicos.length, 0);

  return `
    <div class="plano-day-summary">
      <div class="plano-day-summary-left">
        ${isToday ? '<span class="plano-today-badge">Hoje</span>' : ""}
        <span class="plano-day-summary-info">
          <strong>${count} matéria${count !== 1 ? "s" : ""}</strong>
          <span class="plano-day-summary-sep">·</span>
          ${totalTopics} tópicos
          <span class="plano-day-summary-sep">·</span>
          ~${formatTime(totalMin)} pendentes
        </span>
      </div>
      <span class="plano-day-summary-progress">
        ${totalDone}/${totalTopics} concluídos
      </span>
    </div>`;
}

/* ─────────────────────────────────────────────────────────
   RENDERIZAÇÃO DO CONTEÚDO POR DIA
   ───────────────────────────────────────────────────────── */
function renderDayContent(dayName) {
  const dayPlan = WEEK_PLAN.find((d) => d.day === dayName);
  if (!dayPlan) return "";

  if (dayPlan.rest)     return restDayCard();
  if (dayPlan.optional) return optionalDayCard();

  const subjects = dayPlan.subjects
    .map((id) => PLAN_SUBJECTS.find((s) => s.id === id))
    .filter(Boolean);

  const isToday = dayName === getTodayDay();

  return `
    ${daySummaryBar(subjects, isToday)}
    ${subjects.map((s, i) => trailCard(s, i + 1)).join("")}`;
}

/* ─────────────────────────────────────────────────────────
   TABS DE DIAS DA SEMANA
   ───────────────────────────────────────────────────────── */
function dayTabs(activeDay) {
  const today = getTodayDay();
  return `
    <div class="plano-day-tabs" role="tablist" aria-label="Dias da semana">
      ${WEEK_PLAN.map((d) => {
        const isActive = d.day === activeDay;
        const isToday  = d.day === today;
        const count    = d.subjects?.length ?? 0;
        return `
          <button
            class="plano-day-tab${isActive ? " active" : ""}${isToday ? " today" : ""}"
            data-day="${d.day}"
            role="tab"
            aria-selected="${isActive}"
            title="${d.rest ? "Descanso" : d.optional ? "Revisão Livre" : `${count} matéria${count !== 1 ? "s" : ""}`}">
            <span class="plano-day-tab-name">${d.day}</span>
            ${isToday ? '<span class="plano-day-tab-dot" aria-hidden="true"></span>' : ""}
            ${d.rest
              ? `<span class="plano-day-tab-pill plano-day-tab-pill--rest">Descanso</span>`
              : d.optional
              ? `<span class="plano-day-tab-pill plano-day-tab-pill--opt">Revisão</span>`
              : count > 0
              ? `<span class="plano-day-tab-count">${count}</span>`
              : ""}
          </button>`;
      }).join("")}
    </div>`;
}

/* ─────────────────────────────────────────────────────────
   SCREEN
   ───────────────────────────────────────────────────────── */
export function planoEstudoScreen() {
  const hasDisciplines = getDisciplines().length > 0;
  const today = getTodayDay();

  return `
  <main class="plano">

    <div class="plano-header-row">
      <div class="plano-header-text">
        <h1 class="plano-title">Plano de Estudos</h1>
        <p class="plano-subtitle">Sua trilha de conhecimento personalizada</p>
      </div>
      <button id="btn-refazer" class="plano-refazer-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round" class="plano-refazer-icon">
          <polyline points="1 4 1 10 7 10"/>
          <path d="M3.51 15a9 9 0 1 0 .49-4"/>
        </svg>
        Refazer o Plano de Estudos
      </button>
    </div>

    <div class="plano-body">

      <!-- SIDEBAR -->
      <aside class="plano-sidebar">

        <div class="plano-profile-card">
          <div class="plano-avatar-ring">
            <img src="assets/images/fotorosto.jpeg" alt="Avatar" class="plano-avatar-img" />
          </div>
          <div class="plano-profile-info">
            <span class="plano-profile-name">JIMMY</span>
            <span class="plano-profile-role">ENG. SOFTWARE</span>
          </div>
        </div>

        <div class="plano-legend">
          <p class="plano-legend-title">Legenda</p>
          ${Object.entries(LEVEL_META)
            .map(
              ([, m]) => `
            <div class="plano-legend-item">
              <span class="plano-dot" style="background:${m.color};box-shadow:0 0 6px ${m.color}88"></span>
              <span>${m.label}</span>
            </div>`,
            )
            .join("")}
        </div>

      </aside>

      <!-- CONTEÚDO PRINCIPAL -->
      <div class="plano-main">

        ${!hasDisciplines ? `
        <div class="pt-setup-notice">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
               stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Sua matriz está vazia. <a href="#/matriz">Cadastre suas disciplinas</a> para um plano 100% personalizado.
        </div>` : ""}

        ${dayTabs(today)}

        <div id="pt-trails-container" class="pt-trails">
          ${renderDayContent(today)}
        </div>

        <p class="plano-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" width="13" height="13">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Plano gerado com base no seu desempenho no quiz. Clique em qualquer tópico para ir direto à aula. Refaça o quiz para atualizar as prioridades.
        </p>

      </div>

    </div>
  </main>`;
}

/* ─────────────────────────────────────────────────────────
   INIT
   ───────────────────────────────────────────────────────── */
export function planoEstudoInit() {
  document.getElementById("btn-refazer")?.addEventListener("click", () => {
    window.location.hash = "#/quiz";
  });

  document.querySelectorAll(".plano-day-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const day = btn.dataset.day;

      /* Atualiza estado das tabs */
      document.querySelectorAll(".plano-day-tab").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      /* Anima saída, troca conteúdo, anima entrada */
      const container = document.getElementById("pt-trails-container");
      container.style.transition = "opacity 0.15s ease, transform 0.15s ease";
      container.style.opacity    = "0";
      container.style.transform  = "translateY(6px)";

      setTimeout(() => {
        container.innerHTML       = renderDayContent(day);
        container.style.transition = "none";
        container.style.opacity   = "0";
        container.style.transform = "translateY(6px)";

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            container.style.transition = "opacity 0.2s ease, transform 0.2s ease";
            container.style.opacity    = "1";
            container.style.transform  = "translateY(0)";
          });
        });
      }, 150);
    });
  });
}
