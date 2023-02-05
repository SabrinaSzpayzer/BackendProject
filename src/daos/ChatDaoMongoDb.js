import ContenedorMongoDb from '../containers/ChatContenedorMongoDb.js'

class ChatDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('mensajes', {
            email: { type: String, required: true },
            tipo: { type: String, required: true },
            texto: { type: String, required: true },
            fecha: { type: String, required: true }
        })
    }
}

export default ChatDaoMongoDb