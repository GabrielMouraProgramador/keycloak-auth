import { $fetch } from "ofetch";

import "dotenv/config";
import { IClientAuthRepository } from "../../domain/repositories/IClientAuthRepository";
import Client from "../../domain/entities/Client";

export default class ClientAuthRepositoryKeycloak
  implements IClientAuthRepository
{
  private readonly end_pont_base = process.env.KEYCLOAK_ENDPOINT_BASE!;
  private readonly client_id = process.env.KEYCLOAK_CLIENT_ID!;
  private readonly user = process.env.KEYCLOAK_USER!;
  private readonly password = process.env.KEYCLOAK_PASSWORD!;
  private readonly grant_type = process.env.KEYCLOAK_GRANT_TYPE!;

  private access_token: string | null = null;

  constructor(readonly realm_name: string) {}

  public async generateToken(): Promise<void> {
    try {
      const { access_token } = await $fetch(
        `${this.end_pont_base}/realms/master/protocol/openid-connect/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: this.client_id,
            grant_type: this.grant_type,
            username: this.user,
            password: this.password,
          }).toString(),
        },
      );
      if (!access_token) throw new Error("Falha ao acessar o acess_token");
      this.access_token = access_token;
    } catch (err) {
      console.error("Erro ao criar Realm:", err);
      throw new Error("Falha ao gerar o token");
    }
  }
  public async getToken(): Promise<string | null> {
    if (!this.access_token) throw new Error("Token de acesso não disponível.");

    return this.access_token;
  }

  public async findClientByEmail(email: string): Promise<Client | null> {
    if (!this.access_token) throw new Error("Token de acesso não disponível.");

    try {
      const result = await $fetch(
        `${this.end_pont_base}/admin/realms/${this.realm_name}/users/?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
            "Content-Type": "application/json",
          },
          method: "GET",
        },
      );
      if (!result || result.length === 0) return null;

      const { id, username } = result[0];

      return new Client(id, username, email);
    } catch (err) {
      console.error("Erro ao obter usuário:", err);
      throw new Error("Falha ao buscar usuario");
    }
  }
  public async createRealm(realm_name: string): Promise<void> {
    if (!this.access_token) throw new Error("Token de acesso não disponível.");

    try {
      await $fetch(`${this.end_pont_base}/admin/realms`, {
        headers: {
          Authorization: `Bearer ${this.access_token}`,
        },
        method: "POST",
        body: {
          realm: realm_name,
          enabled: true,
          displayName: realm_name,
          loginWithEmailAllowed: true,
        },
      });
    } catch (err) {
      console.error("Erro ao obter usuário:", err);
      throw new Error("Falha ao criar realm");
    }
  }
  public async getRealmByName(realm_name: string): Promise<void> {
    if (!this.access_token) throw new Error("Token de acesso não disponível.");

    try {
      const realm = await $fetch(
        `${this.end_pont_base}/admin/realms/${realm_name}`,
        {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
          method: "GET",
        },
      );

      return realm;
    } catch (err) {
      console.error("Erro ao buscar realm:", err);
      throw new Error("Falha ao buscar realm");
    }
  }
}
