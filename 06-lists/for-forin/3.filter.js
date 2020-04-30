const { obterPessoa } = require('./service')

async function main() {
    try {
        const { results } = await obterPessoa('a')

        const familiaLars = results.filter((item) => item.name.toLowerCase().indexOf(`lars`) !== -1)

        const names = familiaLars.map((pessoa) => pessoa.name)

        console.log('Nomes de pessoas: ', names)
    } catch (error) {
        console.error('erro interno: ', error)
    }    
}

main()