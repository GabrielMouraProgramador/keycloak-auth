import ClientDbRepositoryPrisma from "@/infrastructure/repositories/ClientDbRepositoryPrisma";
import ClientAuthRepositoryKeycloak from "../../../../infrastructure/repositories/ClientAuthRepositoryKeycloak";
import CreateNewUserUseCase from "./useCase";

const keycloak = new ClientAuthRepositoryKeycloak();
const db = new ClientDbRepositoryPrisma();
const createNewUserUseCase = new CreateNewUserUseCase(keycloak, db);

export { createNewUserUseCase };
