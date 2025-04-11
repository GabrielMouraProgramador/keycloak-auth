import "dotenv/config";
import { IClientDbRepository } from "../repositories/IClientDbRepository";

export class Realm {
  private constructor(private readonly value: string) {}

  public static async create(
    realmName: string,
    clientBase: IClientDbRepository,
  ): Promise<Realm> {
    if (!realmName || realmName.trim().length === 0) {
      throw new Error("Nome de realm inválido");
    }

    const companiesSameName =
      await clientBase.findContractorByCompanyName(realmName);

    let realmUnique: string;
    if (companiesSameName.length > 0) {
      //ex: realmName = atelie12 | atelie13 | atelie14
      realmUnique = `${realmName}${companiesSameName.length}`;
    } else {
      realmUnique = realmName;
    }

    const formatted = Realm.format(realmUnique);
    return new Realm(formatted);
  }

  public static format(nome: string): string {
    return nome.toLowerCase().trim().replace(/\s+/g, " ").replace(/ /g, "-");
  }

  public get name(): string {
    return this.value;
  }

  public get url(): string {
    const baseUrl = process.env.URL_BASE_ADMIN || "localhost";
    return `http://${this.value}.${baseUrl}/`;
  }
}
