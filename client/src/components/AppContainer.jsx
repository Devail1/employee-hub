import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import PropTypes from "prop-types";

const AppContainer = ({ children }) => {
  return (
    <Provider store={store}>
      <div className="h-screen min-h-screen py-6 bg-neutral-100">
        <div className="container h-full mx-auto px-4">{children}</div>
      </div>
    </Provider>
  );
};

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppContainer;
