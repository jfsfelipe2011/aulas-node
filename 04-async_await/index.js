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

main()
async function main() {
    try {
        const usuario  = await obterUsuario()
        //const telefone = await obterTelefone(usuario.id)
        //const endereco = await obterEnderecoAsync(usuario.id)

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const telefone = resultado[0]
        const endereco = resultado[1]

        console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua}, ${endereco.numero}
                Telefone: (${telefone.ddd}) ${telefone.telefone}
            `)
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}