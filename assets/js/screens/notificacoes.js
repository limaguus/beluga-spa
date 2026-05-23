/* =========================================================
   BELUGA – notificacoes.js
   Central de avisos, lembretes e recomendações acadêmicas
   ========================================================= */

const NT_TYPE = {
  lembrete: {
    label: "Lembrete",
    color: "#f59e0b",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  },
  aviso: {
    label: "Aviso",
    color: "#ef4444",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  },
  atualizacao: {
    label: "Atualização",
    color: "#3b9edd",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  },
  quiz: {
    label: "Quiz",
    color: "#a855f7",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  },
  forum: {
    label: "Fórum",
    color: "#10b981",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  },
  recomendacao: {
    label: "Recomendação",
    color: "#f97316",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
  },
  tarefa: {
    label: "Tarefa",
    color: "#6366f1",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
  },
};

const NT_FILTERS = [
  { key: "todas",       label: "Todas" },
  { key: "lembrete",    label: "Lembretes" },
  { key: "aviso",       label: "Avisos" },
  { key: "quiz",        label: "Quizzes" },
  { key: "forum",       label: "Fórum" },
  { key: "recomendacao",label: "Recomendações" },
  { key: "tarefa",      label: "Tarefas" },
];

const NT_MOCK = [
  {
    id: "n1",
    type: "lembrete",
    title: "Entrega de trabalho de Algoritmos",
    desc: "Entrega de trabalho de Algoritmos até sexta-feira às 23h59. Certifique-se de submeter no portal antes do prazo.",
    subject: "Algoritmos",
    dateLabel: "Hoje, 23:59",
    priority: "alta",
    read: false,
  },
  {
    id: "n2",
    type: "aviso",
    title: "Revisar Estruturas de Dados",
    desc: "Revisar matéria de Estruturas de Dados para a prova da próxima semana. Foque em árvores e grafos.",
    subject: "Estruturas de Dados",
    dateLabel: "Hoje, 10:00",
    priority: "media",
    read: false,
  },
  {
    id: "n3",
    type: "atualizacao",
    title: "Novo conteúdo de Programação em C",
    desc: "Novo conteúdo de Programação em C liberado na plataforma. Inclui 3 videoaulas e exercícios práticos.",
    subject: "Programação em C",
    dateLabel: "Ontem, 14:00",
    priority: "baixa",
    read: true,
  },
  {
    id: "n4",
    type: "quiz",
    title: "Quiz de Sistemas Operacionais disponível",
    desc: "Quiz de Diagnóstico de Sistemas Operacionais disponível até domingo. Teste seus conhecimentos sobre semáforos e escalonamento.",
    subject: "Sistemas Operacionais",
    dateLabel: "Ontem, 09:00",
    priority: "media",
    read: false,
  },
  {
    id: "n5",
    type: "forum",
    title: "Sua pergunta recebeu uma resposta",
    desc: "Sua pergunta sobre busca binária recebeu uma resposta de um monitor. Acesse o Fórum para visualizar.",
    subject: "Algoritmos",
    dateLabel: "2 dias atrás",
    priority: "baixa",
    read: true,
  },
  {
    id: "n6",
    type: "recomendacao",
    title: "Recomendação de estudo: Gerenciamento de Processos",
    desc: "Com base no seu desempenho, revise os tópicos de gerenciamento de processos. Detectamos 3 erros recorrentes nessa área nos seus quizzes.",
    subject: "Sistemas Operacionais",
    dateLabel: "3 dias atrás",
    priority: "media",
    read: false,
  },
  {
    id: "n7",
    type: "tarefa",
    title: "Reunião do projeto BELUGA",
    desc: "Sua equipe agendou uma reunião do projeto Beluga para amanhã às 19h. Link de acesso enviado por e-mail.",
    subject: "Projeto Integrador",
    dateLabel: "3 dias atrás",
    priority: "alta",
    read: true,
  },
];

// S1: escapa caracteres HTML especiais antes de inserir via innerHTML — previne XSS
function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ── State ── */
// C4: referência salva para remoção antes de re-registrar a cada visita
let _escNtHandler = null;

let ntState = {
  notifications: NT_MOCK.map((n) => ({ ...n })),
  filter: "todas",
  search: "",
  detailId: null,
  addOpen: false,
};

/* ── Helpers ── */
function ntTypeLabel(type) {
  const cfg = NT_TYPE[type];
  if (!cfg) return "";
  return `<span class="nt-type-badge" style="background:${cfg.color}18;color:${cfg.color};border-color:${cfg.color}33">${cfg.label}</span>`;
}

function ntPriorityBadge(priority) {
  if (priority === "alta")
    return `<span class="nt-prio-badge nt-prio--alta">Alta prioridade</span>`;
  if (priority === "media")
    return `<span class="nt-prio-badge nt-prio--media">Média prioridade</span>`;
  return "";
}

function _filtered() {
  return ntState.notifications.filter((n) => {
    let ok = false;
    if (ntState.filter === "todas") ok = true;
    else if (ntState.filter === "aviso") ok = n.type === "aviso" || n.type === "atualizacao";
    else ok = n.type === ntState.filter;
    if (!ok) return false;
    const term = ntState.search.toLowerCase();
    if (!term) return true;
    return (
      n.title.toLowerCase().includes(term) ||
      n.desc.toLowerCase().includes(term) ||
      (n.subject || "").toLowerCase().includes(term)
    );
  });
}

function renderCard(n) {
  const cfg = NT_TYPE[n.type] || NT_TYPE.aviso;
  return `
    <article class="nt-card${n.read ? " nt-card--read" : ""}" data-id="${n.id}">
      ${!n.read ? `<span class="nt-unread-dot" title="Não lida"></span>` : ""}
      <div class="nt-card-icon" style="background:${cfg.color}15;border-color:${cfg.color}30;color:${cfg.color}">
        ${cfg.icon}
      </div>
      <div class="nt-card-body">
        <div class="nt-card-meta">
          ${ntTypeLabel(n.type)}
          ${ntPriorityBadge(n.priority)}
          <span class="nt-card-date">${n.dateLabel}</span>
        </div>
        <h3 class="nt-card-title">${escapeHtml(n.title)}</h3>
        <p class="nt-card-desc">${escapeHtml(n.desc)}</p>
        ${n.subject ? `<span class="nt-card-subject">${escapeHtml(n.subject)}</span>` : ""}
        <div class="nt-card-actions">
          <button class="nt-btn-detail" data-action="detail" data-id="${n.id}">
            Ver detalhes
          </button>
          ${!n.read
            ? `<button class="nt-btn-read" data-action="read" data-id="${n.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>
                Marcar como lida
               </button>`
            : ""
          }
        </div>
      </div>
    </article>`;
}

function renderFilters() {
  return NT_FILTERS.map(
    (f) =>
      `<button class="nt-filter-btn${ntState.filter === f.key ? " nt-filter-btn--active" : ""}" data-filter="${f.key}">${f.label}</button>`,
  ).join("");
}

/* ── Main render ── */
export function notificacoesScreen() {
  const cards = _filtered().map(renderCard).join("") ||
    `<div class="nt-empty">
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
       <p>Nenhuma notificação encontrada.</p>
     </div>`;

  return `
    <div class="nt-page">
      <div class="nt-heading">
        <div>
          <h1 class="nt-title">Notificações</h1>
          <p class="nt-subtitle">Organize seus avisos, lembretes e recomendações acadêmicas.</p>
        </div>
        <button class="nt-add-btn button button-primary" id="nt-add-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Novo lembrete
        </button>
      </div>

      <div class="nt-toolbar">
        <div class="nt-search-wrap">
          <svg class="nt-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input class="nt-search" id="nt-search" placeholder="Buscar por título, descrição ou matéria…" value="${ntState.search}" />
        </div>
        <div class="nt-filters" id="nt-filters">
          ${renderFilters()}
        </div>
      </div>

      <div class="nt-list" id="nt-list">
        ${cards}
      </div>
    </div>`;
}

/* ── Re-render ── */
function _rerenderList() {
  const list = document.getElementById("nt-list");
  if (!list) return;
  const cards = _filtered().map(renderCard).join("") ||
    `<div class="nt-empty">
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
       <p>Nenhuma notificação encontrada.</p>
     </div>`;
  list.innerHTML = cards;
}

function _rerenderFilters() {
  const wrap = document.getElementById("nt-filters");
  if (wrap) wrap.innerHTML = renderFilters();
}

/* ── Detail modal ── */
function _openDetail(id) {
  const n = ntState.notifications.find((n) => n.id === id);
  if (!n) return;
  const cfg = NT_TYPE[n.type] || NT_TYPE.aviso;

  const html = `
    <div class="nt-overlay" id="nt-overlay">
      <div class="nt-modal" role="dialog" aria-modal="true">
        <div class="nt-modal-head">
          <span class="nt-modal-title">Detalhes da notificação</span>
          <button class="nt-modal-close" id="nt-modal-close" aria-label="Fechar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="nt-modal-body">
          <div class="nt-detail-icon" style="background:${cfg.color}18;border-color:${cfg.color}35;color:${cfg.color}">
            ${cfg.icon}
          </div>
          <div class="nt-detail-badges">
            ${ntTypeLabel(n.type)}
            ${ntPriorityBadge(n.priority)}
          </div>
          <h3 class="nt-detail-title">${escapeHtml(n.title)}</h3>
          <p class="nt-detail-desc">${escapeHtml(n.desc)}</p>
          <div class="nt-detail-meta">
            ${n.subject ? `<span class="nt-detail-subject">${escapeHtml(n.subject)}</span>` : ""}
            <span class="nt-detail-date">${n.dateLabel}</span>
          </div>
        </div>
        <div class="nt-modal-footer">
          ${!n.read
            ? `<button class="nt-btn-read-modal" id="nt-mark-read" data-id="${n.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>
                Marcar como lida
               </button>`
            : `<span class="nt-already-read">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>
                Notificação lida
               </span>`
          }
          <button class="nt-btn-close-modal" id="nt-close-modal">Fechar</button>
        </div>
      </div>
    </div>`;

  document.querySelector(".nt-page")?.insertAdjacentHTML("beforeend", html);
  _bindDetailModal(id);
}

function _bindDetailModal(id) {
  const close = () => {
    document.getElementById("nt-overlay")?.remove();
    ntState.detailId = null;
  };
  document.getElementById("nt-modal-close")?.addEventListener("click", close);
  document.getElementById("nt-close-modal")?.addEventListener("click", close);
  document.getElementById("nt-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "nt-overlay") close();
  });
  document.getElementById("nt-mark-read")?.addEventListener("click", () => {
    _markRead(id);
    close();
  });
}

/* ── Add reminder modal ── */
function _openAdd() {
  const html = `
    <div class="nt-overlay" id="nt-overlay">
      <div class="nt-modal nt-modal--add" role="dialog" aria-modal="true">
        <div class="nt-modal-head">
          <span class="nt-modal-title">Novo lembrete</span>
          <button class="nt-modal-close" id="nt-modal-close" aria-label="Fechar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <form class="nt-add-form" id="nt-add-form" novalidate>
          <div class="nt-form-row">
            <label class="nt-label" for="nt-f-title">Título <span class="nt-required">*</span></label>
            <input class="nt-input" id="nt-f-title" placeholder="Ex: Entregar trabalho de Algoritmos" required />
          </div>
          <div class="nt-form-row">
            <label class="nt-label" for="nt-f-desc">Descrição</label>
            <textarea class="nt-input nt-textarea" id="nt-f-desc" rows="3" placeholder="Detalhes do lembrete…"></textarea>
          </div>
          <div class="nt-form-2col">
            <div class="nt-form-row">
              <label class="nt-label" for="nt-f-subject">Matéria</label>
              <input class="nt-input" id="nt-f-subject" placeholder="Ex: Algoritmos" />
            </div>
            <div class="nt-form-row">
              <label class="nt-label" for="nt-f-type">Categoria</label>
              <select class="nt-input nt-select" id="nt-f-type">
                <option value="lembrete">Lembrete</option>
                <option value="tarefa">Tarefa</option>
                <option value="aviso">Aviso</option>
              </select>
            </div>
          </div>
          <div class="nt-form-2col">
            <div class="nt-form-row">
              <label class="nt-label" for="nt-f-date">Data</label>
              <input class="nt-input" id="nt-f-date" type="date" />
            </div>
            <div class="nt-form-row">
              <label class="nt-label" for="nt-f-priority">Prioridade</label>
              <select class="nt-input nt-select" id="nt-f-priority">
                <option value="baixa">Baixa</option>
                <option value="media" selected>Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>
          </div>
          <div class="nt-modal-footer">
            <button type="button" class="nt-btn-close-modal" id="nt-cancel-add">Cancelar</button>
            <button type="submit" class="nt-btn-save button button-primary">Salvar lembrete</button>
          </div>
        </form>
      </div>
    </div>`;

  document.querySelector(".nt-page")?.insertAdjacentHTML("beforeend", html);
  _bindAddModal();
}

function _bindAddModal() {
  const close = () => document.getElementById("nt-overlay")?.remove();
  document.getElementById("nt-modal-close")?.addEventListener("click", close);
  document.getElementById("nt-cancel-add")?.addEventListener("click", close);
  document.getElementById("nt-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "nt-overlay") close();
  });
  document.getElementById("nt-add-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("nt-f-title")?.value.trim();
    if (!title) {
      document.getElementById("nt-f-title")?.classList.add("nt-input--error");
      return;
    }
    const desc     = document.getElementById("nt-f-desc")?.value.trim();
    const subject  = document.getElementById("nt-f-subject")?.value.trim();
    const type     = document.getElementById("nt-f-type")?.value || "lembrete";
    const date     = document.getElementById("nt-f-date")?.value;
    const priority = document.getElementById("nt-f-priority")?.value || "media";
    const dateLabel = date
      ? new Date(date + "T00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
      : "agora";
    ntState.notifications.unshift({
      id: `n-${Date.now()}`,
      type,
      title,
      desc: desc || "Sem descrição.",
      subject: subject || "",
      dateLabel,
      priority,
      read: false,
    });
    close();
    _rerenderList();
  });
}

function _markRead(id) {
  const n = ntState.notifications.find((n) => n.id === id);
  if (n) n.read = true;
  _rerenderList();
}

/* ── Init ── */
export function notificacoesInit() {
  document.getElementById("nt-add-btn")?.addEventListener("click", _openAdd);

  document.getElementById("nt-search")?.addEventListener("input", (e) => {
    ntState.search = e.target.value;
    _rerenderList();
  });

  document.getElementById("nt-filters")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    ntState.filter = btn.dataset.filter;
    _rerenderFilters();
    _rerenderList();
  });

  document.getElementById("nt-list")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const { action, id } = btn.dataset;
    if (action === "detail") _openDetail(id);
    else if (action === "read") _markRead(id);
  });

  // C4: remove handler anterior antes de registrar — impede empilhamento a cada visita à tela
  if (_escNtHandler) document.removeEventListener("keydown", _escNtHandler);
  _escNtHandler = (e) => {
    if (e.key === "Escape") document.getElementById("nt-overlay")?.remove();
  };
  document.addEventListener("keydown", _escNtHandler);
}
