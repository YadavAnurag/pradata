import React from "react";
import { Provider } from "react-redux";

import "./styles/styles.scss";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
//import app from "./playground/app";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";

import onAuthStateChanged from "./utils/auth";

export const store = configureStore();
// subscribe functions to store eg. for authChange
store.subscribe(() => onAuthStateChanged(store.getState().auth));

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
    <div style={{ minHeight: "100vh" }}>
      <AppRouter />
    </div>
    <Footer />
  </Provider>
);

// function App() {
//   return { ...jsx };
// }
const App = () => {
  return { ...jsx };
};

export default App;
