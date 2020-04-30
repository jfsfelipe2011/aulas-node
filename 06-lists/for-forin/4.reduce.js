const { obterPessoa } = require('./service')

async function main() {
    try {
        const { results } = await obterPessoa('a')

        const pesos = results.map((item) => parseFloat(item.height))

        const total = pesos.reduce((anterior, proximo) => {
            return anterior + proximo
        }, 0)

        console.log('Total: ', total)
    } catch (error) {
        console.error('erro interno: ', error)
    }    
}

main()