const mongoose = require("mongoose")

const userschema = mongoose.Schema({
   username:{type:String,trim:true,required:true},
   email:{type:String,trim:true ,unique:true,required:true},
   password:{type:String,trim:true,required:true},
   verified:{type:Boolean, default:false}
})

const usermodel = mongoose.model("user_collection", userschema)

module.exports = usermodel