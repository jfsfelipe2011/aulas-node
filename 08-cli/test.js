const { deepEqual, ok } = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: "Green Lantern",
    poder: "Ring",
    id: 2
}

describe('Suite de manipulação de Herois', () => {
    before(async () => {
        await database.remover()
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })
    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)

        deepEqual(resultado, expected)
    })

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [atual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)

        deepEqual(atual, expected)
    })

    it('deve remover um heroi por id', async () => {
        const expected = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)

        deepEqual(resultado, expected)
    })

    it('deve atualizar um heroi pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: "Batman",
            poder: "Money"
        }

        const dados = {
            nome: "Batman",
            poder: "Money"
        }

        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, dados)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)

        deepEqual(resultado, expected)
    })
})