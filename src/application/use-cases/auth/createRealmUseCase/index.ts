import ClientAuthRepositoryKeycloak from "@/infrastructure/repositories/ClientAuthRepositoryKeycloak";
import CreateRealmUseCase from "./useCase";

const keycloak = new ClientAuthRepositoryKeycloak();

const createRealmUseCase = new CreateRealmUseCase(keycloak);

export { createRealmUseCase };
