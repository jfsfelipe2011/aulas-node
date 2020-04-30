const assert = require('assert')
const api = require('./../api')

const MOCK_HEROI_CADASTRAR = {
    nome: "Chapolin",
    poder: "Marreta Biônicia"
}

const MOCK_HEROI_INICIAL = {
    nome: "Gavião Arqueiro",
    poder: "Flechas"
}

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
              'eyJ1c2VybmFtZSI6Inh1eGFkYXNpbHZhIiwiaWQiOjEsImlhdCI6MTU3NjcxNjI5N30.' + 
              'h9h2feJXxPqR7le5RFLH3RGowe57TyAhcHxXbFqC8Nk'

const headers = {
    authorization: TOKEN
}

let MOCK_ID = ''

describe('Testes de API de Herois', function () {
    this.beforeAll(async () => {
        app = await api
        
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_INICIAL),
            headers
        })

        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id
    })

    it('Listar herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois',
            headers
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('Listar herois com 3 registros', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=3',
            headers
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === 3)
    })

    it('Listar herois gera erro ao passar parametros errados', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=EAA&limit=TTT',
            headers 
        })

        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 400)
    })

    it('Listar herois com filtro nome', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=100&nome=Homem-Aranha-1576205093026',
            headers
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        assert.deepEqual(dados[0].nome, 'Homem-Aranha-1576205093026')
    })

    it('Cadastrar herois', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR),
            headers
        })

        const statusCode = result.statusCode
        const { message, _id } = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(message, "Heroi cadastrado com sucesso!")
        assert.notStrictEqual(_id, undefined)
    })

    it('Atualizar herois', async () => {
        const _id = MOCK_ID
        const expected = {
            poder: 'Super mira'
        }

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected),
            headers
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, "Heroi atualizado com sucesso!")
    })

    it('Não atualiza com ID inválido', async () => {
        const _id = '5bfdb6e83f66ad3c32939fb1'
        const expected = {
            poder: 'Super Flecha'
        }

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected),
            headers
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 404)
        assert.deepEqual(dados.message, "Id não encontrado")
    })

    it('Deletar herois', async () => {
        const _id = MOCK_ID

        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`,
            headers
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, "Heroi removido com sucesso!")
    })
})