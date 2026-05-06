/* =========================================================
   BELUGA - router.js
   Responsável por:
   - Ler a rota via hash (#/dashboard)
   - Proteger rotas públicas/privadas (auth fake)
   - Renderizar a tela no #app
   - Chamar init() depois do HTML no DOM
   - Ajustar layout quando estiver no modo público (landing/login/cadastro)
   ========================================================= */

import { isLoggedIn, logout } from "./state/auth.js";

const routes = {};

/* =========================================================
   registerRoute(name, handler)
   handler pode ser:
   - função que retorna HTML (modo simples)
   - objeto { render, init } (modo profissional)
   ========================================================= */
export function registerRoute(name, handler) {
  routes[name] = handler;
}

export function startRouter() {
  function renderRoute() {
    /* -----------------------------
       1) Descobrir rota atual
       ----------------------------- */
    const rawHash = window.location.hash.replace("#/", "") || "landing";
    const routeName = rawHash.split("?")[0];
    document.body.classList.toggle("public-mode", routeName === "landing");

    /* Outlet onde a tela é desenhada */
    const outlet = document.getElementById("app");
    if (!outlet) return;

    /* -----------------------------
       2) Regras de autenticação
       ----------------------------- */
    const publicRoutes = ["landing", "login", "cadastro"];
    const logged = isLoggedIn();
    document.body.classList.toggle(
      "public-mode",
      publicRoutes.includes(routeName),
    );
    const isPublic = publicRoutes.includes(routeName);

    /* -----------------------------
       3) Ajustes de layout (público vs app)
       Isso resolve o "micro scroll" e garante hero full-screen.
       ----------------------------- */

    // Marca no body se estamos no modo público.
    // O CSS usa isso para remover padding do layout do app.
    document.body.classList.toggle("public-mode", isPublic);

    // Topbar só aparece quando está logado (app)
    const topbar = document.getElementById("topbar");
    if (topbar) topbar.classList.toggle("hidden", !logged);

    /* -----------------------------
       4) Bloqueio de rotas
       ----------------------------- */

    // Não logado tentando acessar rota privada → manda para landing
    if (!logged && !isPublic) {
      window.location.hash = "#/landing";
      return;
    }

    // Logado tentando acessar rota pública → manda para dashboard
    if (logged && isPublic) {
      window.location.hash = "#/dashboard";
      return;
    }

    /* -----------------------------
       5) Botão de logout (topbar)
       ----------------------------- */
    const logoutBtn = document.getElementById("btn-logout");
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        logout();
        window.location.hash = "#/landing";
      };
    }

    /* -----------------------------
       6) Renderização da rota
       ----------------------------- */
    const route = routes[routeName];

    if (route) {
      // Se for função: route()
      // Se for objeto: route.render()
      const html = typeof route === "function" ? route() : route.render();

      // Coloca o HTML na tela (agora o DOM existe)
      outlet.innerHTML = html;

      // Marca link ativo no menu do app (topnav)
      document.querySelectorAll("[data-route]").forEach((link) => {
        link.classList.toggle("active", link.dataset.route === routeName);
      });

      // Se tiver init(), roda depois do HTML existir
      if (typeof route === "object" && typeof route.init === "function") {
        route.init();
      }

      return;
    }

    /* -----------------------------
       7) Rota inexistente
       ----------------------------- */
    outlet.innerHTML = "<h1>Página não encontrada</h1>";
  }

  // Re-renderiza quando o hash muda
  window.addEventListener("hashchange", renderRoute);

  // Render inicial
  renderRoute();
}
