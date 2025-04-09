import ClientAuthRepositoryKeycloak from "@/infrastructure/repositories/ClientAuthRepositoryKeycloak";
import ClientDbRepositoryPrisma from "@/infrastructure/repositories/ClientDbRepositoryPrisma";
import LoginUseCase from "./useCase";

const keycloak = new ClientAuthRepositoryKeycloak();
const db = new ClientDbRepositoryPrisma();
const loginUseCase = new LoginUseCase(keycloak, db);

export { loginUseCase };
