// const users = ["john","nafisat", "itiayo", "itunu","muheez", "taiwo"]

// function adduser(user) {
//     users.push(user)
//     console.log(users);
    
// }

// adduser("eniola")

const express = require("express")
const app = express()
const ejs =require("ejs")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()


// CRUD CREATE READ UPDATE AND DELETE 
// QUERY CREATE - TO CREATE NEW DATA ON YOUR DATABASE
 // FINDONE - TO FIND ONE INFORMATION ON YOUR DATABASE BY PASSING A UNIQUE VALUE INSIDE THE FUNCTION
 // FIND - TO FIND MULTIPLE INFORMATION ON THE DATABASE , 
 // FINDBYID - TO FIND ONE INFORMATION ON THE DATABASE USING THE ID 

// middlewares
app.set("view engine", "ejs")
app.use(express.urlencoded())


const userschema = mongoose.Schema({
   username:{type:String,trim:true,required:true},
   email:{type:String,trim:true ,unique:true,required:true},
   password:{type:String,trim:true,required:true}
})

const usermodel = mongoose.model("user_collection", userschema)

const gender = "male"
const users = []
let username = ""
app.get("/",(request, response)=>{
  response.send("Welcome to your node class")
})
app.get("/home",(req , res)=>{
   res.render("index",{gender})
})

app.get("/user",(req, res)=>{
//    res.send("This is shola")
res.json({
    user:[
        {name:"John", class:"Nodejs",favouritefood:"rice"},
        {name:"Taiwo", class:"Nodejs",favouritefood:"friedrice"},
        {name:"Daniel", class:"Nodejs",favouritefood:"Eba"},
        {name:"Nafisat", class:"Nodejs",favouritefood:"Yam and Egg"},
        {name:"Itiayo", class:"Nodejs",favouritefood:"Semo and efo"},
        {name:"Itunu", class:"Nodejs",favouritefood:"Jollofrice"},
        {name:"Muiz", class:"Nodejs",favouritefood:"Eba and drawsoup"},
        {name:"Sheriff", class:"Nodejs",favouritefood:"Amala and ewedu"},
        {name:"Habib", class:"Nodejs",favouritefood:"Breada and beans"},
    ]
})
})

app.get("/signup",(req , res)=>{
    res.render("signup")
})

app.get("/login",(req, res)=>{
   res.render("login")
})

app.get("/dashboard",(req , res)=>{
   res.render("dashboard", {username})
})


app.post("/user/signup", async(req, res)=>{
  try {
    const newuser =  await usermodel.create(req.body)
    console.log(newuser);
    if (newuser) {
      res.redirect("/login")
    }
  } catch (error) {
    console.log(error);
    if (error.message.includes("E11000 duplicate key error collection")) {
      return res.send("User already exist")
    }
    if (error.message.includes("user_collection validation failed")) {
      return res.send("All fields are mandatory")
    }
     res.send(error.message)
  }
})

app.post("/user/login",(req , res)=>{
    console.log(req.body);
    const {email , password} = req.body
    if (!email || !password) {
      return res.send("All fields are mandatory")
    }
  const existuser = users.find((user)=> user.email == email)
  console.log(existuser);
  if (existuser  && existuser.password == password) {
    username = existuser.username
   return res.redirect("/dashboard")
  }
  return res.send("invalid email or password") 
})


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
connect()

const port = 8006

app.listen(port,()=>{
 console.log(`app started at port ${port}`);
 
})
