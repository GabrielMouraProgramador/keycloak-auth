import { RealmUnique } from "@/domain/value-objects/RealmUnique";
import { Consumer } from "@/domain/value-objects/Consumer";
import { IClientAuthRepository } from "@/domain/repositories/IClientAuthRepository";
import ConsumerAuth from "@/domain/entities/ConsumerAuth";

export default class CreateRealmUseCase {
  constructor(private authRepository: IClientAuthRepository) {}
  async execulte(
    consumer: Consumer,
    consumerAuth: ConsumerAuth,
    realm: RealmUnique,
  ) {
    await this.authRepository.masterCreateRealm(consumer, realm);
    await this.authRepository.createConsumer(consumer, realm, consumerAuth);
  }
}

////* RESOLVE
// 1 - Criar um realm - o.k
// 2 - Criar os Consumer (API/DASHBORD/CLIENTBORD) - o.k
// 2 - Criar as Politicas default
// 3 - Criar os grupos default
////*
