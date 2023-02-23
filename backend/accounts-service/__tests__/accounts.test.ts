import supertest from "supertest";
import app from "../src/app";
import { expect, describe, it } from "@jest/globals";

describe("Testando rotas se serviço account", () => {
  const ACCOUNT_PAYLOAD = {
    id: 1,
    name: "Marcelo",
    email: "armarcelo@gmail.com",
    password: "123456",
    status: 1,
  };

  const ACCOUNTS_ENDPOINT = "/accounts/";

  it("POST /accounts/ - Deve retornar statusCode 201", async () => {
    const result = await supertest(app)
      .post(ACCOUNTS_ENDPOINT)
      .send(ACCOUNT_PAYLOAD);

    expect(result.status).toBe(201);
    expect(result.body.id).not.toBeUndefined();
    expect(result.body.id).toBe(1);
    expect(result.body.name).toBe(ACCOUNT_PAYLOAD.name);
    expect(result.body.email).toBe(ACCOUNT_PAYLOAD.email);
    expect(result.body.password).toBe(ACCOUNT_PAYLOAD.password);
    expect(result.body.status).toBe(ACCOUNT_PAYLOAD.status);
  });
});

describe("Testando rotas se serviço account", () => {
  const ACCOUNT_PAYLOAD = {
    id: 1,
    street: "rua dos cravos",
    city: "Manaus",
    state: "RS",    
  };

  const ACCOUNTS_ENDPOINT = "/accounts/";

  it("POST /accounts/ - Deve retornar statusCode 400", async () => {
    const result = await supertest(app)
      .post(ACCOUNTS_ENDPOINT)
      .send(ACCOUNT_PAYLOAD);

    expect(result.status).toBe(400);
    expect(result.body.id).not.toBeUndefined();
    expect(result.body.id).toBe(1);
    expect(result.body.name).toBe(ACCOUNT_PAYLOAD.street);
    expect(result.body.email).toBe(ACCOUNT_PAYLOAD.city);
    expect(result.body.password).toBe(ACCOUNT_PAYLOAD.state);
    
  });
});

describe("Testando rotas do accounts", () => {
  it("GET /accounts/ Deve retornar statusCode 200", async () => {
    const result = await supertest(app).get("/accounts/");

    expect(result.status).toBe(200);
    expect(Array.isArray(result.body)).toBeTruthy();
  });
});

describe("Testando rotas do accounts", () => {
  it("GET /accounts/ Deve retornar statusCode 200", async () => {
    const result = await supertest(app).get("/accounts/1");

    expect(result.body.id).toBe(1);
  });
});

describe("Testando rotas do accounts", () => {
  it("GET /accounts/:id Deve retornar statusCode 404", async () => {
    const result = await supertest(app).get("/accounts/2");

    expect(result.statusCode).toBe(404);
  });
});

describe("Testando rotas do accounts", () => {
  it("GET /accounts/ Deve retornar statusCode 400", async () => {
    const result = await supertest(app).get("/accounts/abc");

    expect(result.statusCode).toBe(400);
  });
});