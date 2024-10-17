import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "your_cloud_name",
  api_key: "your_api_key",       
  api_secret: "your_api_secret", 
});

const uploadToCloudinary = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(filePath, (error, result) => {
      if (error) {
        return reject(error);
      }
      fs.unlinkSync(filePath);
      resolve(result);
    });
  });
};

export { uploadToCloudinary };
