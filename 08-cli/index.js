const commander = require('commander')
const database = require('./database')
const Heroi = require('./heroi')

async function main() {
    commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do heroi")
        .option('-p, --poder [value]', "Poder do heroi")
        .option('-i, --id [value]', "Identificador do heroi")

        .option('-c, --cadastrar', "Cadastrar um heroi")
        .option('-l, --listar', "Listar herois")
        .option('-r, --remover', "Remover um heroi")
        .option('-a, --atualizar', "Atualiza um heroi")
        .parse(process.argv)

    const heroi = new Heroi(commander)

    try {
        if (commander.cadastrar) {
            delete heroi.id
            const resultado = await database.cadastrar(heroi)

            if (!resultado) {
                console.error('Heroi não cadastrado!')
                return;
            }

            console.log("Heroi cadastrado com sucesso!")
            return;
        }

        if (commander.listar) {
            const resultado = await database.listar()
            console.log("Herois: ", resultado)
            return;
        }

        if (commander.remover) {
            const resultado = await database.remover(heroi.id)

            if (!resultado) {
                console.error('Heroi não removido!')
                return;
            }

            console.log("Heroi removido com sucesso!")
            return;
        }

        if (commander.atualizar) {
            const id = heroi.id

            delete heroi.id

            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)

            const resultado = await database.atualizar(id, heroiAtualizar)

            if (!resultado) {
                console.error('Heroi não atualizado!')
                return;
            }

            console.log("Heroi atualizado com sucesso!")
            return;
        }
    } catch (error) {
        console.log("Erro interno: ", error)
    }    
}

main()
