module.exports = (app, supabase) => {
  app.get("/employees", async (req, res) => {
    try {
      let { data: employees, error } = await supabase
        .from("employees")
        .select("*")
        .order("createdAt", { ascending: false });

      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching employees" });
      }

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

      let { data: insertedEmployee, error } = await supabase
        .from("employees")
        .insert(newEmployeeData);
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating employee" });
      }

      res.status(201).json(insertedEmployee); // Return the newly created employee
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/employees/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updatedEmployeeData = req.body;
      // Check if request body is empty and return an error if so
      if (!updatedEmployeeData || Object.keys(updatedEmployeeData).length === 0) {
        return res
          .status(400)
          .json({ message: "Missing or empty employee data" });
      }

      if (!id || isNaN(id)) {
        return res.status(400).json({ message: "Invalid employee ID" });
      }

      let { data: updatedEmployee, error } = await supabase
        .from("employees")
        .update(updatedEmployeeData)
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating employee" });
      }

      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.status(200).json({ message: "Employee updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/employees/:id", async (req, res) => {
    try {
      const id = req.params.id;
      let { data: deletedEmployee, error } = await supabase
        .from("employees")
        .delete()
        .eq("id", id);

      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting employee" });
      }

      res.json({ message: "Employee deleted successfully" }); // No content returned
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
