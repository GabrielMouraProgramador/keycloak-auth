export default class ConsumerAuth {
  private nameId: string | null = null;
  private enabled?: boolean = true;
  private publicClient: boolean = true;
  private protocol: string = "openid-connect";
  private redirectUris?: string[] = [];
  private baseUrl: string;
  private directAccessGrantsEnabled?: boolean = true;
  private serviceAccountsEnabled?: boolean = true;
  private standardFlowEnabled?: boolean = true;

  constructor(data: {
    id: string;
    enabled?: boolean;
    redirectUris?: string[];
    baseUrl: string;
  }) {
    if (!data.baseUrl || !data.id) {
      throw new Error("Os campos obrigatórios não sao validos.");
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
      throw new Error("Url não é valida.");
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
      directAccessGrantsEnabled: this.directAccessGrantsEnabled,
      serviceAccountsEnabled: this.serviceAccountsEnabled,
      standardFlowEnabled: this.standardFlowEnabled,
    };
  }
}
////**
// clientId: client_id,
// enabled: true,
// publicClient: false,
// protocol: "openid-connect",
// redirectUris: ["http://localhost:3000/*"], // ajuste para sua aplicação
// baseUrl: "http://localhost:3000", // opcional
// directAccessGrantsEnabled: true,
// serviceAccountsEnabled: true,
// standardFlowEnabled: true, // ativa o Authorization Code Flow
////**
