import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Alert = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="rounded-lg bg-neutral-50 p-8 shadow-2xl">
      <h2 className="text-lg font-bold">{title}</h2>

      <p className="mt-2 text-sm text-gray-600">{message}</p>

      <div className="mt-4 flex gap-2">
        <Button
          onClick={onConfirm}
          className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-red-500 border hover:text-white hover:bg-red-500 hover:border-red-500 transition-colors"
        >
          Yes, I am sure
        </Button>

        <Button
          onClick={onCancel}
          className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:border transition-colors"
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
