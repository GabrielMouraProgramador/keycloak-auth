import { ClientMaster } from "../../domain/value-objects/ClientMaster";

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

      return result.map(
        (result) =>
          new ClientMaster({
            id: result.id,
            email: result.email,
            phone: result.phone,
            companyName: result.company_name,
            create_at: result.create_at,
          }),
      );
    } catch (err) {
      console.error("Falha ao buscar clients por nome da empresa:", err);
      throw new Error("Falha ao buscar empresas por nome");
    }
  }
  public async createNewClientMaster(
    data: ClientMaster,
  ): Promise<{ id: string }> {
    try {
      const result = await $prismaClient.clientMaster.create({
        data: {
          user_name: "",
          email: data.email,
          phone: data.phone,
          company_name: data.companyName,
        },
      });

      if (!result || !result.id) {
        throw new Error("Algo deu errado ao criar o contratante");
      }

      return { id: result.id };
    } catch (err) {
      console.error("Falha ao criar contratante:", err);
      throw new Error("Falha criar o novo contratante");
    }
  }

  public async createNewContractor(realmName: string): Promise<{ id: string }> {
    try {
      const result = await $prismaClient.contractor.create({
        data: {
          realm: realmName,
        },
      });

      if (!result || !result.id) {
        throw new Error("Algo deu errado ao criar o contratante");
      }

      return { id: result.id };
    } catch (err) {
      console.error("Falha ao criar contratante:", err);
      throw new Error("Falha criar o novo contratante");
    }
  }
}
