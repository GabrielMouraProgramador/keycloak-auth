import { $fetch } from "ofetch";
import "dotenv/config";
import { IClientAuthRepository } from "../../domain/repositories/IClientAuthRepository";
import ConsumerAuth from "@/domain/entities/ConsumerAuth";
import { DomainError } from "@/domain/entities/DomainError";

export default class ClientAuthRepositoryKeycloak
  implements IClientAuthRepository
{
  private readonly end_pont_base = process.env.KEYCLOAK_ENDPOINT_BASE!;
  private readonly client_id = process.env.KEYCLOAK_CLIENT_ID!;
  private readonly user = process.env.KEYCLOAK_USER!;
  private readonly password = process.env.KEYCLOAK_PASSWORD!;
  private readonly grant_type = process.env.KEYCLOAK_GRANT_TYPE!;
  private readonly client_secret = process.env.KEYCLOAK_SECRET_KEY!;

  constructor() {}

  private async generateToken(consumer: string): Promise<void> {
    try {
      const { access_token } = await $fetch(
        `${this.end_pont_base}/realms/${consumer}/protocol/openid-connect/token`,
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
            client_secret: this.client_secret,
          }).toString(),
        },
      );

      if (!access_token)
        throw new DomainError("Falha ao acessar o acess_token");
      return access_token;
    } catch (err) {
      console.error("Erro ao criar Realm:", err);
      throw new DomainError("Falha ao gerar o token");
    }
  }

  public async masterCreateRealm(realm_name: string): Promise<void> {
    const access_token = await this.generateToken("master");

    try {
      await $fetch(`${this.end_pont_base}/admin/realms`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
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
      throw new DomainError("Falha ao criar realm");
    }
  }
  public async createConsumer(
    realm_name: string,
    cunsumer: ConsumerAuth,
  ): Promise<void> {
    const access_token = await this.generateToken("master");

    try {
      await $fetch(`${this.end_pont_base}/admin/realms/${realm_name}/clients`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: cunsumer.getValue(),
      });
    } catch (err) {
      console.error("Erro ao criar Consumer:", err);
      throw new DomainError("Falha ao criar Consumer");
    }
  }
  // public async getRealmByName(realm_name: string): Promise<void> {
  //   if (!this.access_token) throw new DomainError("Token de acesso não disponível.");

  //   try {
  //     const realm = await $fetch(
  //       `${this.end_pont_base}/admin/realms/${realm_name}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${this.access_token}`,
  //         },
  //         method: "GET",
  //       },
  //     );

  //     return realm;
  //   } catch (err) {
  //     console.error("Erro ao buscar realm:", err);
  //     throw new DomainError("Falha ao buscar realm");
  //   }
  // }
  // public async createUser(
  //   realm_name: string,
  //   user_data: ClientMaster,
  //   password: string,
  // ): Promise<void> {
  //   if (!this.access_token) throw new DomainError("Token de acesso não disponível.");

  //   try {
  //     await $fetch(`${this.end_pont_base}/admin/realms/${realm_name}/users`, {
  //       headers: {
  //         Authorization: `Bearer ${this.access_token}`,
  //       },
  //       method: "POST",
  //       body: user_data,
  //     });
  //   } catch (err) {
  //     console.error("Erro ao Criar Client master:", err);
  //     throw new DomainError("Erro ao Criar Client master");
  //   }
  // }
}
