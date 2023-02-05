import CarritosDaoMongoDb from './CarritosDaoMongoDb.js';
import process from 'process';

const option = process.argv[2] || 'MONGODB';

let dao

switch (option) {
    case 'MONGODB':
        dao = new CarritosDaoMongoDb();
        break;
    default:
        dao = new CarritosDaoMongoDb();
}

export default class CarritosDaoFactory {
    static getDao() {
        return dao;
    }
}