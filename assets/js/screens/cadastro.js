export function cadastroScreen() {
  return `
    <div class="auth-page">
      <header class="topbar-auth">
        <div class="brand-wrap">
          <img src="./assets/images/logoF.png" class="brand-logo" alt="Logo Beluga" />
          <div class="brand">BELUGA</div>
        </div>

        <button id="btn-voltar" class="back-button" type="button">Voltar</button>
      </header>

      <main class="auth-content">
        <section class="cadastro-grid">

          <!-- Coluna esquerda: Beluga flutuando + explicação -->
          <div class="cadastro-left">
            <img class="cadastro-beluga" src="./assets/images/BELUGA.png" alt="Beluga IA" />

            <div class="cadastro-text">
              <h2>Você sabia o que inspira o nome BELUGA?</h2>
              <p>
                A baleia beluga é conhecida por sua empatia e inteligência. Ela se comunica,
                ajuda seu grupo e é símbolo de apoio mútuo. Assim como ela, a Beluga está
                aqui para te guiar e fazer com que você não se sinta sozinho na sua
                jornada acadêmica.
              </p>
            </div>
          </div>

          <!-- Coluna direita: card de cadastro -->
          <div class="cadastro-right">
            <form id="cadastro-form" class="cadastro-card">
              <h1 class="cadastro-title">CADASTRO</h1>

              <input class="auth-input" type="text"     id="cadastro-nome"   placeholder="Nome" />
              <input class="auth-input" type="text"     id="cadastro-cpf"    placeholder="CPF" />
              <input class="auth-input" type="email"    id="cadastro-email"  placeholder="Email" />
              <input class="auth-input" type="email"    id="cadastro-email2" placeholder="Confirmação de Email" />
              <input class="auth-input" type="password" id="cadastro-senha"  placeholder="Senha" />
              <input class="auth-input" type="password" id="cadastro-senha2" placeholder="Confirmação de Senha" />

              <button class="auth-button" id="btn-finalizar-cadastro" type="submit">
                Comece agora
              </button>
            </form>
          </div>

        </section>
      </main>

      <!-- ── Mar de conhecimento: puramente decorativo, sem frase ── -->
      <section class="quote-wave" aria-hidden="true">
        <svg class="quote-svg" viewBox="0 0 1200 160" preserveAspectRatio="none">
          <defs>
            <radialGradient id="glowGradC" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stop-color="rgba(59,158,221,0.14)" />
              <stop offset="100%" stop-color="rgba(59,158,221,0)" />
            </radialGradient>
          </defs>

          <!-- Brilho base no fundo -->
          <ellipse cx="600" cy="155" rx="540" ry="12" fill="url(#glowGradC)" />

          <!-- Onda 1: primária -->
          <path
            fill="none"
            stroke="#3b9edd"
            stroke-width="1.4"
            opacity="0.42"
            d="M -300 80
               C -200 70, -100 90, 0 80
               C 100 70, 200 90, 300 80
               C 400 70, 500 90, 600 80
               C 700 70, 800 90, 900 80
               C 1000 70, 1100 90, 1200 80
               C 1300 70, 1400 90, 1500 80">
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="-300 0"
              dur="9s"
              repeatCount="indefinite" />
          </path>

          <!-- Onda 2: secundária, mais lenta -->
          <path
            fill="none"
            stroke="#3b9edd"
            stroke-width="0.9"
            opacity="0.22"
            d="M -300 108
               C -200 100, -100 116, 0 108
               C 100 100, 200 116, 300 108
               C 400 100, 500 116, 600 108
               C 700 100, 800 116, 900 108
               C 1000 100, 1100 116, 1200 108
               C 1300 100, 1400 116, 1500 108">
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="-300 0"
              dur="13s"
              repeatCount="indefinite" />
          </path>

          <!-- Onda 3: terciária, fase deslocada -->
          <path
            fill="none"
            stroke="rgba(100,200,240,1)"
            stroke-width="0.6"
            opacity="0.14"
            d="M -300 134
               C -200 128, -100 140, 0 134
               C 100 128, 200 140, 300 134
               C 400 128, 500 140, 600 134
               C 700 128, 800 140, 900 134
               C 1000 128, 1100 140, 1200 134
               C 1300 128, 1400 140, 1500 134">
            <animateTransform
              attributeName="transform"
              type="translate"
              from="-150 0"
              to="-450 0"
              dur="7s"
              repeatCount="indefinite" />
          </path>
        </svg>
      </section>
    </div>
  `;
}

export function cadastroInit() {
  const voltar = document.getElementById("btn-voltar");
  if (voltar) {
    voltar.addEventListener("click", () => {
      window.location.hash = "#/login";
    });
  }

  const form = document.getElementById("cadastro-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.hash = "#/login";
  });
}
