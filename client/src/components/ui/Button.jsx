import React from "react";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

const Button = ({
  className,
  onClick,
  label,
  icon,
  type = "button",
  isLoading,
}) => {
  return (
    <button
      type={type}
      className={`${className} ${"disabled:cursor-none disabled:opacity-50 disabled:outline-none disabled:ring-0"}`}
      onClick={onClick}
      disabled={isLoading}
    >
      <div className="flex items-center gap-2 relative w-full">
        {isLoading && <Spinner className="absolute left-0" />}
        {label && (
          <span className="font-medium transition-colors group-hover:text-white ">
            {label}
          </span>
        )}
      </div>
      {icon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
  icon: PropTypes.node,
  isLoading: PropTypes.bool,
};
export default Button;
