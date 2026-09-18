const productmodel = require("../model/product.model")
const cloudinary = require("../utils/Cloudinary")

const addProduct = async (req , res) =>{
  try {
    const {productname, productprice, productdescription, productimage,stock} = req.body

    if (!productname || !productprice || !productdescription || !productimage || !stock) {
       return res.status(400).json({message:"All field are mandatory",status:false})
    }
   const uploadedimage = await cloudinary.uploader.upload(productimage, {folder:"products"})
   console.log(uploadedimage);
   const newProduct = await productmodel.create({...req.body,productimage:uploadedimage.secure_url})
   if (newProduct) {
       return res.status(200).json({message:"created product",status:true})
   }
  } catch (error) {
    console.log(error);
       return res.status(500).json({message:error.message,status:false})
  }
}

const getallproduct = async (req, res) =>{
  try {
    const {page, limit } = req.query
  //  console.log(page , limit);
   
   const skip = (parseInt(page) - 1 ) * limit
   console.log(skip);
   
   const allproduct = await productmodel.find().skip(skip).limit(limit)
   console.log(allproduct);
   
  } catch (error) {
    console.log(error);
    
  }
}

module.exports = {addProduct,getallproduct}