import { IClientDbRepository } from "@/domain/repositories/IClientDbRepository";
import { IClientAuthRepository } from "../../domain/repositories/IClientAuthRepository";

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
    domain: string,
  ): Promise<void> {
    const alreadyIsClient =
      await this.clientBase.existClientMasterWithEmail(email);

    if (alreadyIsClient) {
      throw new Error("Email ja utilziado por outro cliente");
    }

    const companiesSameName =
      await this.clientBase.findClientsByCompanyName(companyName);

    const realmName: string =
      companiesSameName.length > 0
        ? `${companyName}${companiesSameName.length}`
        : companyName;

    this.authRepository.createRealm(realmName);
  }
}

////*
// Verificar se não existe um usuario com o email (EMAIL UNICO)
// Criar Realm e Grupos de acesso no Keycloak
// Criar Usuario com admin no keycloak
// Criar uma Loja Padrão
// Fazer configurações default do SITE
// Manter novo Cliente logado
// Dispara email (EMAIL/WHATSAPP) || Bem vindo e confirmação
// Mandar para Config rapida do site
////*
