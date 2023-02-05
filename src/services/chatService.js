import ChatDaoFactory from '../daos/ChatDaoFactory.js';
const historial = ChatDaoFactory.getDao();

async function postMsg (msg) {
    const addMsg = await historial.saveMsg(msg);
    return addMsg
}

async function getAllMsgs() {
    const allMsgs = await historial.getAll();
    return allMsgs
}

async function getMsgByEmail (email) {
    const msgByEmail = await historial.getByEmail(email);
    return msgByEmail
}

export {
    postMsg,
    getAllMsgs,
    getMsgByEmail
}