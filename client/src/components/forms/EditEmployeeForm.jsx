import React, { useState } from "react";
import PropTypes from "prop-types";
import { employeeStatuses } from "../../constants";
import Button from "../ui/Button";
import MissingAvatarImage from "../../assets/avatar.png";
import {
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  useUploadImageMutation,
} from "../../store/services/employees";
import useImageOnLoad from "../../hooks/useImageOnLoad";
import ImageSkeleton from "../skeletons/ImageSkeleton";
import UploadIcon from "../icons/UploadIcon";
const EditEmployeeForm = ({ onSubmit, initialValues: employee }) => {
  const [updateEmployee, { isLoading: isUpdateLoading }] = useUpdateEmployeeMutation();
  const [deleteEmployee, { isLoading: isDeleteLoading }] = useDeleteEmployeeMutation();
  const [uploadImage, { isLoading: isUploadLoading }] = useUploadImageMutation();
  const { isLoaded } = useImageOnLoad(employee.imgUrl);

  const [formData, setFormData] = useState({
    username: employee.username,
    status: employee.status,
    imgUrl: employee.imgUrl,
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      console.error("Please select an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const { data } = await uploadImage({ id: employee.id, file: formData }); // Pass formData as the file
      setFormData((prevData) => ({ ...prevData, imgUrl: data.imageUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedImage) {
        await handleImageUpload();
      }
      await updateEmployee({ id: employee.id, data: formData });
    } catch (err) {
      console.error("Error updating employee:", err);
    }

    if (onSubmit) onSubmit();
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      console.log("Employee deleted successfully!");
    } catch (err) {
      console.error("Error deleting employee:", err);
    }

    if (onSubmit) onSubmit();
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Edit Employee</h1>
        <p className="mt-4 text-gray-500">Edit an employee or remove it from the list</p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-6 max-w-md ">
        <div className="mt-2 flex flex-col items-start gap-4">
          {isLoaded ? (
            <div className="text-left relative w-20 h-20 self-center">
              <label htmlFor="lunchImage" className="block text-sm font-medium ">
                {!selectedImage && (
                  <UploadIcon className="absolute bottom-[-10px] right-[-10px]  text-indigo-700 cursor-pointer" />
                )}
              </label>
              <img
                alt="Profile Picture"
                src={formData.imgUrl || MissingAvatarImage}
                className="size-20 rounded-full object-cover border mx-auto"
              />
              <input
                type="file"
                id="lunchImage"
                accept="image/*"
                className="opacity-0 cursor-pointer" // Adjust opacity and cursor
                encType="multipart/form-data"
                onChange={handleImageChange}
              />
              {selectedImage && (
                <span className="text-nowrap text-xs font-medium text-gray-700 absolute bottom-[-20px] left-1/2 -translate-x-1/2 ">
                  uploaded
                </span>
              )}
            </div>
          ) : (
            <ImageSkeleton className="self-center" size="size-20" />
          )}

          <label htmlFor="username" className="block text-sm font-medium text-gray-700 text-left">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full rounded-lg  border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="status" className="block text-sm font-medium text-gray-700 text-left">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="w-full rounded-lg border-gray-200 h-10 px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.status}
            onChange={handleChange}
            required
          >
            {employeeStatuses.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end items-center py-4 border-t gap-2 border-gray-200">
          <Button
            className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 "
            label="Delete"
            onClick={() => handleDeleteEmployee(employee.id)}
            isLoading={isDeleteLoading}
          />
          <Button
            className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5"
            type="submit"
            label="Save Changes"
            isLoading={isUpdateLoading || isUploadLoading}
          />
        </div>
      </form>
    </div>
  );
};

EditEmployeeForm.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    imgUrl: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func,
};

export default EditEmployeeForm;
