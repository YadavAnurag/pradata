import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "dotenv/config";
import App from "./App";

// + remove me, use above one
const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

// console.log("Env", process.env);
renderApp();
