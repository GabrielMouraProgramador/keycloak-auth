import { ClientMaster } from "@prisma/client";
import { $prismaClient } from "../../../config/database";
import { IClientDbRepository } from "../../domain/repositories/IClientDbRepository";

export default class ClientDbRepositoryPrisma implements IClientDbRepository {
  public async existClientMasterWithEmail(email: string): Promise<boolean> {
    try {
      const result = await $prismaClient.clientMaster.findUnique({
        where: {
          email: email,
        },
      });

      return result ? true : false;
    } catch (err) {
      console.error("Falha ao verificar se email ja existe:", err);
      throw new Error("Falha ao validar email do client");
    }
  }

  public async findClientsByCompanyName(
    companyName: string,
  ): Promise<ClientMaster[]> {
    try {
      const result = await $prismaClient.clientMaster.findMany({
        where: {
          company_name: companyName,
        },
      });

      return result;
    } catch (err) {
      console.error("Falha ao buscar clients por nome da empresa:", err);
      throw new Error("Falha ao buscar empresas por nome");
    }
  }
}
