import {
    postMsg,
    getAllMsgs,
    getMsgByEmail
} from '../services/chatService.js'

// Router chat

async function post (req, res) {
    const msg = req.body;
    const addMsg = await postMsg(msg);
    res.send(addMsg);
}

async function getAll (req, res) {
    const allMsgs = await getAllMsgs();
    res.json(allMsgs)
}

async function getByEmail (req, res) {
    const { email } = req.params;
    const msgByEmail = await getMsgByEmail(email);
    res.send(msgByEmail);
}

export {
    getAll,
    getByEmail,
    post
}