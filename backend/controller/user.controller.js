const usermodel = require("../model/user.model")
const bcryptjs = require("bcryptjs")
const sendemailverificationmail = require("../utils/emailVerification")
const generateOtp = require("../utils/Otp-generator")
const otpmodel = require("../model/otp.model")
const jwt = require("jsonwebtoken")
const cloudinary = require('../utils/Cloudinary')

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
           const verificationotp = generateOtp()
           await otpmodel.create({otp:verificationotp, email})
       const sentmail =  await sendemailverificationmail(email , username, verificationotp)
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
        const token = await jwt.sign({email},process.env.JWT_SECERETKEY , {expiresIn:600})

         return res.status(200).json({message:"login successful",token, status:true})
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

const verifyEmail = async(req ,res) =>{
  try {
    const {otp} = req.body

    if (!otp) {
        return res.status(400).json({message:"All fields are mandatory", status:false})
    }
  const existotp =  await otpmodel.findOne({otp})
  console.log(existotp);
    if (existotp) {
      const verifieduser =   await usermodel.findOneAndUpdate(
        {email:existotp.email},
        {verified:true},
        {new:true}
      )

      console.log(verifieduser);
      if (verifieduser) {
        await otpmodel.findByIdAndDelete(existotp._id)
         return res.status(200).json({message:"email verified", status:true})
      }

    }
  } catch (error) {
    console.log(error);
      return res.status(500).json({message:error.message, status:false})
  }
}

const Verifytoken = async (req , res) =>{
 try {
  const token = req.headers.authorization.split(" ")[1]
  console.log(token);
  if (!token) {
        return res.status(400).json({message:"invalid token", status:false})
  }
  const verifiedToken = await jwt.verify(token, process.env.JWT_SECERETKEY)
  console.log(verifiedToken);
  if (verifiedToken) {
    const currentUser = await usermodel.findOne({email:verifiedToken.email}).select("username email _id")
        return res.status(200).json({message:"token verified", currentUser, status:true})
  }
 } catch (error) {
  console.log(error);
  if (error.message.includes("buffering timed out")) {
      return res.status(500).json({message:"Network Error", status:false})
  }
    return res.status(500).json({message:error.message, status:false})
 }
}

const ProfileUpload = async (req , res) =>{
  try {
    const {image} = req.body
    console.log(req.user);
    const email = req.user
    if (!image) {
        return res.status(400).json({message:"image is empty", status:false})
    }
    const uploadedimage =   await cloudinary.uploader.upload(image)
    console.log(uploadedimage);
  const uploadeddata =   await usermodel.findOneAndUpdate(
      {email},
      {profilepicture:uploadedimage.secure_url},
      {new:true}
     )
     console.log(uploadeddata);
        return res.status(200).json({message:"profile update successful" , status:true})
     
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:error.message, status:false})
    
  }
}

module.exports = {Signup, login, verifyEmail,Verifytoken, ProfileUpload}