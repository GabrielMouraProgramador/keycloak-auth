import { IClientDbRepository } from "../../domain/repositories/IClientDbRepository";
import { IClientAuthRepository } from "../../domain/repositories/IClientAuthRepository";
import ConsumerAuth from "@/domain/entities/ConsumerAuth";
import { Telephone } from "@/domain/value-objects/Telephone";
import { Email } from "@/domain/value-objects/Email";
import { createRealmUseCase } from "../use-cases/auth/createRealmUseCase";
import { DomainError } from "@/domain/entities/DomainError";
import "dotenv/config";
import Client from "@/domain/entities/Client";
import { createNewUserUseCase } from "../use-cases/auth/createNewUserUseCase";

export default class RegisterService {
  private readonly URL_BASE_ADMIN: string =
    process.env.URL_BASE_ADMIN || "localhost";
  constructor(
    private authRepository: IClientAuthRepository,
    private clientBase: IClientDbRepository,
  ) {}

  async handle(
    email: string,
    phone: string,
    companyName: string,
    password: string,
  ): Promise<void> {
    if (!password || !companyName) {
      throw new DomainError("Alguns campos obrigatorios não foram informados");
    }

    const alreadyIsClient =
      await this.clientBase.existClientMasterWithEmail(email);

    if (alreadyIsClient) {
      throw new DomainError("Email ja utilziado por outro cliente");
    }

    const companiesSameName =
      await this.clientBase.findClientsByCompanyName(companyName);

    let realmName: string;
    if (companiesSameName.length > 0) {
      //ex: realmName = atelie12 | atelie13 | atelie14
      realmName = `${companyName}${companiesSameName.length}`;
    } else {
      realmName = companyName;
    }

    const { id: contractorId } = await this.clientBase.createNewContractor({
      realmUnique: realmName,
      email: new Email(email).getValue(),
      phone: new Telephone(phone).getValue(),
      company_name: companyName,
    });

    const consumerAdminDashboard = new ConsumerAuth({
      id: "admin-dashboard",
      redirectUris: [`http://${realmName}.${this.URL_BASE_ADMIN}/admin`],
      enabled: true,
      baseUrl: `http://${realmName}.${this.URL_BASE_ADMIN}/admin`,
      secret: "ADMIN-" + contractorId,
    });

    await createRealmUseCase.execulte(
      "ADMIN",
      consumerAdminDashboard,
      contractorId,
    );

    const client = new Client({
      email: email,
      phone: phone,
      userName: companyName,
      password: password,
      consumer: "ADMIN",
      contractorId,
    });
    await createNewUserUseCase.execulte(client);

    // this.authRepository.createRealm(realmName); // 2
    // this.authRepository.createRealmUserMaster(
    //   realmName,
    //   newClientMaster,
    //   password,
    // ); // 3
    // this.clientBase.createNewClientMaster(newClientMaster); // ID KEYCLOAK
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
