module.exports = async (app, prisma) => {
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

  app.post("/employees", async (req, res) => {
    try {
      const newEmployeeData = req.body;

      if (!newEmployeeData) {
        return res.status(400).json({ message: "Missing employee data" });
      }

      const insertedEmployee = await prisma.employees.create({
        data: newEmployeeData,
      });

      res.status(201).json(insertedEmployee); // Return the newly created employee
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/employees/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedEmployeeData = req.body;

      if (!updatedEmployeeData || Object.keys(updatedEmployeeData).length === 0) {
        return res
          .status(400)
          .json({ message: "Missing or empty employee data" });
      }

      const updatedEmployee = await prisma.employees.update({
        where: { id },
        data: updatedEmployeeData,
      });

      res
        .status(200)
        .json({ message: "Employee updated successfully", updatedEmployee });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/employees/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await prisma.employees.delete({
        where: { id },
      });

      res.json({ message: "Employee deleted successfully" }); // No content returned
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
