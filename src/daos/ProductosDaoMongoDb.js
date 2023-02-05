import ContenedorMongoDb from '../containers/ProductosContenedorMongoDb.js'

class ProductosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('productos', {
            title: { type: String, required: true },
            description: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
            category: { type: String, required: true },
            timestamp: { type: String, required: true }
        })
    }
}

export default ProductosDaoMongoDb