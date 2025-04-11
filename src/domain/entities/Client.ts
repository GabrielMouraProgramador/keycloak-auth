import { Email } from "../value-objects/Email";
import { Password } from "../value-objects/Password";
import { Telephone } from "../value-objects/Telephone";
import { DomainError } from "./DomainError";
import { Consumer } from "../value-objects/Consumer";

export default class Client {
  public id?: string | undefined = undefined;
  public readonly email: Email;
  public readonly phone: Telephone;
  public readonly userName: string;
  public readonly contractorId: string;
  public readonly consumer: Consumer;
  public readonly firstName?: string;
  public readonly lastName?: string;
  public readonly password?: Password;
  public readonly create_at?: Date;
  public enabled?: boolean = true;

  constructor(data: {
    id?: string;
    email: Email;
    phone: Telephone;
    userName: string;
    consumer: Consumer;
    contractorId: string;
    firstName?: string;
    lastName?: string;
    password?: Password;
    enabled?: boolean;
    create_at?: Date;
  }) {
    if (!data.userName) new DomainError("Nome da empresa não é valido");
    if (!data.contractorId) new DomainError("O contratante não foi informado");
    if (!data.consumer) new DomainError("O Consumer não é valido");

    this.email = data.email;
    this.phone = data.phone;
    if (data?.password) this.password = data.password;

    this.userName = data.userName;
    this.consumer = data.consumer;
    this.contractorId = data.contractorId;

    if (data?.id) this.id = data.id;
    if (data?.firstName) this.firstName = data.firstName;
    if (data?.lastName) this.lastName = data.lastName;
    if (data?.create_at) this.create_at = data.create_at;
    if (data?.enabled) this.enabled = data.enabled;
  }

  public getClientId() {
    return this.id;
  }
  public getClientName() {
    return this.userName;
  }
  public getClientConsumer() {
    return this.consumer;
  }
  public getClientContractor() {
    return this.contractorId;
  }
  public getClientEmail() {
    return this.email;
  }
  public getValues() {
    return {
      id: this.id,
      email: this.email,
      phone: this.phone,
      userName: this.userName,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      enabled: this.enabled,
      consumer: this.consumer,
      contractorId: this.contractorId,
      create_at: this.create_at,
    };
  }
  public setId(id: string) {
    this.id = id;
  }
}
