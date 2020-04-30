const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
const JWT = require('jsonwebtoken')
const PasswordHelper = require('../helpers/passwordHelper')

const failAction = (request, headers, erro) => {
    throw erro;
}

class AuthRoutes extends BaseRoute {
    constructor(secret, db) {
        super()

        this.secret = secret
        this.db = db
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Obtem token',
                notes: 'Faz login com user e senha',
                validate: {
                    failAction,
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                const { username, password } = request.payload

                const [ usuario ] = await this.db.read({
                    username: username.toLowerCase()
                })

                if (!usuario) {
                    return Boom.notFound("Usuário não encontrado")
                }

                const math = await PasswordHelper.comparePassword(password, usuario.password)

                if (!math) {
                    return Boom.unauthorized("Usuário ou senha inválido(a)")
                }

                const token = JWT.sign({
                    username: username,
                    id: usuario.id
                }, this.secret)

                return { token }
            } 
        }
    }
}

module.exports = AuthRoutes