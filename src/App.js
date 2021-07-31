import React from "react";
import { Provider } from "react-redux";

// import './styles/styles.scss';
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
//import app from "./playground/app";

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

function App() {
  return { ...jsx };
}

export default App;
