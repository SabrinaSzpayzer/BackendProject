import mongoose from 'mongoose'
import logger from '../logger.js'
import { asDto } from '../dtos/ProductoDto.js'

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, new mongoose.Schema(esquema))
    }

    async saveProduct (title, description, price, thumbnail, category) {
        try {
            const timestampNow = Date.now()
            const product = {title: title, description: description, price: price, thumbnail: thumbnail, category: category, timestamp: timestampNow}
            const productColeccion = await new this.coleccion(product)
            const productSave = await productColeccion.save()
            return asDto(productSave)        
        } catch (error) {
            logger.error(error)
        }
    }

    async getById (id) {
        try {
            const byId = await this.coleccion.findOne({_id:id})
            return asDto(byId) 
        } catch (error) {
            logger.error(error)
        }
    }

    async getByCat (cat) {
        try {
            const byCat = await this.coleccion.find({category:cat})
            return asDto(byCat) 
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

    async putProductById (title, description, price, thumbnail, category, id) {
        try {
            const timestampNow = Date.now()
            const productPut = await this.coleccion.updateOne({_id: id}, {$set: {title: title, description: description, price: price, thumbnail: thumbnail, category: category, timestamp: timestampNow}})                
            return asDto(productPut)
        } catch (error) {
            logger.error(error)
        }
    }
}

export default ContenedorMongoDb