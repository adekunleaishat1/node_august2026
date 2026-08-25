const mongoose = require("mongoose")


const todoschema = mongoose.Schema({
  title:{type:String, trim:true, required:true},
  description:{type :String, trim:true, required:true},
  completed:{type:Boolean, default:false},
  user:{type:String, required:true}
})

 const todomodel = mongoose.model("todos", todoschema)


 module.exports = todomodel