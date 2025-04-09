import Client from "../entities/Client";
import ConsumerAuth from "../entities/ConsumerAuth";
import { Email } from "../value-objects/Email";

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
  createNewClient(clinet: Client, realm: string): Promise<Client>;
  login(email: Email, password: string, realm: string): Promise<void>;
}
