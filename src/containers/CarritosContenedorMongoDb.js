import mongoose from 'mongoose'
import logger from '../logger.js'
import { asDto } from '../dtos/CarritoDto.js'

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, new mongoose.Schema(esquema))
    }

    async getById (id) {
        try {
            const byId = await this.coleccion.findOne({_id:id})
            return asDto(byId) 
        } catch (error) {
            logger.error(error)
        }
    }

    async getAll () {
        try {
            const total = await this.coleccion.find({})
            return asDto(total)
        }
        catch (err) {
            logger.error(err)
            return []
        }
    }

    async deleteById (id) {
        try {
            const productDelete = await this.coleccion.deleteOne({_id:id})
            return asDto(productDelete)        
        } catch (error) {
            logger.error(error)
        }
    }

    async deleteAll () {
        try {
            const productsDelete = await this.coleccion.deleteMany({})
            return asDto(productsDelete)            
        } catch (error) {
            logger.error(error)
        }
    }

    async saveCarrito (productosC) {
        try {
            const timestampNow = Date.now()
            const carrito = {timestamp: timestampNow, productos: productosC}
            const carritoColeccion = await new this.coleccion(carrito)
            const productSave = await carritoColeccion.save()
            return asDto(productSave)            
        } catch (error) {
            logger.error(error)
        }
    }

    async deleteProdCarrito (id, id_Prod) {
        try {
            let newProd = await this.coleccion.updateOne({_id:id}, {$pull: {productos: {_id: id_Prod}}})
            return asDto(newProd)            
        } catch (error) {
            logger.error(error)
        }
    }

    async updateCarrito (id, productCarrito) {
        try {
            let newProd = await this.coleccion.updateOne({_id:id}, {$push: {productos: productCarrito}})
            return asDto(newProd)            
        } catch (error) {
            logger.error(error)
        }
    }
}

export default ContenedorMongoDb