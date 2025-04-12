export function useSubdomain() {
  let host = "";

  if (import.meta.server) {
    // SSR
    const headers = useRequestHeaders();
    host = headers.host || "";
  }

  if (import.meta.client) {
    // Client
    host = window.location.hostname;
  }

  const parts = host.split(".");

  // Lida com casos como teste.localhost
  if (host.endsWith(".localhost") && parts.length === 2) {
    return parts[0];
  }

  // Lida com domínios normais: sub.dominio.com
  if (parts.length > 2) {
    return parts[0];
  }

  return "";
}
