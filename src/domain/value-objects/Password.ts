import { z } from "zod";

export class Password {
  private readonly value: string;
  private static passwordSchema = z.string().min(8);

  constructor(passwors: string) {
    // valida se estao de acordo com o zod
    const parseResult = Password.passwordSchema.safeParse(passwors);
    if (!parseResult.success) {
      throw new Error("Senha deve conter 8 ou mais dígitos.");
    }

    this.value = passwors;
  }
  getPassword(): string {
    return this.value;
  }
}
