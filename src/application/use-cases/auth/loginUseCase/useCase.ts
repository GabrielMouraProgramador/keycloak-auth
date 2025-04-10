import { Email } from "@/domain/value-objects/Email";
import { IClientAuthRepository } from "../../../../domain/repositories/IClientAuthRepository";
import { IClientDbRepository } from "@/domain/repositories/IClientDbRepository";
import { DomainError } from "@/domain/entities/DomainError";

export default class LoginUseCase {
  private readonly consumerListAllow: string[] = ["ADMIN", "API", "SITE"];
  constructor(
    private authRepository: IClientAuthRepository,
    private db: IClientDbRepository,
  ) {}
  async execulte(email: string, password: string, consumer: string) {
    if (!this.consumerListAllow.includes(consumer))
      new DomainError("O Consumer não é valido");

    if (!password) throw new DomainError("Senha é um campo obrigatorio");
    const emailValided = new Email(email);
    const contractor = await this.db.findContractorByEmail(
      emailValided.getValue(),
    );
    if (!contractor)
      throw new DomainError("Não existe cliente cadastrado com esse email");
    const contractorId = contractor.getContracotId() || "";
    const realm = `${consumer}-${contractor.getRealm()}`;

    const acessToken = await this.authRepository.login(
      emailValided,
      password,
      realm,
      consumer,
      contractorId,
    );
    return {
      data_token: acessToken,
      redirect: contractor.getUrlBase(),
    };
  }
}
