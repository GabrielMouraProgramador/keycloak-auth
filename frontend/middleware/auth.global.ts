export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return;

  const { $keycloak } = useNuxtApp() as unknown as { $keycloak: { authenticated?: boolean } };
  const route = useRoute();

  // Rotas que não precisam de autenticação
  const noAuthRoutes = ["/login", "/signup"];

  const isPublicRoute = noAuthRoutes.includes(to.path);

  const isAuthenticated = $keycloak?.authenticated ?? false;

  if (route.query?.token && route.query?.refresh) {
    return navigateTo("/", { external: true });
  }

  // Se não estiver autenticado e a rota exigir autenticação
  if (!isAuthenticated && !isPublicRoute) {
    return navigateTo("http://localhost:3000/login", { external: true });
  }

  // Se estiver autenticado e tentar acessar uma rota pública, redireciona para dashboard (opcional)
  if (isAuthenticated && isPublicRoute) {
    return navigateTo("/");
  }
});
