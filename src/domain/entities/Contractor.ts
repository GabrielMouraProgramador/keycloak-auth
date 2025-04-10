import { DomainError } from "../entities/DomainError";
import { Email } from "../value-objects/Email";
import { Telephone } from "../value-objects/Telephone";

export class Contractor {
  public readonly id?: string;
  public readonly realmUnique: string;
  public readonly email: string;
  public readonly phone: string;
  public readonly urlBase: string;
  public readonly companyName: string;
  public readonly create_at?: Date;

  constructor(data: {
    id?: string;
    email: string;
    phone: string;
    companyName: string;
    realmUnique: string;
    urlBase: string;
    create_at?: Date;
  }) {
    if (!data.companyName) new DomainError("Nome da empresa não é valido");
    if (!data.realmUnique) new DomainError("Alguns campos obrigatorio");
    if (!data.urlBase) new DomainError("Alguns campos obrigatorio");

    this.email = new Email(data.email).getValue();
    this.phone = new Telephone(data.phone).getValue();
    this.companyName = data.companyName;
    this.realmUnique = data.realmUnique;
    this.urlBase = data.urlBase;

    if (data?.id) this.id = data.id;
    if (data?.create_at) this.create_at = data.create_at;
  }
  getContracotId() {
    return this.id;
  }
  getRealm() {
    return this.realmUnique;
  }
  getUrlBase() {
    return this.urlBase;
  }
}
