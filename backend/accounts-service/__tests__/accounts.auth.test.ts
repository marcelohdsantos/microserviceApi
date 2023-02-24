import { expect, describe, it } from "@jest/globals";
import supertest from "supertest";
import app from "../src/app";

describe('Testando rotas de autenticação.', () => {
    it('POST /accounts/login - 200 OK',async () => {
        const payload = {
            email: 'danielcarvalho.rs@gmail.com',
            password: '123456'
        }

        const resultado = await supertest(app)
            .post('account/login')
            .send(payload)

        expect(resultado.statusCode).toBe(200);
        expect(resultado.body.auth).toBeTruthy();
        expect(resultado.body.token).toBeTruthy();
    })
});