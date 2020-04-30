const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

const failAction = (request, headers, erro) => {
    throw erro;
}

const headers = Joi.object({
    authorization: Joi.string().required()
}).unknown()

class HeroisRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    listar() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                tags: ['api'],
                description: 'Deve listar herois',
                notes: 'Pode paginar resultados e filtrar por nome',
                validate: {
                    failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    },
                    headers
                }
            },
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query

                    const query = nome ? {
                        nome: { $regex: `.*${nome}*.` }
                    } : {}

                    return this.db.read(query, skip, limit)
                } catch (error) {
                    console.error('Erro na API', error)

                    return Boom.internal()
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Deve cadastrar um heroi',
                notes: 'Pode cadastrar por nome e poder',
                validate: {
                    failAction,
                    headers,
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { nome, poder } = request.payload
                    const result = await this.db.create({ nome, poder })

                    return {
                        message: "Heroi cadastrado com sucesso!",
                        _id: result._id
                    }
                } catch (error) {
                    console.error('Erro na API', error)

                    return Boom.internal()
                }
            }
        }
    }

    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                tags: ['api'],
                description: 'Deve atualizar parcialmente um heroi',
                notes: 'Pode atualizar com um id informado',
                validate: {
                    failAction,
                    params: {
                        id: Joi.string().required()
                    },
                    headers,
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params
                    const { payload } = request

                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)

                    const result = await this.db.update(id, dados)

                    if (result.nModified !== 1) return Boom.notFound('Id não encontrado')

                    return {
                        message: "Heroi atualizado com sucesso!"
                    }
                } catch (error) {
                    console.error('Erro na API', error)

                    return Boom.internal()
                }
            }
        }
    }

    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                description: 'Deve remover um heroi',
                notes: 'Pode remover com um id válido',
                validate: {
                    failAction,
                    params: {
                        id: Joi.string().required()
                    },
                    headers
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params
                    const result = await this.db.delete(id)

                    if (result.n !== 1) return Boom.notFound('Id não encontrado')

                    return {
                        message: "Heroi removido com sucesso!"
                    }
                } catch (error) {
                    console.error('Erro na API', error)

                    return Boom.internal()
                }
            }
        }
    }
}

module.exports = HeroisRoutes