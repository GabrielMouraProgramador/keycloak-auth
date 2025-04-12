import Client from "../entities/Client";
import { Contractor } from "../entities/Contractor";
import { Email } from "../value-objects/Email";
import { RealmUnique } from "../value-objects/RealmUnique";
import { Telephone } from "../value-objects/Telephone";

export interface inputNewContractor {
  realmUnique: RealmUnique;
  email: Email;
  phone: Telephone;
  companyName: string;
}
export interface IClientDbRepository {
  existContractorWithEmail(email: Email): Promise<boolean>;
  findContractorByCompanyName(companyName: string): Promise<Contractor[]>;
  findContractorByEmail(email: Email): Promise<Contractor | null>;
  createNewContractor(data: inputNewContractor): Promise<{ id: string }>;
  createNewClient(data: Client): Promise<void>;
}
