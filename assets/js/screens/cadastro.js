export function cadastroScreen() {
  return `
    <div class="auth-page">
      <header class="topbar-auth">
        <div class="brand-wrap">
          <img src="./assets/images/logoF.png" class="brand-logo" alt="Logo Beluga" />
          <div class="brand">BELUGA</div>
        </div>

        <button id="btn-voltar" class="back-button" type="button">
          Voltar
        </button>
      </header>

      <main class="auth-content">
        <section class="cadastro-grid">
          <div class="cadastro-left">
            <img class="cadastro-beluga" src="./assets/images/BELUGA.png" alt="Beluga IA" />

            <div class="cadastro-text">
              <h2>Você sabia o que inspira o nome BELUGA?</h2>
              <p>
                A baleia beluga é conhecida por sua empatia e inteligência. Ela se comunica, ajuda seu grupo e é símbolo de apoio mútuo.
                Assim como ela, a Beluga está aqui para te guiar, apoiar e fazer com que você não se sinta sozinho na sua jornada acadêmica.
              </p>
            </div>
          </div>

          <div class="cadastro-right">
            <form id="cadastro-form" class="cadastro-card">
              <h1 class="cadastro-title">CADASTRO</h1>

              <input class="auth-input" type="text" id="cadastro-nome" placeholder="Nome" />
              <input class="auth-input" type="text" id="cadastro-cpf" placeholder="CPF" />
              <input class="auth-input" type="email" id="cadastro-email" placeholder="Email" />
              <input class="auth-input" type="email" id="cadastro-email2" placeholder="Confirmação de Email" />
              <input class="auth-input" type="password" id="cadastro-senha" placeholder="Senha" />
              <input class="auth-input" type="password" id="cadastro-senha2" placeholder="Confirmação de Senha" />

              <button class="auth-button" id="btn-finalizar-cadastro" type="submit">
                Comece agora
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  `;
}

export function cadastroInit() {
  const voltar = document.getElementById("btn-voltar");
  if (voltar) {
    voltar.addEventListener("click", () => {
      window.location.hash = "#/login"; // ou "#/landing"
    });
  }

  const form = document.getElementById("cadastro-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // coloca validações e depois cria conta de verdade.
    // Por enquanto só redireciona:
    window.location.hash = "#/login";
  });
}
