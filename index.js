const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();

const cloudinary = require("cloudinary");

const multer = require("multer");

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  limits: { fileSize: 1024 * 1024 }, // Limit file size to 1MB
});
const upload = multer({ storage: storage });

// Cloudinary config
const cld = cloudinary.v2;
cld.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const prisma = new PrismaClient();

app.use(cors({ origin: process.env.DOMAIN_URL }));
app.use(express.json());

require("./routes/employees")(app, prisma);

app.post("/employees/:id/image-upload", upload.single("image"), async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Check for file upload errors
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    let imageUrl;

    if (req.file) {
      const base64EncodedImage = Buffer.from(req.file.buffer).toString("base64");
      const dataUri = `data:${req.file.mimetype};base64,${base64EncodedImage}`;
      const result = await cloudinary.v2.uploader.upload(dataUri, {
        // Optional Cloudinary upload options
      });
      imageUrl = result.secure_url;
    }

    // Update employee data (optional)
    if (imageUrl) {
      await prisma.employees.update({
        where: { id },
        data: { imgUrl: imageUrl },
      });
      res.json({ message: "Image uploaded and employee data updated!", imageUrl });
    } else {
      res.json({ message: "Image uploaded successfully!", imageUrl });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
