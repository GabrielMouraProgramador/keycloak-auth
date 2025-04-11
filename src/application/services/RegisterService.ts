import { IClientDbRepository } from "../../domain/repositories/IClientDbRepository";
import ConsumerAuth from "@/domain/entities/ConsumerAuth";
import { Telephone } from "@/domain/value-objects/Telephone";
import { Email } from "@/domain/value-objects/Email";
import { createRealmUseCase } from "../use-cases/auth/createRealmUseCase";
import { DomainError } from "@/domain/entities/DomainError";
import Client from "@/domain/entities/Client";
import { createNewUserUseCase } from "../use-cases/auth/createNewUserUseCase";
import { Password } from "@/domain/value-objects/Password";
import { Realm } from "@/domain/value-objects/Realm";

export default class RegisterService {
  constructor(private clientBase: IClientDbRepository) {}

  async handle(
    email: string,
    phone: string,
    companyName: string,
    password: string,
  ): Promise<void> {
    await this.validation(email, phone, companyName, password);

    const realm = await Realm.create(companyName, this.clientBase);

    const { id: contractorId } = await this.clientBase.createNewContractor({
      realmUnique: realm.name,
      email: new Email(email).getValue(),
      phone: new Telephone(phone).getValue(),
      url_base: realm.url,
      company_name: companyName,
    });

    await createRealmUseCase.execulte(
      "ADMIN",
      new ConsumerAuth({
        id: "admin-dashboard",
        redirectUris: [realm.url],
        enabled: true,
        baseUrl: realm.url,
        secret: "ADMIN-" + contractorId,
      }),
      realm.name,
    );

    await createNewUserUseCase.execulte(
      new Client({
        email: email,
        phone: phone,
        userName: realm.name,
        password: password,
        consumer: "ADMIN",
        contractorId,
      }),
      realm.name,
    );
  }
  private async validation(
    email: string,
    phone: string,
    companyName: string,
    password: string,
  ) {
    const validatePassword = new Password(password).getValue();
    const validatePhone = new Telephone(phone).getValue();
    const validateEmail = new Email(email).getValue();

    if (!validatePassword || !validatePhone || !validateEmail || !companyName) {
      throw new DomainError("Alguns campos obrigatorios não foram informados");
    }

    const alreadyIsClient =
      await this.clientBase.existContractorWithEmail(email);

    if (alreadyIsClient) {
      throw new DomainError("Email ja utilziado por outro cliente");
    }
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
