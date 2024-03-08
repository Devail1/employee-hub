import React, { useState } from "react";
import PropTypes from "prop-types";
import { employeeStatuses } from "../constants";
import Modal from "./ui/Modal";
import EditEmployeeForm from "./forms/EditEmployeeForm";
import EditIcon from "./icons/EditIcon";
import Button from "./ui/Button";
import useImageOnLoad from "../hooks/useImageOnLoad";
import AvatarErrorImg from "../assets/avatar.png";
import ImageSkeleton from "./skeletons/ImageSkeleton";
const EmployeeCard = (employee) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoaded } = useImageOnLoad(employee.imgUrl);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {isOpen && (
        <Modal onClose={closeModal}>
          <EditEmployeeForm onSubmit={closeModal} initialValues={employee} />
        </Modal>
      )}
      <article className="rounded-xl border border-gray-700 bg-neutral-100 shadow-md  p-4">
        <div className="flex items-center gap-4">
          {isLoaded ? (
            <img
              alt="Profile Picture"
              src={employee.imgUrl || AvatarErrorImg}
              className="size-16 rounded-full object-cover border"
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

          <Button
            className="inline-block ml-auto rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
            onClick={openModal}
            icon={<EditIcon />}
          />
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
