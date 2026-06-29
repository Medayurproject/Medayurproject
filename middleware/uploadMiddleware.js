const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload Folder
const uploadPath = path.join(__dirname, "..", "images", "products");

// Create folder if not exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname).toLowerCase();

    cb(null, uniqueName);

  }

});

const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
  ];

  if (allowedTypes.includes(file.mimetype)) {

    cb(null, true);

  } else {

    cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed."));

  }

};

const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize: 5 * 1024 * 1024 // 5MB

  }

});

module.exports = upload;