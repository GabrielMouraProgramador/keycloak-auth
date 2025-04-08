import { ClientMaster } from "../../domain/value-objects/ClientMaster";
import Client from "../entities/Client";

export interface inputNewContractor {
  realmUnique: string;
  email: string;
  phone: string;
  company_name: string;
}
export interface IClientDbRepository {
  existClientMasterWithEmail(email: string): Promise<boolean>;
  findClientsByCompanyName(companyName: string): Promise<ClientMaster[]>;
  createNewContractor(data: inputNewContractor): Promise<{ id: string }>;
  createNewClient(data: Client): Promise<void>;
}
