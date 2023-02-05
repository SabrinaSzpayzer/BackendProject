import OrdenesDaoMongoDb from './OrdenesDaoMongoDb.js';
import process from 'process';

const option = process.argv[2] || 'MONGODB';

let dao

switch (option) {
    case 'MONGODB':
        dao = new OrdenesDaoMongoDb();
        break;
    default:
        dao = new OrdenesDaoMongoDb();
}

export default class OrdenesDaoFactory {
    static getDao() {
        return dao;
    }
}