import React, { useState } from "react";
import PropTypes from "prop-types";
import { employeeStatuses } from "@/constants";
import Modal from "./ui/Modal";
import EditEmployeeForm from "./forms/EditEmployeeForm";
import Button from "./ui/Button";
import useImageOnLoad from "@/hooks/useImageOnLoad";
import AvatarErrorImg from "@/assets/images/avatar.png";
import ImageSkeleton from "./skeletons/ImageSkeleton";
import EditIcon from "@/assets/icons/edit.svg";
import DeleteIcon from "@/assets/icons/delete.svg";
import { useDeleteEmployeeMutation } from "@/store/services/employees";
const EmployeeCard = (employee) => {
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const { isLoaded } = useImageOnLoad(employee.imgUrl);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      console.log("Employee deleted successfully!");
    } catch (err) {
      console.error("Error deleting employee:", err);
    }

    closeModal();
  };

  return (
    <>
      {isOpen && (
        <Modal onClose={closeModal}>
          <EditEmployeeForm onSubmit={closeModal} initialValues={employee} />
        </Modal>
      )}
      <article className="rounded-xl border border-gray-700 bg-white shadow-md  p-4">
        <div className="flex items-center gap-4">
          {isLoaded ? (
            <img
              alt="Profile Picture"
              src={employee.imgUrl || AvatarErrorImg}
              className="size-16 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <ImageSkeleton />
          )}

          <div className="flex flex-col items-start">
            <h3 className="text-lg font-medium text-gray-700">{employee.username}</h3>

            <ul className="-m-1 flex flex-wrap">
              <li className="p-1 leading-none">
                {employeeStatuses.find((s) => s.value === employee.status)?.label}
              </li>
            </ul>
          </div>

          <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm ml-auto">
            <Button
              className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
              onClick={openModal}
              iconSrc={EditIcon}
              iconAlt="Edit Employee"
              title="Edit"
            />
            <Button
              onClick={() => handleDelete(employee.id)}
              className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
              iconSrc={DeleteIcon}
              iconAlt="Delete Employee"
              title="Delete"
            />
          </span>
        </div>
      </article>
    </>
  );
};

EmployeeCard.propTypes = {
  employee: PropTypes.shape({
    username: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    imgUrl: PropTypes.string,
  }),
};

export default EmployeeCard;
