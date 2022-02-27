import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { history } from "./routers/AppRouter";
import config from "./utils/config";
import { store } from "./App";
import { login, logout } from "./store/actions/index";
import { initSetUsers } from "./store/actions/user/user";
import { initSetPlans } from "./store/actions/index";
// import }reportWebVitals from './reportWebVitals';

// let hasRendered = false;
// const renderApp = () => {
//   if (!hasRendered) {
//     ReactDOM.render(
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>,
//       document.getElementById("root")
//     );

//     hasRendered = true;
//   }
// };

// + remove me, use above one
const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

// - remove me

// TODO - use below render before app loads
// ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// if (config.isAuthRequired) {
//   // TODO - create event management to call below uid if onAuthStateChanged as same on expensify and utils/auth.js
//   if (store.getState().auth.userId) {
//     store.dispatch(login(store.getState().auth.userId));
//     if (config.seedStore) {
//       // initSetUsers()(store.dispatch);
//       store.dispatch(initSetUsers()).then(() => {
//         renderApp();
//       });
//     }
//   } else {
//     store.dispatch(logout());
//     renderApp();
//   }
// } else {
//   renderApp();
// }

// set plans
console.log("gonna call");
//store.dispatch(initSetPlans()).then(() => {
store.dispatch(initSetPlans()).then(() => {
  store.dispatch(initSetUsers()).then(() => {
    renderApp();
  });

  // store.dispatch(initSetUsers()).then(() => {
  //   if (store.getState().auth.isAdmin) {
  //     // console.log("store.getState().auth.userId", store.getState().auth.userId);
  //     // store.dispatch(login(store.getState().auth.userId));
  //     store.dispatch(initSetUsers()).then(() => {
  //       renderApp();
  //     });
  //   } else {
  //     store.dispatch(logout());
  //     renderApp();
  //   }
  // });
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
