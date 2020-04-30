const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())

const MOCK_HEROI_CADASTRAR = {
    nome: "Gavião Arqueiro",
    poder: "Flechas"
}

const MOCK_HEROI_ATUALIZAR = {
    nome: "Chapolin",
    poder: "Marreta Biônica"
}

describe('Postgres Strategy', function () {
    this.timeout(Infinity);
    this.beforeAll(async function() {
        await context.connect()

        await context.delete()
        await context.create(MOCK_HEROI_CADASTRAR)
    })

    it('PostgresSQL Connection', async () => {
        const result = await context.isConnected()

        assert.equal(result, true)
    })

    it('Cadastrar Postgres', async () => {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id

        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Listar Postgres', async () => {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        delete result.id

        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Atualizar Postgres', async () => {
        await context.create(MOCK_HEROI_ATUALIZAR)
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })

        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Chapolin Colorado'
        }

        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id })

        assert.deepEqual(result, 1)
        assert.deepEqual(novoItem.nome, itemAtualizado.nome)
    })

    it('Deletar Postgres', async () => {
        const [item] = await context.read({})
        const result = await context.delete(item.id)

        assert.deepEqual(result, 1)
    })
})