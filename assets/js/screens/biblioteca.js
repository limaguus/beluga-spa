/* =========================================================
   BELUGA - Biblioteca
   Modal overlay de pesquisa de conteúdos acadêmicos.
   Preparado para futura integração com API/IA:
   - substitua BIBLIOTECA_DATA por fetch() em openBiblioteca()
   - adjustments em buildContentHTML() para loading states
   ========================================================= */

// ==================================================================
// MOCK DATA
// Para integração com API: substitua este objeto por uma chamada
// fetch() e passe os dados para as funções de render.
// ==================================================================

const BIBLIOTECA_DATA = {
  categorias: [
    { id: "todas", label: "Todas as aulas" },
    { id: "algoritmos", label: "Algoritmos" },
    { id: "sistemas-op", label: "Sistemas O." },
    { id: "design", label: "Design" },
    { id: "calculo", label: "Limite e Derivada" },
    { id: "inovacao", label: "Inovação" },
    { id: "tcc", label: "Trabalho C." },
    { id: "dicas", label: "Dicas" },
    { id: "exercicios", label: "Exercícios" },
  ],
  videos: [
    {
      id: "b1",
      titulo: "Entendendo de vez o conceito de variável e escopo em C",
      categoria: "algoritmos",
      youtubeId: "FmTO2EPatZQ",
      duracao: "18 min",
      descricao: "Fundamentos essenciais de escopo e variáveis na linguagem C.",
      recomendado: true,
    },
    {
      id: "b2",
      titulo: "Como funciona a troca de contexto entre processos?",
      categoria: "sistemas-op",
      youtubeId: "xNBMNKjpJzME",
      duracao: "22 min",
      descricao:
        "Entenda o mecanismo de context switch nos sistemas operacionais modernos.",
      recomendado: true,
    },
    {
      id: "b3",
      titulo: "Erros de design que atrapalham a experiência do usuário",
      categoria: "design",
      youtubeId: "TuGEKdirNTU",
      duracao: "15 min",
      descricao:
        "Os principais antipadrões de UX e como evitá-los no seu projeto.",
      recomendado: true,
    },
    {
      id: "b4",
      titulo: "Limite e Derivada: visualizando de forma intuitiva no gráfico",
      categoria: "calculo",
      youtubeId: "DIzwGegP8YE",
      duracao: "28 min",
      descricao:
        "Compreenda limites e derivadas com visualizações gráficas step-by-step.",
      recomendado: true,
    },
    {
      id: "b5",
      titulo: "Como montar sua Introdução do TCC sem travar",
      categoria: "tcc",
      youtubeId: "TfwM2eUlCBcr",
      duracao: "20 min",
      descricao:
        "Estratégias práticas para escrever a introdução do seu TCC de forma fluida.",
      recomendado: true,
    },
    {
      id: "b6",
      titulo: "3 tendências de tecnologia que você precisa entender hoje",
      categoria: "inovacao",
      youtubeId: "iAf-H50vsGU",
      duracao: "12 min",
      descricao:
        "IA, Web3 e computação quântica — o que cada estudante de TI precisa saber.",
      recomendado: true,
    },
    {
      id: "b7",
      titulo: "Estruturas de dados: Pilhas, Filas e Listas Encadeadas",
      categoria: "algoritmos",
      youtubeId: "nWHveXK9g_8",
      duracao: "35 min",
      descricao:
        "Implementação prática das principais estruturas de dados em Python.",
      recomendado: false,
    },
    {
      id: "b8",
      titulo: "Gerenciamento de Memória no Linux",
      categoria: "sistemas-op",
      youtubeId: "k1vJBpYL_xE",
      duracao: "40 min",
      descricao: "Como o kernel Linux gerencia a memória virtual e física.",
      recomendado: false,
    },
    {
      id: "b9",
      titulo: "Design System do Zero com Figma",
      categoria: "design",
      youtubeId: "JzQE3NfW7fg",
      duracao: "45 min",
      descricao:
        "Criando componentes, tokens e documentação de um design system completo.",
      recomendado: false,
    },
    {
      id: "b10",
      titulo: "Regra da Cadeia passo a passo com exemplos",
      categoria: "calculo",
      youtubeId: "b5m864fIKvA",
      duracao: "18 min",
      descricao:
        "Demonstrações e exercícios resolvidos sobre a regra da cadeia.",
      recomendado: false,
    },
    {
      id: "b11",
      titulo: "Normas ABNT: como formatar seu TCC corretamente",
      categoria: "tcc",
      youtubeId: "6ySUeU4ZNSE",
      duracao: "25 min",
      descricao:
        "Guia completo das principais normas ABNT aplicadas ao trabalho acadêmico.",
      recomendado: false,
    },
    {
      id: "b12",
      titulo: "Técnicas de estudo comprovadas pela neurociência",
      categoria: "dicas",
      youtubeId: "SkehmBd2LdQ",
      duracao: "16 min",
      descricao:
        "Spaced repetition, active recall e pomodoro — o que a ciência diz.",
      recomendado: true,
    },
    {
      id: "b13",
      titulo: "50 exercícios de Algoritmos com gabarito comentado",
      categoria: "exercicios",
      youtubeId: "M8b2-9FPAsw",
      duracao: "60 min",
      descricao:
        "Lista completa de exercícios para praticar algoritmos e lógica.",
      recomendado: false,
    },
    {
      id: "b14",
      titulo: "Como usar IA de forma ética nos seus estudos",
      categoria: "dicas",
      youtubeId: "ztZVN1jI6rs",
      duracao: "14 min",
      descricao:
        "Boas práticas para usar IA como ferramenta de aprendizado, não cola.",
      recomendado: false,
    },
    {
      id: "b15",
      titulo: "Startups: como validar uma ideia de negócio do zero",
      categoria: "inovacao",
      youtubeId: "vHvpcs7aTDo",
      duracao: "32 min",
      descricao:
        "Metodologia Lean Startup aplicada ao empreendedorismo acadêmico.",
      recomendado: false,
    },
    {
      id: "b16",
      titulo: "Algoritmos de Ordenação visualizados em tempo real",
      categoria: "algoritmos",
      youtubeId: "dME8oVEfUfA",
      duracao: "22 min",
      descricao:
        "Bubble, Merge e Quick Sort com animações para fixar o conceito.",
      recomendado: false,
    },
    {
      id: "b17",
      titulo: "Exercícios de Sistemas Operacionais com gabarito",
      categoria: "exercicios",
      youtubeId: "Tw2Ej2J9IUE",
      duracao: "50 min",
      descricao: "Resolução comentada de questões de concurso sobre SO.",
      recomendado: false,
    },
  ],
};

// ---- MODULE STATE ----
let _activeCategoria = "todas";
let _searchQuery = "";
let _overlayEl = null;

// ---- PRIVATE HELPERS ----

// S4: valida o formato do ID do YouTube antes de usar em URLs e iframes — previne injeção
function isValidYoutubeId(id) {
  return typeof id === "string" && /^[a-zA-Z0-9_-]{8,15}$/.test(id);
}

// S5: escapa caracteres HTML especiais para atributos e conteúdo — previne XSS
function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getFilteredVideos() {
  let vids = BIBLIOTECA_DATA.videos;
  if (_activeCategoria !== "todas") {
    vids = vids.filter((v) => v.categoria === _activeCategoria);
  }
  if (_searchQuery.trim()) {
    const q = _searchQuery.toLowerCase();
    vids = vids.filter(
      (v) =>
        v.titulo.toLowerCase().includes(q) ||
        v.descricao.toLowerCase().includes(q),
    );
  }
  return vids;
}

function buildVideoCard(v) {
  // S4: ignora vídeos com ID inválido — impede geração de URLs malformadas
  if (!isValidYoutubeId(v.youtubeId)) return "";
  const thumb = `https://i.ytimg.com/vi/${v.youtubeId}/mqdefault.jpg`;
  const recBadge = v.recomendado
    ? `<span class="bib-badge">★ Recomendado</span>`
    : "";
  return `
    <a
      class="bib-card${v.recomendado ? " bib-card--rec" : ""}"
      href="https://www.youtube.com/watch?v=${v.youtubeId}"
      data-youtube-id="${v.youtubeId}"
      data-video-title="${escapeHtml(v.titulo)}"
      title="${escapeHtml(v.titulo)}"
    >
      <div class="bib-card-thumb">
        <img
          src="${thumb}"
          alt="${v.titulo}"
          loading="lazy"
          onerror="this.parentElement.classList.add('bib-card-thumb--fallback');this.remove()"
        />
        <div class="bib-card-play" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </div>
        <span class="bib-card-duration">${v.duracao}</span>
      </div>
      <div class="bib-card-body">
        ${recBadge}
        <h4 class="bib-card-title">${v.titulo}</h4>
        <p class="bib-card-desc">${v.descricao}</p>
      </div>
    </a>`;
}

function buildSidebarHTML() {
  return BIBLIOTECA_DATA.categorias
    .map(
      (c) => `
    <button
      class="bib-cat-btn${c.id === _activeCategoria ? " active" : ""}"
      data-cat="${c.id}"
      type="button"
    >${c.label}</button>`,
    )
    .join("");
}

function buildContentHTML() {
  const vids = getFilteredVideos();
  const isFiltering =
    _searchQuery.trim() !== "" || _activeCategoria !== "todas";

  if (vids.length === 0) {
    return `
      <div class="bib-empty">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <p>Nenhum conteúdo encontrado</p>
        <span>Tente outros termos ou navegue pelas categorias</span>
      </div>`;
  }

  if (isFiltering) {
    return `
      <div class="bib-section">
        <div class="bib-section-header">
          <h3 class="bib-section-title">
            ${vids.length} resultado${vids.length !== 1 ? "s" : ""} encontrado${vids.length !== 1 ? "s" : ""}
          </h3>
        </div>
        <div class="bib-cards-grid">${vids.map(buildVideoCard).join("")}</div>
      </div>`;
  }

  const recomendados = vids.filter((v) => v.recomendado);
  const outros = vids.filter((v) => !v.recomendado);

  const recsSection = recomendados.length
    ? `
    <div class="bib-section">
      <div class="bib-section-header">
        <h3 class="bib-section-title">Recomendados para você:</h3>
        <span class="bib-section-tag">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          Personalizado para você
        </span>
      </div>
      <div class="bib-cards-grid">${recomendados.map(buildVideoCard).join("")}</div>
    </div>`
    : "";

  const outrosSection = outros.length
    ? `
    <div class="bib-section">
      <div class="bib-section-header">
        <h3 class="bib-section-title">Mais conteúdos</h3>
      </div>
      <div class="bib-cards-grid">${outros.map(buildVideoCard).join("")}</div>
    </div>`
    : "";

  return recsSection + outrosSection;
}

function buildModalHTML() {
  return `
    <div class="bib-overlay" id="bib-overlay" role="dialog" aria-modal="true" aria-label="Biblioteca de Conteúdos">
      <div class="bib-modal">

        <header class="bib-header">
          <div class="bib-header-text">
            <h2 class="bib-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              Biblioteca
            </h2>
            <p class="bib-subtitle">Pesquise conteúdos recomendados para seus estudos</p>
          </div>
          <button class="bib-close" id="bib-close" type="button" aria-label="Fechar biblioteca">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </header>

        <div class="bib-search-row">
          <div class="bib-search-wrap">
            <svg class="bib-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              class="bib-search-input"
              id="bib-search-input"
              type="text"
              placeholder="Buscar videoaulas, tópicos, matérias..."
              autocomplete="off"
            />
          </div>
          <button class="bib-search-btn" id="bib-search-btn" type="button">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Pesquisar
          </button>
        </div>

        <div class="bib-body">
          <aside class="bib-sidebar">
            <p class="bib-sidebar-label">Categorias</p>
            <nav class="bib-cats" id="bib-cats">${buildSidebarHTML()}</nav>
          </aside>
          <div class="bib-content" id="bib-content">
            ${buildContentHTML()}
          </div>
        </div>

      </div>
    </div>`;
}

function updateContent() {
  const el = document.getElementById("bib-content");
  if (el) el.innerHTML = buildContentHTML();
}

function updateSidebar() {
  const el = document.getElementById("bib-cats");
  if (el) el.innerHTML = buildSidebarHTML();
}

function onEscape(e) {
  if (e.key === "Escape") closeBiblioteca();
}

function attachEvents() {
  const overlay = document.getElementById("bib-overlay");
  if (!overlay) return;

  document
    .getElementById("bib-close")
    .addEventListener("click", closeBiblioteca);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeBiblioteca();
  });

  document.addEventListener("keydown", onEscape);

  document.getElementById("bib-cats").addEventListener("click", (e) => {
    const btn = e.target.closest(".bib-cat-btn");
    if (!btn) return;
    _activeCategoria = btn.dataset.cat;
    updateSidebar();
    updateContent();
  });

  const input = document.getElementById("bib-search-input");

  input.addEventListener("input", (e) => {
    _searchQuery = e.target.value;
    updateContent();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      _searchQuery = e.target.value;
      updateContent();
    }
  });

  document.getElementById("bib-search-btn").addEventListener("click", () => {
    _searchQuery = document.getElementById("bib-search-input").value;
    updateContent();
  });

  document.getElementById("bib-content").addEventListener("click", (e) => {
    const card = e.target.closest(".bib-card");
    if (!card) return;
    e.preventDefault();
    openVideoPlayer(card.dataset.youtubeId, card.dataset.videoTitle);
  });
}

function closeBiblioteca() {
  if (!_overlayEl) return;
  _overlayEl.classList.remove("open");
  document.removeEventListener("keydown", onEscape);
}

// ---- PUBLIC EXPORTS ----

export function openVideoPlayer(youtubeId, title) {
  // S4: rejeita IDs inválidos — impede injeção via atributo src do iframe
  if (!isValidYoutubeId(youtubeId)) return;
  const prev = document.getElementById("beluga-video-player");
  if (prev) prev.remove();

  // S5: escapa o título para uso em atributos HTML — previne quebra de atributo
  const safeTitle = escapeHtml(title);
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div id="beluga-video-player" class="video-player-overlay" role="dialog" aria-modal="true" aria-label="${safeTitle}">
      <div class="video-player-modal">
        <button class="video-player-close" id="video-player-close" type="button" aria-label="Fechar vídeo">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
        <div class="video-player-iframe-wrap">
          <iframe
            id="video-player-iframe"
            src="https://www.youtube.com/embed/${youtubeId}?autoplay=1"
            title="${safeTitle}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>`,
  );

  const overlay = document.getElementById("beluga-video-player");

  function closePlayer() {
    const iframe = document.getElementById("video-player-iframe");
    if (iframe) iframe.src = "";
    overlay.remove();
    document.removeEventListener("keydown", onPlayerKey);
  }

  function onPlayerKey(e) {
    if (e.key === "Escape") closePlayer();
  }

  document
    .getElementById("video-player-close")
    .addEventListener("click", closePlayer);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closePlayer();
  });
  document.addEventListener("keydown", onPlayerKey);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add("open");
    });
  });
}

export function openBiblioteca() {
  _activeCategoria = "todas";
  _searchQuery = "";

  const prev = document.getElementById("bib-overlay");
  if (prev) prev.remove();

  document.body.insertAdjacentHTML("beforeend", buildModalHTML());
  _overlayEl = document.getElementById("bib-overlay");

  attachEvents();

  // Double rAF garante que a transição CSS dispara após o elemento entrar no DOM
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      _overlayEl.classList.add("open");
    });
  });

  setTimeout(() => {
    const input = document.getElementById("bib-search-input");
    if (input) input.focus();
  }, 280);
}
