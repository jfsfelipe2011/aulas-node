const service = require('./service')

async function main() {
    try {
        const result = await service.obterPessoa('a')
        //const names = []

        /*result.results.forEach(function (item) {
            names.push(item.name)
        })*/

        /*const names = result.results.map(function (pessoa) {
            return pessoa.name
        })*/

        const names = result.results.map((pessoa) => pessoa.name)

        console.log('Nomes de pessoas: ', names)
    } catch (error) {
        console.error('erro interno: ', error)
    }    
}

main()