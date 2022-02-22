import React from "react";
import { Provider } from "react-redux";

import "./styles/styles.scss";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
//import app from "./playground/app";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";

export const store = configureStore();
const jsx = (
  <Provider store={store}>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Zoom}
    />
    <AppRouter />
  </Provider>
);

// function App() {
//   return { ...jsx };
// }
const App = () => {
  return { ...jsx };
};

export default App;
