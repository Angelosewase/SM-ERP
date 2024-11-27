const cloudinary = require("cloudinary").v2
const fs = require("fs")

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,       
  api_secret: process.env.API_SECRET, 
});

const uploadToCloudinary = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) {
        return reject(error);
      }
      fs.unlinkSync(filePath);
      resolve(result);
    });
  });
};

module.exports =  { uploadToCloudinary, cloudinary };
