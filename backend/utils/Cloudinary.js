const cloudinary = require("cloudinary").v2

  // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUDNAME, 
        api_key:process.env.CLOUDINARY_APIKEY , 
        api_secret: process.env.CLOUDINARY_APISECRET // Click 'View API Keys' above to copy your API secret
    });

    module.exports = cloudinary