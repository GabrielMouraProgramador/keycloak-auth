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
import { Consumer } from "@/domain/value-objects/Consumer";
import { RealmUnique } from "@/domain/value-objects/RealmUnique";
import { Password } from "@/domain/value-objects/Password";

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
  public async masterCreateRealm(
    consumer: Consumer,
    realm: RealmUnique,
  ): Promise<void> {
    const access_token = await this.generateMasterToken();
    try {
      const realmName = `${consumer.getValue()}-${realm.name}`;
      await $fetch(`${this.end_pont_base}/admin/realms`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        method: "POST",
        body: {
          realm: realmName,
          enabled: true,
          displayName: realmName,
          loginWithEmailAllowed: true,
        },
      });
    } catch (err) {
      console.error("Erro ao obter usuário:", err);
      throw new DomainError("Falha ao criar realm");
    }
  }
  public async createConsumer(
    consumer: Consumer,
    realm: RealmUnique,
    consumerAuth: ConsumerAuth,
  ): Promise<void> {
    const access_token = await this.generateMasterToken();
    const realmName = `${consumer.getValue()}-${realm.name}`;

    try {
      await $fetch(`${this.end_pont_base}/admin/realms/${realmName}/clients`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: consumerAuth.getValue(),
      });
    } catch (err) {
      console.error("Erro ao criar Consumer:", err);
      throw new DomainError("Falha ao criar Consumer");
    }
  }
  public async createNewClient(
    client: Client,
    consumer: Consumer,
    realm: RealmUnique,
  ): Promise<Client> {
    const realmName = `${consumer.getValue()}-${realm.name}`;
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

      await client.setId(clientId);
      return client;
    } catch (err) {
      console.error("Erro ao criar Client:", err);
      throw new DomainError("Falha ao criar Client");
    }
  }
  public async login(
    email: Email,
    password: Password,
    realm: RealmUnique,
    consumer: Consumer,
    contractorId: string,
  ): Promise<AuthTokenResponse> {
    try {
      const realmName = `${consumer.getValue()}-${realm.name}`;
      const params = new URLSearchParams();
      params.append("client_id", "admin-dashboard");
      params.append("grant_type", "password");
      params.append("username", email.getValue());
      params.append("password", password.getValue());
      params.append("client_secret", `${consumer.getValue()}-${contractorId}`);

      const result = await $fetch(
        `${this.end_pont_base}/realms/${realmName}/protocol/openid-connect/token`,
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
