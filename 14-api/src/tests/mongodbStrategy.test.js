const assert = require('assert')
const MongoDB = require('../db/strategies/mongodb/mongodb')
const HeroiSchema = require('../db/strategies/mongodb/schemas/heroisSchema')
const Context = require('../db/strategies/base/contextStrategy')

let context = {}

const MOCK_HEROI_CADASTRAR = {
    nome: "Mulher Maravilha",
    poder: "Laço"
}

const MOCK_HEROI_DEFAULT = {
    nome: `Homem-Aranha-${Date.now()}`,
    poder: "Teia"
}

const MOCK_HEROI_ATUALIZAR = {
    nome: `Tio San-${Date.now()}`,
    poder: "Força"
}

let MOCK_HEROI_ID = ''

describe('MongoDB Strategy', function () {
    this.timeout(Infinity);

    this.beforeAll(async function() {
        const connection = MongoDB.connect()
        context = new Context(new MongoDB(connection, HeroiSchema))

        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.create(MOCK_HEROI_ATUALIZAR)

        MOCK_HEROI_ID = result._id
    })

    it('MongoDB Strategy', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'

        assert.deepEqual(result, expected)
    })

    it('Cadastrar MongoDB', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)

        assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
    })

    it('Listar MongoDB', async () => {
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome })

        assert.deepEqual({ nome, poder }, MOCK_HEROI_DEFAULT)
    })

    it('Atualizar MongoDB', async () => {
        const result = await context.update(MOCK_HEROI_ID, { nome: 'Chapolin' })

        assert.deepEqual(result.nModified, 1)
    })

    it('Remover MongoDB', async () => {
        const resultado = await context.delete(MOCK_HEROI_ID)

        assert.deepEqual(resultado.n, 1)
    })
})