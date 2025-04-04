import RegisterService from "../../src/application/services/RegisterService";
import ClientAuthRepositoryKeycloak from "../../src/infrastructure/repositories/ClientAuthRepositoryKeycloak";
import ClientDbRepositoryPrisma from "../../src/infrastructure/repositories/ClientDbRepositoryPrisma";

describe("[integracao] RegisterService", () => {
  test("should create new client ecustom", async () => {
    const realm_name = "app";
    const authRepository = new ClientAuthRepositoryKeycloak(realm_name);
    await authRepository.generateToken();

    const clientRepository = new ClientDbRepositoryPrisma();
    const resgisterService = new RegisterService(
      authRepository,
      clientRepository,
    );
    await resgisterService.handle(
      "email.gabriel.moura@gmail.com",
      "5543999005171",
      "Rg Tecnologia",
      "123456",
      "localhost.com.br",
    );
  });
});
