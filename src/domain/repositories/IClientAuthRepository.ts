import Client from "../entities/Client";
import { ClientMaster } from "../value-objects/ClientMaster";

export interface IClientAuthRepository {
  findClientByEmail(email: string): Promise<Client | null>;
  createRealm(realm_name: string): void;
  createRealm(realm_name: string): void;
  createRealmUserMaster(
    realm_name: string,
    user_data: ClientMaster,
    password: string,
  ): Promise<void>;
}
