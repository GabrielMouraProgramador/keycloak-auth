import { Email } from "../value-objects/Email";
import { DomainError } from "./DomainError";

export default class Client {
  private email: string;
  constructor(
    private id: string,
    private userName: string,
    email: string,
  ) {
    if (!id || !userName)
      throw new DomainError("Os campos obrigatórios não sao validos.");
    this.email = new Email(email).getValue();
  }

  public getClientId() {
    return this.id;
  }
  public getClientName() {
    return this.userName;
  }
  public getClientEmail() {
    return this.email;
  }
}
