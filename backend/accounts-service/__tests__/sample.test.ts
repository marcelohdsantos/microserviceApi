import { soma } from '../src/soma';

describe('testando a função de soma', () => {
    it('testando soma de 1 + 2, deve ser 3', () => {
        const resultado = soma(1,2);

        expect(resultado).toEqual(3);
    })
})