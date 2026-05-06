/* =========================================================
   BELUGA - app.js
   Responsável por:
   - Registrar todas as rotas
   - Separar rotas públicas e privadas
   - Inicializar o router
   ========================================================= */

/* =========================
   1) CORE DO SISTEMA
   ========================= */
import { registerRoute, startRouter } from "./router.js";

/* =========================
   2) TELAS PÚBLICAS
   (antes do login)
   ========================= */
import { landingScreen, landingInit } from "./screens/landing.js";
import { loginScreen, loginInit } from "./screens/login.js";
import { cadastroScreen, cadastroInit } from "./screens/cadastro.js";

/* =========================
   3) TELAS DO APP (logado)
   ========================= */
import { dashboardScreen, dashboardInit } from "./screens/dashboard.js";

/* =========================
   4) OUTRAS TELAS DO APP
   (por enquanto apenas render simples)
   ========================= */
import { matrizScreen, matrizInit } from "./screens/matriz.js";
import { quizScreen, quizInit } from "./screens/quiz.js";
import { planoEstudoScreen, planoEstudoInit } from "./screens/planoEstudo.js";
import { perfilScreen, perfilInit } from "./screens/perfil.js";
import { feedScreen, feedInit } from "./screens/feed.js";
import { forumScreen, forumInit } from "./screens/forum.js";
import { notificacoesScreen, notificacoesInit } from "./screens/notificacoes.js";
import { aulasScreen, aulasInit } from "./screens/aulas.js";
import { conquistasScreen, conquistasInit } from "./screens/conquistas.js";

/* =========================================================
   REGISTRO DAS ROTAS
   ========================================================= */

/* ---------- Rotas Públicas ---------- */
registerRoute("landing", {
  render: landingScreen,
  init: landingInit,
});

registerRoute("login", {
  render: loginScreen,
  init: loginInit,
});

registerRoute("cadastro", {
  render: cadastroScreen,
  init: cadastroInit,
});

/* ---------- Rotas Privadas (App) ---------- */
registerRoute("dashboard", {
  render: dashboardScreen,
  init: dashboardInit,
});

/* ---------- Rotas Simples do App ---------- */
/* Essas ainda não precisam de init porque
   não possuem lógica interativa específica */
registerRoute("matriz", { render: matrizScreen, init: matrizInit });
registerRoute("quiz", { render: quizScreen, init: quizInit });
registerRoute("plano", { render: planoEstudoScreen, init: planoEstudoInit });
registerRoute("perfil", { render: perfilScreen, init: perfilInit });
registerRoute("feed", { render: feedScreen, init: feedInit });
registerRoute("forum", { render: forumScreen, init: forumInit });
registerRoute("notificacoes", { render: notificacoesScreen, init: notificacoesInit });
registerRoute("aulas", { render: aulasScreen, init: aulasInit });
registerRoute("conquistas", { render: conquistasScreen, init: conquistasInit });

/* =========================================================
   INICIALIZAÇÃO DO SISTEMA
   ========================================================= */

startRouter();
