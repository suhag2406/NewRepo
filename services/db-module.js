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

module.exports = {
    _getproducts
}