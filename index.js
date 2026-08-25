

const express = require("express")
const app = express()
const ejs =require("ejs")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const connect = require("./Database/db.connect")
const {displayslashroute, getuser, displaysignup} = require("./controller/user.controller")


// CRUD CREATE READ UPDATE AND DELETE 
// QUERY CREATE - TO CREATE NEW DATA ON YOUR DATABASE
 // FINDONE - TO FIND ONE INFORMATION ON YOUR DATABASE BY PASSING A UNIQUE VALUE INSIDE THE FUNCTION
 // FIND - TO FIND MULTIPLE INFORMATION ON THE DATABASE , 
 // FINDBYID - TO FIND ONE INFORMATION ON THE DATABASE USING THE ID 

// middlewares
app.set("view engine", "ejs")
app.use(express.urlencoded())




const gender = "male"
const users = []
let username = ""

app.get("/", displayslashroute)

app.get("/home",(req , res)=>{
   res.render("index",{gender})
})

app.get("/user", getuser)

app.get("/signup",displaysignup)

app.get("/login",(req, res)=>{
   res.render("login")
})

app.get("/dashboard",async(req , res)=>{
try {
    const alltodo = await todomodel.find()
    console.log(alltodo);
    
   res.render("dashboard", {username, alltodo})
} catch (error) {
  if (error) {
    return res.send("An error occured")
  }
}
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

app.post("/user/login", async(req , res)=>{

  try {
      console.log(req.body);
    const {email , password} = req.body
    if (!email || !password) {
      return res.send("All fields are mandatory")
    }
   const existuser = await usermodel.findOne({email})
   if (existuser && existuser.password == password) {
     username = existuser.username
    return res.redirect("/dashboard")
   }
   return res.send("Invalid email or password")
  } catch (error) {
     console.log(error);
     
  }
  
  // const existuser = users.find((user)=> user.email == email)
  // console.log(existuser);
  // if (existuser  && existuser.password == password) {
  //   username = existuser.username
  //  return res.redirect("/dashboard")
  // }
  // return res.send("invalid email or password") 
})

app.post("/addtodo/:username", async(req , res)=>{
try {
  console.log(req.body);
  console.log(req.params);
  const {username} = req.params
const newtodo =  await todomodel.create({...req.body , user:username})
console.log(newtodo);
if (newtodo) {
 return res.redirect("/dashboard")
}
} catch (error) {
  console.log(error);
  
}
})

app.post("/deletetodo/:id", async(req ,res)=>{
   try {
      console.log(req.params);
      const {id} = req.params
    
    const deletedtodo =  await todomodel.findByIdAndDelete(id)
    if (deletedtodo) {
      return res.redirect("/dashboard")
    }
   } catch (error) {
    console.log(error);
    
   }
})

app.post("/completetodo/:id",async(req ,res)=>{
  try {
    const {id} = req.params
    console.log(req.body);
    
    const { completed } = req.body

   const updatedtodo =  await todomodel.findByIdAndUpdate(id,
    {completed:!completed},
    {new:true}
   )
   if (updatedtodo) {
    res.redirect("/dashboard")
   }
   
  } catch (error) {
    console.log(error);
    
  }
})

app.get("/edittodo/:id", async(req , res)=>{
  try {
      console.log(req.params);
    const {id} = req.params
    const onetodo =  await todomodel.findById(id)
    console.log(onetodo);
    if (onetodo) {
      res.render("edit",{onetodo})
    }
   
  } catch (error) {
    console.log(error);
    
  }
})

app.post("/updatetodo/:id",async(req ,res)=>{
  try {
    console.log(req.body);
    const {title , description} = req.body
    const {id} = req.params
  const updatetodo =  await todomodel.findByIdAndUpdate(
      id,
      {title, description},
      {new:true}
    )
    console.log(updatetodo);
    if (updatetodo) {
      res.redirect("/dashboard")
    }
    
  } catch (error) {
    console.log(error);
    
  }
})





connect()
const port = 8006

app.listen(port,()=>{
 console.log(`app started at port ${port}`);
})
