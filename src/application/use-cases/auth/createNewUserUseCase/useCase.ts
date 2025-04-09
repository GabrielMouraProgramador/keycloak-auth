import Client from "@/domain/entities/Client";
import { IClientAuthRepository } from "../../../../domain/repositories/IClientAuthRepository";
import { IClientDbRepository } from "@/domain/repositories/IClientDbRepository";

export default class CreateNewUserUseCase {
  constructor(
    private authRepository: IClientAuthRepository,
    private db: IClientDbRepository,
  ) {}
  async execulte(clinet: Client, realm: string) {
    // console.log("[contractorId]", contractorId);
    const consumer = await clinet.getClientConsumer();
    const realmName = `${consumer}-${realm}`;
    const ClientWidhId = await this.authRepository.createNewClient(
      clinet,
      realmName,
    );

    await this.db.createNewClient(ClientWidhId);
  }
}

////* RESOLVE
// 1 - Criar um realm - o.k
// 2 - Criar os Consumer (API/DASHBORD/CLIENTBORD) - o.k
// 2 - Criar as Politicas default
// 3 - Criar os grupos default
////*
