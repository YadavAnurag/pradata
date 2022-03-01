import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "dotenv/config";
import App from "./App";
import { store } from "./App";
import { initSetUsers } from "./store/actions/user/user";
import { initSetPlans } from "./store/actions/index";

// + remove me, use above one
const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

console.log("Env", process.env);
// set plans
store.dispatch(initSetPlans()).then(() => {
  store.dispatch(initSetUsers()).then(() => {
    renderApp();
  });
});
