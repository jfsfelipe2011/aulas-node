const EventEmitter = require('events')

class MeuEmissor extends EventEmitter {

}

const meuEmissor = new MeuEmissor()

const meuEvento = 'usuario:click'

meuEmissor.on(meuEvento, function (click) {
    console.log('um usuário clicou', click)
})

meuEmissor.emit(meuEvento, 'na barra de rolagem')
meuEmissor.emit(meuEvento, 'no ok')

const stdin = process.openStdin()

stdin.addListener('data', function (value) {
    console.log(`Você digitou: ${value.toString().trim()}`)
})