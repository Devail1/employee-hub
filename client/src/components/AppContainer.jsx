import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import PropTypes from "prop-types";
import { Toaster } from "react-hot-toast";

const AppContainer = ({ children }) => {
  return (
    <Provider store={store}>
      <div className="h-screen min-h-screen bg-neutral-100 py-6">
        <div className="container mx-auto h-full px-4 ">
          <>
            {children}
            <Toaster position="bottom-center" />
          </>
        </div>
      </div>
    </Provider>
  );
};

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppContainer;
