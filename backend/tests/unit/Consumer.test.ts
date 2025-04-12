import ConsumerAuth from "../../src/domain/entities/ConsumerAuth";

describe("ConsumerAuth", () => {
  test("should create a ConsumerAuth", () => {
    const clientId = "dashboard-dasdasddasdasdasd";
    const consumerAuth = new ConsumerAuth({
      id: clientId,
      redirectUris: [],
      enabled: true,
      baseUrl: "http://localhost.com",
    });

    expect(consumerAuth.getValue()).toEqual({
      clientId: "dashboard-dasdasddasdasdasd",
      enabled: true,
      publicClient: true,
      protocol: "openid-connect",
      redirectUris: [],
      baseUrl: "http://localhost.com",
      directAccessGrantsEnabled: true,
      serviceAccountsEnabled: true,
      standardFlowEnabled: true,
    });
  });
  test("should test url redirect a ConsumerAuth", () => {
    const clientId = "dashboard-dasdasddasdasdasd";
    const consumerAuth = new ConsumerAuth({
      id: clientId,
      redirectUris: ["http://localhost"],
      enabled: true,
      baseUrl: "https://localhost.com",
    });

    expect(consumerAuth.getValue()).toEqual({
      clientId: "dashboard-dasdasddasdasdasd",
      enabled: true,
      publicClient: true,
      protocol: "openid-connect",
      redirectUris: ["http://localhost/*"],
      baseUrl: "https://localhost.com",
      directAccessGrantsEnabled: true,
      serviceAccountsEnabled: true,
      standardFlowEnabled: true,
    });
  });
});
