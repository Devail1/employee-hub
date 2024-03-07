import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "../icons/CloseIcon";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="flex items-center justify-center min-h-screen py-4 px-4">
        <div className="w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-xl">
          <div className="relative">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Modal"
              className="absolute top-2 right-2 bg-transparent hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-75"
            >
              <CloseIcon />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
