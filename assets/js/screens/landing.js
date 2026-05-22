/* =========================================================
   BELUGA – landing.js
   Tela pública de apresentação (landing page)
   ========================================================= */

const CHECK_IC = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
const CLOSE_IC = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

function _feat(ok, label) {
  return `<li class="ld-pfeat ${ok ? "ld-pfeat--ok" : "ld-pfeat--no"}">
    <span class="ld-pfeat-ic">${ok ? CHECK_IC : CLOSE_IC}</span>
    <span>${label}</span>
  </li>`;
}

function _testi(initials, color, name, role, text) {
  return `
  <div class="ld-tcard">
    <div class="ld-tcard-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
    <p class="ld-tcard-text">&ldquo;${text}&rdquo;</p>
    <div class="ld-tcard-author">
      <div class="ld-tcard-av" style="background:${color}">${initials}</div>
      <div>
        <strong class="ld-tcard-name">${name}</strong>
        <span class="ld-tcard-role">${role}</span>
      </div>
    </div>
  </div>`;
}

export function landingScreen() {
  return `
  <div class="public" id="landing-root">

    <!-- ── HEADER ── -->
    <header class="public-header" id="pub-hd">
      <div class="brand">
        <img src="./assets/images/logof.png" class="brand-logo" alt="BELUGA" />
        <span class="brand-name">BELUGA</span>
      </div>
      <nav class="public-nav" aria-label="Navegação">
        <a href="javascript:void(0)" data-scroll="funcionalidades">Funcionalidades</a>
        <a href="javascript:void(0)" data-scroll="preco">Preço</a>
        <a href="javascript:void(0)" data-scroll="contato">Contato</a>
      </nav>
      <button class="pub-cta-header" id="cta-header">Entrar</button>
    </header>

    <main class="public-main">

      <!-- ── HERO ── -->
      <section class="ld-hero" id="topo">
        <div class="ld-hero-left">
          <p class="ld-eyebrow">Assistente acadêmico com IA</p>
          <h1 class="ld-hero-h1">
            O assistente de estudos<br>
            que <em class="ld-hl">entende</em> o<br>
            universitário
          </h1>
          <p class="ld-hero-sub">
            IA que monta seu plano, comunidade que te apoia<br>
            e gamificação que te mantém no ritmo.
          </p>
          <div class="ld-hero-actions">
            <button class="ld-btn-primary" id="cta-login">Começar grátis</button>
            <button class="ld-btn-ghost" id="cta-how">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
              Ver como funciona
            </button>
          </div>
          <div class="ld-hero-trust">
            <span class="ld-trust-stars">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#f97316" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              4,8/5
            </span>
            <span class="ld-trust-sep">&middot;</span>
            <span>5.000+ estudantes</span>
            <span class="ld-trust-sep">&middot;</span>
            <span>87 universidades</span>
          </div>
        </div>
        <div class="ld-hero-right">
          <div class="ld-hero-glow"></div>
          <div class="hero-image-wrap">
            <img src="./assets/images/BELUGA.png" alt="Beluginha IA" class="hero-image" />
          </div>
        </div>
      </section>

      <!-- ── STATS ── -->
      <section class="ld-stats">
        <div class="ld-stats-inner">
          <div class="ld-stat">
            <span class="ld-snum">5.000<sup class="ld-snum-plus">+</sup></span>
            <span class="ld-slabel">Estudantes ativos</span>
          </div>
          <div class="ld-sdiv"></div>
          <div class="ld-stat">
            <span class="ld-snum">87</span>
            <span class="ld-slabel">Universidades</span>
          </div>
          <div class="ld-sdiv"></div>
          <div class="ld-stat">
            <span class="ld-snum">2,1M</span>
            <span class="ld-slabel">Quest&otilde;es respondidas</span>
          </div>
          <div class="ld-sdiv"></div>
          <div class="ld-stat">
            <span class="ld-snum">4,8<span class="ld-sstar">&#9733;</span></span>
            <span class="ld-slabel">Avalia&ccedil;&atilde;o m&eacute;dia</span>
          </div>
        </div>
      </section>

      <!-- ── FEATURES ── -->
      <section class="ld-features" id="funcionalidades">
        <div class="ld-sec-head">
          <p class="ld-eyebrow">Funcionalidades</p>
          <h2 class="ld-sec-h2">Tudo que voc&ecirc; precisa<br>para dominar a faculdade</h2>
          <p class="ld-sec-sub">Quatro pilares que transformam a forma como universit&aacute;rios estudam.</p>
        </div>
        <div class="ld-feat-grid">

          <div class="ld-fcard ld-fcard--hero">
            <div class="ld-fcard-icon" style="background:rgba(59,158,221,.14);color:#3b9edd">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div class="ld-fcard-tag">Diferencial #1</div>
            <h3 class="ld-fcard-h3">Belugin-IA</h3>
            <p class="ld-fcard-p">Sua mentora de estudos pessoal. Entende sua grade curricular, identifica seus pontos fracos e monta uma revis&atilde;o sob medida para voc&ecirc; em segundos &mdash; dispon&iacute;vel 24h.</p>
            <ul class="ld-fcard-list">
              <li>Responde d&uacute;vidas em tempo real</li>
              <li>Cria planos de revis&atilde;o personalizados</li>
              <li>Adapta o cronograma &agrave; sua rotina</li>
            </ul>
          </div>

          <div class="ld-fcard">
            <div class="ld-fcard-icon" style="background:rgba(168,85,247,.12);color:#a855f7">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <h3 class="ld-fcard-h3">Plano din&acirc;mico</h3>
            <p class="ld-fcard-p">Cronograma que se adapta &agrave; sua rotina. Prioriza automaticamente o que vai cair na prova e reorganiza seus hor&aacute;rios quando a vida apertar.</p>
          </div>

          <div class="ld-fcard">
            <div class="ld-fcard-icon" style="background:rgba(249,115,22,.12);color:#f97316">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <h3 class="ld-fcard-h3">Gamifica&ccedil;&atilde;o</h3>
            <p class="ld-fcard-p">XP, conquistas, miss&otilde;es di&aacute;rias e ranking com seus colegas. Estudar nunca foi t&atilde;o viciante &mdash; cada sess&atilde;o vira uma recompensa.</p>
          </div>

          <div class="ld-fcard">
            <div class="ld-fcard-icon" style="background:rgba(34,197,94,.12);color:#22c55e">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 class="ld-fcard-h3">Comunidade</h3>
            <p class="ld-fcard-p">F&oacute;rum, feed de conquistas e grupos por curso. Conecte-se com estudantes em todo o Brasil e nunca estude sozinho.</p>
          </div>

        </div>
      </section>

      <!-- ── PREVIEW ── -->
      <section class="ld-preview" id="como-funciona">
        <div class="ld-sec-head">
          <p class="ld-eyebrow">Plataforma</p>
          <h2 class="ld-sec-h2">Simples por fora,<br>poderoso por dentro</h2>
          <p class="ld-sec-sub">Veja como o BELUGA &eacute; na pr&aacute;tica antes mesmo de criar sua conta.</p>
        </div>
        <div class="ld-preview-row">

          <!-- Dashboard mockup -->
          <div class="ld-mwin">
            <div class="ld-mchrome">
              <span class="ld-mdot" style="background:#ff5f57"></span>
              <span class="ld-mdot" style="background:#febc2e"></span>
              <span class="ld-mdot" style="background:#28c840"></span>
              <span class="ld-mwlabel">Dashboard</span>
            </div>
            <img src="./assets/images/Dashboard.png" class="ld-mwin-img" alt="Tela do Dashboard" />
          </div>

          <!-- AI chat mockup -->
          <div class="ld-mwin ld-mwin--center">
            <div class="ld-mchrome">
              <span class="ld-mdot" style="background:#ff5f57"></span>
              <span class="ld-mdot" style="background:#febc2e"></span>
              <span class="ld-mdot" style="background:#28c840"></span>
              <span class="ld-mwlabel">Beluginha IA</span>
            </div>
            <img src="./assets/images/Beluguin-IA.png" class="ld-mwin-img" alt="Tela da Beluginha IA" />
          </div>

          <!-- Quiz mockup -->
          <div class="ld-mwin">
            <div class="ld-mchrome">
              <span class="ld-mdot" style="background:#ff5f57"></span>
              <span class="ld-mdot" style="background:#febc2e"></span>
              <span class="ld-mdot" style="background:#28c840"></span>
              <span class="ld-mwlabel">Quiz adaptativo</span>
            </div>
            <img src="./assets/images/Quiz.png" class="ld-mwin-img" alt="Tela do Quiz adaptativo" />
          </div>

        </div>
      </section>

      <!-- ── HOW IT WORKS ── -->
      <section class="ld-how">
        <div class="ld-sec-head">
          <p class="ld-eyebrow">Como funciona</p>
          <h2 class="ld-sec-h2">Do cadastro &agrave; aprova&ccedil;&atilde;o<br>em 3 passos</h2>
        </div>
        <div class="ld-how-row">
          <div class="ld-how-step">
            <div class="ld-how-num">01</div>
            <h3 class="ld-how-h3">Crie sua conta</h3>
            <p class="ld-how-p">Cadastro gratuito em 30 segundos. Informe seu curso, universidade e semestre.</p>
          </div>
          <div class="ld-how-line"></div>
          <div class="ld-how-step">
            <div class="ld-how-num">02</div>
            <h3 class="ld-how-h3">A IA monta seu plano</h3>
            <p class="ld-how-p">A Beluginha analisa sua grade e cria uma trilha de estudos personalizada para voc&ecirc;.</p>
          </div>
          <div class="ld-how-line"></div>
          <div class="ld-how-step">
            <div class="ld-how-num">03</div>
            <h3 class="ld-how-h3">Estude e evolua</h3>
            <p class="ld-how-p">Complete miss&otilde;es, fa&ccedil;a quizzes, suba no ranking e alcance seus objetivos acad&ecirc;micos.</p>
          </div>
        </div>
      </section>

      <!-- ── PRICING ── -->
      <section class="ld-pricing" id="preco">
        <div class="ld-sec-head">
          <p class="ld-eyebrow">Planos</p>
          <h2 class="ld-sec-h2">Investimento que cabe<br>no bolso universit&aacute;rio</h2>
        </div>
        <div class="ld-plan-row">

          <div class="ld-plan">
            <div class="ld-plan-hd">
              <span class="ld-plan-name">Gratuito</span>
              <div class="ld-plan-price">
                <span class="ld-pcur">R$</span><span class="ld-pamt">0</span><span class="ld-pper">/m&ecirc;s</span>
              </div>
              <p class="ld-plan-tag">Para come&ccedil;ar sem compromisso</p>
            </div>
            <ul class="ld-plan-feats">
              ${_feat(true, "Beluginha IA (5 intera&ccedil;&otilde;es/dia)")}
              ${_feat(true, "3 quizzes por semana")}
              ${_feat(true, "Plano de estudos b&aacute;sico")}
              ${_feat(true, "Feed e f&oacute;rum da comunidade")}
              ${_feat(false, "Plano inteligente completo")}
              ${_feat(false, "Quizzes ilimitados")}
              ${_feat(false, "Relat&oacute;rios de desempenho")}
            </ul>
            <button class="ld-plan-btn ld-plan-btn--outline" id="cta-free">Come&ccedil;ar gr&aacute;tis</button>
          </div>

          <div class="ld-plan ld-plan--feat">
            <div class="ld-plan-badge">Mais popular</div>
            <div class="ld-plan-hd">
              <span class="ld-plan-name">Pro</span>
              <div class="ld-plan-price">
                <span class="ld-pcur">R$</span><span class="ld-pamt">19</span><span class="ld-pcts">,90</span><span class="ld-pper">/m&ecirc;s</span>
              </div>
              <p class="ld-plan-tag">O plano completo para quem leva a s&eacute;rio</p>
            </div>
            <ul class="ld-plan-feats">
              ${_feat(true, "Beluginha IA <strong>ilimitada</strong>")}
              ${_feat(true, "Quizzes ilimitados")}
              ${_feat(true, "Plano inteligente completo")}
              ${_feat(true, "Feed e f&oacute;rum da comunidade")}
              ${_feat(true, "Gamifica&ccedil;&atilde;o completa")}
              ${_feat(true, "Notifica&ccedil;&otilde;es avan&ccedil;adas")}
              ${_feat(true, "Relat&oacute;rios de desempenho")}
            </ul>
            <button class="ld-plan-btn ld-plan-btn--primary" id="cta-pro">Assinar Pro</button>
          </div>

          <div class="ld-plan">
            <div class="ld-plan-hd">
              <span class="ld-plan-name">Anual</span>
              <div class="ld-plan-price">
                <span class="ld-pcur">R$</span><span class="ld-pamt">149</span><span class="ld-pcts">,90</span><span class="ld-pper">/ano</span>
              </div>
              <p class="ld-plan-tag">Economize 37% em rela&ccedil;&atilde;o ao mensal</p>
            </div>
            <ul class="ld-plan-feats">
              ${_feat(true, "Tudo do plano Pro")}
              ${_feat(true, "Acesso antecipado a novidades")}
              ${_feat(true, "Suporte priorit&aacute;rio")}
              ${_feat(true, "Relat&oacute;rios avan&ccedil;ados")}
              ${_feat(true, "Badge exclusivo no perfil")}
              ${_feat(true, "XP b&ocirc;nus em datas especiais")}
              ${_feat(true, "Exportar plano de estudos")}
            </ul>
            <button class="ld-plan-btn ld-plan-btn--outline" id="cta-anual">Assinar Anual</button>
          </div>

        </div>
      </section>

      <!-- ── TESTIMONIALS ── -->
      <section class="ld-testi">
        <div class="ld-sec-head">
          <p class="ld-eyebrow">Depoimentos</p>
          <h2 class="ld-sec-h2">O que os estudantes<br>est&atilde;o dizendo</h2>
        </div>
        <div class="ld-tcard-row">
          ${_testi(
            "MC",
            "linear-gradient(135deg,#3b9edd,#1e5f8a)",
            "Mariana C.",
            "Medicina &middot; USP",
            "A Beluginha montou meu plano de revis&atilde;o para o semestre inteiro em 2 minutos. Passei em todas as mat&eacute;rias pela primeira vez!",
          )}
          ${_testi(
            "LH",
            "linear-gradient(135deg,#a855f7,#7c3aed)",
            "Lucas H.",
            "Eng. Software &middot; UFG",
            "Nunca fui bom em planejar estudos. O BELUGA criou uma rotina perfeita pra mim e ainda manda lembrete antes da prova. Simplesmente incr&iacute;vel.",
          )}
          ${_testi(
            "AF",
            "linear-gradient(135deg,#22c55e,#16a34a)",
            "Ana F.",
            "Direito &middot; PUC-SP",
            "O sistema de XP e conquistas me faz querer estudar todo dia. &Eacute; o &uacute;nico app que conseguiu me manter consistente durante toda a gradua&ccedil;&atilde;o.",
          )}
        </div>
      </section>

      <!-- ── FINAL CTA ── -->
      <section class="ld-final">
        <div class="ld-final-inner">
          <div class="hero-image-wrap ld-final-beluga">
            <img src="./assets/images/BELUGA.png" alt="Beluginha" class="ld-final-img" />
          </div>
          <h2 class="ld-final-h2">Pronto para dominar<br>a faculdade?</h2>
          <p class="ld-final-sub">Junte-se a 5.000+ estudantes que j&aacute; transformaram sua rotina acad&ecirc;mica com o BELUGA.</p>
          <button class="ld-btn-primary" id="cta-final">Criar conta gr&aacute;tis</button>
        </div>
      </section>

      <!-- ── FOOTER ── -->
      <footer class="ld-footer" id="contato">
        <div class="ld-footer-top">
          <div class="ld-footer-brand">
            <div class="brand">
              <img src="./assets/images/logof.png" class="brand-logo" alt="BELUGA" />
              <span class="brand-name">BELUGA</span>
            </div>
            <p class="ld-footer-desc">O assistente de estudos<br>do universit&aacute;rio brasileiro.</p>
          </div>
          <div class="ld-footer-cols">
            <div class="ld-footer-col">
              <span class="ld-fcol-hd">Produto</span>
              <a href="javascript:void(0)" data-scroll="funcionalidades" class="ld-footer-a">Funcionalidades</a>
              <a href="javascript:void(0)" data-scroll="preco" class="ld-footer-a">Planos</a>
              <a href="javascript:void(0)" data-scroll="como-funciona" class="ld-footer-a">Como funciona</a>
            </div>
            <div class="ld-footer-col">
              <span class="ld-fcol-hd">Empresa</span>
              <a href="javascript:void(0)" class="ld-footer-a">Sobre n&oacute;s</a>
              <a href="javascript:void(0)" class="ld-footer-a">Blog</a>
              <a href="javascript:void(0)" class="ld-footer-a">Carreiras</a>
            </div>
            <div class="ld-footer-col">
              <span class="ld-fcol-hd">Suporte</span>
              <a href="mailto:contato@belugaapp.com.br" class="ld-footer-a">contato@belugaapp.com.br</a>
              <a href="javascript:void(0)" class="ld-footer-a">Central de ajuda</a>
              <a href="javascript:void(0)" class="ld-footer-a">Privacidade</a>
            </div>
          </div>
        </div>
        <div class="ld-footer-bot">
          <span>&copy; 2025 BELUGA. Todos os direitos reservados.</span>
        </div>
      </footer>

    </main>
  </div>`;
}

export function landingInit() {
  const goLogin = () => {
    window.location.hash = "#/login";
  };

  [
    "cta-login",
    "cta-header",
    "cta-free",
    "cta-pro",
    "cta-anual",
    "cta-final",
  ].forEach((id) => {
    document.getElementById(id)?.addEventListener("click", goLogin);
  });

  document.getElementById("cta-how")?.addEventListener("click", () => {
    document
      .getElementById("como-funciona")
      ?.scrollIntoView({ behavior: "smooth" });
  });

  document.querySelectorAll("[data-scroll]").forEach((el) => {
    el.addEventListener("click", () => {
      document
        .getElementById(el.dataset.scroll)
        ?.scrollIntoView({ behavior: "smooth" });
    });
  });

  const hd = document.getElementById("pub-hd");
  window.addEventListener(
    "scroll",
    () => {
      hd?.classList.toggle("pub-hd--scrolled", window.scrollY > 40);
    },
    { passive: true },
  );
}
