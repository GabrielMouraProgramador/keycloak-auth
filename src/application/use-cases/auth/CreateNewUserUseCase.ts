import Client from "@/domain/entities/Client";
import { IClientAuthRepository } from "@/domain/repositories/IClientAuthRepository";
import { IClientDbRepository } from "@/domain/repositories/IClientDbRepository";
import { RealmUnique } from "@/domain/value-objects/RealmUnique";

export default class CreateNewUserUseCase {
  constructor(
    private authRepository: IClientAuthRepository,
    private db: IClientDbRepository,
  ) {}
  async execulte(clinet: Client, realm: RealmUnique) {
    const consumer = await clinet.getClientConsumer();
    const ClientWidhId = await this.authRepository.createNewClient(
      clinet,
      consumer,
      realm,
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
