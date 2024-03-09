import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { employeeStatuses } from "@/constants";
import {
  useUpdateEmployeeMutation,
  useUploadImageMutation,
} from "@/store/services/employees";
import Button from "@/components/ui/Button";
import MissingAvatarImage from "@/assets/avatar.png";
import useImageOnLoad from "@/hooks/useImageOnLoad";
import ImageSkeleton from "@/components/skeletons/ImageSkeleton";
import Dropdown from "@/components/ui/Dropdown";
import FileInput from "@/components/ui/FileInput";
import Divider from "../ui/Divider";

const EditEmployeeForm = ({ onSubmit, initialValues: employee }) => {
  const [updateEmployee, { isLoading: isUpdateLoading }] =
    useUpdateEmployeeMutation();
  const [uploadImage, { isLoading: isImgUploadLoading }] =
    useUploadImageMutation();
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
      toast.error("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      toast.promise(uploadImage({ id: employee.id, file: formData }).unwrap(), {
        loading: "Uploading image...",
        success: (data) => {
          setFormData((prevData) => ({ ...prevData, imgUrl: data.imageUrl }));
          return "Image uploaded successfully!";
        },
        error: (error) =>
          `Error uploading image: ${error.data?.message || error}`,
      });
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      toast.promise(
        updateEmployee({ id: employee.id, data: formData }).unwrap(),
        {
          loading: "Updating employee...",
          success: "Employee updated successfully!",
          error: (error) =>
            `Error updating employee: ${error.data?.message || error}`,
        },
      );
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }

    if (onSubmit) onSubmit();
  };

  return (
    <div className="mx-auto max-w-screen-xl pt-2">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Edit Employee</h1>
        <p className="mt-4 text-gray-600">
          Update employee details like username, status and profile image
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-6 flex max-w-md flex-col items-start space-y-2"
      >
        <div className="relative mb-2 h-20 w-20 self-center text-left">
          <FileInput
            onChange={handleImageUpload}
            isLoading={isImgUploadLoading}
          />
          {isImageLoaded ? (
            <img
              alt="Profile Picture"
              src={formData.imgUrl || MissingAvatarImage}
              className="mx-auto size-20 rounded-full border border-gray-400 object-cover"
            />
          ) : (
            <ImageSkeleton className="self-center" size="size-20" />
          )}
        </div>
        <label
          htmlFor="username"
          className="block text-left text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="w-full rounded-lg  border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
        <Divider />
        <Button
          className="self-end rounded-lg bg-blue-500 px-3 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          type="submit"
          label="Save Changes"
          isLoading={isUpdateLoading || isImgUploadLoading}
        />
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
