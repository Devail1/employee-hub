import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { employeeStatuses } from "@/constants";
import { useDeleteEmployeeMutation } from "@/store/services/employees";
import useImageOnLoad from "@/hooks/useImageOnLoad";
import Modal from "./ui/Modal";
import EditEmployeeForm from "./forms/EditEmployeeForm";
import Button from "./ui/Button";
import AvatarErrorImg from "@/assets/avatar.png";
import ImageSkeleton from "./skeletons/ImageSkeleton";
import Alert from "./ui/Alert";

const EmployeeCard = (employee) => {
  const [deleteEmployee, { isLoading: isDeleting }] =
    useDeleteEmployeeMutation();
  const { isLoaded } = useImageOnLoad(employee.imgUrl);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const openModal = () => setShowEditModal(true);
  const closeModal = () => setShowEditModal(false);

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

    closeModal();
  };

  const handleAlertConfirm = async (id) => {
    await handleDelete(id);
    setShowDeleteAlert(false);
  };

  const statusLabel = employeeStatuses.find(
    (status) => status.value === employee.status,
  )?.label;

  return (
    <>
      {showEditModal && (
        <Modal onClose={closeModal}>
          <EditEmployeeForm onSubmit={closeModal} initialValues={employee} />
        </Modal>
      )}
      {showDeleteAlert && (
        <Alert
          title="Are you sure you want to delete this profile?"
          message="This action cannot be undone."
          onConfirm={() => handleAlertConfirm(employee.id)}
          onCancel={() => setShowDeleteAlert(false)}
        />
      )}
      <article className="rounded-xl  bg-white p-4  shadow-md">
        <div className="flex items-center gap-4">
          {isLoaded ? (
            <img
              alt="Profile Picture"
              src={employee.imgUrl || AvatarErrorImg}
              className="size-16 rounded-full border border-gray-300 object-cover"
            />
          ) : (
            <ImageSkeleton />
          )}

          <div className="flex flex-col items-start">
            <h3 className="text-lg font-medium text-gray-700">
              {employee.username}
            </h3>

            <ul className="-m-1 flex flex-wrap">
              <li className="p-1 leading-none">{statusLabel}</li>
            </ul>
          </div>

          <span className="ml-auto inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
            <Button
              className="group inline-block border-e p-3 text-gray-500 hover:bg-gray-200 focus:relative"
              onClick={openModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4 stroke-gray-500 transition-colors group-hover:stroke-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </Button>
            <Button
              onClick={() => setShowDeleteAlert(true)}
              className="group inline-block border-e p-3 text-gray-500 transition-colors hover:border-e-red-500 hover:bg-red-500 focus:relative"
              isLoading={isDeleting}
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4 transition-colors group-hover:stroke-white group-hover:stroke-2"
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
