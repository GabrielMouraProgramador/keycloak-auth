import { IClientDbRepository } from "../../domain/repositories/IClientDbRepository";
import { IClientAuthRepository } from "../../domain/repositories/IClientAuthRepository";
import ConsumerAuth from "@/domain/entities/ConsumerAuth";
import { Telephone } from "@/domain/value-objects/Telephone";
import { Email } from "@/domain/value-objects/Email";
import { createRealmUseCase } from "../use-cases/auth/createRealmUseCase";

export default class RegisterService {
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
      throw new Error("Alguns campos obrigatorios não foram informados");
    }

    const alreadyIsClient =
      await this.clientBase.existClientMasterWithEmail(email);

    if (alreadyIsClient) {
      throw new Error("Email ja utilziado por outro cliente");
    }

    const companiesSameName =
      await this.clientBase.findClientsByCompanyName(companyName);

    let realmName: string;
    if (companiesSameName.length > 0) {
      //ex: realmName = atelie12
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
      redirectUris: [],
      enabled: true,
      baseUrl: "http://localhost.com",
    });

    await createRealmUseCase.execulte(
      "DASHBOARD",
      consumerAdminDashboard,
      contractorId,
    );

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
// 1 - Verificar se não existe um usuario com o email (EMAIL UNICO)
// 2 - Criar Realm e Grupos de acesso no Keycloak
// 3 - Criar Usuario com admin no keycloak
// Criar uma Loja Padrão
// Fazer configurações default do SITE
// Manter novo Cliente logado
// Dispara email (EMAIL/WHATSAPP) || Bem vindo e confirmação
// Mandar para Config rapida do site
////*
