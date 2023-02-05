import express from 'express';
import { Router } from 'express';

import {
    getAll,
    getById,
    deleteById
} from '../controllers/ordenesController.js'

const routerOrders = new Router();
routerOrders.use(express.json());
routerOrders.use(express.urlencoded({ extended: true }));

// Router Orders

routerOrders.get('/', getAll)

routerOrders.get('/:id', getById)

routerOrders.delete('/:id', deleteById)

export default routerOrders