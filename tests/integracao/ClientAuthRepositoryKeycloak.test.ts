import ClientAuthRepositoryKeycloak from "../../src/infrastructure/repositories/ClientAuthRepositoryKeycloak";
import { randomUUID } from "crypto";
import ConsumerAuth from "../../src/domain/entities/ConsumerAuth";

describe("[integracao] Keycloak", () => {
  test("should create new Realm without throwing", async () => {
    const uuid = randomUUID();
    const keycloak = new ClientAuthRepositoryKeycloak();
    const realm_name = "reaml-teste-" + uuid;

    await expect(keycloak.masterCreateRealm(realm_name)).resolves.not.toThrow();
  });
  test("should  create new consumer", async () => {
    const keycloak = new ClientAuthRepositoryKeycloak();
    const realm_name = "reaml-teste-b91f6d7c-aebf-4293-adda-a2ffec5d5260";
    const consumerAuth = new ConsumerAuth({
      id: "admin-dashboard",
      redirectUris: [],
      enabled: true,
      baseUrl: "http://localhost.com",
    });

    await expect(
      keycloak.createConsumer(realm_name, consumerAuth),
    ).resolves.not.toThrow();
  });
});
