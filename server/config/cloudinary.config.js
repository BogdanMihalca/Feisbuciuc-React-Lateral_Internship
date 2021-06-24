const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "mihimbc",
  api_key: "556753941694113",
  api_secret: "WqV0GrOM2trjm8hbNQVYyfLOJvo",
});

const storage = new CloudinaryStorage({
  cloudinary,
});

module.exports = {
  cloudinary,
  storage,
};
