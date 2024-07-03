const dbConnection = require("../util/dbconnection");

async function _getproducts() {
    try {
        const empData = await dbConnection.any('SELECT * FROM products');
        // console.log("empData==>", empData);
        return empData;
    } catch (error) {
        Promise.reject(error);
    }
}

async function _addProduct({ title, imageUrl, description, price }) {
    try {
        await dbConnection.any('INSERT INTO products (title, "imgUrl", description, price) VALUES ($1,$2,$3,$4)', [title, imageUrl, description, price]);
        return ({ msg: "Employee Updated" });
    } catch (error) {
        Promise.reject(error);
    }
}

async function _productById(id) {
    try {
        const productData = await dbConnection.any('SELECT * FROM products WHERE id = $1', [id])
        return productData;
    } catch (error) {
        Promise.reject(error);
    }
}

module.exports = {
    _getproducts,
    _addProduct,
    _productById
}