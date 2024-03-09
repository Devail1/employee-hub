import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Button = ({
  className,
  label,
  iconSrc,
  iconAlt,
  iconSize = "sm",
  isLoading,
  title,
  children,
  ...rest
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };
  return (
    <button
      className={clsx(
        className,
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:outline-none disabled:ring-0"
      )}
      disabled={isLoading}
      type="button"
      {...rest}
    >
      <div className="flex items-center gap-2 relative w-full">
        {label && (
          <span className="font-medium transition-colors group-hover:text-white whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
      {iconSrc && (
        <div className="cursor-pointer h-full w-full">
          {title && <span className="sr-only">{title}</span>}
          <img
            src={iconSrc}
            alt={iconAlt}
            className={clsx("transition-colors !fill-white group-hover:stroke-white", {
              [sizeClasses[iconSize]]: iconSize,
            })}
          />
        </div>
      )}
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  iconSrc: PropTypes.node,
  iconAlt: PropTypes.string,
  iconSize: PropTypes.oneOf(["sm", "md", "lg"]),
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
export default Button;
