const { _getproducts } = require('../services/db-module')
const Cart = require('./cart');


module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = "/images/book1.jpeg";
        this.description = description;
        this.price = price;
    }

    save() {

    }

    static deleteById(id) {
    }

    static async fetchAll(cb) {
        const productsData = await _getproducts();
        // console.log("productsData==>", productsData);
        return productsData;
    }

    static findById(id, cb) {
    }
};
