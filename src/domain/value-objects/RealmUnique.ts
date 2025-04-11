// Apenas representa o valor. Nada de lógica de persistência aqui.
export class RealmUnique {
  private constructor(private readonly value: string) {}

  public static create(realmName: string): RealmUnique {
    if (!realmName || realmName.trim().length === 0) {
      throw new Error("Nome de realm inválido");
    }

    const formatted = RealmUnique.format(realmName);
    return new RealmUnique(formatted);
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
