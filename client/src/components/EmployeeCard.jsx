import PropTypes from "prop-types";
import React, { useState } from "react";
import { employeeStatuses } from "../constants";
import {
  useDeleteEmployeeMutation,
  useGetAllEmployeesQuery,
  useUpdateEmployeeMutation,
} from "../store/services/employees";
import Modal from "./ui/Modal";
import EditEmployeeForm from "./forms/EditEmployeeForm";
import AvatarImage from "../assets/avatar.png";
import EditIcon from "./icons/EditIcon";

const EmployeeCard = ({ username, status, id }) => {
  const { refetch } = useGetAllEmployeesQuery();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const confirmAction = async (data) => {
    try {
      await updateEmployee({ id, data });
      closeModal();
      refetch();
    } catch (err) {
      console.error("Error updating employee:", err);
    }
  };

  const deleteAction = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      closeModal();
      refetch();
      console.log("Employee deleted successfully!");
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <EditEmployeeForm
            initialValues={{ username, status, id }}
            onDelete={deleteAction}
            onSubmit={confirmAction}
          />
        </Modal>
      )}
      <article className="rounded-xl border border-gray-700 bg-neutral-100 shadow-md  p-4">
        <div className="flex items-center gap-4">
          <img
            alt=""
            src={AvatarImage}
            className="size-16 rounded-full object-cover border"
          />

          <div className="flex flex-col items-start">
            <h3 className="text-lg font-medium text-gray-700">{username}</h3>

            <ul className="-m-1 flex flex-wrap">
              <li className="p-1 leading-none">
                {employeeStatuses.find((s) => s.value === status)?.label}
              </li>
            </ul>
          </div>

          <button
            className="inline-block ml-auto rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
            onClick={openModal}
          >
            <span className="sr-only"> Edit </span>
            <EditIcon />
          </button>
        </div>
      </article>
    </>
  );
};

EmployeeCard.propTypes = {
  username: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default EmployeeCard;
