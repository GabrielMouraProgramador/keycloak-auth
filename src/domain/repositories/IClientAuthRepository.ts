import Client from "../entities/Client";
import ConsumerAuth from "../entities/ConsumerAuth";
import { Consumer } from "../value-objects/Consumer";
import { Email } from "../value-objects/Email";
import { Password } from "../value-objects/Password";
import { RealmUnique } from "../value-objects/RealmUnique";

export interface InputConsumer {
  clientId: string;
  name: string;
  enabled: boolean;
  publicClient: boolean;
  protocol: string;
  redirectUris: string[];
  secret: string;
}

export interface AuthTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
}

export interface IClientAuthRepository {
  masterCreateRealm(consumer: Consumer, realm: RealmUnique): void;
  createConsumer(
    consumer: Consumer,
    realm: RealmUnique,
    consumerAuth: ConsumerAuth,
  ): void;
  createNewClient(
    clinet: Client,
    consumer: Consumer,
    realm: RealmUnique,
  ): Promise<Client>;
  login(
    email: Email,
    password: Password,
    realm: RealmUnique,
    consumer: Consumer,
    contractorId: string,
  ): Promise<AuthTokenResponse>;
}
