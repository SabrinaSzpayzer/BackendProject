import express from 'express';
import { Router } from 'express';

import {
    getAll,
    getByEmail,
    post
} from '../controllers/chatController.js'

const routerChat = new Router();
routerChat.use(express.json());
routerChat.use(express.urlencoded({ extended: true }));

// Router Chat

routerChat.get('/', getAll)

routerChat.get('/:email', getByEmail)

routerChat.post('/', post)

export default routerChat