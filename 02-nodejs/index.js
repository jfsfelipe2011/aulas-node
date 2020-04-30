/*
 0 Obter um usuário
 1 Obter o número de telefone de um usuário a partir de um Id
 2 Obter o endereço do usuário pelo Id
*/

function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'Zezin',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '993540454',
            ddd: '51'
        })
    }, 2000)
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua dos programadores',
            numero: 1202
        })
    }, 2000)
}

function resolverUsuario(erro, usuario) {
    console.log('usuario', usuario)
}

function resolverTelefone(erro, telefone) {
    console.log('telefone', telefone)
}

function resolverEndereco(erro, endereco) {
    console.log('endereco', endereco)
}

obterUsuario(function resolverUsuario(error, usuario) {
    if (error) {
        console.error('DEU RUIM em Usuário', error)
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if (error1) {
            console.error('DEU RUIM em Telefone', error1)
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if (error2) {
                console.error('DEU RUIM em Endereço', error2)
                return;
            }

            console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua}, ${endereco.numero}
                Telefone: (${telefone.ddd}) ${telefone.telefone}
            `)
        })
    })
})