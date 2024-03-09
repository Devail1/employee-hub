import React, { useState } from "react";
import { useGetAllEmployeesQuery } from "@/store/services/employees";
import EmployeeCard from "./EmployeeCard";
import Modal from "./ui/Modal";
import AddEmployeeForm from "./forms/AddEmployeeForm";
import Spinner from "./ui/Spinner";
import Button from "./ui/Button";
import Error from "./Error";

const EmployeesList = () => {
  const { data: employees, isLoading, error } = useGetAllEmployeesQuery();

  const [isOpen, setIsOpen] = useState(false);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner size="lg" />
      </div>
    );

  if (error) return <Error message={error.data?.message} />;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      {isOpen && (
        <Modal onClose={closeModal}>
          <AddEmployeeForm onSubmit={closeModal} />
        </Modal>
      )}
      <Button
        className="max-w-xs mb-8 group flex items-center justify-between gap-4 rounded-lg border border-indigo-400 bg-white hover:shadow-md border-current px-5 py-3 text-indigo-500 transition-colors hover:bg-indigo-400 focus:outline-none active:bg-indigo-500"
        onClick={openModal}
        label="New Employee"
        iconSize="lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full group-hover:stroke-white transition-colors"
        >
          <path d="M2 21a8 8 0 0 1 13.292-6" />
          <circle cx="10" cy="8" r="5" />
          <path d="M19 16v6" />
          <path d="M22 19h-6" />
        </svg>
      </Button>
      {employees?.length === 0 && <p className="text-center">No employees found</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
        {employees?.map((employee) => (
          <EmployeeCard key={employee.id} {...employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeesList;
