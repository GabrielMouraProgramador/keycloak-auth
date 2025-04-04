import { z } from "zod";

export class Email {
  private value: string = "";
  private static emailSchema = z.string().email();
  constructor(email: string) {
    const parseResult = Email.emailSchema.safeParse(email);

    if (!parseResult.success) {
      throw new Error("Email inválido");
    }
    this.value = email;
  }
  public getValue() {
    return this.value;
  }
}
