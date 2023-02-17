"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
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
    it("POST /accounts/ - Deve retornar statusCode 201", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default)
            .post(ACCOUNTS_ENDPOINT)
            .send(ACCOUNT_PAYLOAD);
        expect(result.status).toBe(201);
        expect(result.body.id).not.toBeUndefined();
        expect(result.body.name).toBe(ACCOUNT_PAYLOAD.name);
        expect(result.body.email).toBe(ACCOUNT_PAYLOAD.email);
        expect(result.body.password).toBe(ACCOUNT_PAYLOAD.password);
        expect(result.body.status).toBe(ACCOUNT_PAYLOAD.status);
    }));
});
