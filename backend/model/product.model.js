const mongoose = require("mongoose")

const productschema = mongoose.Schema({
    productname:{type:String,trim:true,required:true},
    stock:{type:Number,trim:true,required:true , default:0},
    productprice:{type:Number, required:true,default:0},
    productimage:{type:String,required:true},
    productdescription:{type:String,required:true}
},{timestamps:true})

const productmodel = mongoose.model("products", productschema)

module.exports = productmodel