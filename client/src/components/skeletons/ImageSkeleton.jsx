import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

const ImageSkeleton = ({ className, size = "size-16" }) => {
  return (
    <div className={clsx("flex items-center justify-center", className)}>
      <div
        className={clsx("animate-pulse rounded-full  bg-gray-200", size)}
      ></div>
    </div>
  );
};

ImageSkeleton.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
};

export default ImageSkeleton;
