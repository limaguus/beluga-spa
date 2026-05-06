const SUBJECTS = [
  { name: "Algoritmos e<br>Programação", id: "algoritmos", progress: 55, color: "#3b9edd" },
  { name: "Limite e<br>Derivada", id: "calculo", progress: 50, color: "#3b9edd" },
  { name: "Sistemas<br>Operacionais", id: "sistemas-operacionais", progress: 60, color: "#3b9edd" },
  {
    name: "Inovação e<br>Tecnologia",
    id: "inovacao",
    progress: 30,
    color: "#f97316",
    highlight: true,
  },
  { name: "Design de<br>Interfaces", id: "design-interfaces", progress: 45, color: "#3b9edd" },
  { name: "M. Trabalho<br>Científico", id: "metodologia", progress: 90, color: "#a855f7" },
];

const ACTIONS = [
  {
    label: "Cadastro<br>de Matriz",
    route: "#/matriz",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  },
  {
    label: "Quiz<br>Diagnóstico",
    route: "#/quiz",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 1 0 0 16A8 8 0 0 0 12 2z"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  },
  {
    label: "Plano de<br>Estudos",
    route: "#/plano",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
  },
  {
    label: "Beluga<br>Feed",
    route: "#/feed",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
  },
  {
    label: "Fórum<br>comunidade",
    route: "#/forum",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  },
  {
    label: "Notifi&shy;cações",
    route: "#/notificacoes",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  },
  {
    label: "Minhas<br>aulas",
    route: "#/aulas",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`,
  },
  {
    label: "Conquistas",
    route: "#/conquistas",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m3.5 11.5 9-9a2.5 2.5 0 0 1 3.5 0l3.5 3.5a2.5 2.5 0 0 1 0 3.5l-9 9"/><path d="M9 9l4 4"/></svg>`,
  },
];

function ringHTML(subject) {
  const gap = 100 - subject.progress;
  const cls = subject.highlight ? " highlight" : "";
  return `
    <a class="subject-card${cls}" href="#/aulas?materia=${subject.id}">
      <h3>${subject.name}</h3>
      <div class="progress-ring-wrap">
        <svg viewBox="0 0 36 36" class="progress-ring">
          <circle class="ring-bg" cx="18" cy="18" r="15.9" fill="none" stroke-width="3"/>
          <circle class="ring-fill" cx="18" cy="18" r="15.9" fill="none"
            stroke="${subject.color}" stroke-width="3" stroke-linecap="round"
            stroke-dasharray="${subject.progress} ${gap}"
            transform="rotate(-90 18 18)"/>
        </svg>
        <span class="ring-label">${subject.progress}%</span>
      </div>
    </a>`;
}

export function dashboardScreen() {
  const subjectCards = SUBJECTS.map(ringHTML).join("");
  const actionCards = ACTIONS.map(
    (a) => `
    <a class="action-card" href="${a.route}">
      ${a.icon}
      <span>${a.label}</span>
    </a>`,
  ).join("");

  return `
  <main class="dashboard">
    <h1 class="dashboard-title">Bem- vindo de volta, Jimmy!</h1>
    <h2 class="dashboard-subtitle">Suas matérias nesse semestre:</h2>

    <section class="subjects">${subjectCards}</section>

    <section class="chart-area">
      <canvas id="dashboard-chart"></canvas>
    </section>

    <section class="dashboard-actions">${actionCards}</section>

  </main>`;
}

export function dashboardInit() {
  const ctx = document.getElementById("dashboard-chart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "L. Derivada",
        "S. Operacionais",
        "Design",
        "Algoritmos",
        "Inovação",
        "M.T.C",
      ],
      datasets: [
        {
          label: "Progresso",
          data: [50, 60, 45, 55, 30, 90],
          backgroundColor: [
            "#3b9edd",
            "#3b9edd",
            "#3b9edd",
            "#3b9edd",
            "#f97316",
            "#a855f7",
          ],
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (c) => `${c.parsed.y}%` } },
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "rgba(255,255,255,0.45)", callback: (v) => v + "%" },
        },
        x: {
          grid: { display: false },
          ticks: { color: "rgba(255,255,255,0.45)" },
        },
      },
    },
  });
}
