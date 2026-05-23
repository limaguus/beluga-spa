/* =========================================================
   BELUGA - perfil.js
   Tela de Perfil do Aluno
   ========================================================= */

const PERFIL_DATA = {
  pessoal: {
    nome: "Jimmy",
    email: "jimmygusthavo@gmail.com",
    telefone: "(99) 99999-9999",
    nascimento: "9999-99-99",
    cidade: "Anápolis, GO",
  },
  academico: {
    instituicao: "Universidade Evangélica",
    curso: "Engenharia de Sofware",
    periodo: "4º Período",
    semestre: "2026.1",
    matricula: "2421382",
    turno: "Noturno",
  },
  preferencias: {
    areaInteresse: "Engenharia de Software",
    objetivo: "Concurso TCU",
    tempoEstudo: "2h por dia",
    melhorHorario: "Noite",
    nivelDificuldade: "Intermediário",
    preferenciaConteudo: "Misto",
  },
  stats: {
    materias: 8,
    quizzes: 24,
    mediaGeral: 7.8,
    progresso: 62,
  },
};

const TABS = [
  { id: "pessoal", label: "Dados Pessoais" },
  { id: "academico", label: "Dados Acadêmicos" },
  { id: "preferencias", label: "Preferências" },
  { id: "desempenho", label: "Desempenho" },
];

let _activeTab = "pessoal";
let _isEditing = false;
let _formData = deepClone(PERFIL_DATA);
let _savedData = deepClone(PERFIL_DATA);

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/* -------- Field builders -------- */

function fieldRow(label, value, key, section, type = "text") {
  if (_isEditing) {
    return `
      <div class="pf-field">
        <label class="pf-label">${label}</label>
        <input class="input pf-input" type="${type}" data-section="${section}" data-key="${key}" value="${value ?? ""}" />
      </div>`;
  }
  return `
    <div class="pf-field">
      <label class="pf-label">${label}</label>
      <div class="pf-value">${value || "—"}</div>
    </div>`;
}

function selectRow(label, value, key, section, options) {
  if (_isEditing) {
    const opts = options
      .map(
        (o) =>
          `<option value="${o}"${o === value ? " selected" : ""}>${o}</option>`,
      )
      .join("");
    return `
      <div class="pf-field">
        <label class="pf-label">${label}</label>
        <select class="input pf-input" data-section="${section}" data-key="${key}">${opts}</select>
      </div>`;
  }
  return `
    <div class="pf-field">
      <label class="pf-label">${label}</label>
      <div class="pf-value">${value || "—"}</div>
    </div>`;
}

/* -------- Panel renderers -------- */

function buildPanelHTML() {
  const d = _formData;

  switch (_activeTab) {
    case "pessoal":
      return `
        <div class="pf-section">
          <div class="pf-section-title">Informações Pessoais</div>
          <div class="pf-grid">
            ${fieldRow("Nome completo", d.pessoal.nome, "nome", "pessoal")}
            ${fieldRow("E-mail", d.pessoal.email, "email", "pessoal", "email")}
            ${fieldRow("Telefone", d.pessoal.telefone, "telefone", "pessoal", "tel")}
            ${fieldRow("Data de nascimento", d.pessoal.nascimento, "nascimento", "pessoal", "date")}
            ${fieldRow("Cidade / Estado", d.pessoal.cidade, "cidade", "pessoal")}
          </div>
        </div>`;

    case "academico":
      return `
        <div class="pf-section">
          <div class="pf-section-title">Informações Acadêmicas</div>
          <div class="pf-grid">
            ${fieldRow("Instituição de ensino", d.academico.instituicao, "instituicao", "academico")}
            ${fieldRow("Curso", d.academico.curso, "curso", "academico")}
            ${fieldRow("Período / Série", d.academico.periodo, "periodo", "academico")}
            ${fieldRow("Semestre acadêmico", d.academico.semestre, "semestre", "academico")}
            ${fieldRow("Matrícula", d.academico.matricula, "matricula", "academico")}
            ${selectRow("Turno", d.academico.turno, "turno", "academico", ["Matutino", "Vespertino", "Noturno", "Integral"])}
          </div>
        </div>`;

    case "preferencias":
      return `
        <div class="pf-section">
          <div class="pf-section-title">Preferências de Estudo</div>
          <div class="pf-grid">
            ${fieldRow("Área de interesse", d.preferencias.areaInteresse, "areaInteresse", "preferencias")}
            ${fieldRow("Objetivo principal", d.preferencias.objetivo, "objetivo", "preferencias")}
            ${selectRow("Tempo de estudo diário", d.preferencias.tempoEstudo, "tempoEstudo", "preferencias", ["30min por dia", "1h por dia", "2h por dia", "3h por dia", "4h+ por dia"])}
            ${selectRow("Melhor horário para estudar", d.preferencias.melhorHorario, "melhorHorario", "preferencias", ["Manhã", "Tarde", "Noite", "Madrugada"])}
            ${selectRow("Nível de dificuldade", d.preferencias.nivelDificuldade, "nivelDificuldade", "preferencias", ["Iniciante", "Intermediário", "Avançado"])}
            ${selectRow("Preferência de conteúdo", d.preferencias.preferenciaConteudo, "preferenciaConteudo", "preferencias", ["Vídeo", "Texto", "Exercícios", "Misto"])}
          </div>
        </div>`;

    case "desempenho":
      return `
        <div class="pf-section">
          <div class="pf-section-title">Resumo de Desempenho</div>
          <div class="pf-stats-grid">
            <div class="pf-stat-card">
              <span class="pf-stat-value">${d.stats.materias}</span>
              <span class="pf-stat-label">Matérias cadastradas</span>
            </div>
            <div class="pf-stat-card">
              <span class="pf-stat-value">${d.stats.quizzes}</span>
              <span class="pf-stat-label">Quizzes respondidos</span>
            </div>
            <div class="pf-stat-card">
              <span class="pf-stat-value">${d.stats.mediaGeral.toFixed(1)}</span>
              <span class="pf-stat-label">Média geral</span>
            </div>
            <div class="pf-stat-card">
              <span class="pf-stat-value">${d.stats.progresso}%</span>
              <span class="pf-stat-label">Plano de estudos</span>
            </div>
          </div>
          <div class="pf-progress-section">
            <div class="pf-progress-label">
              <span>Progresso no plano de estudos</span>
              <span>${d.stats.progresso}%</span>
            </div>
            <div class="pf-progress-track">
              <div class="pf-progress-fill" style="width:${d.stats.progresso}%"></div>
            </div>
          </div>
        </div>`;

    default:
      return "";
  }
}

function buildTabsHTML() {
  return TABS.map(
    (t) =>
      `<button class="pf-tab${_activeTab === t.id ? " active" : ""}" data-tab="${t.id}">${t.label}</button>`,
  ).join("");
}

function buildActionsHTML() {
  if (_isEditing) {
    return `
      <button class="button button-ghost" id="btn-pf-cancel">Cancelar</button>
      <button class="button" id="btn-pf-save">Salvar alterações</button>`;
  }
  return `<button class="button" id="btn-pf-edit">Editar perfil</button>`;
}

/* -------- Main screen render -------- */

export function perfilScreen() {
  _isEditing = false;
  _activeTab = "pessoal";
  const d = _formData;

  return `
    <div class="pf-page">

      <div class="pf-page-header">
        <h1 class="pf-page-title">Perfil do Aluno</h1>
        <p class="pf-page-desc">Gerencie seus dados pessoais, acadêmicos e preferências de estudo.</p>
      </div>

      <div class="pf-layout">

        <!-- SIDEBAR -->
        <aside class="pf-sidebar">

          <div class="pf-avatar-card">
            <div class="pf-avatar-wrap" id="pf-avatar-wrap" title="Clique para alterar foto">
              <img id="pf-avatar-img" src="assets/images/fotorosto.jpeg" alt="Foto de perfil" class="pf-avatar-img" />
              <div class="pf-avatar-overlay">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                <span>Alterar foto</span>
              </div>
              <input type="file" id="pf-avatar-input" accept="image/*" class="hidden" />
            </div>
            <div class="pf-sidebar-name" id="pf-sidebar-name">${d.pessoal.nome}</div>
            <div class="pf-sidebar-course" id="pf-sidebar-course">${d.academico.curso}</div>
            <div class="pf-sidebar-meta">${d.academico.periodo} • ${d.academico.turno}</div>
            <div class="pf-sidebar-institution">${d.academico.instituicao}</div>
          </div>

          <div class="pf-sidebar-stats">
            <div class="pf-sidebar-stat">
              <span class="pf-sidebar-stat-value">${d.stats.materias}</span>
              <span class="pf-sidebar-stat-label">Matérias</span>
            </div>
            <div class="pf-sidebar-stat">
              <span class="pf-sidebar-stat-value">${d.stats.quizzes}</span>
              <span class="pf-sidebar-stat-label">Quizzes</span>
            </div>
            <div class="pf-sidebar-stat">
              <span class="pf-sidebar-stat-value">${d.stats.mediaGeral.toFixed(1)}</span>
              <span class="pf-sidebar-stat-label">Média</span>
            </div>
          </div>

        </aside>

        <!-- MAIN -->
        <div class="pf-main">
          <div class="pf-tabs-bar" id="pf-tabs-bar">${buildTabsHTML()}</div>
          <div class="pf-panel card" id="pf-panel">${buildPanelHTML()}</div>
          <div class="pf-actions" id="pf-actions">${buildActionsHTML()}</div>
        </div>

      </div>
    </div>

    <div class="pf-toast" id="pf-toast">
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Alterações salvas com sucesso!
    </div>`;
}

/* -------- Partial update helpers -------- */

function updatePanel() {
  const el = document.getElementById("pf-panel");
  if (el) el.innerHTML = buildPanelHTML();
}

function updateTabs() {
  const el = document.getElementById("pf-tabs-bar");
  if (el) el.innerHTML = buildTabsHTML();
}

function updateActions() {
  const el = document.getElementById("pf-actions");
  if (!el) return;
  el.innerHTML = buildActionsHTML();
  if (_isEditing) {
    document
      .getElementById("btn-pf-cancel")
      ?.addEventListener("click", onCancel);
    document.getElementById("btn-pf-save")?.addEventListener("click", onSave);
  } else {
    document.getElementById("btn-pf-edit")?.addEventListener("click", onEdit);
  }
}

function updateSidebarMeta() {
  const nameEl = document.getElementById("pf-sidebar-name");
  const courseEl = document.getElementById("pf-sidebar-course");
  if (nameEl) nameEl.textContent = _formData.pessoal.nome;
  if (courseEl) courseEl.textContent = _formData.academico.curso;
}

/* -------- Data collection -------- */

function collectFormData() {
  document.querySelectorAll(".pf-input").forEach((inp) => {
    const { section, key } = inp.dataset;
    if (section && key) _formData[section][key] = inp.value;
  });
}

/* -------- Actions -------- */

function onEdit() {
  _isEditing = true;
  updatePanel();
  updateActions();
}

function onCancel() {
  _formData = deepClone(_savedData);
  _isEditing = false;
  updatePanel();
  updateActions();
}

function onSave() {
  collectFormData();
  _savedData = deepClone(_formData);
  _isEditing = false;
  updatePanel();
  updateActions();
  updateSidebarMeta();
  showToast();
}

function showToast() {
  const toast = document.getElementById("pf-toast");
  if (!toast) return;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

/* -------- Init -------- */

export function perfilInit() {
  /* Tab switching */
  document.getElementById("pf-tabs-bar")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-tab]");
    if (!btn || btn.dataset.tab === _activeTab) return;
    if (_isEditing) collectFormData();
    _activeTab = btn.dataset.tab;
    updateTabs();
    updatePanel();
  });

  /* Action buttons */
  document.getElementById("btn-pf-edit")?.addEventListener("click", onEdit);

  /* Avatar upload */
  document.getElementById("pf-avatar-wrap")?.addEventListener("click", () => {
    document.getElementById("pf-avatar-input")?.click();
  });

  document
    .getElementById("pf-avatar-input")
    ?.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = document.getElementById("pf-avatar-img");
        if (img) img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
}
