import RegisterService from "../../application/services/RegisterService";
import ClientDbRepositoryPrisma from "../../infrastructure/repositories/ClientDbRepositoryPrisma";
import { FastifyRequest } from "fastify";
import CreateNewContractorUseCase from "@/application/use-cases/auth/CreateNewContractorUseCase";
import ClientAuthRepositoryKeycloak from "@/infrastructure/repositories/ClientAuthRepositoryKeycloak";
import CreateRealmUseCase from "@/application/use-cases/auth/CreateRealmUseCase";
import { CreateRealmUniqueUseCase } from "@/application/use-cases/auth/CreateRealmUniqueUseCase";
import CreateNewUserUseCase from "@/application/use-cases/auth/CreateNewUserUseCase";
import LoginUseCase from "@/application/use-cases/auth/LoginUseCase";
import { Email } from "@/domain/value-objects/Email";
import { Password } from "@/domain/value-objects/Password";
import { Telephone } from "@/domain/value-objects/Telephone";

interface DTO {
  email: string;
  phone: string;
  companyName: string;
  password: string;
}

export class AuthController {
  async create(request: FastifyRequest) {
    const { email, phone, companyName, password } = request.body as DTO;

    const db = new ClientDbRepositoryPrisma();
    const auth = new ClientAuthRepositoryKeycloak();

    const createNewContractorUseCase = new CreateNewContractorUseCase(db);
    const createRealmUseCase = new CreateRealmUseCase(auth);
    const createRealmUniqueUseCase = new CreateRealmUniqueUseCase(db);
    const createNewUserUseCase = new CreateNewUserUseCase(auth, db);

    const service = new RegisterService(
      createNewContractorUseCase,
      createRealmUseCase,
      createRealmUniqueUseCase,
      createNewUserUseCase,
    );

    return await service.handle(
      new Email(email),
      new Telephone(phone),
      companyName,
      password,
    );
  }
  async loginAdmin(request: FastifyRequest) {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const db = new ClientDbRepositoryPrisma();
    const auth = new ClientAuthRepositoryKeycloak();

    const loginUseCase = new LoginUseCase(auth, db);

    return await loginUseCase.execulte(
      new Email(email),
      new Password(password),
      "ADMIN",
    );
  }
}
