// Q4: import movido para o topo — imports ES6 devem estar no início do módulo
import { login } from "../state/auth.js";

export function loginScreen() {
  return `
    <div class="public auth">
      <!-- Header público igual a landing -->
      <header class="public-header">
        <div class="brand-wrap">
          <img class="brand-logo" src="./assets/images/logof.png" alt="Logo Beluga" />
          <div class="brand">BELUGA</div>
        </div>

        <nav class="public-nav" aria-label="Navegação pública">
          <a href="#/landing#funcionalidades">Funcionalidades</a>
          <a href="#/landing#preco">Preço</a>
          <a href="#/landing#contato">Contato</a>
        </nav>
      </header>

      <main class="public-main">
        <section class="auth-hero">
          <!-- coluna esquerda -->
          <div class="auth-left">
            <h1 class="auth-title">
              Bem-Vindo de<br />
              Volta!
            </h1>

            <form class="auth-card" id="login-form">
              <!-- C1: id adicionados — loginInit() usava getElementById mas os campos só tinham name -->
              <input class="input auth-input" id="email" type="email" name="email" placeholder="Email" required />
              <input class="input auth-input" id="senha" type="password" name="senha" placeholder="Senha" required />

              <div class="auth-row">
                <a class="auth-link" href="#/recuperar">Esqueceu a senha?</a>
              </div>

              <button class="button auth-button" type="submit">Entrar</button>

              <p class="auth-footer">
                Não possui conta?
                <a class="auth-link" href="#/cadastro">Cadastre-se aqui</a>
              </p>
            </form>
          </div>

          <!-- coluna direita: beluga flutuando -->
          <div class="auth-right">
            <img class="auth-beluga" src="./assets/images/BELUGA.png" alt="Beluga IA" />
          </div>
        </section>

        <!-- ── Frase em onda + mar de conhecimento ── -->
        <section class="quote-wave" aria-label="Citação Paulo Freire">
          <svg class="quote-svg" viewBox="0 0 1200 320" preserveAspectRatio="none">
            <defs>
              <!-- Caminho da onda para o texto: arco suave de ponta a ponta -->
              <path id="wavePath"
                d="M 60 170 C 200 100, 420 90, 600 132 C 780 174, 1000 178, 1140 125" />

              <!-- Gradiente para fade nas bordas do brilho -->
              <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stop-color="rgba(59,158,221,0.12)" />
                <stop offset="100%" stop-color="rgba(59,158,221,0)" />
              </radialGradient>
            </defs>

            <!-- Brilho sutil no fundo do mar -->
            <ellipse cx="600" cy="300" rx="520" ry="20" fill="url(#glowGrad)" />

            <!-- ── Ondas animadas do mar de conhecimento ── -->

            <!-- Onda 1: primária, mais visível -->
            <path
              fill="none"
              stroke="#3b9edd"
              stroke-width="1.4"
              opacity="0.42"
              d="M -300 234
                 C -200 222, -100 246, 0 234
                 C 100 222, 200 246, 300 234
                 C 400 222, 500 246, 600 234
                 C 700 222, 800 246, 900 234
                 C 1000 222, 1100 246, 1200 234
                 C 1300 222, 1400 246, 1500 234">
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
              d="M -300 256
                 C -200 247, -100 265, 0 256
                 C 100 247, 200 265, 300 256
                 C 400 247, 500 265, 600 256
                 C 700 247, 800 265, 900 256
                 C 1000 247, 1100 265, 1200 256
                 C 1300 247, 1400 265, 1500 256">
              <animateTransform
                attributeName="transform"
                type="translate"
                from="0 0"
                to="-300 0"
                dur="13s"
                repeatCount="indefinite" />
            </path>

            <!-- Onda 3: terciária, muito sutil, fase diferente -->
            <path
              fill="none"
              stroke="rgba(100,200,240,1)"
              stroke-width="0.6"
              opacity="0.14"
              d="M -300 276
                 C -200 269, -100 283, 0 276
                 C 100 269, 200 283, 300 276
                 C 400 269, 500 283, 600 276
                 C 700 269, 800 283, 900 276
                 C 1000 269, 1100 283, 1200 276
                 C 1300 269, 1400 283, 1500 276">
              <animateTransform
                attributeName="transform"
                type="translate"
                from="-150 0"
                to="-450 0"
                dur="7s"
                repeatCount="indefinite" />
            </path>

            <!-- ── Texto da citação sobre a onda ── -->
            <text class="quote-text">
              <textPath href="#wavePath" startOffset="50%" text-anchor="middle">
                Educação não transforma o mundo. Educação muda as pessoas. Pessoas transformam o mundo. — Paulo Freire
              </textPath>
            </text>
          </svg>
        </section>
      </main>
    </div>
  `;
}

export function loginInit() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email")?.value?.trim();
    const senha = document.getElementById("senha")?.value?.trim();

    // C2: validação básica — impede login com campos vazios mesmo sem validação nativa
    if (!email || !senha) {
      const emptyEl = !email
        ? document.getElementById("email")
        : document.getElementById("senha");
      emptyEl?.focus();
      return;
    }

    // S3: senha com menos de 6 caracteres é rejeitada — reduz risco de senhas triviais
    if (senha.length < 6) {
      document.getElementById("senha")?.focus();
      return;
    }

    login({ email });

    window.location.hash = "#/dashboard";
  });

  const goCadastro = document.getElementById("go-cadastro");
  if (goCadastro) {
    goCadastro.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = "#/cadastro";
    });
  }
}
