const assert = require('assert')
const api = require('../api')
let app = {}
const Postgres = require('../db/strategies/postgres/postgres')
const Context = require('../db/strategies/base/contextStrategy')
const UserSchema = require('../db/strategies/postgres/schemas/UserSchema')

const USER = {
    username: 'xuxadasilva',
    password: '123'
}

const USER_DB = {
    username: 'xuxadasilva',
    password: '$2b$04$BuAHNuj.SfzhEJ00MGsX7OJWJfwacbbX.efDEVoA394iizEz9GPIC'
}

describe('Auth teste suite', function () {
    this.beforeAll(async () => {
        app = await api

        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, UserSchema)

        context = new Context(new Postgres(connection, model))

        await context.update(null, USER_DB, true)
    })

    it('Deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
    })

    it('Deve gerar não autorizado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'carlinhos',
                senha: 'senha'
            }
        })

        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 400)
    })
})