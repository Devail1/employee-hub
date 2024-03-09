const extractPublicIdFromUrl = require("../utils");
const cld = require("../config/cloudinary");
const upload = require("../config/multer");

module.exports = async (app, prisma) => {
  // Get all Employees
  app.get("/employees", async (req, res) => {
    try {
      const employees = await prisma.employees.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.json(employees);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create new Employee
  app.post("/employees", async (req, res) => {
    try {
      const newEmployeeData = req.body;

      if (!newEmployeeData) {
        return res.status(400).json({ message: "Missing employee data" });
      }

      const insertedEmployee = await prisma.employees.create({
        data: newEmployeeData,
      });

      res.status(201).json(insertedEmployee);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update Employee
  app.put("/employees/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedEmployeeData = req.body;

      if (!updatedEmployeeData || Object.keys(updatedEmployeeData).length === 0) {
        return res.status(400).json({ message: "Missing or empty employee data" });
      }

      const updatedEmployee = await prisma.employees.update({
        where: { id },
        data: updatedEmployeeData,
      });

      res.status(200).json({ message: "Employee updated successfully", updatedEmployee });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Delete Employee
  app.delete("/employees/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      // Fetch employee data with image URL
      const employee = await prisma.employees.findUnique({
        where: { id },
        select: { imgUrl: true },
      });

      // Delete employee record from database
      await prisma.employees.delete({
        where: { id },
      });

      // Delete image from Cloudinary if it exists
      if (employee?.imgUrl) {
        const publicId = extractPublicIdFromUrl(employee.imgUrl);
        await cld.uploader.destroy(publicId);
      }

      res.json({ message: "Employee deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Upload image and update employee
  app.post("/employees/:id/image-upload", upload.single("image"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      // Check for file upload errors
      if (!req.file) {
        return res.status(400).json({ message: "No image file uploaded" });
      }

      const base64EncodedImage = Buffer.from(req.file.buffer).toString("base64");
      const dataUri = `data:${req.file.mimetype};base64,${base64EncodedImage}`;
      const result = await cld.uploader.upload(dataUri);
      const imageUrl = result.secure_url;

      // Fetch existing image URL
      const employee = await prisma.employees.findUnique({
        where: { id },
        select: { imgUrl: true },
      });
      const oldImageUrl = employee?.imgUrl;

      // Delete old image (if exists)
      if (oldImageUrl) {
        const publicId = extractPublicIdFromUrl(oldImageUrl);
        await cld.uploader.destroy(publicId);
      }

      // Update employee data
      await prisma.employees.update({
        where: { id },
        data: { imgUrl: imageUrl },
      });

      res.json({ message: "Image uploaded successfully!", imageUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
