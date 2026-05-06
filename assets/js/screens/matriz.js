import { getDisciplines, saveDisciplines } from "../state/matriz.js";

const ICON_PLUS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
const ICON_X = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

export function matrizScreen() {
  return `
  <main class="matriz">
    <div class="matriz-grid">

      <div class="matriz-left">
        <div class="matriz-header">
          <h1 class="matriz-title">Cadastrar Matriz Curricular</h1>
          <p class="matriz-subtitle">
            Insira as disciplinas do semestre e<br>
            responda ao quiz de diagnóstico.
          </p>
        </div>

        <div class="matriz-form">
          <span class="matriz-label">Disciplinas</span>

          <div class="matriz-input-row">
            <input
              id="discipline-input"
              class="input matriz-input"
              placeholder="Digite para adicionar uma disciplina..."
              autocomplete="off"
              maxlength="60"
            />
            <button id="btn-add-discipline" class="btn-add" aria-label="Adicionar disciplina">
              ${ICON_PLUS}
            </button>
          </div>

          <div id="discipline-chips" class="chips-area"></div>

          <p id="matriz-error" class="matriz-error hidden">
            Adicione ao menos uma disciplina antes de continuar.
          </p>

          <button id="btn-go-quiz" class="button matriz-quiz-btn">
            Responder Quiz de Diagnóstico
          </button>
        </div>
      </div>

      <div class="matriz-right">
        <img src="assets/images/BELUGA.png" alt="Beluga" class="matriz-beluga" />
      </div>

    </div>

  </main>`;
}

export function matrizInit() {
  const input = document.getElementById("discipline-input");
  const btnAdd = document.getElementById("btn-add-discipline");
  const chipsArea = document.getElementById("discipline-chips");
  const btnQuiz = document.getElementById("btn-go-quiz");
  const errorMsg = document.getElementById("matriz-error");

  let disciplines = getDisciplines();

  function renderChips() {
    if (!disciplines.length) {
      chipsArea.innerHTML = "";
      return;
    }

    chipsArea.innerHTML = disciplines
      .map(
        (d, i) => `
        <span class="chip">
          ${d}
          <button class="chip-remove" data-index="${i}" aria-label="Remover ${d}">
            ${ICON_X}
          </button>
        </span>`,
      )
      .join("");

    chipsArea.querySelectorAll(".chip-remove").forEach((btn) => {
      btn.onclick = () => {
        disciplines.splice(Number(btn.dataset.index), 1);
        saveDisciplines(disciplines);
        renderChips();
      };
    });
  }

  function addDiscipline() {
    const val = input.value.trim();
    if (!val) return;

    const duplicate = disciplines.some(
      (d) => d.toLowerCase() === val.toLowerCase(),
    );
    if (duplicate) {
      input.value = "";
      input.focus();
      return;
    }

    disciplines.push(val);
    saveDisciplines(disciplines);
    input.value = "";
    errorMsg.classList.add("hidden");
    renderChips();
  }

  btnAdd.addEventListener("click", addDiscipline);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addDiscipline();
    }
  });

  btnQuiz.addEventListener("click", () => {
    if (!disciplines.length) {
      errorMsg.classList.remove("hidden");
      input.focus();
      return;
    }
    window.location.hash = "#/quiz";
  });

  renderChips();
  input.focus();
}
