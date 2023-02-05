import CarritosDaoFactory from '../daos/CarritosDaoFactory.js';
const carrito = CarritosDaoFactory.getDao();

async function getAllCarritos() {
    const allCarritos = await carrito.getAll();
    return allCarritos
}

async function getCarritoById (id) {
    const CarritoById = await carrito.getById(id);
    return CarritoById
}

async function postCarrito (productos) {
    const addCarrito = await carrito.saveCarrito(productos);
    return addCarrito
}

async function updateCarritoById (id, productos) {
    const putCarrito = await carrito.updateCarrito(id, productos);
    return putCarrito
}

async function deleteProdCarrito (id, id_Prod) {
    const putCarrito = await carrito.deleteProdCarrito(id, id_Prod);
    return putCarrito
}

async function deleteCarritoById (id) {
    const deleteCarritoById = await carrito.deleteById(id);
    return deleteCarritoById
}

async function deleteAll () {
    const deleteAllProd = await carrito.deleteAll();
    return deleteAllProd
}

export {
    getAllCarritos,
    getCarritoById,
    postCarrito,
    updateCarritoById,
    deleteProdCarrito,
    deleteCarritoById,
    deleteAll
}