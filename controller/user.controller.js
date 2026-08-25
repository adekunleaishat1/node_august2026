const usermodel = require("../model/user.model")

const displayslashroute = (req, res) =>{
  return  res.send("Welcome to your node class")
}

const getuser = (req , res) =>{
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
}

const displaysignup = (req , res ) =>{
 res.render("signup")
}



module.exports = {getuser , displayslashroute, displaysignup}