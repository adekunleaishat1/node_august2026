const express = require("express")
const app = express()
require("dotenv").config()
const connect = require("./database/db.connect")
const userrouter = require("./route/user.route")
const productrouter = require("./route/product.route")
const cors = require("cors")

// middlewares 
app.use(cors({origin:"*"}))
app.use(express.json())
app.use("/user", userrouter)
app.use("/product", productrouter)






connect()
const port = 8006
app.listen(port,()=>{
    console.log(`app started at port ${port}`);
    
})