import { z } from "zod";

export class Email {
  private static emailSchema = z.string().email();
  public value: string = "";
  constructor(email: string) {
    const parseResult = Email.emailSchema.safeParse(email);

    if (!parseResult.success) {
      throw new Error("Email inválido");
    }
    this.value = email;
  }
}
