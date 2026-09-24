const express = require("express")
const app = express()
require("dotenv").config()
const connect = require("./database/db.connect")
const userrouter = require("./route/user.route")
const productrouter = require("./route/product.route")
const cors = require("cors")
const socket = require("socket.io")
const chatmodel = require("./model/chat.model")

// middlewares 
app.use(cors({origin:"*"}))
app.use(express.json())
app.use("/user", userrouter)
app.use("/product", productrouter)






connect()
const port = 8006
const connection = app.listen(port,()=>{
    console.log(`app started at port ${port}`);
    
})

const io = socket(connection,{
    cors:{
        origin:"*"
    }
})

io.on("connection",async(socket)=>{
    console.log("a user connected");
    const allmessage = await chatmodel.find().populate("sender" ,"username")
    socket.emit("sendallmessage" , allmessage)

    socket.on("sendchat", async (message)=>{
        console.log(message);
      const newchat =   await chatmodel.create(message)
        socket.emit("resend", newchat)
    })
})