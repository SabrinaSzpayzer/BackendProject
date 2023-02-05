import {
    getAllOrders,
    getOrderById,
    deleteOrderById
} from '../services/ordenesService.js'

// Router orders

async function getAll (req, res) {
    const allOrders = await getAllOrders();
    res.json(allOrders)
}

async function getById (req, res) {
    const { id } = req.params;
    const orderById = await getOrderById(id);
    res.send(orderById);
}

async function deleteById (req, res) {
    const { id } = req.params;
    const deleteById = await deleteOrderById(id);
    res.send(deleteById);
}

export {
    getAll,
    getById,
    deleteById
}