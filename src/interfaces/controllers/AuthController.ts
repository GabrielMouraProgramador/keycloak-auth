import { loginUseCase } from "@/application/use-cases/auth/loginUseCase";
import RegisterService from "../../application/services/RegisterService";
import ClientDbRepositoryPrisma from "../../infrastructure/repositories/ClientDbRepositoryPrisma";
import { FastifyRequest } from "fastify";
import { DomainError } from "@/domain/entities/DomainError";

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
    const service = new RegisterService(db);

    return await service.handle(email, phone, companyName, password);
  }
  async loginAdmin(request: FastifyRequest) {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      throw new DomainError("Informe os campos obrigatorios");
    }

    return await loginUseCase.execulte(email, password, "ADMIN");
  }
}
