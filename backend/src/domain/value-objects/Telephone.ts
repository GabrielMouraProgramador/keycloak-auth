import { z } from "zod";
import { DomainError } from "../entities/DomainError";

export class Telephone {
  private readonly value: string;
  private static telephoneSchema = z.string().min(8);

  constructor(telephone: string) {
    telephone = telephone.replace(/\D/g, "");
    // REMOVE O Primeiro 0 EXEMPLO 043 -> 43
    if (telephone.startsWith("0")) {
      telephone = telephone.substring(1);
    }
    const parseResult = Telephone.telephoneSchema.safeParse(telephone);
    if (parseResult.error) {
      throw new DomainError("Telefone inválido");
    }
    if (parseResult.data.length > 11) {
      throw new DomainError("Telefone inválido");
    }

    if (parseResult.data.length == 8 || parseResult.data.length == 9) {
      throw new DomainError("Informe o código de área.");
    }

    this.value = telephone;
  }

  getValue(): string {
    return this.value;
  }
}
