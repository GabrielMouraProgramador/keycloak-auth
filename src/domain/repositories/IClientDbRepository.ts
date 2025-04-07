import { ClientMaster } from "../../domain/value-objects/ClientMaster";

export interface IClientDbRepository {
  existClientMasterWithEmail(email: string): Promise<boolean>;
  findClientsByCompanyName(companyName: string): Promise<ClientMaster[]>;
  createNewContractor(realmName: string): Promise<{ id: string }>;
  createNewClientMaster(data: ClientMaster): Promise<{ id: string }>;
}
