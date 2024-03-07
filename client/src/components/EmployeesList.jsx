import React, { useState } from "react";
import { useGetAllEmployeesQuery } from "../store/services/employees";
import EmployeeCard from "./EmployeeCard";
import Modal from "./ui/Modal";
import AddEmployeeForm from "./forms/AddEmployeeForm";
import AddIcon from "./icons/AddIcon";
import Spinner from "./ui/Spinner";
import Button from "./ui/Button";

const EmployeesList = () => {
  const { data: employees, isLoading, error } = useGetAllEmployeesQuery();

  const [isOpen, setIsOpen] = useState(false);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner sizeClass="w-12 h-12" />
      </div>
    );

  if (error) return <p>{error.data?.message || "Something went wrong"}</p>;

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
        className="max-w-xs mb-8 group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-indigo-600 transition-colors hover:bg-indigo-600 focus:outline-none focus:ring active:bg-indigo-500"
        onClick={openModal}
        label="Add"
        icon={
          <AddIcon className="shrink-0 rounded-full border border-indigo-600 bg-white p-2 group-active:border-indigo-500" />
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees?.map((employee) => (
          <EmployeeCard key={employee.id} {...employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeesList;
