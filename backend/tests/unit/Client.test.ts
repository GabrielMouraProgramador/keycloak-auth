import Client from "../../src/domain/entities/Client";

describe("Client", () => {
  test("should create a user", () => {
    const client = new Client({
      email: "email.gabriel.moura@gmail.com",
      phone: "43999005171",
      userName: "gabriel",
    });

    expect(client.getClientName()).toBe("gabriel");
    expect(client.getClientEmail()).toBe("email.gabriel.moura@gmail.com");
  });

  test("should throw invalid email", () => {
    expect(() => {
      new Client({
        email: "email invalido",
        phone: "43999005171",
        userName: "gabriel",
      });
    }).toThrow("Email inválido");
  });

  test("should get values auser", () => {
    const client = new Client({
      email: "email.gabriel.moura@gmail.com",
      phone: "43999005171",
      userName: "gabriel",
    });

    expect(client.getValues()).toEqual({
      create_at: undefined,
      firstName: undefined,
      email: "email.gabriel.moura@gmail.com",
      phone: "43999005171",
      userName: "gabriel",
      password: undefined,
      id: undefined,
      enabled: true,
      lastName: undefined,
    });
  });
});
