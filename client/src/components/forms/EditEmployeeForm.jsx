import React, { useState } from "react";
import PropTypes from "prop-types";
import { employeeStatuses } from "@/constants";
import Button from "@/components/ui/Button";
import MissingAvatarImage from "@/assets/images/avatar.png";
import useImageOnLoad from "@/hooks/useImageOnLoad";
import ImageSkeleton from "@/components/skeletons/ImageSkeleton";
import { useUpdateEmployeeMutation, useUploadImageMutation } from "@/store/services/employees";
import Dropdown from "@/components/ui/Dropdown";
import FileInput from "@/components/ui/FileInput";

const EditEmployeeForm = ({ onSubmit, initialValues: employee }) => {
  const [updateEmployee, { isLoading: isUpdateLoading }] = useUpdateEmployeeMutation();
  const [uploadImage, { isLoading: isUploadLoading }] = useUploadImageMutation();
  const { isLoaded: isImageLoaded } = useImageOnLoad(employee.imgUrl);

  const [formData, setFormData] = useState({
    username: employee.username,
    status: employee.status,
    imgUrl: employee.imgUrl,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files && e.target.files[0];

    if (!selectedImage) {
      console.error("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const { data } = await uploadImage({ id: employee.id, file: formData });
      setFormData((prevData) => ({ ...prevData, imgUrl: data.imageUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateEmployee({ id: employee.id, data: formData });
    } catch (err) {
      console.error("Error updating employee:", err);
    }

    if (onSubmit) onSubmit();
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Edit Employee</h1>
        <p className="mt-4 text-gray-600">Edit an employee or remove it from the list</p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-6 max-w-md ">
        <div className="mt-2 flex flex-col items-start gap-2">
          <div className="text-left relative w-20 h-20 self-center mb-2">
            {isImageLoaded ? (
              <>
                <FileInput onChange={handleImageUpload} />
                <img
                  alt="Profile Picture"
                  src={formData.imgUrl || MissingAvatarImage}
                  className="size-20 rounded-full object-cover border border-gray-400 mx-auto"
                />
              </>
            ) : (
              <ImageSkeleton className="self-center" size="size-20" />
            )}
          </div>

          <label htmlFor="username" className="block text-sm font-medium text-gray-700 text-left">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full rounded-lg  border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Dropdown
            name="status"
            label="Status"
            value={formData.status}
            onChange={handleChange}
            options={employeeStatuses}
          />
        </div>
        <div className="flex justify-end items-center py-4 border-t gap-2 border-gray-200">
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
