import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { employeeStatuses } from "@/constants";
import { useDeleteEmployeeMutation } from "@/store/services/employees";
import useImageOnLoad from "@/hooks/useImageOnLoad";
import Modal from "./ui/Modal";
import EditEmployeeForm from "./forms/EditEmployeeForm";
import Button from "./ui/Button";
import AvatarErrorImg from "@/assets/images/avatar.png";
import ImageSkeleton from "./skeletons/ImageSkeleton";
import EditIcon from "@/assets/icons/edit.svg";
import Alert from "./ui/Alert";

const EmployeeCard = (employee) => {
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteEmployeeMutation();
  const { isLoaded } = useImageOnLoad(employee.imgUrl);

  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = async (employeeId) => {
    try {
      toast.promise(deleteEmployee(employeeId).unwrap(), {
        loading: "Deleting employee...",
        success: "Employee deleted successfully!",
        error: "Error deleting employee",
      });
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    }

    setShowModal(false);
  };

  const handleAlertConfirm = async (id) => {
    await handleDelete(id);
    setShowAlert(false);
  };

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditEmployeeForm onSubmit={() => setShowModal(false)} initialValues={employee} />
        </Modal>
      )}
      {showAlert && (
        <Modal onClose={() => setShowAlert(false)}>
          <Alert
            title="Are you sure you want to delete this employee?"
            message="This action cannot be undone."
            onConfirm={() => handleAlertConfirm(employee.id)}
            onCancel={() => setShowAlert(false)}
          />
        </Modal>
      )}
      <article className="rounded-xl  bg-white shadow-md  p-4">
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
              className="inline-block border-e p-3 text-gray-700 hover:bg-gray-100 focus:relative"
              onClick={() => setShowModal(true)}
              iconSrc={EditIcon}
              iconAlt="Edit Employee"
              title="Edit"
            />
            <Button
              onClick={() => setShowAlert(true)}
              className="group inline-block border-e p-3 text-gray-700 hover:bg-red-400 hover:border-e-red-400 focus:relative transition-colors"
              title="Delete"
              isLoading={isDeleting}
              iconAlt="Delete Employee"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4 group-hover:stroke-white group-hover:stroke-2 transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </Button>
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
