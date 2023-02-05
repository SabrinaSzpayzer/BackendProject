import ChatDaoMongoDb from './ChatDaoMongoDb.js';
import process from 'process';

const option = process.argv[2] || 'MONGODB';

let dao

switch (option) {
    case 'MONGODB':
        dao = new ChatDaoMongoDb();
        break;
    default:
        dao = new ChatDaoMongoDb();
}

export default class ChatDaoFactory {
    static getDao() {
        return dao;
    }
}