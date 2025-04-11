import { DomainError } from "../entities/DomainError";
import { Email } from "../value-objects/Email";
import { RealmUnique } from "../value-objects/RealmUnique";
import { Telephone } from "../value-objects/Telephone";

export class Contractor {
  public readonly id: string;
  public readonly realmUnique: RealmUnique;
  public readonly email: Email;
  public readonly phone: Telephone;
  public readonly urlBase: string;
  public readonly companyName: string;
  public readonly create_at?: Date;

  constructor(data: {
    id: string;
    email: Email;
    phone: Telephone;
    companyName: string;
    realmUnique: RealmUnique;
    urlBase: string;
    create_at?: Date;
  }) {
    if (
      !data.id ||
      !data.urlBase ||
      !data.companyName ||
      !data.realmUnique ||
      !data.companyName
    ) {
      new DomainError("Alguns campos obrigatorios não foram informados");
    }

    this.id = data.id;
    this.email = data.email;
    this.phone = data.phone;
    this.companyName = data.companyName;
    this.realmUnique = data.realmUnique;
    this.urlBase = data.urlBase;

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
