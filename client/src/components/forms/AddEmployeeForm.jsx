import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { employeeStatuses } from "@/constants";
import { useCreateEmployeeMutation } from "@/store/services/employees";
import Button from "@/components/ui/Button";

const AddEmployeeForm = ({ onSubmit }) => {
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("working");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username, status };

    try {
      toast.promise(createEmployee(data).unwrap(), {
        loading: "Creating employee...",
        success: "Employee created successfully!",
        error: (error) => `Error creating employee: ${error.data?.message || error}`,
      });

      if (onSubmit) onSubmit();
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Add Employee</h1>
        <p className="mt-4 text-gray-600">Add a new employee to the system</p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-6 max-w-md space-y-2">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 text-left">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="w-full rounded-lg  border-gray-200 p-4 pe-12 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="status" className="block text-sm font-medium text-gray-700 text-left">
          Status
        </label>
        <select
          id="status"
          name="status"
          className="w-full rounded-lg border-gray-200 h-10 px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          {employeeStatuses.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="flex justify-end items-center py-4 border-t border-gray-200">
          <Button
            className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            label="Confirm"
            type="submit"
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

AddEmployeeForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddEmployeeForm;
