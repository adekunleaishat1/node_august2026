const mongoose = require("mongoose")


const chatschema = mongoose.Schema({
    title:{type:String,required:true,trim:true},
    content:{type:String,required:true,trim:true},
    sender:{type:mongoose.Schema.Types.ObjectId, ref:"user_collection"},
},{timestamps:true})

const chatmodel = mongoose.model("chatcollection",chatschema)

module.exports = chatmodel