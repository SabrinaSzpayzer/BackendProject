import {
    getAllProducts,
    getProductById,
    getProductByCat,
    postProduct,
    putProductById,
    deleteProductById,
    deleteAll
} from '../services/productsService.js'

// Router products

async function getAll (req, res) {
    const allProducts = await getAllProducts();
    res.json(allProducts)
}

async function getById (req, res) {
    const { id } = req.params;
    const productById = await getProductById(id);
    res.send(productById);
}

async function getByCat (req, res) {
    const { category } = req.params;
    const productByCat = await getProductByCat(category);
    res.send(productByCat);
}

async function post (req, res) {
    const newProduct = req.body;
    const addProduct = await postProduct(newProduct.title, newProduct.description, newProduct.price, newProduct.thumbnail, newProduct.category);
    res.send(newProduct);
}

async function putById (req, res) {
    const { id } = req.params;
    const updatedProduct = req.body;
    const putProduct = await putProductById(updatedProduct.title, updatedProduct.description, updatedProduct.price, updatedProduct.thumbnail, updatedProduct.category, id);
    res.send(updatedProduct);
}

async function deleteById (req, res) {
    const { id } = req.params;
    const deleteById = await deleteProductById(id);
    res.send(deleteById);
}

async function deleteAllP (req, res) {
    const deleteAllProd = await deleteAll();
    res.send(deleteAllProd)
}

export {
    getAll,
    getById,
    getByCat,
    post,
    putById,
    deleteById,
    deleteAllP
}