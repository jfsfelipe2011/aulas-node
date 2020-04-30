const http = require('http')

http.createServer((request, response) => {
    response.end('Hello World!!')
})
.listen(4000, () => console.log('o servidor está rodando!!'))