import Client from "../entities/Client";

export interface IClientAuthRepository {
  findClientByEmail(email: string): Promise<Client | null>;
}
