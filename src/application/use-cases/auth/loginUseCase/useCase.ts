import { Email } from "@/domain/value-objects/Email";
import { IClientAuthRepository } from "../../../../domain/repositories/IClientAuthRepository";
import { IClientDbRepository } from "@/domain/repositories/IClientDbRepository";

export default class LoginUseCase {
  constructor(
    private authRepository: IClientAuthRepository,
    private db: IClientDbRepository,
  ) {}
  async execulte(email: string, password: string) {
    if (!password) throw new Error("Senha é um campo obrigatorio");
    const emailValided = new Email(email);
    const contractor = await this.db.findContractorByEmail(
      emailValided.getValue(),
    );
    if (!contractor)
      throw new Error("Não existe cliente cadastrado com esse email");

    const realm = contractor.getRealm();
    this.authRepository.login(emailValided, password, realm);
  }
}
