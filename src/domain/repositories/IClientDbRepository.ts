import Client from "../entities/Client";
import { Contractor } from "../entities/Contractor";

export interface inputNewContractor {
  realmUnique: string;
  email: string;
  phone: string;
  company_name: string;
}
export interface IClientDbRepository {
  existContractorWithEmail(email: string): Promise<boolean>;
  findContractorByCompanyName(companyName: string): Promise<Contractor[]>;
  findContractorByEmail(string: string): Promise<Contractor[]>;
  createNewContractor(data: inputNewContractor): Promise<{ id: string }>;
  createNewClient(data: Client): Promise<void>;
}
