const ICrud = require('./interface/interfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
}

class MongoDB extends ICrud {
    constructor () {
        super()

        this._herois = null
        this._driver = null
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState]

        if (state === 'Conectado') return state;
        if (state !== 'Conectando') return state;

        await new Promise(resolve => setTimeout(resolve, 1000))
        return STATUS[this._driver.readyState]
    }

    async connect() {
        Mongoose.connect('mongodb://hero:senhasecreta@localhost:27017/heroes', 
            { useNewUrlParser: true }, function (error) {
                if (!error) return;
                console.error('Falha na conexão', error)
            })

        this._driver = Mongoose.connection

        this._defineModel()
    }

    _defineModel() {
        const heroiSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })
        
        this._herois = Mongoose.model('herois', heroiSchema)
    }

    create(item) {
        return this._herois.create(item)
    }

    read(item, skip=0, limit=10) {
        return this._herois.find(item).skip(skip).limit(limit)
    }

    update(id, item) {
        return this._herois.updateOne({ _id: id }, { $set: item })
    }

    delete(id) {
        return this._herois.deleteOne({ _id: id })
    }
}

module.exports = MongoDB