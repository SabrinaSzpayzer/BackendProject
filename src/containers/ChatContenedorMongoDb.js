import mongoose from 'mongoose'
import logger from '../logger.js'

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, new mongoose.Schema(esquema))
    }

    async saveMsg (msg) {
        try {
            const msgColeccion = await new this.coleccion(msg)
            const msgSave = await msgColeccion.save()
            return msgSave        
        } catch (error) {
            logger.error(error)
        }
    }

    async getByEmail (email) {
        try {
            const byEmail = await this.coleccion.findOne({email:email})
            return byEmail 
        } catch (error) {
            logger.error(error)
        }
    }

    async getAll () {
        try {
            const total = await this.coleccion.find({})
            return total
        }
        catch (err) {
            logger.error(err)
            return []
        }
    }
}

export default ContenedorMongoDb