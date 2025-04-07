import ConsumerAuth from "../entities/ConsumerAuth";

export interface InputConsumer {
  clientId: string;
  name: string;
  enabled: boolean;
  publicClient: boolean;
  protocol: string;
  redirectUris: string[];
  secret: string;
}
export interface IClientAuthRepository {
  masterCreateRealm(realm_name: string): void;
  createConsumer(realm_name: string, cunsumer: ConsumerAuth): void;
  // findClientByEmail(email: string): Promise<Client | null>;
  // createRealmUserMaster(
  //   realm_name: string,
  //   user_data: ClientMaster,
  //   password: string,
  // ): Promise<void>;
}
