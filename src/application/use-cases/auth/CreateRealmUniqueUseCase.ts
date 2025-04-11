import { IClientDbRepository } from "@/domain/repositories/IClientDbRepository";
import { RealmUnique } from "@/domain/value-objects/RealmUnique";

export class CreateRealmUniqueUseCase {
  constructor(private clientBase: IClientDbRepository) {}

  public async execute(companyName: string): Promise<RealmUnique> {
    if (!companyName || companyName.trim().length === 0) {
      throw new Error("Nome da empresa inválido");
    }

    const formattedName = RealmUnique.format(companyName);
    const existing =
      await this.clientBase.findContractorByCompanyName(formattedName);

    let finalName = formattedName;
    if (existing.length > 0) {
      finalName = RealmUnique.format(`${companyName}${existing.length}`);
    }

    return RealmUnique.create(finalName);
  }
}
