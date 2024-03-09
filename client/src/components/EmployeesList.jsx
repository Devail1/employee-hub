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

  const [showCreateModal, setShowCreateModal] = useState(false);

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );

  if (error) return <Error message={error.data?.message} />;

  const openModal = () => setShowCreateModal(true);
  const closeModal = () => setShowCreateModal(false);

  return (
    <div>
      {showCreateModal && (
        <Modal onClose={closeModal}>
          <AddEmployeeForm onSubmit={closeModal} />
        </Modal>
      )}
      <Button
        className="group mb-8 flex max-w-xs items-center justify-between gap-4 rounded-lg border border-current border-indigo-400 bg-white px-5 py-3 text-indigo-500 transition-colors hover:bg-indigo-400 hover:shadow-md focus:outline-none active:bg-indigo-500"
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
          className="w-full transition-colors group-hover:stroke-white"
        >
          <path d="M2 21a8 8 0 0 1 13.292-6" />
          <circle cx="10" cy="8" r="5" />
          <path d="M19 16v6" />
          <path d="M22 19h-6" />
        </svg>
      </Button>
      {employees?.length === 0 && (
        <p className="text-center">No employees found</p>
      )}
      <div className="grid grid-cols-1 gap-4 pb-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {employees?.map((employee) => (
          <EmployeeCard key={employee.id} {...employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeesList;
