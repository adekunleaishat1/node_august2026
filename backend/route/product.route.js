const express = require("express")
const productrouter = express.Router()
const {addProduct, getallproduct} = require("../controller/product.controller")

productrouter.post("/addproduct", addProduct)
productrouter.get("/fetch/product", getallproduct)


module.exports = productrouter