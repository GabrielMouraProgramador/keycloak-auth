import Client from "../../src/domain/entities/Client";

describe("Client", () => {
  test("should create a user", () => {
    const clientId = "uuid-dasdas-dasdas-dasad";
    const clientName = "Fulano de tal";
    const clientEmail = "emaildofunalo@gmail.com";
    const client = new Client(clientId, clientName, clientEmail);

    expect(client.getClientId()).toBe(clientId);
    expect(client.getClientName()).toBe(clientName);
    expect(client.getClientEmail()).toBe(clientEmail);
  });

  test("should throw invalid email", () => {
    const clientId = "uuid-dasdas-dasdas-dasad";
    const clientName = "Fulano de tal";
    const clientEmail = "email invalido";

    expect(() => {
      new Client(clientId, clientName, clientEmail);
    }).toThrow("Email inválido");
  });

  test("should throw invalid inputs", () => {
    const clientId = "";
    const clientName = "Fulano de tal";
    const clientEmail = "email invalido";

    expect(() => {
      new Client(clientId, clientName, clientEmail);
    }).toThrow("Os campos obrigatórios não sao validos.");
  });
});
