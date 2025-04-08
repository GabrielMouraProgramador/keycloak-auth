import { ClientMaster } from "../../domain/value-objects/ClientMaster";

import { $prismaClient } from "../../../config/database";
import {
  IClientDbRepository,
  inputNewContractor,
} from "../../domain/repositories/IClientDbRepository";
import { DomainError } from "@/domain/entities/DomainError";

export default class ClientDbRepositoryPrisma implements IClientDbRepository {
  public async existClientMasterWithEmail(email: string): Promise<boolean> {
    try {
      const result = await $prismaClient.contractor.findUnique({
        where: {
          email: email,
        },
      });

      return result ? true : false;
    } catch (err) {
      console.error("Falha ao verificar se email ja existe:", err);
      throw new DomainError("Falha ao validar email do client");
    }
  }

  public async findClientsByCompanyName(
    companyName: string,
  ): Promise<ClientMaster[]> {
    try {
      const result = await $prismaClient.contractor.findMany({
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
      throw new DomainError("Falha ao buscar empresas por nome");
    }
  }

  public async createNewContractor(
    data: inputNewContractor,
  ): Promise<{ id: string }> {
    try {
      const result = await $prismaClient.contractor.create({
        data: data,
      });

      if (!result || !result.id) {
        throw new DomainError("Algo deu errado ao criar o contratante");
      }

      return { id: result.id };
    } catch (err) {
      console.error("Falha ao criar contratante:", err);
      throw new DomainError("Falha criar o novo contratante");
    }
  }
}
