import RegisterService from "../../application/services/RegisterService";
import ClientAuthRepositoryKeycloak from "../../infrastructure/repositories/ClientAuthRepositoryKeycloak";
import ClientDbRepositoryPrisma from "../../infrastructure/repositories/ClientDbRepositoryPrisma";
import { FastifyRequest } from "fastify";

interface DTO {
  email: string;
  phone: string;
  companyName: string;
  password: string;
}

export class AuthController {
  async create(request: FastifyRequest) {
    const { email, phone, companyName, password } = request.body as DTO;

    const auth = new ClientAuthRepositoryKeycloak();
    const db = new ClientDbRepositoryPrisma();

    const service = new RegisterService(auth, db);
    return await service.handle(email, phone, companyName, password);
  }
}
