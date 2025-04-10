import { DomainError } from "./DomainError";

export default class ConsumerAuth {
  private nameId: string | null = null;
  private enabled?: boolean = true;
  private publicClient: boolean = true;
  private protocol: string = "openid-connect"; //permite uso do fluxo client_credentials
  private redirectUris?: string[] = [];
  private baseUrl: string;
  private directAccessGrantsEnabled?: boolean = true; //opcional, desativa o password grant
  private serviceAccountsEnabled?: boolean = false;
  private standardFlowEnabled?: boolean = true; // desativa o authorization code.
  private clientAuthenticatorType?: string = "client-secret"; //  usa secret ao invés de JWT
  private secret: string;

  constructor(data: {
    id: string;
    enabled?: boolean;
    redirectUris?: string[];
    baseUrl: string;
    secret: string;
  }) {
    if (!data.baseUrl || !data.id || !data.secret) {
      throw new DomainError("Os campos obrigatórios não sao validos.");
    }

    if (data.redirectUris) {
      this.redirectUris = data.redirectUris.map((url) =>
        this.formataUrlRedirect(url),
      );
    }
    if (data.id) this.nameId = data.id;
    if (data.enabled) this.enabled = data.enabled;
    if (data.id) this.nameId = data.id;

    this.baseUrl = this.validUrl(data.baseUrl);
    this.secret = data.secret;
  }
  private formataUrlRedirect(url: string) {
    this.validUrl(url);

    if (!url.endsWith("/*")) {
      url = url.replace(/\/+$/, ""); // remove barras finais
      url += "/*";
    }

    return url;
  }
  private validUrl(url: string) {
    const regex = /^https?:\/\//;

    if (!regex.test(url)) {
      throw new DomainError("Url não é valida.");
    }

    return url;
  }

  public getValue() {
    return {
      clientId: this.nameId,
      enabled: this.enabled,
      publicClient: this.publicClient,
      protocol: this.protocol,
      redirectUris: this.redirectUris,
      baseUrl: this.baseUrl,
      rootUrl: this.baseUrl, // IGUAL A BASE
      directAccessGrantsEnabled: this.directAccessGrantsEnabled,
      serviceAccountsEnabled: this.serviceAccountsEnabled,
      standardFlowEnabled: this.standardFlowEnabled,
      clientAuthenticatorType: this.clientAuthenticatorType,
      secret: this.secret,
    };
  }
}

////**
//  IMPORTANTE CONFIG KEYCLOAK DEVE FICAR
// Capability config
// Client authentication = false
// Authorization = false
// Standard flow = true
// Direct access grants = true
//
//
// clientId: client_id,
// enabled: true,
// publicClient: true,
// protocol: "openid-connect",
// redirectUris: ["http://localhost:3000/*"], // ajuste para sua aplicação
// baseUrl: "http://localhost:3000", // opcional
// directAccessGrantsEnabled: true,
// serviceAccountsEnabled: true,
// standardFlowEnabled: true, // ativa o Authorization Code Flow
////**
