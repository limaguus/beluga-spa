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

    <a class="topbar-brand" href="#/dashboard">
      <img src="assets/images/logof.png" alt="Logo Beluga" class="topbar-logo" />
      <span class="topbar-title">BELUGA</span>
    </a>

    <nav class="topnav" aria-label="Navegação principal">

      <a href="#/dashboard" data-route="dashboard" title="Dashboard">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
        <span>Dashboard</span>
      </a>
      <a href="#/aulas" data-route="aulas" title="Aulas">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
        <span>Aulas</span>
      </a>
      <a href="#/quiz" data-route="quiz" title="Quiz">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <span>Quiz</span>
      </a>
      <a href="#/plano" data-route="plano" title="Plano de Estudos">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <span>Plano</span>
      </a>
      <a href="#/matriz" data-route="matriz" title="Matriz Curricular">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
        <span>Matriz</span>
      </a>

      <span class="topnav-divider" aria-hidden="true"></span>

      <a href="#/feed" data-route="feed" title="Feed Acadêmico">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><polyline points="3 6 4 7 6 5"/><polyline points="3 12 4 13 6 11"/><polyline points="3 18 4 19 6 17"/></svg>
        <span>Feed</span>
      </a>
      <a href="#/forum" data-route="forum" title="Fórum da Comunidade">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span>Fórum</span>
      </a>
      <a href="#/conquistas" data-route="conquistas" title="Conquistas">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
        <span>Conquistas</span>
      </a>

    </nav>

    <div class="topbar-right">

      <a class="topbar-notif" href="#/notificacoes" data-route="notificacoes"
         title="Notificações" aria-label="Notificações — 3 não lidas">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <span class="topbar-notif-badge" aria-hidden="true">3</span>
      </a>

      <a class="topbar-user" href="#/perfil" data-route="perfil" title="Meu Perfil">
        <img src="assets/images/fotorosto.jpeg" class="topbar-user-avatar" alt="Foto de Jimmy" />
        <span class="topbar-user-name">Jimmy</span>
      </a>

      <button class="topbar-logout" id="btn-logout" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        <span>Sair</span>
      </button>

    </div>
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
