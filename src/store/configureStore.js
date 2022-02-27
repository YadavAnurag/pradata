import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {
  userReducer,
  userFilterReducer,
  planReducer,
  planFilterReducer,
  authReducer,
  dashboardReducer,
} from "./reducers/index";

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;
const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log("[Middleware] Dispatching", action);
      const result = next(action);
      // console.log('[Middlerware] next state', store.getState());
      return result;
    };
  };
};

const rootReducer = combineReducers({
  users: userReducer,
  userFilters: userFilterReducer,

  plans: planReducer,
  planFilters: planFilterReducer,

  auth: authReducer,
  dashboard: dashboardReducer,
});

// store creation
const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, logger))
  );
  return store;
};

export default configureStore;
