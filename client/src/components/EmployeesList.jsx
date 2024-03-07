import React, { useState } from "react";
import {
  useCreateEmployeeMutation,
  useGetAllEmployeesQuery,
} from "../store/services/employees";
import EmployeeCard from "./EmployeeCard";
import Modal from "./ui/Modal";
import Spinner from "./ui/Spinner";
import AddEmployeeForm from "./forms/AddEmployeeForm";
import AddIcon from "./icons/AddIcon";

export default function EmployeesList() {
  const { data, isLoading, error, refetch } = useGetAllEmployeesQuery();
  const [createEmployee] = useCreateEmployeeMutation(); // Destructure the mutation and its functions

  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) return <Spinner />;
  if (error) return <p>Error fetching employees: {error.message}</p>;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const confirmAction = async (data) => {
    try {
      await createEmployee(data);
      console.log("Employee created successfully!");
      refetch();
      closeModal();
    } catch (err) {
      console.error("Error creating employee:", err);
    }
  };

  return (
    <div>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <AddEmployeeForm onSubmit={confirmAction} />
        </Modal>
      )}
      <button
        className="max-w-xs mb-4 group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-indigo-600 transition-colors hover:bg-indigo-600 focus:outline-none focus:ring active:bg-indigo-500"
        onClick={openModal}
      >
        <span className="font-medium transition-colors group-hover:text-white">
          Add
        </span>

        <span className="shrink-0 rounded-full border border-indigo-600 bg-white p-2 group-active:border-indigo-500">
          <AddIcon />
        </span>
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((employee) => (
          <EmployeeCard
            key={employee.id}
            id={employee.id}
            username={employee.username}
            status={employee.status}
          />
        ))}
      </div>
    </div>
  );
}
