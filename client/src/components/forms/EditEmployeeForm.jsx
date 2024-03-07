import React, { useState } from "react";
import PropTypes from "prop-types";
import { employeeStatuses } from "../../constants";
import Button from "../ui/Button";
import {
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../../store/services/employees";

const EditEmployeeForm = ({ onSubmit, initialValues: employee }) => {
  const [updateEmployee, { isLoading: isUpdateLoading }] =
    useUpdateEmployeeMutation();
  const [deleteEmployee, { isLoading: isDeleteLoading }] =
    useDeleteEmployeeMutation();

  const [username, setUsername] = useState(employee.username);
  const [status, setStatus] = useState(employee.status);

  const handleEditEmployee = async (e) => {
    e.preventDefault();
    const data = { username, status };
    try {
      await updateEmployee({ id: employee.id, data });
    } catch (err) {
      console.error("Error updating employee:", err);
    }

    if (onSubmit) onSubmit();
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      console.log("Employee deleted successfully!");
    } catch (err) {
      console.error("Error deleting employee:", err);
    }

    if (onSubmit) onSubmit();
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Edit Employee</h1>
        <p className="mt-4 text-gray-500">
          Edit an employee or remove it from the list
        </p>
      </div>

      <form
        onSubmit={handleEditEmployee}
        className="mx-auto mb-0 mt-6 max-w-md space-y-4"
      >
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 text-left"
          >
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
        </div>

        <div className="pb-2">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 text-left"
          >
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
        </div>
        <div className="flex justify-end items-center py-4 border-t gap-2 border-gray-200">
          <Button
            className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 "
            label="Delete"
            onClick={() => handleDeleteEmployee(employee.id)}
            isLoading={isDeleteLoading}
          />
          <Button
            className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5"
            type="submit"
            label="Save Changes"
            isLoading={isUpdateLoading}
          />
        </div>
      </form>
    </div>
  );
};

EditEmployeeForm.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    imgUrl: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func,
};

export default EditEmployeeForm;
