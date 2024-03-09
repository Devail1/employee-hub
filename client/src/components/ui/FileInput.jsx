import React from "react";
import UploadIcon from "@/assets/icons/upload.svg";
import Button from "./Button";
import PropTypes from "prop-types";

function FileInput({ onChange, isLoading }) {
  return (
    <div className="absolute h-full w-full">
      <Button
        className="absolute -bottom-0.5 -right-3.5"
        iconAlt="Upload Profile Picture"
        title="Upload"
        iconSrc={UploadIcon}
        iconSize="md"
        isLoading={isLoading}
      >
        <label
          htmlFor="lunchImage"
          className="block absolute bottom-0 text-sm font-medium cursor-pointer w-5 h-5"
        />
      </Button>
      <input
        type="file"
        id="lunchImage"
        accept="image/*"
        className="opacity-0 cursor-pointer"
        encType="multipart/form-data"
        onChange={onChange}
        hidden
      />
    </div>
  );
}

FileInput.propTypes = {
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default FileInput;
