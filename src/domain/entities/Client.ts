import { Email } from "../value-objects/Email";

export default class Client {
  private email: string;
  constructor(
    private id: string,
    private userName: string,
    email: string,
  ) {
    this.email = new Email(email).value;
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
