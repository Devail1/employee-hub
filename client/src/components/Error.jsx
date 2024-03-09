import React from "react";
import ErrorImg from "@/assets/images/server-error.svg";
import PropTypes from "prop-types";

const Error = ({ message }) => {
  return (
    <div className="grid h-full place-content-center px-4">
      <div className="text-center">
        <img src={ErrorImg} className="w-1/2 mx-auto" alt="404" />
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</h1>
        <p className="mt-4 text-gray-500">
          {message ? `Something went wrong: ${message}` : "Something went wrong"}
        </p>
      </div>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string,
};

export default Error;
