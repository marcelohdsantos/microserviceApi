"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const soma_1 = require("../src/soma");
describe('testando a função de soma', () => {
    it('testando soma de 1 + 2, deve ser 3', () => {
        const resultado = (0, soma_1.soma)(1, 2);
        expect(resultado).toEqual(3);
    });
});
