import React from "react";
import Button from "./Button";
import PropTypes from "prop-types";

const FileInput = ({ onChange, isLoading }) => {
  return (
    <div className="absolute h-full w-full">
      <Button className="absolute -bottom-0.5 -right-3.5" isLoading={isLoading}>
        <label
          htmlFor="lunchImage"
          className="absolute bottom-0 block h-5 w-5 cursor-pointer text-sm font-medium"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3b82f5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 stroke-indigo-500"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
      </Button>
      <input
        type="file"
        id="lunchImage"
        accept="image/*"
        className="cursor-pointer opacity-0"
        encType="multipart/form-data"
        onChange={onChange}
        hidden
      />
    </div>
  );
};

FileInput.propTypes = {
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default FileInput;
