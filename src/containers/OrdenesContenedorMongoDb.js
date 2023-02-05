import mongoose from 'mongoose'
import logger from '../logger.js'

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, new mongoose.Schema(esquema))
    }

    async saveOrder (productos, estado, email) {
        try {
            const timestampNow = Date.now()
            const order = {productos: productos, estado: estado, email: email, fecha: timestampNow}
            const orderColeccion = await new this.coleccion(order)
            const orderSave = await orderColeccion.save()
            return orderSave        
        } catch (error) {
            logger.error(error)
        }
    }

    async getById (id) {
        try {
            const byId = await this.coleccion.findOne({_id:id})
            return byId 
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

    async deleteById (id) {
        try {
            const orderDelete = await this.coleccion.deleteOne({_id:id})
            return orderDelete        
        } catch (error) {
            logger.error(error)
        }
    }
}

export default ContenedorMongoDb