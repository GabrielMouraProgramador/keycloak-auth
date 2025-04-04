import ClientAuthRepositoryKeycloak from "../../infrastructure/repositories/ClientAuthRepositoryKeycloak";

describe("[integracao] Client", () => {
  test("should find client by email", async () => {
    const realm_name = "app";
    const keycloak = new ClientAuthRepositoryKeycloak(realm_name);
    await keycloak.generateToken();
    await keycloak.findClientByEmail("email.gabriel.moura@gmail.com");

    expect(keycloak.getToken()).toBeTruthy();
  });
});
