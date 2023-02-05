import OrdenesDaoFactory from '../daos/OrdenesDaoFactory.js';
const order = OrdenesDaoFactory.getDao();

async function getAllOrders() {
    const allOrders = await order.getAll();
    return allOrders
}

async function getOrderById (id) {
    const orderById = await order.getById(id);
    return orderById
}

async function deleteOrderById (id) {
    const deleteOrderById = await order.deleteById(id);
    return deleteOrderById
}

export {
    getAllOrders,
    getOrderById,
    deleteOrderById
}