import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@/assets/icons/close.svg";
import Button from "./Button";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10">
      <div className="flex items-center justify-center py-4 px-4 h-full">
        <div className="w-full max-w-sm bg-neutral-100 rounded-lg overflow-hidden shadow-xl">
          <div className="relative">
            <Button
              className="absolute top-2 right-2 bg-transparent rounded-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-75"
              onClick={onClose}
              iconSrc={CloseIcon}
              iconAlt="Close Modal"
              title="Close Modal"
              iconSize="lg"
            />
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
