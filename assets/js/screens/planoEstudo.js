import { getDisciplines } from "../state/matriz.js";

/* =========================================================
   CONSTANTES
   ========================================================= */
const DAYS = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

const LEVEL_COLORS = { high: "#ef4444", medium: "#f59e0b", low: "#22c55e" };
const LEVEL_LABELS = {
  high: "Maior dificuldade",
  medium: "Em progresso",
  low: "Consolidado",
};

/* =========================================================
   LÓGICA DO PLANO
   Quando a IA for integrada, buildPlan() será substituído por
   uma chamada à API que retorna o plano já categorizado.
   ========================================================= */
function buildPlan(disciplines) {
  if (!disciplines.length) disciplines = ["Revisão Geral"];

  /* Distribui dificuldade por índice — será vindo do quiz no futuro */
  const levelOf = (i) => ["high", "medium", "low"][i % 3];

  const byLevel = { high: [], medium: [], low: [] };
  disciplines.forEach((d, i) => byLevel[levelOf(i)].push(d));

  /* Prioridade: matérias de maior dificuldade primeiro */
  const sorted = [...byLevel.high, ...byLevel.medium, ...byLevel.low];

  const rows = DAYS.map((day, i) => {
    if (day === "Sábado") {
      const d = sorted[i % sorted.length];
      return {
        day,
        primary: d,
        primaryLevel: levelOf(sorted.indexOf(d)),
        secondary: "Livre ou revisão",
        secondaryLevel: null,
        optional: true,
      };
    }
    if (day === "Domingo") {
      return {
        day,
        primary: "Revisão geral",
        primaryLevel: "low",
        secondary: "Livre ou descanso",
        secondaryLevel: null,
        rest: true,
      };
    }
    const pri = sorted[i % sorted.length];
    const sec = sorted[(i + 1) % sorted.length];
    return {
      day,
      primary: pri,
      primaryLevel: levelOf(sorted.indexOf(pri)),
      secondary: sec,
      secondaryLevel: levelOf(sorted.indexOf(sec)),
    };
  });

  return { rows, byLevel };
}

/* =========================================================
   HELPERS DE RENDER
   ========================================================= */
function dotHTML(level) {
  if (!level) return "";
  return `<span class="plano-dot" style="background:${LEVEL_COLORS[level]};box-shadow:0 0 6px ${LEVEL_COLORS[level]}88"></span>`;
}

function pillsHTML(list, level) {
  if (!list.length) return "";
  const color = LEVEL_COLORS[level];
  return `
    <div class="plano-group">
      <p class="plano-group-label" style="color:${color}">${LEVEL_LABELS[level]}</p>
      <div class="plano-pills-row">
        ${list.map((d) => `<span class="plano-pill" style="border-color:${color}55;color:${color}">${d}</span>`).join("")}
      </div>
    </div>`;
}

/* =========================================================
   SCREEN
   ========================================================= */
export function planoEstudoScreen() {
  return `
  <main class="plano">

    <div class="plano-header-row">
      <div class="plano-header-text">
        <h1 class="plano-title">Plano de Estudos</h1>
        <p class="plano-subtitle">Personalizado com base no seu diagnóstico</p>
      </div>
      <button id="btn-refazer" class="plano-refazer-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="plano-refazer-icon"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4"/></svg>
        Refazer o Plano de Estudos
      </button>
    </div>

    <div class="plano-body">

      <aside class="plano-sidebar">
        <div class="plano-profile-card">
          <div class="plano-avatar-ring">
            <img src="assets/images/fotorosto.jpeg" alt="Avatar" class="plano-avatar-img" />
          </div>
          <div class="plano-profile-info">
            <span class="plano-profile-name" id="plano-user-name">JIMMY</span>
            <span class="plano-profile-role">ENG. SOFTWARE</span>
          </div>
        </div>

        <div class="plano-legend">
          <p class="plano-legend-title">Legenda</p>
          ${Object.entries(LEVEL_COLORS)
            .map(
              ([k, c]) => `
          <div class="plano-legend-item">
            <span class="plano-dot" style="background:${c};box-shadow:0 0 6px ${c}88"></span>
            <span>${LEVEL_LABELS[k]}</span>
          </div>`,
            )
            .join("")}
        </div>

        <div id="plano-groups"></div>
      </aside>

      <div class="plano-table-wrap">
        <table class="plano-table">
          <thead>
            <tr>
              <th class="plano-th-day">Dia</th>
              <th>Primeira matéria <span class="plano-th-hours">(1–2 horas)</span></th>
              <th>Segunda matéria <span class="plano-th-hours">(1 hora)</span></th>
              <th class="plano-th-cor">Nível</th>
            </tr>
          </thead>
          <tbody id="plano-tbody"></tbody>
        </table>

        <p class="plano-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="13" height="13"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Este plano é gerado automaticamente. Quando integrado à IA, será 100% personalizado pelas suas respostas no quiz.
        </p>
      </div>

    </div>

  </main>`;
}

/* =========================================================
   INIT
   ========================================================= */
export function planoEstudoInit() {
  const disciplines = getDisciplines();
  const { rows, byLevel } = buildPlan(disciplines);

  /* Sidebar: grupos por nível */
  const groupsEl = document.getElementById("plano-groups");
  groupsEl.innerHTML = Object.entries(byLevel)
    .filter(([, list]) => list.length)
    .map(([level, list]) => pillsHTML(list, level))
    .join("");

  /* Tabela */
  const tbody = document.getElementById("plano-tbody");
  tbody.innerHTML = rows
    .map((row) => {
      const secClass = row.rest
        ? "plano-cell-rest"
        : row.optional
          ? "plano-cell-optional"
          : "";
      return `
    <tr class="plano-row">
      <td class="plano-td-day">${row.day}</td>
      <td class="plano-td-subject"><span class="plano-subject">${row.primary}</span></td>
      <td class="plano-td-subject"><span class="plano-subject ${secClass}">${row.secondary}</span></td>
      <td class="plano-td-dots">
        ${dotHTML(row.primaryLevel)}
        ${dotHTML(row.secondaryLevel)}
        ${row.optional ? '<span class="plano-opt-tag">opcional</span>' : ""}
        ${row.rest ? '<span class="plano-rest-tag">descanso</span>' : ""}
      </td>
    </tr>`;
    })
    .join("");

  document.getElementById("btn-refazer").addEventListener("click", () => {
    window.location.hash = "#/quiz";
  });
}
