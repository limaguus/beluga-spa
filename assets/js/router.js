/* =========================================================
   BELUGA - router.js
   - Lê a rota via hash (#/dashboard)
   - Protege rotas públicas/privadas
   - Renderiza a tela no #app
   - Injeta topbar + Beluginha só em páginas privadas
   - Remove topbar + Beluginha em páginas públicas
   ========================================================= */

import { isLoggedIn, logout } from "./state/auth.js";
import { injectBeluginha, removeBeluginha } from "./screens/beluginha.js";

const routes = {};

const PUBLIC_ROUTES = ["landing", "login", "cadastro"];

const TOPBAR_HTML = `
<header class="topbar" id="topbar">
  <div class="container topbar-inner">
    <div class="topbar-brand">
      <img src="assets/images/logof.png" alt="Logo Beluga" class="topbar-logo" />
      <span class="topbar-title">BELUGA</span>
    </div>
    <nav class="topnav" aria-label="Navegação principal">
      <a href="#/dashboard" data-route="dashboard">Dashboard</a>
      <a href="#/matriz"    data-route="matriz">Matriz</a>
      <a href="#/quiz"      data-route="quiz">Quiz</a>
      <a href="#/plano"     data-route="plano">Plano</a>
      <a href="#/aulas"     data-route="aulas">Aulas</a>
      <a href="#/feed"      data-route="feed">Feed</a>
      <a href="#/forum"     data-route="forum">Fórum</a>
      <a href="#/notificacoes" data-route="notificacoes">Notificações</a>
      <a href="#/conquistas"   data-route="conquistas">Conquistas</a>
      <a href="#/perfil"    data-route="perfil">Perfil</a>
    </nav>
    <button class="topbar-logout" id="btn-logout" type="button">Sair</button>
  </div>
</header>
`;

function injectTopbar() {
  if (document.getElementById("topbar")) return;
  const layout = document.querySelector(".layout");
  if (!layout) return;
  layout.insertAdjacentHTML("afterbegin", TOPBAR_HTML);
  document.getElementById("btn-logout").onclick = () => {
    logout();
    window.location.hash = "#/landing";
  };
}

function removeTopbar() {
  document.getElementById("topbar")?.remove();
}

export function registerRoute(name, handler) {
  routes[name] = handler;
}

export function startRouter() {
  function renderRoute() {
    /* 1) Rota atual */
    const rawHash = window.location.hash.replace("#/", "") || "landing";
    const routeName = rawHash.split("?")[0];

    const outlet = document.getElementById("app");
    if (!outlet) return;

    /* 2) Auth */
    const logged = isLoggedIn();
    const isPublic = PUBLIC_ROUTES.includes(routeName);

    /* 3) Marca body para CSS de layout (padding, container, etc.) */
    document.body.classList.toggle("public-mode", isPublic);

    /* 4) Injeta ou remove área privada (topbar + Beluginha) */
    if (isPublic) {
      removeTopbar();
      removeBeluginha();
    } else {
      injectTopbar();
      injectBeluginha();
    }

    /* 5) Bloqueio de rotas */
    if (!logged && !isPublic) {
      window.location.hash = "#/landing";
      return;
    }
    if (logged && isPublic) {
      window.location.hash = "#/dashboard";
      return;
    }

    /* 6) Renderização */
    const route = routes[routeName];

    if (route) {
      const html = typeof route === "function" ? route() : route.render();
      outlet.innerHTML = html;

      /* Marca link ativo no topnav */
      document.querySelectorAll("[data-route]").forEach((link) => {
        link.classList.toggle("active", link.dataset.route === routeName);
      });

      if (typeof route === "object" && typeof route.init === "function") {
        route.init();
      }
      return;
    }

    /* 7) Rota inexistente */
    outlet.innerHTML = "<h1>Página não encontrada</h1>";
  }

  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}
