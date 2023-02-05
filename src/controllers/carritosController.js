import {
    getAllCarritos,
    getCarritoById,
    postCarrito,
    updateCarritoById,
    deleteProdCarrito,
    deleteCarritoById,
    deleteAll
} from '../services/carritosService.js'

import {
    getAllProducts
} from '../services/productsService.js'

// Router carritos

async function getAll (req, res) {
    const allCarritos = await getAllCarritos();
    res.json(allCarritos);
}

async function getById (req, res) {
    const { id } = req.params;
    const carritoById = await getCarritoById(id);
    res.send(carritoById);
}

async function getProdsCarrito (req, res) {
    const { id } = req.params;
    const carritoById = await getCarritoById(id);
    const productosIdCarrito = carritoById.productos;
    res.send(productosIdCarrito);
}

async function post (req, res) {
    const productos = req.body;
    const addCarrito = await postCarrito(productos);
    res.json(addCarrito);
}

async function updateCById (req, res) {
    const { id } = req.params;   
    const newProductId = req.body;
    const allProducts = await getAllProducts();
    let newProduct = allProducts.filter(prods => prods._id == newProductId._id)
    const timestampNow = Date.now()
    await updateCarritoById(id, {title: newProduct[0].title, description: newProduct[0].description, price: newProduct[0].price, thumbnail: newProduct[0].thumbnail, category: newProduct[0].category, _id: newProductId._id, timestamp: timestampNow})
    res.send("Producto agregado al carrito");
}

async function deleteProdC (req, res) {
    const { id, id_Prod } = req.params;
    const deleteProd = await deleteProdCarrito(id, id_Prod);
    res.send(deleteProd);
}

async function deleteById (req, res) {
    const { id } = req.params;
    const deleteById = await deleteCarritoById(id);
    res.send(deleteById);
}

async function deleteAllC (req, res) {
    const deleteAllProd = await deleteAll();
    res.send(deleteAllProd)
}

export {
    getAll,
    getById,
    getProdsCarrito,
    post,
    updateCById,
    deleteProdC,
    deleteById,
    deleteAllC
}