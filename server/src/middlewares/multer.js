const multer = require("multer");
const path  = require("path") 

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|gif/; 
  const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const isMimetypeValid = allowedTypes.test(file.mimetype);

  if (isValid && isMimetypeValid) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed."), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
});

const uploadSingle = upload.single("image"); 
const uploadMultiple = upload.array("images", 10); 


module.exports = { uploadSingle, uploadMultiple };