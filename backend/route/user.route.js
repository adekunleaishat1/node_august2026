const express = require("express")

const userrouter = express.Router()
const {Signup, login,verifyEmail,Verifytoken, ProfileUpload} = require("../controller/user.controller")
const Authverify = require("../middlewares/Authmiddleware")

userrouter.post("/signup", Signup)
userrouter.post("/login", login)
userrouter.post("/verify", verifyEmail)
userrouter.get("/verifytoken", Verifytoken)
userrouter.patch("/upload/image", Authverify, ProfileUpload)


module.exports = userrouter