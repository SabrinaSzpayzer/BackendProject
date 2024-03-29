import ContenedorMongoDb from '../containers/CarritosContenedorMongoDb.js'

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('carritos', {
            productos: { type: [], required: true },
            timestamp: { type: String, required: true }
        })
    }

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }
}

export default CarritosDaoMongoDb