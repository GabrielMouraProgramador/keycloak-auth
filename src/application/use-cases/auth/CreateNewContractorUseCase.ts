import { DomainError } from "@/domain/entities/DomainError";
import { IClientDbRepository } from "@/domain/repositories/IClientDbRepository";
import { Email } from "@/domain/value-objects/Email";
import { RealmUnique } from "@/domain/value-objects/RealmUnique";
import { Telephone } from "@/domain/value-objects/Telephone";

export default class CreateNewContractorUseCase {
  constructor(private db: IClientDbRepository) {}
  async execulte(data: {
    email: Email;
    realmUnique: RealmUnique;
    phone: Telephone;
    companyName: string;
  }): Promise<{ id: string }> {
    if (!data.companyName) {
      throw new DomainError("Nome da empresa é um campo obrigatorio");
    }

    const { id } = await this.db.createNewContractor({
      realmUnique: data.realmUnique,
      email: data.email,
      phone: data.phone,
      companyName: data.companyName,
    });

    return {
      id,
    };
  }
}
