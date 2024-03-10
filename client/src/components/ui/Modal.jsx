import React from "react";
import { useScrollLock } from "@/hooks/useScrollLock";
import PropTypes from "prop-types";
import Button from "./Button";

const Modal = ({ children, onClose }) => {
  useScrollLock();
  return (
    <div className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="flex h-full items-center justify-center p-4">
        <div className="w-full max-w-sm overflow-hidden rounded-lg bg-neutral-50 shadow-2xl">
          <div className="relative">
            <Button
              className="group absolute right-2 top-2 rounded bg-transparent p-1 transition-colors hover:bg-gray-300"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 stroke-gray-500 transition-colors group-hover:stroke-white "
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </Button>
          </div>
          <div className="px-6 py-8 lg:p-8">{children}</div>
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
