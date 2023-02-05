import ProductosDaoFactory from '../daos/ProductosDaoFactory.js';
const product = ProductosDaoFactory.getDao();

async function getAllProducts() {
    const allProducts = await product.getAll();
    return allProducts
}

async function getProductById (id) {
    const productById = await product.getById(id);
    return productById
}

async function getProductByCat (cat) {
    const productByCat = await product.getByCat(cat);
    return productByCat
}

async function postProduct (title, description, price, thumbnail, category) {
    const addProduct = await product.saveProduct(title, description, price, thumbnail, category);
    return addProduct
}

async function putProductById (title, description, price, thumbnail, category, id) {
    const putProduct = await product.putProductById(title, description, price, thumbnail, category, id);
    return putProduct
}

async function deleteProductById (id) {
    const deleteProductById = await product.deleteById(id);
    return deleteProductById
}

async function deleteAll () {
    const deleteAllProd = await product.deleteAll();
    return deleteAllProd
}

export {
    getAllProducts,
    getProductById,
    getProductByCat,
    postProduct,
    putProductById,
    deleteProductById,
    deleteAll
}