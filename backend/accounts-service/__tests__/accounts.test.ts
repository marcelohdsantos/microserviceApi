import supertest from "supertest";
import { Response } from "express";
import app from "../src/app";
import { readSync } from "fs";

// describe("Testando rotas de serviço account", () => {
//   it("POST /accounts/ - Deve retornar statusCode 201", async () => {
//     const payload = {
//       id: 1,
//       name: "Marcelo",
//       email: "armarcelo@gmail.com",
//       password: "123456",
//       status: 1,
//     };
//     const resultado = await supertest(app)
//       .post("/accounts/")
//       .send(payload);

//     expect(resultado.status).toEqual(201);
//   });
// });

// código de teste refatorado:

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
    expect(result.body.name).toBe(ACCOUNT_PAYLOAD.name);
    expect(result.body.email).toBe(ACCOUNT_PAYLOAD.email);
    expect(result.body.password).toBe(ACCOUNT_PAYLOAD.password);
    expect(result.body.status).toBe(ACCOUNT_PAYLOAD.status);
  });
});
