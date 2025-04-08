import { DomainError } from "../entities/DomainError";
import { Email } from "./Email";
import { Telephone } from "./Telephone";

export class ClientMaster {
  public readonly id?: string;
  public readonly email: string;
  public readonly phone: string;
  public readonly companyName: string;
  public readonly create_at?: Date;

  constructor(data: {
    id?: string;
    email: string;
    phone: string;
    companyName: string;
    create_at?: Date;
  }) {
    if (!data.companyName) new DomainError("Nome da empresa não é valido");

    this.email = new Email(data.email).getValue();
    this.phone = new Telephone(data.phone).getValue();
    this.companyName = data.companyName;

    if (data?.id) this.id = data.id;
    if (data?.create_at) this.create_at = data.create_at;
  }
}
