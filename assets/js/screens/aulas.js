/* =========================================================
   BELUGA - Tela: Minhas Aulas
   Estrutura:
   - AULAS_DATA: mock preparado para troca por fetch()
   - aulasScreen(): retorna o HTML completo da tela
   - aulasInit(): conecta os event listeners de interatividade
   ========================================================= */

import { openBiblioteca } from "./biblioteca.js";

// ==================================================================
// MOCK DATA
// Para conectar a uma API, substitua AULAS_DATA por um fetch()
// e ajuste aulasScreen() para receber os dados assincronamente.
// ==================================================================
const AULAS_DATA = {
  materias: [
    {
      id: "inovacao",
      nome: "Inovação e Tecnologia",
      quizResult: { acertos: 8, total: 10 },
      progresso: 50,
      topicos: [
        {
          id: "tec-emergentes",
          titulo: "Tecnologias Emergentes",
          youtubeId: "k1vJBpYL_xE",
          duracao: "22 min",
          recomendado: true,
          concluido: false,
        },
        {
          id: "startups",
          titulo: "Startups e Inovação",
          youtubeId: "VDvr08sCPOc",
          duracao: "18 min",
          recomendado: true,
          concluido: false,
        },
        {
          id: "futuro-trabalho",
          titulo: "Futuro do Trabalho",
          youtubeId: "dQw4w9WgXcQ",
          duracao: "15 min",
          recomendado: false,
          concluido: true,
        },
        {
          id: "lab-ia",
          titulo: "Laboratório de IA",
          youtubeId: "JN3KPFbWDiQ",
          duracao: "30 min",
          recomendado: true,
          concluido: false,
        },
        {
          id: "sociedade-rede",
          titulo: "Sociedade em Rede",
          youtubeId: "6S7YX9XAJrQ",
          duracao: "20 min",
          recomendado: false,
          concluido: false,
        },
        {
          id: "biotecnologia",
          titulo: "Biotecnologia",
          youtubeId: "jNQXAC9IVRw",
          duracao: "25 min",
          recomendado: true,
          concluido: false,
        },
      ],
      noticias: [
        {
          titulo: "IA generativa transforma o mercado de trabalho em 2025",
          fonte: "MIT Tech Review",
          url: "#",
          seed: "n-ia",
        },
        {
          titulo: "Startups brasileiras lideram inovação na América Latina",
          fonte: "Exame",
          url: "#",
          seed: "n-startup",
        },
        {
          titulo: "Biotecnologia: o próximo grande salto da ciência",
          fonte: "Nature Brasil",
          url: "#",
          seed: "n-bio",
        },
      ],
    },
    {
      id: "design-interfaces",
      nome: "Design de Interfaces",
      quizResult: { acertos: 6, total: 10 },
      progresso: 35,
      topicos: [
        {
          id: "principios-ux",
          titulo: "Princípios de UX",
          youtubeId: "VDvr08sCPOc",
          duracao: "25 min",
          recomendado: true,
          concluido: false,
        },
        {
          id: "design-systems",
          titulo: "Design Systems na Prática",
          youtubeId: "k1vJBpYL_xE",
          duracao: "32 min",
          recomendado: true,
          concluido: false,
        },
        {
          id: "prototipagem",
          titulo: "Prototipagem com Figma",
          youtubeId: "JN3KPFbWDiQ",
          duracao: "28 min",
          recomendado: false,
          concluido: true,
        },
        {
          id: "acessibilidade",
          titulo: "Acessibilidade Digital",
          youtubeId: "jNQXAC9IVRw",
          duracao: "20 min",
          recomendado: true,
          concluido: false,
        },
        {
          id: "tipografia",
          titulo: "Tipografia e Hierarquia Visual",
          youtubeId: "6S7YX9XAJrQ",
          duracao: "16 min",
          recomendado: false,
          concluido: false,
        },
      ],
      noticias: [
        {
          titulo: "Tendências de UI para 2025: minimalismo e microinterações",
          fonte: "UX Collective",
          url: "#",
          seed: "n-ui",
        },
        {
          titulo: "Como grandes empresas constroem seus design systems",
          fonte: "Smashing Magazine",
          url: "#",
          seed: "n-ds",
        },
      ],
    },
    {
      id: "metodologia",
      nome: "Metodologia do Trabalho Científico",
      quizResult: { acertos: 9, total: 10 },
      progresso: 75,
      topicos: [
        {
          id: "pesquisa",
          titulo: "Métodos de Pesquisa Científica",
          youtubeId: "k1vJBpYL_xE",
          duracao: "35 min",
          recomendado: false,
          concluido: true,
        },
        {
          id: "abnt",
          titulo: "Normas ABNT na Prática",
          youtubeId: "VDvr08sCPOc",
          duracao: "20 min",
          recomendado: true,
          concluido: true,
        },
        {
          id: "redacao",
          titulo: "Redação Acadêmica",
          youtubeId: "dQw4w9WgXcQ",
          duracao: "18 min",
          recomendado: true,
          concluido: false,
        },
        {
          id: "revisao-lit",
          titulo: "Revisão de Literatura",
          youtubeId: "JN3KPFbWDiQ",
          duracao: "22 min",
          recomendado: false,
          concluido: false,
        },
      ],
      noticias: [
        {
          titulo: "Como escrever um TCC que impressiona a banca",
          fonte: "Capes",
          url: "#",
          seed: "n-tcc",
        },
      ],
    },
    {
      id: "sistemas-operacionais",
      nome: "Sistemas Operacionais",
      quizResult: { acertos: 5, total: 10 },
      progresso: 20,
      topicos: [
        {
          id: "processos",
          titulo: "Gerenciamento de Processos",
          youtubeId: "jNQXAC9IVRw",
          duracao: "40 min",
          recomendado: true,
          concluido: false,
        },
        {
          id: "memoria",
          titulo: "Gerenciamento de Memória",
          youtubeId: "6S7YX9XAJrQ",
          duracao: "38 min",
          recomendado: true,
          concluido: false,
        },
        {
          id: "filesystems",
          titulo: "Sistemas de Arquivos",
          youtubeId: "k1vJBpYL_xE",
          duracao: "30 min",
          recomendado: false,
          concluido: false,
        },
        {
          id: "linux",
          titulo: "Linux Básico para Devs",
          youtubeId: "VDvr08sCPOc",
          duracao: "45 min",
          recomendado: true,
          concluido: false,
        },
      ],
      noticias: [
        {
          titulo: "Linux completa 34 anos e segue dominando servidores",
          fonte: "InfoQ",
          url: "#",
          seed: "n-linux",
        },
        {
          titulo: "Por que estudar SO ainda é essencial em 2025",
          fonte: "Dev.to",
          url: "#",
          seed: "n-so",
        },
      ],
    },
    {
      id: "algoritmos",
      nome: "Algoritmos e Programação",
      quizResult: { acertos: 7, total: 10 },
      progresso: 60,
      topicos: [
        {
          id: "complexidade",
          titulo: "Complexidade de Algoritmos",
          youtubeId: "dQw4w9WgXcQ",
          duracao: "28 min",
          recomendado: true,
          concluido: true,
        },
        {
          id: "est-dados",
          titulo: "Estruturas de Dados Essenciais",
          youtubeId: "JN3KPFbWDiQ",
          duracao: "35 min",
          recomendado: true,
          concluido: false,
        },
        {
          id: "ordenacao",
          titulo: "Algoritmos de Ordenação",
          youtubeId: "jNQXAC9IVRw",
          duracao: "22 min",
          recomendado: false,
          concluido: true,
        },
        {
          id: "recursao",
          titulo: "Recursão e Backtracking",
          youtubeId: "6S7YX9XAJrQ",
          duracao: "30 min",
          recomendado: true,
          concluido: false,
        },
      ],
      noticias: [
        {
          titulo: "Os algoritmos mais pedidos em entrevistas de emprego",
          fonte: "Alura",
          url: "#",
          seed: "n-alg",
        },
      ],
    },
    {
      id: "calculo",
      nome: "Limite e Derivada",
      quizResult: { acertos: 4, total: 10 },
      progresso: 15,
      topicos: [
        {
          id: "limites",
          titulo: "Conceito de Limite",
          youtubeId: "k1vJBpYL_xE",
          duracao: "25 min",
          recomendado: true,
          concluido: false,
        },
        {
          id: "continuidade",
          titulo: "Continuidade de Funções",
          youtubeId: "VDvr08sCPOc",
          duracao: "20 min",
          recomendado: true,
          concluido: false,
        },
        {
          id: "derivada",
          titulo: "Derivada: Conceito e Regras",
          youtubeId: "dQw4w9WgXcQ",
          duracao: "32 min",
          recomendado: false,
          concluido: false,
        },
        {
          id: "regra-cadeia",
          titulo: "Regra da Cadeia",
          youtubeId: "JN3KPFbWDiQ",
          duracao: "18 min",
          recomendado: true,
          concluido: false,
        },
      ],
      noticias: [
        {
          titulo: "Como o cálculo diferencial é usado em machine learning",
          fonte: "Towards Data Science",
          url: "#",
          seed: "n-calc",
        },
      ],
    },
    {
      id: "cursos-extras",
      nome: "Cursos Extras",
      quizResult: { acertos: 0, total: 0 },
      progresso: 10,
      topicos: [
        {
          id: "ingles-tech",
          titulo: "Inglês para Tecnologia",
          youtubeId: "jNQXAC9IVRw",
          duracao: "20 min",
          recomendado: true,
          concluido: false,
        },
        {
          id: "git-github",
          titulo: "Git e GitHub na Prática",
          youtubeId: "6S7YX9XAJrQ",
          duracao: "35 min",
          recomendado: true,
          concluido: false,
        },
        {
          id: "soft-skills",
          titulo: "Soft Skills para o Mercado",
          youtubeId: "k1vJBpYL_xE",
          duracao: "22 min",
          recomendado: false,
          concluido: false,
        },
      ],
      noticias: [
        {
          titulo: "As 10 habilidades mais valorizadas pelo mercado em 2025",
          fonte: "LinkedIn Insights",
          url: "#",
          seed: "n-soft",
        },
      ],
    },
  ],
};

// ---- MODULE STATE ----
let _activeId = AULAS_DATA.materias[0].id;

// ---- PRIVATE HELPERS ----

function getMateriaById(id) {
  return AULAS_DATA.materias.find((m) => m.id === id) ?? AULAS_DATA.materias[0];
}

function renderProgressRing(percent) {
  const r = 26;
  const circ = +(2 * Math.PI * r).toFixed(2);
  const filled = +((percent / 100) * circ).toFixed(2);
  const offset = +(circ / 4).toFixed(2);
  const stroke = percent < 40 ? "#f97316" : "#2b719c";
  return `
    <div class="progress-ring-wrap aulas-ring-wrap">
      <svg class="progress-ring" viewBox="0 0 60 60" style="width:60px;height:60px;">
        <circle class="ring-bg" cx="30" cy="30" r="${r}" fill="none" stroke-width="5"/>
        <circle cx="30" cy="30" r="${r}" fill="none" stroke-width="5"
          stroke="${stroke}"
          stroke-dasharray="${filled} ${circ - filled}"
          stroke-dashoffset="${offset}"
          stroke-linecap="round"
        />
      </svg>
      <div class="ring-label">${percent}%</div>
    </div>`;
}

function buildTopicCard(t) {
  const thumb = `https://i.ytimg.com/vi/${t.youtubeId}/mqdefault.jpg`;
  const recBadge = t.recomendado
    ? `<span class="aulas-badge aulas-badge--rec">★ Recomendado</span>`
    : "";
  const doneBadge = t.concluido
    ? `<span class="aulas-badge aulas-badge--done">✓ Concluído</span>`
    : "";
  const cardMod = [
    t.recomendado ? "recomendado" : "",
    t.concluido ? "concluido" : "",
  ]
    .filter(Boolean)
    .map((c) => `aulas-topic-card--${c}`)
    .join(" ");

  return `
    <a
      class="aulas-topic-card ${cardMod}"
      href="https://www.youtube.com/watch?v=${t.youtubeId}"
      target="_blank"
      rel="noopener noreferrer"
      title="Assistir no YouTube: ${t.titulo}"
    >
      <div class="aulas-topic-body">
        <div class="aulas-topic-badges">${recBadge}${doneBadge}</div>
        <h3 class="aulas-topic-title">${t.titulo}</h3>
        <span class="aulas-topic-duration">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          ${t.duracao}
        </span>
      </div>
      <div class="aulas-topic-thumb">
        <img
          src="${thumb}"
          alt="${t.titulo}"
          loading="lazy"
          onerror="this.parentElement.classList.add('aulas-topic-thumb--fallback');this.remove()"
        />
        <div class="aulas-play-btn" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
      </div>
    </a>`;
}

function buildMain(materia) {
  const concluidos = materia.topicos.filter((t) => t.concluido).length;
  return `
    <div class="aulas-main-header">
      <div>
        <h2 class="aulas-subject-title">${materia.nome}</h2>
        <p class="aulas-topics-label">Tópicos a serem estudados:</p>
      </div>
      <span class="aulas-progress-chip">${concluidos}/${materia.topicos.length} concluídos</span>
    </div>

    <div class="aulas-topics-list">
      ${materia.topicos.map(buildTopicCard).join("")}
    </div>

    <div class="aulas-library-wrap">
      <button class="aulas-library-btn" type="button" id="btn-biblioteca">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
        BIBLIOTECA
      </button>
    </div>`;
}

function quizBarColor(pct) {
  if (pct >= 70) return "#22c55e";
  if (pct >= 40) return "#f59e0b";
  return "#f97316";
}

function buildPanel(materia) {
  const { quizResult, progresso, noticias } = materia;
  const isLow = progresso < 40;
  const hasQuiz = quizResult.total > 0;
  const pct = hasQuiz
    ? Math.round((quizResult.acertos / quizResult.total) * 100)
    : 0;

  const quizSection = hasQuiz
    ? `
    <div class="aulas-stat-card">
      <p class="aulas-stat-label">Último Quiz</p>
      <div class="aulas-quiz-body">
        <span class="aulas-quiz-score">${quizResult.acertos}/${quizResult.total}</span>
        <span class="aulas-quiz-pct">${pct}% acertos</span>
      </div>
      <div class="aulas-quiz-bar">
        <div class="aulas-quiz-bar-fill" style="width:${pct}%;background:${quizBarColor(pct)}"></div>
      </div>
    </div>`
    : "";

  const alertSection = isLow
    ? `
    <div class="aulas-alert-badge">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
      Reforço recomendado
    </div>`
    : "";

  const newsItems = noticias
    .map(
      (n) => `
    <a class="aulas-news-item" href="${n.url}" target="_blank" rel="noopener noreferrer">
      <img
        class="aulas-news-thumb"
        src="https://picsum.photos/seed/${n.seed}/80/54"
        alt="${n.titulo}"
        loading="lazy"
      />
      <div class="aulas-news-text">
        <span class="aulas-news-title">${n.titulo}</span>
        <span class="aulas-news-fonte">${n.fonte}</span>
      </div>
    </a>`,
    )
    .join("");

  return `
    ${quizSection}
    <div class="aulas-stat-card">
      <p class="aulas-stat-label">Progresso na Matéria</p>
      <div class="aulas-progress-body">
        ${renderProgressRing(progresso)}
        ${alertSection}
      </div>
    </div>
    <div class="aulas-stat-card aulas-news-card">
      <p class="aulas-stat-label">Assuntos para você:</p>
      <div class="aulas-news-list">${newsItems}</div>
    </div>`;
}

function buildSidebar() {
  const items = AULAS_DATA.materias
    .map(
      (m) => `
      <button
        class="aulas-subject-btn${m.id === _activeId ? " active" : ""}"
        data-id="${m.id}"
        type="button"
      >${m.nome}</button>`,
    )
    .join("");
  return `
    <aside class="aulas-sidebar">
      <p class="aulas-sidebar-label">Outras matérias:</p>
      <nav class="aulas-subjects-nav" aria-label="Matérias do aluno">${items}</nav>
    </aside>`;
}

// ---- PUBLIC EXPORTS ----

export function aulasScreen() {
  const hash = window.location.hash;
  const qIdx = hash.indexOf("?");
  let requestedId = AULAS_DATA.materias[0].id;
  if (qIdx !== -1) {
    const params = new URLSearchParams(hash.slice(qIdx + 1));
    const pid = params.get("materia");
    if (pid) requestedId = pid;
  }
  _activeId = getMateriaById(requestedId).id;
  const materia = getMateriaById(_activeId);
  return `
    <div class="aulas">
      <div class="aulas-page-header">
        <h1 class="aulas-page-title">Minhas Aulas</h1>
      </div>
      <div class="aulas-body">
        ${buildSidebar()}
        <main class="aulas-main">${buildMain(materia)}</main>
        <aside class="aulas-panel">${buildPanel(materia)}</aside>
      </div>
    </div>`;
}

function attachLibraryBtn() {
  const btn = document.getElementById("btn-biblioteca");
  if (btn) {
    btn.addEventListener("click", openBiblioteca);
  }
}

export function aulasInit() {
  document.querySelectorAll(".aulas-subject-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      _activeId = btn.dataset.id;

      document
        .querySelectorAll(".aulas-subject-btn")
        .forEach((b) =>
          b.classList.toggle("active", b.dataset.id === _activeId),
        );

      const materia = getMateriaById(_activeId);
      document.querySelector(".aulas-main").innerHTML = buildMain(materia);
      document.querySelector(".aulas-panel").innerHTML = buildPanel(materia);

      attachLibraryBtn();
    });
  });

  attachLibraryBtn();
}
