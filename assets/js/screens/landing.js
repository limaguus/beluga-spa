export function landingScreen() {
  return `
    <div class="public">

      <header class="public-header">
        <div class="brand">
          <img src="./assets/images/logof.png" class="brand-logo" alt="Logo Beluga" />
          <span class="brand-name">BELUGA</span>
        </div>
        <nav class="public-nav" aria-label="Navegação da landing">
          <a href="javascript:void(0)" data-scroll="funcionalidades">Funcionalidades</a>
          <a href="javascript:void(0)" data-scroll="preco">Preço</a>
          <a href="javascript:void(0)" data-scroll="contato">Contato</a>
        </nav>
      </header>

      <main class="public-main">

        <!-- ── HERO ── -->
        <section class="hero" id="topo">
          <div class="hero-left">
            <p class="hero-eyebrow">Assistente acadêmico com IA</p>
            <h1>Organize seus estudos<br>de forma<br><span class="hero-highlight">INTELIGENTE</span></h1>
            <p class="hero-sub">Planejamento de forma fácil e eficaz.</p>
            <div class="hero-actions">
              <button class="hero-cta" id="cta-login" type="button"> COMECE AGORA</button>
            </div>
          </div>
          <div class="hero-right">
            <div class="hero-image-wrap">
              <img src="./assets/images/BELUGA.png" alt="Beluga IA" class="hero-image" />
            </div>
          </div>
        </section>

        <!-- ── CARDS / STRIP ── -->
        <section class="landing-strip" id="funcionalidades">
          <p class="strip-label">Feito por estudantes, para estudantes. Seu assistente acadêmico com IA.</p>
          <div class="strip-track">

            <div class="strip-card strip-card--feature">
              <div class="strip-feature-img" style="background:rgba(59,158,221,0.1)">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3b9edd" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <h3 class="strip-card-title">Planejamento com IA</h3>
              <p class="strip-card-text">Cronograma feito com base na sua rotina.</p>
            </div>

            <div class="strip-card strip-card--person">
              <img src="https://i.pravatar.cc/80?img=47" class="strip-avatar" alt="Mariana Clovis" />
              <strong class="strip-person-name">Mariana Clovis</strong>
              <span class="strip-person-role">Medicina · SP</span>
              <p class="strip-card-text">"O Beluga me salvou no semestre mais puxado da faculdade. Foi um divisor de águas!"</p>
            </div>

            <div class="strip-card strip-card--feature">
              <div class="strip-feature-img" style="background:rgba(239,68,68,0.1)">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              </div>
              <h3 class="strip-card-title">Alertas inteligentes</h3>
              <p class="strip-card-text">Receba lembretes de provas e entregas.</p>
            </div>

            <div class="strip-card strip-card--feature">
              <div class="strip-feature-img" style="background:rgba(168,85,247,0.1)">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 1 0 0 16A8 8 0 0 0 12 2z"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <h3 class="strip-card-title">Avaliação de conhecimento</h3>
              <p class="strip-card-text">Quizzes que mostram o que você precisa estudar mais.</p>
            </div>

            <div class="strip-card strip-card--person">
              <img src="https://i.pravatar.cc/80?img=12" class="strip-avatar" alt="Lucas Henrique" />
              <strong class="strip-person-name">Lucas Henrique</strong>
              <span class="strip-person-role">Eng. Software · GO</span>
              <p class="strip-card-text">"Nunca fui bom em planejar, mas o Beluga criou uma rotina perfeita pra mim. Super recomendo!"</p>
            </div>

            <div class="strip-card strip-card--feature">
              <div class="strip-feature-img" style="background:rgba(34,197,94,0.1)">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <h3 class="strip-card-title">Diário de estudos</h3>
              <p class="strip-card-text">Registre sua rotina e veja sua evolução.</p>
            </div>

            <div class="strip-card strip-card--feature">
              <div class="strip-feature-img" style="background:rgba(249,115,22,0.1)">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h3 class="strip-card-title">Comunidade acadêmica</h3>
              <p class="strip-card-text">Compartilhe conquistas e tire dúvidas no fórum.</p>
            </div>

          </div>
        </section>

      </main>
    </div>
  `;
}

export function landingInit() {
  const goLogin = () => {
    window.location.hash = "#/login";
  };
  document.getElementById("cta-login")?.addEventListener("click", goLogin);
  document.getElementById("cta-header")?.addEventListener("click", goLogin);

  document.querySelectorAll(".public-nav [data-scroll]").forEach((link) => {
    link.addEventListener("click", () => {
      document
        .getElementById(link.dataset.scroll)
        ?.scrollIntoView({ behavior: "smooth" });
    });
  });
}
