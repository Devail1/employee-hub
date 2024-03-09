import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AppContainer from "./components/AppContainer.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContainer>
      <App />
    </AppContainer>
  </React.StrictMode>
);
