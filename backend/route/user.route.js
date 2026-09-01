const express = require("express")

const userrouter = express.Router()
const {Signup, login} = require("../controller/user.controller")

userrouter.post("/signup", Signup)
userrouter.post("/login", login)


module.exports = userrouter