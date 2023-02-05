import express from 'express';
import { Router } from 'express';

import {
    getAll,
    getById,
    getProdsCarrito,
    post,
    updateCById,
    deleteProdC,
    deleteById,
    deleteAllC
} from '../controllers/carritosController.js'

const routerCarritos = new Router();
routerCarritos.use(express.json());
routerCarritos.use(express.urlencoded({ extended: true }));

// Router products

routerCarritos.get('/', getAll)

routerCarritos.get('/:id', getById)

routerCarritos.get('/:id/productos', getProdsCarrito)

routerCarritos.post('/', post)

routerCarritos.post('/:id/productos', updateCById)

routerCarritos.delete('/:id/productos/:id_Prod', deleteProdC)

routerCarritos.delete('/:id', deleteById)

routerCarritos.delete('/', deleteAllC)

export default routerCarritos