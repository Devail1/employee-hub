import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Button = ({ className, label, isLoading, children, ...rest }) => {
  return (
    <button
      className={clsx(
        className,
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:outline-none disabled:ring-0",
      )}
      disabled={isLoading}
      type="button"
      {...rest}
    >
      <div className="relative flex w-full items-center gap-2">
        {label && (
          <span className="whitespace-nowrap font-medium transition-colors group-hover:text-white">
            {label}
          </span>
        )}
      </div>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
