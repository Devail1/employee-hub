import React from "react";
import ErrorImg from "@/assets/images/server-error.svg";
import PropTypes from "prop-types";

const Error = ({ message }) => {
  return (
    <div className="grid h-full place-content-center px-4">
      <div className="text-center">
        <img src={ErrorImg} className="w-1/2 mx-auto" alt="404" />
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</h1>
        <p className="mx-auto mt-4 text-gray-500 max-w-fit text-center">
          Something went wrong.
          {message && <span className="text-red-500 block text-md">{message}.</span>}
        </p>
      </div>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string,
};

export default Error;
