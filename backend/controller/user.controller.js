const usermodel = require("../model/user.model")
const bcryptjs = require("bcryptjs")
const sendemailverificationmail = require("../utils/emailVerification")

const Signup =async (req, res) =>{
    try {
        console.log(req.body);
        const {username , email , password} = req.body
        if (!username || !email || !password) {
         return res.status(400).json({message:"All fields are mandatory", status:false})
        }
       const hashedPassword =  await bcryptjs.hash(password, 10)
       console.log(hashedPassword);
       
      const newUser =  await usermodel.create({
        ...req.body,
        password:hashedPassword
      })
      if (newUser) {
       const sentmail =  await sendemailverificationmail(email , username)
       console.log(sentmail);
       
         return res.status(200).json({message:"Signup successful", status:true})
        
      }
    } catch (error) {
       console.log(error);
       if (error.message.includes("E11000 duplicate key error collection")) {
          return res.status(400).json({message:"user already exist", status:false})
       }
      return res.status(500).json({message:error.message, status:false})
    }
}


const login = async (req , res) =>{
  try {
    const {email, password} = req.body
     if (!email || !password) {
         return res.status(400).json({message:"All fields are mandatory", status:false})
     }
    const existuser = await usermodel.findOne({email})
     
    if (existuser) {

     const correctPassword = await bcryptjs.compare(password, existuser.password)

     if (correctPassword) {
      if (existuser.verified) {
         return res.status(200).json({message:"login successful", status:true})
      }
      return res.status(400).json({message:"email is not verified, check your mail.", status:false})
     }

      return res.status(404).json({message:"user not found", status:false})
    }
      return res.status(404).json({message:"user not found", status:false})
  } catch (error) {
      return res.status(500).json({message:error.message, status:false})
  }
}




module.exports = {Signup, login}