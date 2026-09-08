const mongoose = require("mongoose")

const otpschema = mongoose.Schema({
    otp:{type:String,required:true},
    email:{type:String, unique:true}
})

const otpmodel = mongoose.model("otpcollection", otpschema)

module.exports = otpmodel