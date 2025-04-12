import Keycloak from "keycloak-js";

export default defineNuxtPlugin(async () => {
  const route = useRoute();

  const token = useCookie("kc_token");
  const refreshToken = useCookie("kc_refresh");

  if (route.query?.token && route.query?.refresh) {
    token.value = route.query.token as string;
    refreshToken.value = route.query.refresh as string;
  }

  const auth = new AuthKeicloak();

  await auth.setTokens(token.value, refreshToken.value);
  await auth.init();
  await auth.updateToken();

  return {
    provide: {
      keycloak: auth.keycloak,
    },
  };
});

class AuthKeicloak {
  private readonly clientId: string = "admin-dashboard";
  private readonly url: string = "http://localhost:8080";
  private realm: string;

  public keycloak: Keycloak;

  constructor() {
    const subdomain = useSubdomain();
    this.realm = `ADMIN-${subdomain}`;

    this.keycloak = new Keycloak({
      url: this.url,
      realm: this.realm,
      clientId: this.clientId,
    });
  }
  public setTokens(token: any, refresh: any) {
    if (!token || !refresh) return;

    this.keycloak.token = token;
    this.keycloak.refreshToken = refresh;
  }
  public cleanTokens() {
    this.keycloak.token = "";
    this.keycloak.refreshToken = "";
  }
  public async init() {
    try {
      await this.keycloak.init({
        onLoad: "check-sso",
        checkLoginIframe: true,
      });
      this.keycloak.authenticated = true;
    } catch (err) {
      // console.error('Falha ao iniciar',err)
      await this.cleanTokens();
      this.keycloak.authenticated = false;
    }
  }
  public async updateToken(time: number = 5) {
    if (!this.keycloak.token || !this.keycloak.refreshToken) {
      this.keycloak.authenticated = false;
      return;
    }

    try {
      await this.keycloak.updateToken(time);
      this.keycloak.authenticated = true;
    } catch (err) {
      // console.error('Falha ao atualizar token', err)
      await this.cleanTokens();
      this.keycloak.authenticated = false;
    }
  }
}
