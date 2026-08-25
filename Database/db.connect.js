const mongoose = require("mongoose")

const Uri = process.env.MONGODB_URI

const connect = async() =>{
  try {
  const connection = await mongoose.connect(Uri) 
  // console.log(connection);
  if (connection) {
    console.log("database connected sucessfully");
  }
  
  } catch (error) {
    console.log(error);
    
  }
}


module.exports = connect