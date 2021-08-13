import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import config from "./utils/config";
import { store } from "./App";
import { login, logout } from "./store/actions/index";
import { initSetUsers } from "./store/actions/user/user";
// import }reportWebVitals from './reportWebVitals';

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById("root")
    );

    hasRendered = true;
  }
};

// TODO - use below render before app loads
// ReactDOM.render(<LoadingPage />, document.getElementById('app'));

if (config.isAuthRequired) {
  // TODO - create event management to call below uid if onAuthStateChanged as same on expensify and utils/auth.js
  const user = {
    uid: "anu",
  };
  if (user) {
    store.dispatch(login(user.uid));
    if (config.seedStore) {
      initSetUsers(store.dispatch);
    }
    renderApp();
  } else {
    store.dispatch(logout());
    renderApp();
  }
} else {
  renderApp();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
