import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Alert = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{message}</p>
      <div className="mt-4 flex gap-2">
        <Button
          onClick={onConfirm}
          className="rounded border bg-gray-200 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:border-red-500 hover:bg-red-500 hover:text-white"
        >
          Yes, I am sure
        </Button>

        <Button
          onClick={onCancel}
          className="rounded border border-gray-50 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-100"
        >
          No, go back
        </Button>
      </div>
    </div>
  );
};

Alert.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Alert;
