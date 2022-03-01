import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
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

// set plans
store.dispatch(initSetPlans()).then(() => {
  store.dispatch(initSetUsers()).then(() => {
    renderApp();
  });
});
