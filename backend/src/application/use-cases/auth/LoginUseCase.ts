import { Email } from "@/domain/value-objects/Email";
import { IClientDbRepository } from "@/domain/repositories/IClientDbRepository";
import { DomainError } from "@/domain/entities/DomainError";
import { Password } from "@/domain/value-objects/Password";
import { Consumer } from "@/domain/value-objects/Consumer";
import { IClientAuthRepository } from "@/domain/repositories/IClientAuthRepository";

export default class LoginUseCase {
  constructor(
    private authRepository: IClientAuthRepository,
    private db: IClientDbRepository,
  ) {}
  async execulte(email: Email, password: Password, consumerName: string) {
    const contractor = await this.db.findContractorByEmail(email);

    if (!contractor) {
      throw new DomainError("Não existe cliente cadastrado com esse email");
    }

    const contractorId = contractor.getContracotId();

    const acessToken = await this.authRepository.login(
      email,
      password,
      contractor.getRealm(),
      new Consumer(consumerName),
      contractorId,
    );
    return {
      data_token: acessToken,
      redirect: contractor.getUrlBase(),
    };
  }
}
