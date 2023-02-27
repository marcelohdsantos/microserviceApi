import { expect, describe, it } from "@jest/globals";
import supertest from "supertest";
import app from "../src/app";

describe("Testando rotas de autenticação.", () => {
  it("POST /accounts/login - 200 OK", async () => {
    //mockin
    const newAccount = {
      id: 1,
      name: "Daniel",
      email: "danielcarvalho.rs@gmail.com",
      password: "123456",
    };

    await supertest(app).post("/accounts").send(newAccount);

    //testing
    const payload = {
      id: 1,
      name: "Daniel",
      email: "danielcarvalho.rs@gmail.com",
      password: "123456",
    };

    const resultado = await supertest(app).post("account/login").send(payload);

    expect(resultado.statusCode).toBe(200);
    expect(resultado.body.auth).toBeTruthy();
    expect(resultado.body.token).toBeTruthy();

    it("POST /accounts/login - 422 Unprocessable Entity", async () => {
      const payload = {
        email: "danielcarvalho.rs@gmail.com",
        password: "abc123",
      };

      const resultado = await supertest(app)
        .post("account/login")
        .send(payload);

      expect(resultado.statusCode).toBe(422);
    });

    it("POST /accounts/logout - 200 OK", async () => {
      const resultado = await supertest(app).post("/accounts/logout");

      expect(resultado.status).toEqual(200);
    });
  });
});
