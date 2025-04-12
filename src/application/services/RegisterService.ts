import ConsumerAuth from "@/domain/entities/ConsumerAuth";
import { Telephone } from "@/domain/value-objects/Telephone";
import { Email } from "@/domain/value-objects/Email";
import Client from "@/domain/entities/Client";
import { Password } from "@/domain/value-objects/Password";
import { Consumer } from "@/domain/value-objects/Consumer";
import CreateNewContractorUseCase from "../use-cases/auth/CreateNewContractorUseCase";
import CreateRealmUseCase from "../use-cases/auth/CreateRealmUseCase";
import { CreateRealmUniqueUseCase } from "../use-cases/auth/CreateRealmUniqueUseCase";
import CreateNewUserUseCase from "../use-cases/auth/CreateNewUserUseCase";

export default class RegisterService {
  constructor(
    private createNewContractorUseCase: CreateNewContractorUseCase,
    private createRealmUseCase: CreateRealmUseCase,
    private createRealmUniqueUseCase: CreateRealmUniqueUseCase,
    private createNewUserUseCase: CreateNewUserUseCase,
  ) {}

  async handle(
    email: Email,
    phone: Telephone,
    companyName: string,
    password: string,
  ): Promise<void> {
    const realm = await this.createRealmUniqueUseCase.execute(companyName);

    const { id: contractorId } = await this.createNewContractorUseCase.execulte(
      {
        email: email,
        realmUnique: realm,
        phone: phone,
        companyName: companyName,
      },
    );

    await this.createRealmUseCase.execulte(
      new Consumer("ADMIN"),
      new ConsumerAuth({
        id: "admin-dashboard",
        redirectUris: [realm.url],
        enabled: true,
        baseUrl: realm.url,
        consumer: new Consumer("ADMIN"),
        secret: contractorId,
      }),
      realm,
    );

    await this.createNewUserUseCase.execulte(
      new Client({
        email: email,
        phone: phone,
        userName: email.getValue(),
        firstName: email.getValue(),
        lastName: email.getValue(),
        password: new Password(password),
        consumer: new Consumer("ADMIN"),
        contractorId,
      }),
      realm,
    );
  }
}

////*
// 1 - Verificar se não existe um usuario com o email (EMAIL UNICO) - o.k
// 2 - Criar Realm e Grupos de acesso no Keycloak - o.k
// 3 - Criar Usuario com admin no keycloak - o.k
// Criar uma Loja Padrão
// Fazer configurações default do SITE
// Manter novo Cliente logado
// Dispara email (EMAIL/WHATSAPP) || Bem vindo e confirmação
// Mandar para Config rapida do site
// TALVEZ SAVER URL BASE
////*
