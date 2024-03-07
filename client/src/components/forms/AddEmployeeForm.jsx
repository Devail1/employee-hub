import React, { useState } from "react";
import PropTypes from "prop-types";
import { employeeStatuses } from "../../constants";

const AddEmployeeForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("working"); // Default status

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const data = { username, status };
    onSubmit(data);
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Add Employee</h1>
        <p className="mt-4 text-gray-500">Add a new employee to the system</p>
      </div>

      <form
        onSubmit={handleAddEmployee}
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
        <div className="flex justify-end items-center py-4 border-t border-gray-200">
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

AddEmployeeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddEmployeeForm;
