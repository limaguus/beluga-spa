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
import { matrizScreen } from "./screens/matriz.js";
import { quizScreen } from "./screens/quiz.js";
import { planoEstudoScreen } from "./screens/planoEstudo.js";
import { perfilScreen } from "./screens/perfil.js";
import { feedScreen } from "./screens/feed.js";
import { forumScreen } from "./screens/forum.js";
import { notificacoesScreen } from "./screens/notificacoes.js";
import { aulasScreen } from "./screens/aulas.js";
import { conquistasScreen } from "./screens/conquistas.js";

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
registerRoute("matriz", matrizScreen);
registerRoute("quiz", quizScreen);
registerRoute("plano", planoEstudoScreen);
registerRoute("perfil", perfilScreen);
registerRoute("feed", feedScreen);
registerRoute("forum", forumScreen);
registerRoute("notificacoes", notificacoesScreen);
registerRoute("aulas", aulasScreen);
registerRoute("conquistas", conquistasScreen);

/* =========================================================
   INICIALIZAÇÃO DO SISTEMA
   ========================================================= */

startRouter();
