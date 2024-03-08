const multer = require("multer");

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  limits: { fileSize: 1024 * 1024 }, // Limit file size to 1MB
});

const multerUpload = multer({ storage: storage });

module.exports = multerUpload;
