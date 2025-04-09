import { $fetch } from "ofetch";
import "dotenv/config";
import {
  AuthTokenResponse,
  IClientAuthRepository,
} from "../../domain/repositories/IClientAuthRepository";
import ConsumerAuth from "@/domain/entities/ConsumerAuth";
import { DomainError } from "../../domain/entities/DomainError";
import Client from "@/domain/entities/Client";
import { Email } from "@/domain/value-objects/Email";

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

  private async generateMasterToken(): Promise<void> {
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
  private async generateConsumerToken(consumer: string): Promise<void> {
    try {
      const { access_token } = await $fetch(
        `${this.end_pont_base}/realms/${consumer}/protocol/openid-connect/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: "admin-dashboard",
            grant_type: "client_credentials",
            client_secret: consumer,
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
    const access_token = await this.generateMasterToken();
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
    const access_token = await this.generateMasterToken();

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
  public async createNewClient(
    client: Client,
    realmName: string,
  ): Promise<Client> {
    const access_token = await this.generateMasterToken();
    const infoClient = client.getValues();
    try {
      const result = await $fetch.raw(
        `${this.end_pont_base}/admin/realms/${realmName}/users`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          method: "POST",
          body: {
            username: infoClient.userName,
            email: infoClient.email,
            firstName: infoClient.firstName
              ? infoClient.firstName
              : infoClient.email,
            lastName: infoClient.lastName
              ? infoClient.lastName
              : infoClient.email,
            enabled: infoClient.enabled,
            credentials: [
              {
                type: "password",
                value: infoClient.password,
                temporary: false,
              },
            ],
          },
        },
      );

      const location = result.headers.get("location");
      const clientId = location?.split("/").pop();
      if (!clientId)
        throw new DomainError("Falha ao acessar os dados do usuario");

      await client.serId(clientId);
      return client;
    } catch (err) {
      console.error("Erro ao criar Client:", err);
      throw new DomainError("Falha ao criar Client");
    }
  }
  public async login(
    email: Email,
    password: string,
    realm: string,
    cunsumer: string,
    contractorId: string,
  ): Promise<AuthTokenResponse> {
    try {
      const params = new URLSearchParams();
      params.append("client_id", "admin-dashboard");
      params.append("grant_type", "password");
      params.append("username", email.getValue());
      params.append("password", password);
      params.append("client_secret", `${cunsumer}-${contractorId}`);

      const result = await $fetch(
        `${this.end_pont_base}/realms/${realm}/protocol/openid-connect/token`,
        {
          method: "POST",
          body: params,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      if (!result || !result?.access_token)
        throw new Error("Nenhum usuario encontrado");
      return result;
    } catch (err) {
      console.error("Falha ao fazer login:", err);
      throw new DomainError(
        "Falha  ao fazer login, verifique os dados e tente novamente",
      );
    }
  }
}
