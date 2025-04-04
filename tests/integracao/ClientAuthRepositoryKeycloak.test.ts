import ClientAuthRepositoryKeycloak from "../../src/infrastructure/repositories/ClientAuthRepositoryKeycloak";

describe("[integracao] Keycloak", () => {
  test("should create token", async () => {
    const realm_name = "app";
    const keycloak = new ClientAuthRepositoryKeycloak(realm_name);
    await keycloak.generateToken();

    expect(keycloak.getToken()).toBeTruthy();
  });
  test("should get realm by name ", async () => {
    const realm_name = "app";
    const keycloak = new ClientAuthRepositoryKeycloak(realm_name);
    await keycloak.generateToken();

    expect(keycloak.getRealmByName(realm_name)).toBeTruthy();
  });
});
