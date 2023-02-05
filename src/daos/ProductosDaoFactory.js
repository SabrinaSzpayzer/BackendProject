import ProductosDaoMongoDb from './ProductosDaoMongoDb.js';
import process from 'process';

const option = process.argv[2] || 'MONGODB';

let dao

switch (option) {
    case 'MONGODB':
        dao = new ProductosDaoMongoDb();
        break;
    default:
        dao = new ProductosDaoMongoDb();
}

export default class ProductosDaoFactory {
    static getDao() {
        return dao;
    }
}