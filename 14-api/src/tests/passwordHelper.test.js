const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')

const SENHA = 'dev201125'
const HASH = '$2b$04$3nxsu5b..THh3FgXZjraregVyxvd7jWAkqdJfdQdrTQs/vXQxr44a'

describe('UserHelp test suite', function () {
    it('Deve gerar uma hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA)

        assert.ok(result.length > 10)
    })

    it('Deve validar a senha', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)

        assert.ok(result)
    })
})