// S2: autenticação via localStorage é apenas um flag de UI — não oferece segurança real.
// Qualquer script pode definir beluga_logged="1" pelo console do navegador.
// Para produção, substitua por JWT validado no servidor ou sessão via HttpOnly cookie.
export function isLoggedIn() {
  return localStorage.getItem("beluga_logged") === "1";
}

export function login() {
  localStorage.setItem("beluga_logged", "1");
}

export function logout() {
  localStorage.removeItem("beluga_logged");
}
