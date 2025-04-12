import { DomainError } from "../entities/DomainError";

export class Consumer {
  private readonly consumerListAllow: string[] = ["ADMIN", "API", "SITE"];
  private value: string = "";

  constructor(name: string) {
    if (!this.consumerListAllow.includes(name)) {
      new DomainError("O Consumer não é valido");
    }

    this.value = name;
  }
  public getValue() {
    return this.value;
  }
}
