const express = require("express")

const userrouter = express.Router()
const {Signup, login,verifyEmail,Verifytoken} = require("../controller/user.controller")

userrouter.post("/signup", Signup)
userrouter.post("/login", login)
userrouter.post("/verify", verifyEmail)
userrouter.get("/verifytoken", Verifytoken)


module.exports = userrouter