import { $prismaClient } from "../../../config/database";
import {
  IClientDbRepository,
  inputNewContractor,
} from "../../domain/repositories/IClientDbRepository";
import { DomainError } from "@/domain/entities/DomainError";
import Client from "@/domain/entities/Client";
import { Contractor } from "@/domain/entities/Contractor";
import { Email } from "@/domain/value-objects/Email";
import { Telephone } from "@/domain/value-objects/Telephone";
import { RealmUnique } from "@/domain/value-objects/RealmUnique";

export default class ClientDbRepositoryPrisma implements IClientDbRepository {
  public async existContractorWithEmail(email: Email): Promise<boolean> {
    try {
      const result = await $prismaClient.contractor.findUnique({
        where: {
          email: email.getValue(),
        },
      });

      return result ? true : false;
    } catch (err) {
      console.error("Falha ao verificar se email ja existe:", err);
      throw new DomainError("Falha ao validar email do client");
    }
  }
  public async findContractorByCompanyName(
    companyName: string,
  ): Promise<Contractor[]> {
    try {
      const result = await $prismaClient.contractor.findMany({
        where: {
          company_name: companyName,
        },
      });

      return result.map(
        (result) =>
          new Contractor({
            id: result.id,
            email: new Email(result.email),
            phone: new Telephone(result.phone),
            companyName: result.company_name,
            urlBase: result.url_base,
            realmUnique: RealmUnique.create(result.realmUnique),
            create_at: result.create_at,
          }),
      );
    } catch (err) {
      console.error("Falha ao buscar clients por nome da empresa:", err);
      throw new DomainError("Falha ao buscar empresas por nome");
    }
  }
  public async findContractorByEmail(email: Email): Promise<Contractor | null> {
    try {
      const result = await $prismaClient.contractor.findUnique({
        where: {
          email: email.getValue(),
        },
      });

      if (!result) return null;

      return new Contractor({
        id: result.id,
        email: new Email(result.email),
        phone: new Telephone(result.phone),
        companyName: result.company_name,
        urlBase: result.url_base,
        realmUnique: RealmUnique.create(result.realmUnique),
        create_at: result.create_at,
      });
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
        data: {
          realmUnique: data.realmUnique.name,
          email: data.email.getValue(),
          phone: data.phone.getValue(),
          url_base: data.realmUnique.url,
          company_name: data.companyName,
        },
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
  public async createNewClient(client: Client): Promise<void> {
    const infoClient = await client.getValues();

    if (!infoClient.id) throw new DomainError("Cliente sem id definido");
    if (!infoClient.contractorId) {
      throw new DomainError("Contratante não definido");
    }

    try {
      const result = await $prismaClient.client.create({
        data: {
          id: infoClient.id,
          consumer: infoClient.consumer.getValue(),
          email: infoClient.email.getValue(),
          enabled: infoClient.enabled ? infoClient.enabled : true,
          firstName: infoClient.firstName ? infoClient.firstName : "",
          lastName: infoClient.lastName ? infoClient.lastName : "",
          phone: infoClient.phone.getValue(),
          userName: infoClient.userName ? infoClient.userName : "",
          contractor_id: infoClient.contractorId,
        },
      });

      if (!result || !result.id) {
        throw new DomainError("Algo deu errado ao criar o usuario");
      }
    } catch (err) {
      console.error("Falha ao criar contratante:", err);
      throw new DomainError("Falha criar o novo contratante");
    }
  }
}
