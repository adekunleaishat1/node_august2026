const express = require("express")
const productrouter = express.Router()
const {addProduct} = require("../controller/product.controller")

productrouter.post("/addproduct", addProduct)


module.exports = productrouter