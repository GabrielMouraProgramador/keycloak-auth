import { ClientMaster } from "@prisma/client";

export interface IClientDbRepository {
  existClientMasterWithEmail(email: string): Promise<boolean>;
  findClientsByCompanyName(companyName: string): Promise<ClientMaster[]>;
}
