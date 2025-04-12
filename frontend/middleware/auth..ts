export default defineNuxtRouteMiddleware((to, from) => {
  const { $keycloak } = useNuxtApp();

  if (!$keycloak) return;

  const isAuthenticated = $keycloak.authenticated;

  // Se o usuário não está autenticado e não está indo para /login, redireciona
  if (!isAuthenticated && to.path !== "/login") {
    return navigateTo("/login");
  }

  // Se o usuário está autenticado e está indo para /login, redireciona para a home
  if (isAuthenticated && to.path === "/login") {
    alert("[MIDDLEWARE] Você já está autenticado e será redirecionado.");
    return navigateTo("/");
  }
});
