import ClientAuthRepositoryKeycloak from "../../src/infrastructure/repositories/ClientAuthRepositoryKeycloak";
import CreateRealmUseCase from "../../src/application/use-cases/auth/CreateRealmUseCase";
import ConsumerAuth from "../../src/domain/entities/ConsumerAuth";

describe("[integracao] CreateRealmUseCase", () => {
  test("should run CreateRealmUseCase without thorow error", async () => {
    const contractorId = "gabriel-eu";
    const keycloak = new ClientAuthRepositoryKeycloak();
    const consumerAuth = new ConsumerAuth({
      id: "admin-dashboard",
      redirectUris: [],
      enabled: true,
      baseUrl: "http://localhost.com",
    });

    const createRealmUseCase = new CreateRealmUseCase(keycloak);

    await expect(
      createRealmUseCase.execulte("DASHBOARD", consumerAuth, contractorId),
    ).resolves.not.toThrow();
  });
});
