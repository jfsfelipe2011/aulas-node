/*
 0 Obter um usuário
 1 Obter o número de telefone de um usuário a partir de um Id
 2 Obter o endereço do usuário pelo Id
*/

const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            return resolve({
                id: 1,
                nome: 'Zezin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            return resolve({
                telefone: '993540454',
                ddd: '51'
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua dos programadores',
            numero: 1202
        })
    }, 2000)
}

const usuarioPromise = obterUsuario()

usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(result) {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result
                }
            })
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolveEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado) {
        console.log(`
                Nome: ${resultado.usuario.nome},
                Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
                Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
            `)
    })
    .catch(function (error) {
        console.error('DEU RUIM', error)
    })