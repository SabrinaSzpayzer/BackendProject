import ContenedorMongoDb from '../containers/OrdenesContenedorMongoDb.js'

class OrdenesDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('ordenes', {
            productos: { type: [], required: true },
            estado: { type: String, required: true },
            email: { type: String, required: true },
            fecha: { type: String, required: true }
        })
    }
}

export default OrdenesDaoMongoDb