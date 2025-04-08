import { DomainError } from "@/domain/entities/DomainError";
import ConsumerAuth from "../../../../domain/entities/ConsumerAuth";
import { IClientAuthRepository } from "../../../../domain/repositories/IClientAuthRepository";

export default class CreateRealmUseCase {
  private readonly consumerListAllow: string[] = ["ADMIN", "API", "SITE"];
  constructor(private authRepository: IClientAuthRepository) {}
  async execulte(
    consumer: "ADMIN" | "API" | "DASHBOARD",
    cunsumer: ConsumerAuth,
    contractorId: string,
  ) {
    if (!this.consumerListAllow.includes(consumer))
      new DomainError("O Consumer não é valido");

    const realmName = `${consumer}-${contractorId}`;
    await this.authRepository.masterCreateRealm(realmName);
    await this.authRepository.createConsumer(realmName, cunsumer);
  }
}

////* RESOLVE
// 1 - Criar um realm - o.k
// 2 - Criar os Consumer (API/DASHBORD/CLIENTBORD) - o.k
// 2 - Criar as Politicas default
// 3 - Criar os grupos default
////*
